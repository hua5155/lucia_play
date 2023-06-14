<script>
	import { page } from '$app/stores';
</script>

<h1 class="mx-auto text-center text-2xl">{$page.status}</h1>
<h2 class="mx-auto text-center text-xl">{$page.error?.message}</h2>

<style>
	/*  */
</style>
