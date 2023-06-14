<script lang="ts">
	export let isX = false;
	export let isY = false;
	export let isZ = false;
</script>

<div>
	{#if isX}X{:else if isY}Y{:else if isZ}Z{:else}&nbsp;{/if}
</div>
