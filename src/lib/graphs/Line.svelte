<script lang="ts">
	// TODO: Support negative values
	// TODO: Support non 0 start of x axis
	// TODO: Support non 0 start of y axis 
	// TODO: Support styling/handlers for individual parts
	// TODO: Support individual value changes causing updates instead of having to recreate the array for an update
	export let xAxisLabel = 'X Axis';
	export let yAxisLabel = 'Y Axis';
	// The component takes entries in the order they are passed, if you want them sorted it must be done externally.
	export let entries = [
        {
            x: 1,
            y: 1,
        },
        {
            x: 2,
            y: 4,
        },
        {
            x: 3,
            y: 9,
        },
        {
            x: 4,
            y: 16,
        },
	];
	export let xIncrementCount = 4;
	export let yIncrementCount = 4;

	function numDigits(num: number) {
		return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
	}

	// Turn to a single digit integer for rounding
	// add one so the max is always slightly above
	// then return it to it's full digits
	function getAxisMax(value: number, maxDigits: number) {
		return (Math.floor(value / 10 ** (maxDigits - 1)) + 1) * 10 ** (maxDigits - 1);
	}

	function getAxisIncrements(count: number, max: number) {
		return new Array(count + 1)
			.fill(null)
			.map((_, ind) => (ind / count) * max);
	}

	// TODO: Update to support non 0 starts
	function mapCoords(valueSet: { x: number, y: number}, xMin: number, xMax: number, yMin: number, yMax: number) {
		const { x, y } = valueSet;
		const xRange = xMax - xMin;
		const yRange = yMax - yMin;
		const xPerc = x/xRange;
		const yPerc = (yMax - y)/yRange;

		return {
			x: `${xPerc*100}%`,
			y: `${yPerc*100}%`,
		}
	}

	const xValues = entries.map(e => e.x)
	const yValues = entries.map(e => e.y)

	const maxXValue = xValues.reduce((acc, x) => x > acc ? x : acc, 0)
	const maxYValue = yValues.reduce((acc, y) => y > acc ? y : acc, 0) 
	
	const xMaxDigits = numDigits(maxXValue)
	const yMaxDigits = numDigits(maxYValue);

	const xAxisMax = getAxisMax(maxXValue, xMaxDigits);
	const yAxisMax = getAxisMax(maxYValue, yMaxDigits);

	const xAxisIncrements = getAxisIncrements(xIncrementCount, xAxisMax);
	const yAxisIncrements = getAxisIncrements(yIncrementCount, yAxisMax);

	const entriesPercentages = entries.map(e => mapCoords(e, 0, xAxisMax, 0, yAxisMax));
</script>

<div class="graphRow">
	<div class="yAxisLabelContainer">
		<div class="yAxisLabel">
			{yAxisLabel}
		</div>
	</div>
	<div class="yLabels">
		{#each yAxisIncrements as inc}
			<div>{inc}</div>
		{/each}
	</div>
	<div class="graphColumn">
			<svg class="graph">
				{#each entriesPercentages as { x, y }, ind}
					{#if ind !== 0}
						<line x1={entriesPercentages[ind-1].x} y1={entriesPercentages[ind-1].y} x2={x} y2={y} stroke="black" />
					{/if}
				{/each}
			</svg>
		<div class="xLabels">
			{#each xAxisIncrements as inc}
				<div class="xLabel">{inc}</div>
			{/each}
		</div>
		<div class="xAxisLabel">
			{xAxisLabel}
		</div>
	</div>
</div>

<style>
	.graphRow {
		flex: 1;
		display: flex;
		height: 100%;
		width: 100%;
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
		flex: 1;
		border-bottom: 2px solid #efefef;
		border-left: 2px solid #efefef;
	}

	.xLabels {
		display: flex;
		justify-content: space-between;
	}

	.xAxisLabel {
		text-align: center;
	}
</style>
