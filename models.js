const connect  = require('camo').connect
const Document = require('camo').Document;

let database

const init = function(uri, cb){
    connect(uri).then(function(db){
	database = db
	if(cb !==  undefined){
	    console.log("Connected to database")
	    cb()
	}
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

module.exports = {
    init,
    Course
}
