<script context="module" lang="ts">
	export const editSchema = z.object({
		username: z.string().min(0, { message: "Username can't be empty." }).trim(),
		email: z.string().email({ message: 'Invalid email.' }).trim()
	});

	export const passwordSchema = z.object({
		oldPassword: z.string().min(0, { message: "can't be empty." }).trim(),
		newPassword: z
			.string()
			.min(8, { message: "Password can't be less than 8 character long." })
			.trim()
	});
</script>

<script lang="ts">
	import type { PageData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { z } from 'zod';

	export let data: PageData;
	$: user = data.user;

	const editUser: SubmitFunction = ({ formData, cancel }) => {
		const data = Object.fromEntries(formData);
		const zResult = editSchema.safeParse(data);
		if (zResult.success === true) {
			//
		} else {
			cancel();
			console.log(zResult.error.formErrors.fieldErrors); // debug
		}

		return async ({ result }) => {
			// console.log('result :', result); // debug
			if (result.type === 'success') {
				invalidateAll();
			}
		};
	};

	const editPassword: SubmitFunction = ({ formData, cancel }) => {
		const data = Object.fromEntries(formData);
		const zResult = passwordSchema.safeParse(data);
		if (zResult.success === true) {
			formData.append('email', user.email);
		} else {
			cancel();
			console.log(zResult.error.formErrors.fieldErrors); // debug
		}

		return async ({ result }) => {
			// console.log('result :', result); // debug
			if (result.type === 'success') {
				invalidateAll();
			}
		};
	};
</script>

<section class="mx-auto w-fit">
	<!-- <h1 class="text-left text-2xl">{`${user.userName}`}</h1> -->
	<!-- <p class="text-left">{`${user.email}`}</p> -->

	<div class="flex flex-row space-x-5">
		<!-- edit username, email -->
		<form
			class="h-fit w-fit rounded-xl bg-slate-500 px-6 py-8"
			action="?/editUser&userId={user?.userId}"
			method="post"
			use:enhance={editUser}
		>
			<div class="">
				<label class="block" for="username">Username</label>
				<input
					class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
					type="text"
					value={user.userName}
					name="username"
					id="username"
				/>
			</div>
			<div class="mt-4">
				<label class="block" for="email">Email</label>
				<input
					class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
					type="text"
					value={user.email}
					name="email"
					id="email"
				/>
			</div>
			<button class="mt-8 rounded-lg bg-blue-500 px-2 py-1" type="submit">Edit</button>
		</form>

		<!-- change password -->
		<form
			class="h-fit w-fit rounded-xl bg-slate-500 px-6 py-8"
			action="?/changePassword"
			method="post"
			use:enhance={editPassword}
		>
			<div class="">
				<label class="block" for="oldPassword">Old Password</label>
				<input
					class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
					type="password"
					name="oldPassword"
					id="oldPassword"
				/>
			</div>
			<div class="mt-4">
				<label class="block" for="newPassword">New Password</label>
				<input
					class="rounded-lg px-2 pb-1 text-black invalid:outline-pink-500 focus:outline-none"
					type="password"
					name="newPassword"
					id="newPassword"
				/>
			</div>
			<button class="mt-8 rounded-lg bg-blue-500 px-2 py-1" type="submit">Change password</button>
		</form>
	</div>

	<!-- delete user -->
	<form class="mt-10" action="?/deleteUser&userId={user?.userId}" method="post" use:enhance>
		<button class="rounded-lg bg-red-500 px-2 py-1" type="submit">Delete user</button>
	</form>
</section>

<style>
	/*  */
</style>
