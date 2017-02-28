const connect  = require('camo').connect
const Document = require('camo').Document;

let database

const init = function(uri, cb){
    connect(uri).then(function(db){
	database = db
	console.log("Connected to database")
	cb()
    }, function(err){
	console.log("Connection to database failed")
	cb(err)
    })
}

class Course extends Document {
    constructor() {
	super();

	this.name = String
	this.startDate = Date
	this.endDate = Date
	this.duration = Number
    }
}

class Student extends Document {
    constructor() {
	super();

	this.name = String
	this.roomNo = String
	this.seatNo = String
	this.courseID = String
    }
}

module.exports = {
    init,
    Course,
    Student
}
