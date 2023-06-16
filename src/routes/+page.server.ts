import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // console.log('redirecting to /home');  // debug
  throw redirect(302, '/home')
};

// export const actions: Actions = {};