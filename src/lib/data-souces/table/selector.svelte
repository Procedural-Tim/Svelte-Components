<script lang="ts">
	export let headers: Array<string> = [];
	export let hiddenValues: Array<number> = [];
	export let onChange = (evt: Event) => {};

	$: filteredHeaders = headers
		.map((h, ind) => ({
			label: h,
			value: ind
		}))
		.filter(({ value }) => !hiddenValues.some((v) => v === value));
</script>

<select on:change={onChange}>
	<option value={-1} />
	{#each filteredHeaders as { label, value }}
		<option {value}>{label}</option>
	{/each}
</select>
