<script lang="ts">
	export let cancelButtonText = "Cancel";
	export let message: string;
	export let title: string;
	export let acceptButtonText: string;
	export let onAccept: () => void;

	const handleOnClick = () => {
		onAccept();
	};
</script>

<div id="danger-modal" class="modal fade" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{title}</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{message}
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{cancelButtonText}</button>
				<button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={handleOnClick}>{acceptButtonText}</button>
			</div>
		</div>
	</div>
</div>