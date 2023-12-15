<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { DiscordLogo, GithubLogo, RedditLogo } from 'phosphor-svelte';

	let displayDiscord: boolean = false;
</script>

<NavBar />

<main class="grid place-items-center">
	<svg viewBox="0 0 960 300">
		<symbol id="s-text">
			<text text-anchor="middle" x="50%" y="80%">Contact Me</text>
		</symbol>

		<g class="g-ants">
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
			<use xlink:href="#s-text" class="text-copy" />
		</g>
	</svg>

	<div
		class="flex justify-center"
		on:pointerover={() => {
			displayDiscord = true;
		}}
		on:pointerleave={() => {
			displayDiscord = false;
		}}
	>
		{#if displayDiscord}
			<button
				class="text-4xl flex mr-3"
				on:mousedown={() => {
					console.log('gay');
					navigator.clipboard.writeText('drafteddev').then(
						(sucess) => {
							console.log('Copied! => ' + sucess);
						},
						(err) => {
							console.log('Error! => ' + err);
						}
					);
				}}
			>
				drafteddev
			</button>
		{:else}
			<div class="text-4xl flex mr-3">Discord</div>
		{/if}
		<DiscordLogo size="45" color="purple" weight="duotone" />
	</div>

	<div class="flex justify-center mt-5">
		<a class="text-4xl flex mr-3" href="https://www.reddit.com/user/DraftedDev" target="_blank"
			>Reddit</a
		>
		<RedditLogo size="45" color="red" weight="duotone" />
	</div>

	<div class="flex justify-center mt-5">
		<a class="text-4xl flex mr-3" href="https://github.com/DraftedDev" target="_blank">Github</a>
		<GithubLogo size="45" weight="duotone" />
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
		stroke: #be1486;
		animation-delay: -1;
	}

	.text-copy:nth-child(2) {
		stroke: #fa0000;
		animation-delay: -2s;
	}

	.text-copy:nth-child(3) {
		stroke: #874a8f;
		animation-delay: -3s;
	}

	.text-copy:nth-child(4) {
		stroke: #ff6868;
		animation-delay: -4s;
	}

	.text-copy:nth-child(5) {
		stroke: #721515;
		animation-delay: -5s;
	}

	@keyframes stroke-offset {
		100% {
			stroke-dashoffset: -35%;
		}
	}
</style>
