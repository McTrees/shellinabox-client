const config = require('./config.json')
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let loading;

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function createWindow(loading) {
  win = new BrowserWindow({frame: false, show:false})
  win.loadURL(config['remote_url'])

  // When ready, show the window
  win.once('ready-to-show', () => {
    setTimeout(function() {
      win.show()
      win.focus()
      if(config['maximize_on_startup']) {
        win.maximize()
      }
      if(config['fullscreen_on_startup']) {
        win.setFullScreen(true)
      }
      setTimeout(function() {
        loading.hide()
      }, 1000); //Wait a bit, because the window won't pop in instantly
    }, 1000); //Wait a bit, because the screen will initially be white, and we don't want the user to see an ugly white flash
  })
}


app.on('ready', () => {
  loading = new BrowserWindow({show: false, frame: false, width:350, height:500})
  loading.loadFile(__dirname + '/loading.html')
  loading.once('ready-to-show', () => {
    loading.show()
  })

app.on('login', function(event, webContents, request, authInfo, callback) { // When we need to log in, send the un/pw
  event.preventDefault()
  callback('token', config['auth_token'])
})

  createWindow(loading)
})
