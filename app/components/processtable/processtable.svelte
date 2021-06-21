<script lang="ts">
	import DangerModal from "../common/alerts/danger-modal.svelte";
	import DangerButton from "../common/alerts/danger-button.svelte";
	import type { Process } from "../../services/processreader";
	import { terminate as pkill } from "../../services/processmanager";

	export let processes: Process[];
	/**
	 * This callback is executed when any change is performed to a process (e.g., process is terminated)
	 */
	export let onProcessChange: () => void;
	let selectedProcess: Process | null;
	let terminatingProcess = false;

	const setSelectedProcess = (process: Process): void => {
		selectedProcess = process;
	};

	const terminateProcess = async (pid: number) => {
		terminatingProcess = true;
		const terminated = await pkill(pid);
		terminatingProcess = false;

		if (terminated) {
			console.debug(`Terminated process ${pid}`);
			onProcessChange();
		} else {
			throw new Error(`Failed to terminate process ${pid}`);
		}
	};
</script>

<DangerModal
	title="Terminate Process?"
	message="Are you sure you want to terminate this process?"
	acceptButtonText="Terminate"
	cancelButtonText="Cancel"
	onAccept={async () => await terminateProcess(selectedProcess.id)}
	on:close={() => selectedProcess = null}
/>

<div>
	<table class="table">
		<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col">Command</th>
				<th scope="col">PID</th>
				<th scope="col">Port</th>
			</tr>
		</thead>
		<tbody>
			{#each processes as process}
				<tr>
					<th scope="row">
						<!--- TODO: use nice icon for this button -->
						<DangerButton text="X" onClick={() => setSelectedProcess(process)}/>
					</th>
					<td>
						{process.command}
					</td>
					<td>
						{process.id}
					</td>
					<td>
						{process.portNumber}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import "./processtable.scss";
</style>
