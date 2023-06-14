<script lang="ts">
	/**
	 * An interactive table that generates data sources.
	 *
	 * TODO: Sortable table
	 * TODO: Better drop down menus
	 */

	import XyzHeader from './xyz-header.svelte';
	import Selector from './selector.svelte';
	import sampleColors from '../../constants/sample-colors.json';
	import { sampleData, sampleHeaders } from './sample-data.ts';
    import type { DataSet } from '../../types.js';

    type DataType = { [key: string]: string | number};

    export let data: Array<DataType> = sampleData;
    // The type is protecting against object property order edge cases.
	export let headers: Array<{ label: string, prop: string}> = sampleHeaders;
	export let hasZ = true;
    export let onGenerate = (dataSet: DataSet) => console.log(dataSet);

    $: simpleHeaders = headers.map( h => h.label)

	let activeX: number;
	let activeY: number;
	let activeZ: number;

	const setX = (evt: Event) => {
		const select = evt.target as HTMLSelectElement;
		activeX = Number(select.value);
	};

	const setY = (evt: Event) => {
		const select = evt.target as HTMLSelectElement;
		activeY = Number(select.value);
	};

	const setZ = (evt: Event) => {
		const select = evt.target as HTMLSelectElement;
		activeZ = Number(select.value);
	};

    const generate = () => 
        onGenerate(data.map(entry => {
            const xLabel = headers[activeX]?.label;
            const yLabel = headers[activeY]?.label;
            const zLabel = headers[activeZ]?.label;

            const xProp = headers[activeX]?.prop;
            const yProp = headers[activeY]?.prop;
            const zProp = headers[activeZ]?.prop;

            const xValue = entry[xProp];
            const yValue = entry[yProp];
            const zValue = entry[zProp];

            const metaData = {...entry};
            delete metaData[xProp];
            delete metaData[yProp];
            delete metaData[zProp];

            return {
            x: xValue,
            y: yValue,
            z: zValue,
            xLabel,
            yLabel,
            zLabel,
            metaData,
            }
        }))
    
</script>

<div>
	<div>
		<div>
			<div>X Value</div>
			<Selector onChange={setX} headers={simpleHeaders} hiddenValues={[activeY, activeZ]} />
		</div>
		<div>
			<div>Y Value</div>
			<Selector onChange={setY} headers={simpleHeaders} hiddenValues={[activeX, activeZ]} />
		</div>
		{#if hasZ}
			<div>
				<div>Z Value</div>
				<Selector onChange={setZ} headers={simpleHeaders} hiddenValues={[activeX, activeY]} />
			</div>
		{/if}
        <button on:click={generate}>Generate</button>
	</div>
	<table>
		<thead>
			<tr>
				{#each simpleHeaders as header, ind}
					<th>
						<XyzHeader isX={ind === activeX} isY={ind === activeY} isZ={ind === activeZ} />
						<div>{header}</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as entry}
				<tr>
                    {#each headers as { prop }}
                        <td>{entry[prop]}</td>
                    {/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
