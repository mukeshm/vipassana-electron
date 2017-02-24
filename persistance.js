const models = require('./models')
const Course = models.Course
const path = require('path')
const url = require('url')

const uri = url.format({
    pathname: path.join(__dirname, 'data.db'),
    protocol: 'nedb:',
    slashes: true
})

const init = function(cb){
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

module.exports = {
    init,
    saveCourse,
    getCourse
}
