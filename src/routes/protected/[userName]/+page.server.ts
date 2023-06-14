import { auth } from "$lib/server/lucia";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, locals}) => {
  const { session, user } = await locals.auth.validateUser()
  if (!(session && user)) throw error(401, "You haven't log in yet!")
  if (params.userName !== user.userName) throw error(403, "Unauthorized!")

  return {user}
};

// export const actions: Actions = {
//   default:async () => {
    
//   }
// };