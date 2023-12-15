<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { ArrowCircleLeft } from 'phosphor-svelte';
</script>

<main class="flex flex-col justify-center font-mono">
	<div class="gradient">
		<Heading class="p-20 text-center flex-row flex">
			<a href="/blog" class="mr-36"><ArrowCircleLeft /></a>
			Welcome to my Blog!
		</Heading>
	</div>
	<div class="text-xl pl-52 pt-20">
		<p>So I decided to make my own Blog!</p>
		<p>Maybe I'm even going to make german & english posts.</p>
		<p>Yay!</p>
		<p>I made all of this with SvelteKit, Flowbite, PhosphorIcons and more, by the way!</p>
		<br />
		<p>I'll be posting stuff on here to keep myself and you up to date.</p>
		<p>
			Mainly about Programming and Philosophy, but please try not to get too much triggered by my
			oppinions!
		</p>
		<p>Thx :D</p>
		<br />
		<p>Kind regards, DraftedDev!</p>
		<br />
		<br />
		<p class="text-zinc-500">
			PS: If you notice any typos or other mistakes, please open an issue. I'm from germany so
			sorry.
		</p>
	</div>
</main>

<style lang="scss">
	.gradient {
		background: rgb(204, 0, 177);
		background: linear-gradient(159deg, rgba(255, 0, 221, 1) 0%, rgb(49, 98, 233) 100%);
	}
</style>
