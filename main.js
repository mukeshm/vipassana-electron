const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const per = require('./persistance')

let win

const createWindow = function() {

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

const addCourse = function(event, arg){
    per.saveCourse(arg, function(id){
	event.sender.send('add-course', id)
    })
}

const getCourse = function(event, arg){
    per.getCourse({_id:arg}, function(doc){
	event.sender.send('get-course', doc)
    })
}

ipcMain.on('add-course', addCourse)
ipcMain.on('get-course', getCourse)
