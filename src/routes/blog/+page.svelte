<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { Listgroup, ListgroupItem } from 'flowbite-svelte';
</script>

<NavBar />

<main class="grid place-items-center">
	<svg viewBox="0 0 960 300">
		<symbol id="s-text">
			<text text-anchor="middle" x="50%" y="80%">My Blog</text>
		</symbol>

		<g class="g-ants">
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
		</g>
	</svg>

	<Listgroup class="mt-10 flex flex-col-reverse text-center">
		<ListgroupItem class="text-lg">
			<a href="blog/post-01-welcome">Welcome to my Blog!</a>
		</ListgroupItem>
	</Listgroup>
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
		stroke: #0f6e5a;
		animation-delay: -1;
	}

	.text-copy:nth-child(2) {
		stroke: #bbf8b3;
		animation-delay: -2s;
	}

	.text-copy:nth-child(3) {
		stroke: #4ed34e;
		animation-delay: -3s;
	}

	.text-copy:nth-child(4) {
		stroke: #2b5a0f;
		animation-delay: -4s;
	}

	.text-copy:nth-child(5) {
		stroke: #19c019;
		animation-delay: -5s;
	}

	@keyframes stroke-offset {
		100% {
			stroke-dashoffset: -35%;
		}
	}
</style>
