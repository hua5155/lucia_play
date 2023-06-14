import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { registerSchema } from "./+page.svelte";

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = await locals.auth.validateUser()
  if (session) throw redirect(302, '/')
  return {}
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formInput = Object.fromEntries(await request.formData())
    const zResult = registerSchema.safeParse(formInput)

    if (zResult.success === true) {
      const { username, email, password } = zResult.data

      try {
        const user = await auth.createUser(
          {
            primaryKey: {
              providerId: 'email',
              providerUserId: email,
              password: password,
            },
            attributes: {
              username: username,
              email: email
            }
          }
        )
        const session = await auth.createSession(user.userId)
        locals.auth.setSession(session)
      } catch (error) {
        console.error(error)
        return fail(400, { message: "Something went wrong." })
      }
    } else {
      console.log(zResult.error.formErrors)
    }
  }
};