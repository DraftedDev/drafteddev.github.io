<script lang="ts">
	import { browser } from '$app/environment';
	import {
		Button,
		Modal,
		TableBodyCell,
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Heading,
		Input,
		Label,
		Alert
	} from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	let openList = false;
	let openAbfrage = false;
	let list = [
		{
			name: 'Banane',
			num: 1
		},
		{
			name: 'Apfel (rot)',
			num: 2
		},
		{
			name: 'Sellerie',
			num: 4
		},
		{
			name: 'Bio Ingwer',
			num: 11
		},
		{
			name: 'Birnen Abate Fetel',
			num: 18
		},
		{
			name: 'Apfel (grün)',
			num: 21
		},
		{
			name: 'Fleischtomaten',
			num: 26
		},
		{
			name: 'Tomaten Rispen',
			num: 27
		},
		{
			name: 'Weißkohl',
			num: 28
		},
		{
			name: 'Blaukraut/Rotkohl',
			num: 29
		},
		{
			name: 'Bananen Chiquita',
			num: 30
		},
		{
			name: 'Apfel Pink Lady',
			num: 32
		},
		{
			name: 'Hokkaido Kürbis',
			num: 36
		},
		{
			name: 'Paprika (rot)',
			num: 44
		},
		{
			name: 'Wassermelonen',
			num: 50
		},
		{
			name: 'Birnen (rot)',
			num: 80
		},
		{
			name: 'Trauben hell kernlos',
			num: 81
		},
		{
			name: 'Wirsing',
			num: 83
		},
		{
			name: 'Zucchini',
			num: 84
		},
		{
			name: 'Grapefruit rosé',
			num: 548
		},
		{
			name: 'Kiwi Gold',
			num: 566
		},
		{
			name: 'Lauch/Poree',
			num: 620
		},
		{
			name: 'Avocado',
			num: 642
		},
		{
			name: 'Kiwi',
			num: 644
		},
		{
			name: 'Mango',
			num: 646
		},
		{
			name: 'Kopfsalat',
			num: 666
		},
		{
			name: 'Gurken',
			num: 683
		},
		{
			name: 'Kohlrabi',
			num: 725
		},
		{
			name: 'Kartoffeln',
			num: 739
		},
		{
			name: 'Lauchzwiebel',
			num: 745
		},
		{
			name: 'Radieschen',
			num: 751
		},
		{
			name: 'Aubergine',
			num: 852
		},
		{
			name: 'Blumenkohl',
			num: 883
		}
	];

	const initPoints = browser ? window.localStorage.getItem('points') ?? '0' : '0';
	const points = writable<string>(initPoints);
	points.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem('points', value);
		}
	});

	let abfrage = list[getRandIdx()];
	let abfrageRichtig = -1;
	let abfrageInput = '';
	function getRandIdx(): number {
		return Math.floor(Math.random() * list.length);
	}
</script>

<main class="grid">
	<p class="text-center mt-8 text-xl">Punkte: {initPoints}</p>
	<Button
		class="place-self-center mt-8"
		on:click={() => {
			openList = true;
		}}
		>Ganze Liste
	</Button>

	<Button
		class="place-self-center mt-6"
		on:click={() => {
			openAbfrage = true;
			abfrage = list[getRandIdx()];
		}}>GO!</Button
	>

	<Modal title="Artikel Liste" bind:open={openList} autoclose outsideclose>
		<Table>
			<TableHead>
				<TableHeadCell>Artikel</TableHeadCell>
				<TableHeadCell>Nummer</TableHeadCell>
			</TableHead>

			<TableBody>
				{#each list as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell>{item.num}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<svelte:fragment slot="footer">
			<Button>OK!</Button>
		</svelte:fragment>
	</Modal>

	<Modal title="Artikel Abfrage" bind:open={openAbfrage} outsideclose>
		<p class="text-center">{abfrage.name}</p>
		<Label class="mb-2">Artikel Nummer?</Label>
		<Inputr required bind:value={abfrageInput} />
		{#if abfrageRichtig == 0}
			<Alert color="red">Falsch. Versuch's nochmal D:</Alert>
		{:else if abfrageRichtig == 1}
			<Alert color="green">Richtig!</Alert>
		{/if}

		<svelte:fragment slot="footer">
			<Button
				on:click={() => {
					abfrageRichtig = parseInt(abfrageInput) == abfrage.num ? 1 : 0;
					if (abfrageRichtig) {
						points.set(`${points}`);
					}
				}}>Prüfen</Button
			>
			<Button
				on:click={() => {
					alert(`Die Lösung zu ${abfrage.name} ist ${abfrage.num}!`);
				}}>Lösung</Button
			>
			<Button
				on:click={() => {
					abfrage = list[getRandIdx()];
					abfrageRichtig = -1;
					abfrageInput = '';
					if (abfrageRichtig == 1) {
					}
				}}>Nächstes</Button
			>
			<Button
				on:click={() => {
					openAbfrage = false;
				}}>Schließen</Button
			>
		</svelte:fragment>
	</Modal>
</main>

<style lang="scss">
</style>
