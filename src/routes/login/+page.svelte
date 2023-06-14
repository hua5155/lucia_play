<script context="module">
	export const loginSchema = z.object({
		email: z.string().email({ message: 'Invalid email.' }).trim(),
		password: z.string().trim()
	});
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import { z } from 'zod';

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
		const data = Object.fromEntries(formData);
		const zResult = loginSchema.safeParse(data);
		if (zResult.success === true) {
			//
		} else {
			cancel();
			console.log(zResult.error.formErrors.fieldErrors);
		}

		return async ({ update }) => {
			update();
		};
	};
</script>

<section class="mx-auto h-fit w-fit rounded-xl bg-slate-500 px-6 py-8">
	<form method="post" use:enhance={handleSubmit}>
		<div class="mt-4">
			<label class="block" for="email">Email</label>
			<input
				class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
				type="text"
				name="email"
				id="email"
			/>
		</div>
		<div class="mt-4">
			<label class="block" for="password">Password</label>
			<input
				class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
				type="password"
				name="password"
				id="password"
			/>
		</div>
		<button class="mt-8 rounded-lg bg-blue-500 px-2 py-1" type="submit">Log in</button>
	</form>
</section>

<style>
	/*  */
</style>
