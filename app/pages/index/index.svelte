<script lang="ts">
	import "bootstrap/dist/css/bootstrap.min.css";

	import Router from "svelte-spa-router";
	import routes from "@app/routes/pages";
	import { darkModeDetect } from "@components/common/darkmode/darkmode";
	import "../../../node_modules/bulma-extensions/dist/js/bulma-extensions.min";
	import "./index";

	darkModeDetect();
</script>

<Router {routes} />

<style lang="scss" global>
	@import "../../../node_modules/bulma/css/bulma";
	@import "../../../node_modules/bulma-extensions/dist/css/bulma-extensions.min";
	@import "./index.scss";
	@import "../../components/common/darkmode/darkmode.scss";
</style>
