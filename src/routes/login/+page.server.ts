import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { loginSchema } from "./+page.svelte";

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = await locals.auth.validateUser()
  if (session) throw redirect(302, '/')
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formInput = Object.fromEntries(await request.formData())
    const zResult = loginSchema.safeParse(formInput)

    if (zResult.success === true) {
      const { email, password } = zResult.data
      try {
        const key = await auth.useKey("email", email, password)
        const session = await auth.createSession(key.userId)
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