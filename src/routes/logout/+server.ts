import { auth } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
  const { session } = await locals.auth.validateUser()
  if (!session) throw redirect(302, '/')

  await auth.invalidateSession(session.sessionId)
  locals.auth.setSession(null)  // remove cookie

  throw redirect(302, '/')
}