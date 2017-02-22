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
    models.init(uri, function(){
	if(cb !== undefined){
	    console.log("Models initialized..")
	    cb()
	}
    })
}

const saveCourse = function(course, cb){
    let c = Course.create(course)
    c.save().then(function(doc){
	if(cb !== undefined){
	    cb(doc._id)
	}
    })
}

const getCourse = function(course, cb){
    Course.findOne(course).then(function(doc){
	if(cb !== undefined){
	    cb(doc)
	}
    })
}

module.exports = {
    init,
    saveCourse,
    getCourse
}
