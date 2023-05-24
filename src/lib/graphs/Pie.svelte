<script lang="ts">
	// TODO: Support styling/handlers for individual parts

	// Note: To allow a flexible size the height of the pie chart is equal to it's width
	// and the width is equal to 100% width of the container minus the space needed for the legend.
	// So if you don't want a huge pie chart you have to put it in a container with a reasonable max width.
	export let entries = [
		{
			label: 'Cow',
			value: 1
		},
		{
			label: 'Duck',
			value: 2
		},
		{
			label: 'Beaver',
			value: 3
		},
		{
			label: 'Goose',
			value: 4
		},
		{
			label: 'Toad',
			value: 30
		}
	];

	export let colors = [
		'red',
		'blue',
		'green',
		'#88ffff',
		'#ff88ff',
		'#ffff88',
		'#ccffff',
		'#ffccff',
		'#ffffcc'
	];

	// Internal units, the svg is 100 so this is effectively 80%
	const radius = 40;

	const total = entries.reduce((acc, { value }) => acc + value, 0);

	const arcs = entries.map(({ label, value }, ind) => {
		const oldDegrees =
			ind > 0
				? (entries.slice(0, ind).reduce((acc, { value }) => acc + value, 0) / total) * 360
				: 0;
		const oldRadians = (oldDegrees * Math.PI) / 180;
		// The length of the arc is calculated as if you were traveling from the center of the circle.
		// So we need to swap that so we're measuring from the left edge of the pie chart path (not the SVG)
		const oldX = radius - radius * Math.cos(oldRadians);
		// The SVG starts at the top instead of the bottom so we flip it.
		const oldY = -1 * radius * Math.sin(oldRadians);

		const newDegrees =
			(entries.slice(0, ind + 1).reduce((acc, { value }) => acc + value, 0) / total) * 360;
		const newRadians = (newDegrees * Math.PI) / 180;
		const newX = radius - radius * Math.cos(newRadians);
		const newY = -1 * radius * Math.sin(newRadians);

		const deltaDegree = newDegrees - oldDegrees;
		const deltaX = newX - oldX;
		const deltaY = newY - oldY;

		return {
			// Think this is wrong
			offsetX: oldX,
			offsetY: oldY,
			largeArcFlag: deltaDegree > 180 ? 1 : 0,
			deltaX,
			deltaY,
			color: colors[ind % colors.length],
			label
		};
		// return `a ${radius} ${radius} 0 ${deltaDegree > 180 ? 1 : 0} 1 ${deltaX} ${deltaY}`;
	});
</script>

<div class="container">
	<div class="graph">
		<div class="graphBox">
			<svg class="svg" viewBox="0 0 100 100">
				{#each arcs as { offsetX, offsetY, deltaX, deltaY, largeArcFlag, color, label }}
					<path
						d="M 50 50 L {50 - radius + offsetX} {50 +
							offsetY} a {radius} {radius} 0 {largeArcFlag} 1 {deltaX} {deltaY} Z"
						stroke="black"
						stroke-width="1"
						fill={color}
					/>
				{/each}
			</svg>
		</div>
	</div>
	<div>
		<div class="legend">
			{#each entries as { label }, ind}
				<div class="label">
					<div class="color-block" style="background: {colors[ind % colors.length]};" />
					<span>{label}</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
	}

	.graph {
		flex: 1;
	}

	.graphBox {
		width: 100%;
		aspect-ratio: 1 / 1;
		border: 2px solid #efefef;
		padding: 4px;
	}

	.svg {
		aspect-ratio: 1 / 1;
	}

	.legend {
		border: 2px solid #efefef;
	}

	.label {
		padding: 2px;
	}

	.color-block {
		height: 1em;
		width: 1em;
		display: inline-block;
		margin: auto 2px;
	}
</style>
