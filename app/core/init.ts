/**
 * Svelte Init
 * =====================
 * Create svelte app
 *
 * @contributors: Henry [@henryjw] <3443648+henryjw@users.noreply.github.com>
 *
 * @license: MIT License
 *
 */
import App from "@app/pages/index/index.svelte";
import {
	darkModeDetect,
	onSystemDarkModeChange,
	setDarkMode,
} from "@components/common/darkmode/darkmode";

const app = new App({
	target: document.body,
});

if (darkModeDetect()) {
	setDarkMode(true);
} else {
	setDarkMode(false);
}

onSystemDarkModeChange((darkModeEnabled) => {
	setDarkMode(darkModeEnabled);
});

export default app;
