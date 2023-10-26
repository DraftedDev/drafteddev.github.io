<script lang="ts">
	import { A, Heading } from 'flowbite-svelte';
	import { ArrowCircleLeft } from 'phosphor-svelte';
	import { CodeBlock } from 'svhighlight';
	import 'highlight.js/styles/base16/material-darker.min.css';

	let syntaxExample = `
import 'package:some_pkg/hello.dart';

class User {
  String name;
  String? displayName;

  User(this.name) {
    // Initialization code goes here.
  }

  // Method.
  void hello() {
    if (displayName == null) {
      print("Hello " + name);
    } else {
      print("Hello " + displayName);
    }
  }
}
  `;
</script>

<main class="flex flex-col justify-center font-mono mb-36">
	<div class="gradient">
		<Heading class="p-20 text-center flex-row flex">
			<a href="/blog" class="mr-36"><ArrowCircleLeft /></a>
			Dart - The most underrated Language ever
		</Heading>
	</div>
	<div class="text-xl pl-52 pt-20">
		<p>
			The reason I started learning <A
				href="https://dart.dev/"
				color="text-blue-600"
				target="_blank">Dart</A
			> in the first place was probably because I wanted to get into
			<A href="https://flutter.dev/" color="text-blue-600" target="_blank">Flutter.</A>
		</p>
		<p>
			Initially, I thought Dart was only used, because it was owned by Google (also the Guys behind
			Flutter), but it actually looked pretty dark for dart before Google stepped in.
		</p>
		<p>
			The project was founded by Lars Bak and Kasper Lund to kind of 'revolutionize' JavaScript and
			the way to make Websites interactive.
		</p>
		<br />
		<p>
			However, since JavaScript is probably more popular than Santa Claus, the idea of including the
			Dart Virtual Machine in Google Chrome was replaced by the goal of 'dart2js', which is
			YetAnotherJavaScriptPreprocessor™ like TypeScript.
		</p>
		<p>
			But then 'dart2native' was started to gain shape and mass and eventually it became
			YetAnotherProgrammingLanguage™.
		</p>
		<p>
			However, that doesn't mean it's just a copy-cat of NodeJS. <A
				href="https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/dart.html"
				target="_blank"
				color="text-blue-600">It's even faster</A
			> than NodeJS in some categories.
		</p>
		<br />
		<p>But back to my story...</p>
		<br />
		<p>
			After I started 50 Flutter Projects and failed 51 of them, I actually tried to wonder what to
			make with Dart, other than Flutter Apps.
		</p>
		<p>In fact, it looks like Dart was initially made for Web-Servers AND Websites.</p>
		<p>But honestly, the Syntax is so great, I would code anything with it.</p>
		<p>And since it's faster than NodeJS, this may be a big chance for Dart.</p>
		<p>Just look at this beautiful Syntax:</p>
		<div class="w-3/4">
			<CodeBlock code={syntaxExample} language="dart" />
		</div>
		<br /><br />
		<p>It kinda looks like Java and JavaScript had a Baby, doesn't it?</p>
		<p>
			In my honest oppinions, this Syntax is the MOST BEAUTIFUL I've ever seen. I mean... it is
			strong and weak typed (optional type hints), it is based on JS (yay...?) and it's super easy
			to learn/remember syntax.
		</p>
		<br />
		<p>So Dart is beautiful, but so are many languages.</p>
		<p>
			But Dart is also performant, has a built in package manager, is maintained by a large
			coorperation (Google), can be compiled to JS and native code, can be run inside its own
			Virtual Machine and the big boy Flutter uses it for fast and maintainable UI code.
		</p>
		<p>
			So why isn't Dart being used everywhere and slowly replacing NodeJS? Well, I don't know...
			maybe because people are just too comfy in their 20 JavaScript Frameworks running on BunJS.
		</p>
		<p>
			However, for me... it looks like Dart is great! It's basically NodeJS but TypeScript but BunJS
			but every other feature NodeJS lacks.
		</p>
		<p>
			I would love to see some new Projects pop up using Dart (other than Flutter pls) and I am
			probably going to develop stuff in Dart, because I really love it.
		</p>
	</div>
</main>

<style lang="scss">
	.gradient {
		background: rgb(204, 0, 177);
		background: linear-gradient(159deg, rgba(255, 0, 221, 1) 0%, rgb(49, 98, 233) 100%);
	}
</style>
