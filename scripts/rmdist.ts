/**
 * Delete dist folder
 * =====================
 *
 * @contributors: Henry W. [@henryjw]
 *
 * @license: MIT License
 *
 */
import * as shell from "shelljs";
declare const __dirname: string;

const path = `${__dirname}/../dist`;

shell.rm("-Rf", path);
