<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	let style = 'hover:text-blue-600';
</script>

<Navbar class="px-2 py-3 w-full sticky border-b-2 border-b-zinc-500" let:hidden let:toggle>
	<NavBrand href="/">
		<span class="text-3xl font-mono">&#60;/&#62;</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden} nonActiveClass={style}>
		<NavLi href="/" class="text-2xl mr-20 font-bold" active>Home</NavLi>
		<NavLi href="/projects" class="text-2xl mr-20 font-bold">Projects</NavLi>
		<NavLi href="/contact" class="text-2xl mr-20 font-bold">Contact</NavLi>
		<NavLi href="/blog" class="text-2xl font-bold">Blog</NavLi>
	</NavUl>
</Navbar>
