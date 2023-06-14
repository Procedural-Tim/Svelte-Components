<script>
	import { Bar, Line, Pie, Mosaic, Table } from '$lib';
</script>

<div>
	<div class="heading">A sample Svelte Component App</div>
	<div>Notes:</div>
	<ul>
		<li>
			Most graphs currently, and eventually all graphs, will have a 1/1 aspect ratio that uses width
			to determine size.
		</li>
		<li>
			Currently there is a limited global stylesheet that needs to be applied to properly render the
			components.
		</li>
	</ul>
	<div class="container">
		<h>Table</h>
		<Table />
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
	<div class="container">
		<h>Mosaic Graph</h>
		<Mosaic />
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
