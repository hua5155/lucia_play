<script context="module">
	export const registerSchema = z.object({
		username: z.string().min(0, { message: "Username can't be empty." }).trim(),
		email: z.string().email({ message: 'Invalid email.' }).trim(),
		password: z.string().min(8, { message: "Password can't be less than 8 character long." }).trim()
	});
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import { z } from 'zod';

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
		const data = Object.fromEntries(formData);
		const zResult = registerSchema.safeParse(data);
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
		<div class="">
			<label class="block" for="username">Username</label>
			<input
				class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
				type="text"
				name="username"
				id="username"
			/>
		</div>
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
		<button class="mt-8 rounded-lg bg-blue-500 px-2 py-1" type="submit">Register</button>
	</form>
</section>

<style>
	/*  */
</style>
