export async function terminate(pid: number): Promise<boolean> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore See https:// www.electronjs.org/docs/tutorial/process-model#preload-scripts
	return window.process.terminate(pid);
}
