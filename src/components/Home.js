import React, {Component} from 'react'
import {hashHistory} from 'react-router'

export default class Home extends Component {

    render(){
        return(<div className="container">
            <div className="welcomeScreen">
        <button className="buttons" onClick={()=>hashHistory.push('/createcourse')}>Create Course</button>
        <br/>
        <br/>
        <button className="buttons" onClick={()=>hashHistory.push('/viewcourses')}>All Courses</button>
        </div>
        </div>)
    }
}