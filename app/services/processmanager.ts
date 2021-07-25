/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Process } from "@app/services/processreader";

export async function terminate(process: Process): Promise<boolean> {
	// @ts-ignore See https:// www.electronjs.org/docs/tutorial/process-model#preload-scripts
	return window.process.terminate(process);
}
