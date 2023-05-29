<script lang="ts">
	// TODO: Support non 0 start of y axis
	// TODO: Support styling/handlers for individual parts
	// TODO: Support hiding elements
	import sampleColors from '../constants/sample-colors.json';

	export let xAxisLabel = 'X Axis';
	export let yAxisLabel = 'Y Axis';
	export let entries = [
		{
			label: 'Sample 1',
			value: 533
		},
		{
			label: 'Sample 2',
			value: 111
		},
		{
			label: 'Sample 3',
			value: 26
		}
	];
	export let incrementCount = 4;

	export let barColors = sampleColors;
	export let barSpacingCount = entries.length * 1.5;

	function numDigits(num) {
		return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
	}

	const values = entries.map((e) => e.value);
	const maxValue = values.reduce((acc, v) => (v > acc ? v : acc), 0);
	const yMaxDigits = numDigits(maxValue);

	// Turn to a single digit integer for rounding
	// add one so the max is always slightly above
	// then return it to it's full digits
	const yAxisMax = (Math.floor(maxValue / 10 ** (yMaxDigits - 1)) + 1) * 10 ** (yMaxDigits - 1);
	const barWidth = `${(1 / barSpacingCount) * 100}%`;

	const bars = values.map((v, ind) => {
		const percent = v / yAxisMax;
		const color = barColors[ind % barColors.length];

		return {
			percent: `${percent * 100}%`,
			color
		};
	});

	const increments = new Array(incrementCount + 1).fill(null).map((_, ind) => {
		const percent = (ind / incrementCount) * yAxisMax;

		return percent;
	});
</script>

<div class="container">
	<div class="yAxisLabelContainer">
		<div class="yAxisLabel">
			{yAxisLabel}
		</div>
	</div>
	<div class="yLabels">
		{#each increments as inc}
			<div>{inc}</div>
		{/each}
	</div>
	<div class="graphColumn">
		<div class="graph">
			{#each bars as { percent, color }}
				<div class="bar" style="height: {percent}; background: {color}; width: {barWidth};" />
			{/each}
		</div>
		<div class="xLabels">
			{#each entries as { label }}
				<div style="width: {barWidth};">{label}</div>
			{/each}
		</div>
		<div class="xAxisLabel">
			{xAxisLabel}
		</div>
	</div>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
	}

	.yAxisLabelContainer {
		position: relative;
		padding-bottom: 2em;
	}

	.yAxisLabel {
		position: relative;
		top: 50%;
		transform: translateY(-50%) rotate(-90deg);
		white-space: nowrap;
	}

	.yLabels {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
		padding-bottom: 2em;
	}

	.graphColumn {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.graph {
		display: flex;
		justify-content: space-around;
		flex: 1;
		border-bottom: 2px solid #efefef;
		border-left: 2px solid #efefef;
	}

	.bar {
		margin-top: auto;
	}

	.xLabels {
		display: flex;
		justify-content: space-around;
		text-align: center;
	}

	.xAxisLabel {
		text-align: center;
	}
</style>
