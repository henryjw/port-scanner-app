<script lang="ts">
	import DangerModal from "../common/alerts/danger-modal.svelte";
	import CloseButton from "../common/alerts/close-button.svelte";
	import type { Process } from "../../services/processreader";
	import { terminate as pkill } from "../../services/processmanager";

	export let processes: Process[];
	/**
	 * This callback is executed when any change is performed to a process (e.g., process is terminated)
	 */
	export let onProcessChange: () => void;
	export let loading = false;
	let selectedProcess: Process | null;
	let terminatingProcess = false;

	const setSelectedProcess = (process: Process): void => {
		selectedProcess = process;
	};

	const terminateProcess = async (process: Process) => {
		terminatingProcess = true;
		const terminated = await pkill(process);
		terminatingProcess = false;

		if (terminated) {
			console.debug(`Terminated process ${process.command} (${process.id})`);
			onProcessChange();
		} else {
			alert("Unable to terminate process");
		}
	};
</script>

<DangerModal
	title="Terminate Process?"
	message="Are you sure you want to terminate this process?"
	acceptButtonText="Terminate"
	cancelButtonText="Cancel"
	onAccept={async () => await terminateProcess(selectedProcess)}
	on:close={() => selectedProcess = null}
/>

<table class="table table-hover align-middle">
	<thead>
		<tr>
			<th scope="col"></th>
			<th scope="col">Port</th>
			<th scope="col">Command</th>
			<th scope="col">PID</th>
		</tr>
	</thead>
	{#if !loading}
		<tbody>
			{#each processes as process}
				<tr>
					<th scope="row">
						<CloseButton  onClick={() => setSelectedProcess(process)}/>
					</th>
					<td>
						{process.portNumber}
					</td>
					<td>
						{process.command}
						{#if process.isWSL}
							<span id="wsl-indicator">[WSL]</span>
						{/if}
					</td>
					<td>
						{process.id}
					</td>
				</tr>
			{/each}
		</tbody>
	{/if}
</table>
{#if loading}
	<div class="flex-container justify-content-center">
		<div id="loader" class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{/if}

<style lang="scss">
	@import "./processtable.scss";
</style>
