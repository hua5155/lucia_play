import { auth } from "$lib/server/lucia";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { editSchema, passwordSchema } from "./+page.svelte";
import { z } from "zod";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { session, user } = await locals.auth.validateUser()
  if (!(session && user)) throw error(401, "You haven't log in yet!")

  if (params.userName !== user.userName) {
    if (session) throw redirect(302, `/${user.userName}`)
    throw error(403, "Unauthorized!")
  }

  return { user }
};

export const actions: Actions = {
  editUser: async ({ url, request, locals }) => {
    const userId = url.searchParams.get('userId')
    if (userId === null) return

    const formInput = Object.fromEntries(await request.formData())
    const zResult = editSchema.safeParse(formInput)
    if (zResult.success === true) {
      const { email, username } = zResult.data
      try {
        const user = await auth.updateUserAttributes(userId, {
          email: email,
          username: username
        });

        await auth.invalidateAllUserSessions(user.userId);
        const session = await auth.createSession(user.userId);
        locals.auth.setSession(session)
      } catch {
        throw error(400, "Something went wrong when updating user.")
      }
    }
  },
  changePassword: async ({ request, locals }) => {
    const hasEmail = z.object({ email: z.string() })
    const validator = passwordSchema.merge(hasEmail)

    const formInput = Object.fromEntries(await request.formData())
    const zResult = validator.safeParse(formInput)
    if (zResult.success === true) {
      const { newPassword, oldPassword, email } = zResult.data
      // check password
      try {
        await auth.useKey("email", email, oldPassword)
      } catch {
        throw error(400, "Incorrect username or password")
      }
      // console.log('password check passed');  // debug

      try {
        // change password
        await auth.updateKeyPassword("email", email, newPassword);

        // invalidate all session
        const key = await auth.useKey("email", email, newPassword)
        await auth.invalidateAllUserSessions(key.userId);
        const session = await auth.createSession(key.userId);
        locals.auth.setSession(session)
      } catch {
        throw error(500, "Something went wrong when changing password.")
      }
    } else {
      throw error(500, "Something went wrong when changing password.")
    }
  },
  deleteUser: async ({ url }) => {
    const userId = url.searchParams.get('userId')
    if (userId === null) return
    const user = auth.deleteUser(userId);

    throw redirect(302, '/')
  }
};