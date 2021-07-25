<script lang="ts">
	import { onMount } from "svelte";

	import { MAX_PORT_NUMBER, MIN_PORT_NUMBER } from "@app/constants/numbers";
	import { getProcesses } from "@app/services/processreader";
	import type { Process } from "@app/services/processreader";
	import ProcessTable from "../../components/processtable/processtable.svelte";
	import { isWindows } from "@app/utils/platform";

	const IS_WINDOWS = isWindows();

	let startPort = MIN_PORT_NUMBER;
	let endPort = MAX_PORT_NUMBER;
	let restrictedRangeEnabled = false;
	let processes: Process[] = [];
	let isScanning = false;
	let checkWslProcesses = true;
	let scanError: string | null = null;

	const performScan = async () => {
		try {
			isScanning = true;
			scanError = null;
			processes = [];

			if (restrictedRangeEnabled) {
				processes = await getProcesses(startPort, endPort, checkWslProcesses);
			} else {
				processes = await getProcesses(MIN_PORT_NUMBER, MAX_PORT_NUMBER, checkWslProcesses);
			}

			return processes;
		} catch (err) {
			console.error("Error getting processes", err);
			scanError = `Error scanning processes: "${err.message}"`;
		} 	finally {
			isScanning = false;
		}
	};

	onMount(performScan);
</script>

<div class="container">
	<form id="scanner-form">
		<div>
			<input type="checkbox" bind:checked={restrictedRangeEnabled}/>
			<span>Only test ports between</span>
			<input type=number bind:value={startPort} min={MIN_PORT_NUMBER} max={MAX_PORT_NUMBER} disabled={!restrictedRangeEnabled}/>
			<span>and</span>
			<input type=number bind:value={endPort} min={MIN_PORT_NUMBER} max={MAX_PORT_NUMBER} disabled={!restrictedRangeEnabled}/>
			<button id="btn-scan" class="btn btn-primary" type="button" on:click={performScan} disabled={isScanning}>SCAN</button>
		</div>

		<div hidden={!IS_WINDOWS}>
			<input type="checkbox" bind:checked={checkWslProcesses}/>
			<span>Check WSL Processes</span>
		</div>

		<ProcessTable processes={processes} onProcessChange={performScan} loading={isScanning}/>
		<span class="text-danger error" hidden={!scanError}>{scanError}</span>
	</form>
</div>

<style lang="scss">
	@import "main";
</style>
