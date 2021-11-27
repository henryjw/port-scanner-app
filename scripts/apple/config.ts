import * as dotenv from "dotenv";
dotenv.config();

const missingVariables = [];


const env = (envVariableName: string, required = true): string => {
	const value =  process.env[envVariableName] || "";

	if (!value && required) {
		missingVariables.push(envVariableName);
	}

	return value;
};

const config =  {
	appBundleId: env("APPLE_BUNDLE_ID"),
	appPath: env("APPLE_APP_PATH"),
	appleId: env("APPLE_ID"),
	appleIdPassword: env("APPLE_ID_PASSWORD"),
	teamId: env("APPLE_TEAM_ID")
};

if (missingVariables.length > 0) {
	throw new Error(`ERROR: Missing environment variables: \n${missingVariables.join("\n")}`);
}

export default config;
