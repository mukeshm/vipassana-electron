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
    per.init(function(err){
	if(err){
	    console.log("Error initializing persistance..")
	    console.log(err)
	    console.log("Terminating the main process")
	    app.quit()
	}else{
	    console.log("creating BrowserWindow")
	    createWindow()
	}
    })
})

app.on('window-all-closed', () => {
    app.quit()
})

const addCourse = function(event, arg){
    per.saveCourse(arg, function(err, id){
	if(err){
	    console.log("Failed to save course")
	    console.log(err)
	}
	event.sender.send('add-course', id)
    })
}

const getCourse = function(event, arg){
    per.getCourse({_id:arg}, function(err, doc){
	if (err){
	    console.log("Failed to get course")
	    console.log(err)
	}
	event.sender.send('get-course', doc)
    })
}

const getCourses = function(event, arg){
    per.getCourses({}, function(err, docs){
	if (err){
	    console.log("Failed to get course")
	    console.log(err)
	}
	event.sender.send('get-courses', docs)
    })
}

const getStudents = function(event, arg){
    per.getStudents({courseID:arg}, function(err, docs){
	if (err){
	    console.log("Failed to get students for courseID : ", arg)
	    console.log(err)
	}
	event.sender.send('get-students', docs)
    })
}

const addStudent = function(event, arg){
    per.saveStudent(arg, function(err, id){
	if(err){
	    console.log("Failed to save student")
	    console.log(err)
	}
	event.sender.send('add-student', id)
    })
}

const addTxn = function(event, arg){
    per.saveTxn(arg, function(err, id){
	if(err){
	    console.log("Failed to save transaction")
	    console.log(err)
	}
	event.sender.send('add-txn', id)
    })
}

const getTxns = function(event, arg){
    per.getTxns({_id:arg}, function(err, docs){
	if (err){
	    console.log("Failed to get transactions for studentID : ", arg)
	    console.log(err)
	}
	event.sender.send('get-txns', docs)
    })
}


ipcMain.on('add-course', addCourse)
ipcMain.on('get-course', getCourse)
ipcMain.on('get-courses', getCourses)
ipcMain.on('get-students', getStudents)
ipcMain.on('add-student', addStudent)
ipcMain.on('add-txn', addTxn)
ipcMain.on('get-txns', getTxns)
