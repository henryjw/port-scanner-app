// See https://www.youtube.com/watch?v=4IEaa0ukE1s for reference

import { notarize } from "electron-notarize";

import config from "./config";

(async function signTasks () {
	console.debug("Notarizing app...");

	// @ts-ignore
	await notarize({
		appBundleId: config.appBundleId,
		appPath: config.appPath,
		appleId: config.appleId,
		appleIdPassword: config.appleIdPassword,
		teamId: config.teamId,
		tool: "notarytool",
	});
	console.debug("Notarization done.");
})();
