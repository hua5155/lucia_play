import { auth } from "$lib/server/lucia";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { session, user } = await locals.auth.validateUser()
  return { user }
};

export const actions: Actions = {
  // deleteUser: async ({ url }) => {
  //   const userId = url.searchParams.get('userId')
  //   if (userId === null) return
  //   const user = auth.deleteUser(userId);
  // }
};