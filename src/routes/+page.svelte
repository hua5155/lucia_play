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

<section class="mx-auto mt-10 w-fit">
	{#if user?.userName}
		<p>{`Hello, ${user?.userName}`}</p>

		<div class="flex flex-row space-x-5">
			<form method="post">
				<button class="rounded-lg bg-blue-500 px-2 py-1" formaction="/logout" type="submit">
					Logout
				</button>
			</form>
			<a class="rounded-lg bg-blue-500 px-2 py-1" href="/{user?.userName}">Profile</a>
		</div>
	{:else}
		<p>You are not login</p>
		<a class="rounded-lg bg-blue-500 px-2 py-1" href="/login">login</a>
		<a class="rounded-lg bg-blue-500 px-2 py-1" href="/register">Sign up</a>
	{/if}
</section>

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
