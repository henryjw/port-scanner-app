<script lang="ts">
	import { onMount } from "svelte";

	import { MAX_PORT_NUMBER, MIN_PORT_NUMBER } from "@app/constants/numbers";
	import { getProcesses } from "@app/services/processreader";
	import type { Process } from "@app/services/processreader";
	import ProcessTable from "../../components/processtable/processtable.svelte";

	let startPort = MIN_PORT_NUMBER;
	let endPort = MAX_PORT_NUMBER;
	let restrictedRangeEnabled = false;
	let processes: Process[] = [];

	const performScan = async () => {
		// TODO: add error handling
		if (restrictedRangeEnabled) {
			processes = await getProcesses(startPort, endPort);
		} else {
			processes = await getProcesses(MIN_PORT_NUMBER, MAX_PORT_NUMBER);
		}
	};

	onMount(performScan);
</script>

<div class="container">
	<form id="scanner-form">
		<div>
			<input type="checkbox" bind:checked={restrictedRangeEnabled}/>
			Only test ports between
			<input type=number bind:value={startPort} min={MIN_PORT_NUMBER} max={MAX_PORT_NUMBER} disabled={!restrictedRangeEnabled}/>
			and
			<input type=number bind:value={endPort} min={MIN_PORT_NUMBER} max={MAX_PORT_NUMBER} disabled={!restrictedRangeEnabled}/>
			<button id="btn-scan" class="btn btn-primary" type="button" on:click={performScan}>SCAN</button>
		</div>

		<ProcessTable processes={processes} onProcessChange={performScan}/>

		<!--{#await getProcesses()}-->
		<!--	<div class="spinner-border" role="status">-->
		<!--		<span class="visually-hidden">Loading...</span>-->
		<!--	</div>-->
		<!--{:then processes}-->
		<!--	<ProcessTable processes={processes}/>-->
		<!--{:catch err}-->
		<!--	<p style="color: red">{err.message}</p>-->
		<!--{/await}-->
	</form>
</div>

<style lang="scss">
	@import "main";
</style>
