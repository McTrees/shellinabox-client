const config = require('./config.json')
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  win = new BrowserWindow({frame: false, show:false})
  win.loadURL(config['remote_url'])

  // When ready, show the window
  win.once('ready-to-show', () => {
    win.show()
  })
}

app.on('ready', createWindow)
