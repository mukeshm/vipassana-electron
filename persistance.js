const models = require('./models')
const summarization = require('./summarization.js')
const Course = models.Course
const Student = models.Student
const Txn = models.Txn
const path = require('path')
const url = require('url')

const init = function(uri, cb){
  models.init(uri, function(err){
	  if(err){
	    console.log("Models initialization failed")
	    cb(err)
	  }else{
	    console.log("Models initialized..")
	    cb()
	  }
  })
}

const saveCourse = function(course, cb){
  let c = Course.create(course)
  c.save().then(function(doc){
	  cb(null, doc._id)
  }, function(err){
	  cb(err)
  })
}

const getCourse = function(course, cb){
  Course.findOne(course).then(function(doc){
	  cb(null, doc)
  }, function(err){
	  cb(err)
  })
}

const getCourses = function(course, cb){
  Course.find(course, {sort: '-startDate'}).then(function(docs){
	  cb(null, docs)
  }, function(err){
	  cb(err)
  })
}


const getStudents = function(student, cb){
  Student.find(student, {sort: 'name'}).then(function(docs){
	  cb(null, docs)
  }, function(err){
	  cb(err)
  })
}

const saveStudent = function(student, cb){
  let s = Student.create(student)
  s.save().then(function(doc){
	  cb(null, doc._id)
  }, function(err){
	  cb(err)
  })
}

const addTxn = function(student, txn, cb){
  student.txns.push(txn);
  student.save().then(function(doc){
	  cb(null,student._id)
  }, function(err){
	  cb(err)
  })
}

const saveTxn = function(txn, cb){
  let t = Txn.create(txn)
  Student.findOne({_id: txn.studentID}).then(function(doc){
	  addTxn(doc, t, cb)
  }, function(err){
	  cb(err)
  })
}

const getTxns = function(student, cb){
  Student.findOne(student).then(function(doc){
	  cb(null, doc.txns)
  }, function(err){
	  cb(err)
  })
}

// TODO: we should have a test covering this whole flow
const getCourseSummary = function(course, cb){
  Student.find({courseID: course._id}, {sort: 'name'}).then(function(students){
	  let chits = summarization.summarize(students);
	  cb(null, chits)
  }, function(err){
	  cb(err)
  })

  // Student.find({courseID: course._id}, {sort: 'name'}).then(summarization.summarize, function(err){
	//   cb(err)
  // })
}

module.exports = {
  init,
  saveCourse,
  getCourse,
  getCourses,
  getStudents,
  saveStudent,
  saveTxn,
  getTxns,
  getCourseSummary
}
