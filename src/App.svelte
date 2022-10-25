<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import Menu from "./lib/Menu.svelte";
	import Title from "./lib/Title.svelte";
	import { debounce } from "./utils";

	let playing = false;
	const gameSize = { x: 0, y: 0 };
	const cellSize = 20;
	const speed = 100;
	let showTitle = true;
	let state: boolean[][] = [];
	let interval: number;

	const setGameSize = debounce(() => {
		gameSize.x = Math.floor(window.innerWidth / cellSize);
		gameSize.y = Math.floor(window.innerHeight / cellSize);
		clearState();
	}, 150);

	onMount(() => {
		setGameSize();
		window.addEventListener("resize", setGameSize);
		setTimeout(() => (showTitle = false), 1500);
	});

	onDestroy(() => {
		window.removeEventListener("resize", setGameSize);
		clearInterval(interval);
	});

	function clearState() {
		state = new Array(gameSize.x)
			.fill([])
			.map(() => new Array(gameSize.y).fill(false));
	}

	function startGame() {
		playing = true;
		interval = window.setInterval(updateState, speed);
	}

	function pauseGame() {
		playing = false;
		clearInterval(interval);
	}

	function updateState() {
		state = state.map((column, x) =>
			column.map((isAlife, y) => {
				const n = numberLivingNeighbors(x, y);
				return isAlife ? n == 2 || n == 3 : n == 3;
			})
		);
		if (allCellsAreDead()) pauseGame();
	}

	function allCellsAreDead() {
		return !JSON.stringify(state).includes("true");
	}

	function numberLivingNeighbors(x: number, y: number) {
		return [
			[x + 1, y],
			[x + 1, y - 1],
			[x + 1, y + 1],
			[x, y - 1],
			[x, y + 1],
			[x - 1, y],
			[x - 1, y - 1],
			[x - 1, y + 1],
		].filter(([p, q]) => isValid(p, q) && state[p][q]).length;
	}

	function isValid(p: number, q: number) {
		return p >= 0 && q >= 0 && p < gameSize.x && q < gameSize.y;
	}

	function randomize() {
		state = state.map((_, x) =>
			state[x].map(() => Math.random() < 0.5)
		);
	}
</script>

{#if showTitle}
	<Title />
{/if}

<Menu
	{playing}
	{startGame}
	{pauseGame}
	{updateState}
	{clearState}
	{randomize}
/>

<div
	id="game"
	style:--size-x={gameSize.x}
	style:--size-y={gameSize.y}
	style:--cell-size="{cellSize}px"
>
	{#each { length: gameSize.y } as _, y}
		{#each { length: gameSize.x } as _, x}
			<input
				type="checkbox"
				id="c{x},{y}"
				bind:checked={state[x][y]}
			/>
			<label class="cell" for="c{x},{y}" />
		{/each}
	{/each}
</div>

<style lang="scss">
	#game {
		display: grid;
		grid-template-columns: repeat(
			var(--size-x),
			var(--cell-size)
		);
		grid-template-rows: repeat(var(--size-y), var(--cell-size));

		.cell {
			cursor: pointer;
			background-color: var(--cell-color);
			border: 1px solid var(--bg-color);
		}

		input[type="checkbox"] {
			position: absolute;
			opacity: 0;
			left: -100vw;

			&:checked + .cell {
				background-color: var(--primary-color);
			}
		}
	}
</style>
