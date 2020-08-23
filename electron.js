'use strict'

const { app, BrowserWindow } = require('electron')
const { manifest, target } = JSON.parse(process.argv[2])

app.on('ready', function () {
  if (target.file) {
    // that would be nice (to run tests in electron main)
  } else {
    const { headless, window, devtools } = manifest.options
    const win = new BrowserWindow({ show: !headless, ...window })

    if (!headless) {
      win.webContents.openDevTools(devtools)
    }

    win.loadURL(target.url)
  }
})
