<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="h-fit min-h-screen w-screen max-w-full bg-black px-[5%] py-[3%] text-xl text-white">
	<nav class="fixed left-0 top-0 flex h-10 w-full items-center justify-center space-x-5">
		<a href="/user1">User1's secret</a>
		<a href="/user2">User2's secret</a>
		<a href="/">Home</a>
		{#if !data.user}
			<a href="/login">Login</a>
			<a href="/register">Sign up</a>
		{:else}
			<form method="post">
				<button formaction="/logout" type="submit">Logout</button>
			</form>
		{/if}
	</nav>
	<slot />
</main>
