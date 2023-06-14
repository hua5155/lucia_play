<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: user = data.user;
</script>

<h1 class="mx-auto text-center text-2xl">{`This is ${user.userName}'s super secret page`}</h1>

<style>
	/*  */
</style>
