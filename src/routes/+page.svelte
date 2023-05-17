<script>
	import { Bar, Line } from '$lib';
</script>

<div class="container">
	<h>Bar Graph</h>
	<Bar />
</div>
<div class="container">
	<h>Line Graph</h>
	<Line />
</div>

<style>
	.container {
		height: 200px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
