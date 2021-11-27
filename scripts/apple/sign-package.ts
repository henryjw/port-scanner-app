// See https://www.youtube.com/watch?v=4IEaa0ukE1s for reference

import { notarize } from "electron-notarize";

import config from "./config";

(async function signTasks () {
	// Notarize multiple apps when there different architectures supported
	const promises = config.appPaths.map(async appPath => {
		console.debug(`Notarizing ${appPath}`);
		await notarize({
			appPath,
			appBundleId: config.appBundleId,
			appleId: config.appleId,
			appleIdPassword: config.appleIdPassword,
			teamId: config.teamId,
			tool: "notarytool",
		});

		console.debug(`Notarization done for ${appPath}.`);
	})

	try {
		await Promise.all(promises);
		console.debug("Notarization complete for all apps.");
	} catch(err) {
		console.error("Notarization failed", err);
	}
})();
