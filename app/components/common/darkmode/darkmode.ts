/**
 * DarkMode Typescript
 * =====================
 *
 * @contributors: Henry [@henryjw] <3443648+henryjw@users.noreply.github.com>
 *
 * @license: MIT License
 *
 */

export const darkMode = darkModeDetect();

export function enableDarkMode(): void {
	document.querySelector("html").classList.add("darkmode");
	document.querySelector("body").classList.add("darkmode");

	window.localStorage.setItem("darkmode", "enabled");
}

export function disableDarkMode(): void {
	document.querySelector("html").classList.remove("darkmode");
	document.querySelector("body").classList.remove("darkmode");

	window.localStorage.setItem("darkmode", "disabled");
}

export function darkModeDetect(): boolean {
	// TODO: add setting to toggle dark mode. For now, just check if the user has dark mode enabled in their OS.

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function darkModeToggle(): boolean {
	if (darkModeDetect()) {
		disableDarkMode();
	} else {
		enableDarkMode();
	}

	return darkModeDetect();
}

export function setDarkMode(darkModeEnabled: boolean): void {
	if (darkModeEnabled) {
		enableDarkMode();
	} else {
		disableDarkMode();
	}
}

export function onSystemDarkModeChange(callback: (darkModeEnabled: boolean) => void): void {
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
		callback(e.matches);
	});
}
