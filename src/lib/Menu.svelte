<script lang="ts">
	export let playing = false;
	export let startGame: () => void;
	export let pauseGame: () => void;
	export let updateState: () => void;
	export let clearState: () => void;
	export let randomize: () => void;
</script>

<menu>
	<button class="btn" disabled={playing} on:click={startGame}>
		Play
	</button>
	<button class="btn" disabled={!playing} on:click={pauseGame}>
		Pause
	</button>
	<button class="btn" disabled={playing} on:click={updateState}>
		Update
	</button>
	<button class="btn" disabled={playing} on:click={clearState}>
		Clear
	</button>
	<button class="btn" disabled={playing} on:click={randomize}>
		Randomize
	</button>
	<a
		class="btn"
		href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
		target="_blank"
		rel="noreferrer"><b>?</b></a
	>
</menu>

<style lang="scss">
	menu {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 10;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		background: transparent;
	}

	.btn {
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		background-color: none;
		border: none;
		outline: none;
		cursor: pointer;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 4px 10px;
		background-color: var(--secondary-color);

		&:disabled {
			background-color: #777;
			color: #bbb;
			pointer-events: none;
		}

		&:hover,
		&:focus-visible {
			background-color: var(--secondary-color-light);
		}
	}
</style>
