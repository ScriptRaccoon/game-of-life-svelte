<script lang="ts">
	import { fade } from "svelte/transition";
</script>

<header out:fade={{ duration: 300 }}>
	<h1>Game of Life</h1>
	<p>Made with Svelte</p>
</header>

<style lang="scss">
	header {
		position: fixed;
		inset: 0;
		background-color: var(--bg-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 100;
		gap: 30px;
	}
	h1 {
		font-weight: 300;
		font-size: 50px;
	}
</style>
