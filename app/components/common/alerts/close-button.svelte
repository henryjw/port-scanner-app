<script lang="ts">
	import { Modal } from "bootstrap";

	export let onClick: () => void;
	const modal = new Modal(document.getElementById("danger-modal"));

	const handleOnClick = () => {
		onClick();
		modal.show();
	};
</script>

<button
	type="button"
	class="btn-close"
	aria-label="Close"
	data-toggle="modal"
	data-target="#danger-modal"
	on:click={handleOnClick}
>
</button>