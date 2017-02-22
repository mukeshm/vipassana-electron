const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const per = require('./persistance')

let win

function createWindow () {
  
  win = new BrowserWindow({width: 1024, height: 768})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })

    console.log("BrowserWindow created")
    
}

app.on('ready', function(){
    per.init(function(){
	console.log("creating window")
	createWindow()
    })
})

app.on('window-all-closed', () => {
    app.quit()
})

