<script>
	import '../app.css';
</script>

<main class="h-fit min-h-screen w-screen max-w-full bg-black px-[5%] py-[3%] text-xl text-white">
	<nav class="fixed left-0 top-0 flex h-10 w-full items-center justify-center space-x-5">
		<a href="/">Home</a>
		<a href="/login">Login</a>
		<a href="/register">Sign up</a>
	</nav>
	<slot />
</main>
