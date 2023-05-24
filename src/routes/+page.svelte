<script>
	import { Bar, Line, Pie } from '$lib';
</script>

<div>
	<div class="heading">A sample Svelte Component App</div>
	<div class="heading">Notes</div>
	<div>
		While components are meant to be stand alone, for speed I do use a global CSS. You will find it
		in the source code at the end of this file.
	</div>

	<div class="container">
		<h>Bar Graph</h>
		<Bar />
	</div>
	<div class="container">
		<h>Line Graph</h>
		<Line />
	</div>
	<div class="container">
		<h>Pie Graph</h>
		<Pie />
	</div>
</div>

<style>
	/* Global CSS  */
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		font-family: 'Times New Roman', Times, serif;
		font-size: 14px;
	}
	/* End of Global CSS */

	.heading {
		font-size: 16px;
		padding: 8px;
	}

	.container {
		width: 400px;
		display: flex;
		flex-direction: column;
	}
</style>
