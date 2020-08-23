# airtap-electron

**Electron [browser provider](https://github.com/airtap/browser-provider).**

[![npm status](http://img.shields.io/npm/v/airtap-electron.svg)](https://www.npmjs.org/package/airtap-electron)
[![node](https://img.shields.io/node/v/airtap-electron.svg)](https://www.npmjs.org/package/airtap-electron)
[![Travis build status](https://img.shields.io/travis/com/airtap/electron.svg?label=travis)](http://travis-ci.com/airtap/electron)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

<details><summary>Click to expand</summary>

- [Usage](#usage)
  - [Programmatic](#programmatic)
  - [With Airtap](#with-airtap)
- [API](#api)
  - [`Electron()`](#electron)
  - [Browser options](#browser-options)
- [Install](#install)
- [License](#license)

</details>

## Usage

### Programmatic

```js
const Electron = require('airtap-electron')
const provider = new Electron()

// Get a list of desired browsers (there's just 1 here)
const wanted = [{ name: 'electron' }]
const manifests = await provider.manifests(wanted)

// Instantiate a browser
const target = { url: 'http://localhost:3000' }
const browser = provider.browser(manifests[0], target)

await browser.open()
```

### With [Airtap](https://github.com/airtap/airtap)

```yaml
providers:
  - airtap-electron

browsers:
  - name: electron
```

This provider also exposes a [`supports`](https://github.com/airtap/browser-manifest#supports) property to match on:

```yaml
browsers:
  - name: electron
    supports:
      headless: true
```

## API

### `Electron()`

Constructor. Returns an instance of [`browser-provider`](https://github.com/airtap/browser-provider).

### Browser options

- `headless` (boolean, default true): run in headless mode
- `window` (object): custom options to pass to [`BrowserWindow()`](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions)
- `devtools` (object): custom options to pass to [`openDevTools()`](https://www.electronjs.org/docs/api/web-contents#contentsopendevtoolsoptions) (unless `headless`)

In Airtap these can be set like so:

```yaml
browsers:
  - name: electron
    options:
      headless: false
      window:
        webPreferences:
          sandbox: true
      devtools:
        mode: detach
```

## Install

Electron must be installed separately. With [npm](https://npmjs.org) do:

```
npm install airtap-electron electron
```

## License

[MIT](LICENSE) © 2020-present Airtap contributors
