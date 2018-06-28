const config = require('./config.json')
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow(loading) {
  win = new BrowserWindow({frame: false, show:false})
  win.loadURL(config['remote_url'])

  // When ready, show the window
  win.once('ready-to-show', () => {
    win.show()
    loading.hide()
  })
}


app.on('ready', () => {
  let loading = new BrowserWindow({show: false, frame: false})
  loading.loadFile(__dirname + '/loading.html')
  loading.once('ready-to-show', () => {
    loading.show()
  })

  createWindow(loading)
})
