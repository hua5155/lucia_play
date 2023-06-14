import { auth } from "$lib/server/lucia";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { session, user } = await locals.auth.validateUser()
  return { user }
};

export const actions: Actions = {
  logOut: async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (!session) return fail(401)
    await auth.invalidateSession(session.sessionId)
    locals.auth.setSession(null)  // remove cookie
  },
  deleteUser: async ({ url }) => {
    const userId = url.searchParams.get('userId')
    if (userId === null) return
    const user = auth.deleteUser(userId!);
  }
};