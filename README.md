# Lucia play
Trying out LuciaAuth with SvelteKit

## Funtional features
* Sign in with email & password.
* Log in page w/ redirect.
* Sign in page w/ redirect.
* Log out.
* Protected route.
* Changing username, email, password.

<!-- ## Todos -->

## Type `PageData` not inferred correctly
After changes
* Moved `/` to `/home` (+page.svelte)
* Redirect `/` to `/home` (+page.server.ts)
  
Which is weird, because `+layout.svelte` & `+layout.server.ts` didn't changed.\
Import `PageData` from `'./$types'` will infer to `PageData = never`
* Still persist after `npx svelte-kit sync`.
* Still persist after delete `.svelte-kit` folder than run `npm run dev`.
  
Omit `PageData` from `export let data: PageData;` rn to infer the correct typing.\
There's a kinda similar issue on GitHub back in Aug 2022, supposed to be fixed ([link](https://github.com/sveltejs/kit/issues/5940))