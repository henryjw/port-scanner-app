## Overview

This app scans for processes based on the network ports currently in use. The primary use case for me is to be able to easily scan for and terminate stray processes using development ports I need.

For instance, port 8080 is a port commonly used for development. So if it's in use, I can easily scan for that port with this app and terminate whatever process is using that port.

Built on using [Svelte Electron Boilerplate](https://github.com/ptkdev-boilerplate/svelte-electron-boilerplate).

### App Screenshot

![App Screenshot](docs/images/process-terminate-prompt.png)

## Running the App
There are pre-built binaries in the [builds](./builds) folder. Otherwise, run the `build` script for your platform.

### Build Scripts
- MacOS 	- `npm run build-mac`
- Windows 	- `npm run build-win`
- Linux 	- `npm run build-lnx`

## Development

### Installing dependencies

```sh
npm i
```

### Dev Environment

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```sh
npm dev # Starts web app
npm dev:electron # Starts Electron process
```

## TODO

- [ ] Improve error handling

- [ ] Polish UI

- [x] Add binaries for MacOS and Windows

- [x] Add loader when scanning

