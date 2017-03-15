"use strict";
const connect  = require('camo').connect
const Document = require('camo').Document
const EmbeddedDocument = require('camo').EmbeddedDocument

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
	  this.txns = {
	    type: [Txn],
	    default: []
	  }
  }
}

class Txn extends EmbeddedDocument {
  constructor() {
	  super();

	  this.type = {
	    type:String,
	    choices : ['deposit', 'purchase', 'laundry']
	  }
	  this.name = String
	  this.rate = Number
	  this.quantity = Number
	  this.amount = Number
	  this.date = Date
  }
}


module.exports = {
  init,
  Course,
  Student,
  Txn
}
