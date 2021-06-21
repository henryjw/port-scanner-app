/**
 * Preload
 * =====================
 *
 * @contributors: Henry [@henryjw] <3443648+henryjw@users.noreply.github.com>
 *
 * @license: MIT License
 *
 */

import { sign } from "crypto";
import { contextBridge } from "electron";
import { exec } from "child_process";
import { promisify } from "util";

import { Process } from "../app/services/processreader";
import { MAX_PORT_NUMBER, MIN_PORT_NUMBER } from "../app/constants/numbers";
import { wait } from "../app/utils/wait";
const execAsync = promisify(exec);

export async function getProcesses(fromPort=MIN_PORT_NUMBER, toPort=MAX_PORT_NUMBER): Promise<Process[]> {
	const scriptResult = (await execAsync("lsof -nP -iTCP -sTCP:LISTEN")).stdout.trim();

	const rows = scriptResult.split("\n").slice(1);

	const processes = rows.map(row => {
		const columnSeparator = "  ";
		row = row.trim().replace(/[ ]+/g, columnSeparator);

		const [command, pid, user, fd, type, deviceSize, offset, node, name] = row.split(columnSeparator);
		const [ipAddress, portNumber] = name.match(/.+:(?<portNumber>[0-9]+)/g)[0].split(":");

		return {
			command,
			id: Number.parseInt(pid, 10),
			portNumber: Number.parseInt(portNumber, 10)
		};
	});

	return processes.filter(process => process.portNumber >= fromPort && process.portNumber <= toPort);
}

function tryKill(pid: number): boolean {
	try {
		return process.kill(pid);
	} catch (err) {
		if (err.code === "ESRCH") {
			return false;
		}

		throw err;
	}
}

export async function terminate(pid: number): Promise<boolean> {
	let signalSent = tryKill(pid);

	if (!signalSent) {
		return false;
	}

	let tries = 0;
	const maxTries = 5;

	signalSent = tryKill(pid);
	do {
		await wait(100);
		tries += 1;
		signalSent = tryKill(pid);
		// If the process is still receiving the signal it means it's still alive
	} while (signalSent && tries <= maxTries);

	if (signalSent) {
		console.error(`Unable to terminate process ${pid}`);
		return false;
	}

	return true;
}

// https:// www.electronjs.org/docs/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("process", {
	getProcesses,
	terminate
});


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector: string, text: string) => {
		const element = document.getElementById(selector);
		if (element) {
			element.innerText = text;
		}
	};

	for (const type of ["chrome", "node", "electron"]) {
		replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
	}
});
