'use strict'

const Provider = require('browser-provider')
const Browser = require('abstract-browser')
const bin = require('electron')
const version = require('electron/package.json').version
const spawn = require('child_process').spawn
const path = require('path')
const kProcess = Symbol('kProcess')

class ElectronProvider extends Provider.promises {
  async _manifests () {
    return [{
      name: 'electron',
      title: `Electron ${version}`,
      version,
      options: { headless: true },
      supports: { headless: true }
    }]
  }

  _browser (manifest, target) {
    return new ElectronBrowser(manifest, target)
  }
}

class ElectronBrowser extends Browser {
  constructor (manifest, target) {
    super(manifest, target)
    this[kProcess] = null
  }

  _open (cb) {
    const opts = { manifest: this.manifest, target: this.target }
    const entry = path.join(__dirname, 'electron.js')
    const args = [entry, JSON.stringify(opts)]

    this[kProcess] = spawn(bin, args, {
      stdio: 'ignore'
    })

    this[kProcess].on('close', (code, signal) => {
      this[kProcess] = null
      if (code) this.emit('error', new Error(`Electron exited with code ${code}`))
      else if (signal) this.emit('error', new Error(`Electron exited by signal ${signal}`))
      else this.emit('error', new Error('Premature exit'))
    })

    cb()
  }

  _close (cb) {
    if (this[kProcess]) {
      this[kProcess].removeAllListeners('close')
      this[kProcess].on('close', function (code) {
        if (code) cb(new Error(`Electron exited with code ${code}`))
        else cb()
      })
      this[kProcess].kill()
      this[kProcess] = null
    } else {
      cb()
    }
  }
}

module.exports = ElectronProvider
