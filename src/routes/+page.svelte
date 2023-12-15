<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { Heading, P, Tooltip } from 'flowbite-svelte';
</script>

<NavBar />

<main>
	<Heading class="text-center mt-32 font-normal">
		<div class="wordCarousel">
			<span>Call me </span>
			<div>
				<ul class="flip5">
					<li>DraftedDev</li>
					<li>Mikail Plotzky</li>
					<li>IndexBuffer</li>
					<li>Random Dude</li>
					<li>MineDrafter</li>
				</ul>
			</div>
		</div>
	</Heading>
	<Heading class="text-center text-2xl font-normal">I like programming!</Heading>

	<P class="text-center text-2xl mt-16 font-normal">
		I am Mikail, a coding enthusiast with a keen proficiency in Rust.
		<br />
		My journey in the realm of programming extends to Java, C# and JavaScript/CSS/HTML.
		<br />
		Additionally, I have experience in
		<a target="_blank" href="https://unity.com" class="text-blue-600">Unity</a>,
		<a target="_blank" href="https://bevyengine.org" class="text-blue-600">Bevy</a>,
		<a target="_blank" href="https://kit.svelte.dev/" class="text-blue-600">SvelteKit</a>,
		<a target="_blank" href="https://flutter.dev" class="text-blue-600">Flutter</a>,
		<a target="_blank" href="https://pytorch.org" class="text-blue-600">PyTorch</a>, and much more!
		<br />

		I love to jump right in new things and learn the bleeding-edge of technology.
	</P>
	<Tooltip>This is 100% not ChatGPT generated...</Tooltip>

	<P class="text-center text-2xl mt-16 font-normal">
		Honestly... I have no idea what to write here, so I just asked ChatGPT...<br />
		I just wanted to show off the fancy
		<a target="_blank" href="https://codepen.io/EricPorter/pen/JjPmOOb" class="text-blue-600"
			>"Call me..."</a
		> animation!
	</P>
</main>

<style lang="scss">
	.wordCarousel {
		div {
			overflow: hidden;
			position: relative;
			height: 65px;
			padding-top: 10px;
			margin-top: -10px;
			li {
				color: rgb(0, 113, 179);
				padding: 0 10px;
				height: 45px;
				margin-bottom: 45px;
				display: block;
			}
		}
	}

	.flip5 {
		animation: flip5 12s cubic-bezier(0.23, 1, 0.32, 1.2) infinite;
	}

	@keyframes flip5 {
		0% {
			margin-top: -450px;
		}
		5% {
			margin-top: -360px;
		}
		20% {
			margin-top: -360px;
		}
		25% {
			margin-top: -270px;
		}
		40% {
			margin-top: -270px;
		}
		45% {
			margin-top: -180px;
		}
		60% {
			margin-top: -180px;
		}
		65% {
			margin-top: -90px;
		}
		80% {
			margin-top: -90px;
		}
		85% {
			margin-top: 0px;
		}
		99.99% {
			margin-top: 0px;
		}
		100% {
			margin-top: -450px;
		}
	}
</style>
