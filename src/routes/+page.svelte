<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData, SubmitFunction } from './$types';

	export let data: PageData;
	$: user = data.user;
	// $: console.log('PageData :', data); // debug

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			// console.log('result :', result); // debug
			if (result.type === 'success') {
				invalidateAll();
			}
		};
	};
</script>

<h1 class="mx-auto text-center text-2xl">LuciaAuth Play</h1>

<div class="mx-auto mt-10 w-fit">
	{#if user?.userName}
		<p>{`username : ${user?.userName}`}</p>
		<form method="post">
			<button class="rounded-lg bg-blue-500 px-2 py-1" formaction="/logout" type="submit">
				Logout
			</button>
		</form>
		<form action="?/deleteUser&userId={user?.userId}" method="post" use:enhance={handleSubmit}>
			<button class="rounded-lg bg-red-500 px-2 py-1" type="submit">Delete user</button>
		</form>
	{:else}
		<p>You are not login</p>
		<a class="rounded-lg bg-blue-500 px-2 py-1" href="/login">login</a>
		<a class="rounded-lg bg-blue-500 px-2 py-1" href="/register">Sign up</a>
	{/if}
</div>

<footer class="fixed bottom-0 left-0 w-full">
	<ul class="ml-4 flex h-10 flex-row justify-center space-x-8 text-lg">
		<li>SvelteKit</li>
		<li>TailwindCSS</li>
		<li>Primsa</li>
		<li>SQLite</li>
		<li>LuciaAuth</li>
	</ul>
</footer>

<style>
	/*  */
</style>
