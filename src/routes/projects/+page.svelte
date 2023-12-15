<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { Card, Heading } from 'flowbite-svelte';
</script>

<NavBar />

<main class="grid place-items-center">
	<svg viewBox="0 0 960 300">
		<symbol id="s-text">
			<text text-anchor="middle" x="50%" y="80%">My Projects</text>
		</symbol>

		<g class="g-ants">
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
		</g>
	</svg>

	<div class="flex">
		<Card
			href="https://github.com/DraftedDev/qilin"
			target="_blank"
			class="mt-20 text-center mr-32"
		>
			<Heading class="text-4xl">Qilin</Heading>
			<p class="text-gray-700 dark:text-gray-400 text-lg">
				Lightweight 2D Game Engine coded in 100% Rust and inspired by MonoGame.
			</p>
		</Card>

		<Card
			href="https://github.com/DraftedDev/bevier"
			target="_blank"
			class="mt-20 text-center mr-32"
		>
			<Heading class="text-4xl">Bevier</Heading>
			<p class="text-gray-700 dark:text-gray-400 text-lg">
				A Command-Line-Interface for generating Games using the Bevy Engine with templates and other
				customization options.
			</p>
		</Card>

		<Card href="https://github.com/DraftedDev/fgruc" target="_blank" class="mt-20 text-center">
			<Heading class="text-2xl">Fast Graphics Rendering Utility Collection</Heading>
			<p class="text-gray-700 dark:text-gray-400 text-lg">
				Rust Crate containing Utility Functions for 3D Rendering and Math.
			</p>
		</Card>
	</div>
</main>

<style lang="scss">
	svg {
		display: block;
		font-size: 5.5rem;
		width: 960px;
		height: 300px;
		margin: 0 auto;
	}

	.text-copy {
		fill: none;
		stroke: white;
		stroke-dasharray: 6% 29%;
		stroke-width: 5px;
		stroke-dashoffset: 0%;
		animation: stroke-offset 7s infinite linear;
	}

	.text-copy:nth-child(1) {
		stroke: #122a6d;
		animation-delay: -1;
	}

	.text-copy:nth-child(2) {
		stroke: #000000;
		animation-delay: -2s;
	}

	.text-copy:nth-child(3) {
		stroke: #202cd1;
		animation-delay: -3s;
	}

	.text-copy:nth-child(4) {
		stroke: #4288c2;
		animation-delay: -4s;
	}

	.text-copy:nth-child(5) {
		stroke: #191cc0;
		animation-delay: -5s;
	}

	@keyframes stroke-offset {
		100% {
			stroke-dashoffset: -35%;
		}
	}
</style>
