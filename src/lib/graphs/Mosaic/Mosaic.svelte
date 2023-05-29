<script lang="ts">
	// TODO: Support styling/handlers for individual parts

	import sampleColors from '../../constants/sample-colors.json';
	import sampleData from './sample-data.json';

	export let values = sampleData.values;
	export let colors = sampleColors;
	export let xOrder = undefined;
	export let yOrder = undefined;

	// 1000 = precision to one decimal for percents
	const precision = 1000;

	const total = values.reduce((acc, value) => {
		acc += value.z;
		return acc;
	}, 0);

	const xTotals = values.reduce((acc: { [x: string]: number }, value) => {
		const { x, z } = value;

		if (!acc[x]) {
			acc[x] = 0;
		}

		acc[x] += z;
		return acc;
	}, {});

	const xPercents = Object.entries(xTotals).reduce(
		(acc: Array<{ x: string; percentage: number }>, entry) => {
			const [x, value] = entry;
			const percentage = Math.floor((value / total) * precision) * (100 / precision);

			acc.push({
				x,
				percentage
			});

			return acc;
		},
		[]
	);

	xPercents.sort((a, b) => b.percentage - a.percentage);
	const xOrderLocal = xOrder || xPercents.map((entry) => entry.x);

	const xyTotals = values.reduce((acc: { [x: string]: { [y: string]: number } }, value) => {
		const { x, y, z } = value;

		if (!acc[x]) {
			acc[x] = { [y]: 0 };
		}

		if (!acc[x][y]) {
			acc[x][y] = 0;
		}

		acc[x][y] += z;

		return acc;
	}, {});

	const yOrderLocal =
		yOrder ||
		Object.entries(xyTotals[xOrderLocal[0]])
			.sort((a, b) => {
				const [, aTotal] = a;
				const [, bTotal] = b;

				return bTotal - aTotal;
			})
			.map((entry) => entry[0]);

	const xyPercents = Object.entries(xyTotals).reduce(
		(xyAcc: { [x: string]: Array<{ y: string; percentage: number }> }, xyEntry) => {
			const [x, yTotals] = xyEntry;

			xyAcc[x] = Object.entries(yTotals).reduce(
				(yAcc: Array<{ y: string; percentage: number; totalPercentage: number }>, yEntry) => {
					const [y, value] = yEntry;
					const percentage = Math.floor((value / xTotals[x]) * precision) * (100 / precision);
					const totalPercentage = Math.floor((value / total) * precision) * (100 / precision);

					yAcc.push({
						y,
						percentage,
						totalPercentage
					});

					return yAcc;
				},
				[]
			);

			return xyAcc;
		},
		{}
	);

	Object.values(xyPercents).forEach((xyArray) =>
		xyArray.sort((a, b) => b.percentage - a.percentage)
	);
</script>

<div class="graphComponent">
	<div class="yAxis">
		<div>100%</div>
		<div>80%</div>
		<div>60%</div>
		<div>40%</div>
		<div>20%</div>
		<div>0%</div>
	</div>
	<div class="graphContainer">
		<div class="graph">
			{#each xPercents as { x, percentage }}
				<div class="column" style="width: {percentage}%;">
					{#each xyPercents[x] as { percentage, totalPercentage }, ind}
						<div
							class="xyBox"
							style="height: {percentage}%; background-color: {colors[ind % colors.length]};"
						>
							<div class="xyBoxInner">{totalPercentage}%</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="xAxis">
			<div>
				{#each xPercents as { x, percentage }, ind}
					<div class="xAxisValue" style="width: {percentage}%;">
						<div>{x}</div>
						<div>{percentage}%</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="yAxis2">
		{#each xyPercents[xOrderLocal[xOrderLocal.length - 1]] as { y, percentage }, ind}
			<div style="height: {percentage}%" class="yAxis2LabelWrapper">
				<div class="yAxis2Label">{y}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.graphComponent {
		display: flex;
	}

	.graphContainer {
		flex: 1;
	}

	.graph {
		width: 100%;
		aspect-ratio: 1/1;
		border-bottom: 2px solid #efefef;
		border-left: 2px solid #efefef;
		display: flex;
	}

	.xAxis {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.xAxisLabel {
		text-align: center;
	}

	.xAxisValue {
		text-align: center;
		display: inline-block;
	}

	.yAxis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* 3em for the X axis -.5 em to center the 0 */
		margin-bottom: 2.5em;
		/* Centers the 100% */
		margin-top: -0.5em;
	}

	.yAxis2 {
		margin-bottom: 3em;
	}

	.yAxis2LabelWrapper {
		display: flex;
	}

	.yAxis2Label {
		padding: 2px;
		margin: auto;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.xyBox {
		border: 1px solid #efefef;
		display: flex;
	}

	.xyBoxInner {
		margin: auto;
	}
</style>
