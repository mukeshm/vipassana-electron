import React ,{Component} from 'react'
import {render} from 'react-dom'
import {Route, Router, hashHistory } from 'react-router'

import CreateCourse from './components/CreateCourse.js'
import ViewCourses from './components/ViewCourses'
import ShowCourse from './components/ShowCourse'
import AddStudent from './components/AddStudent'
import ViewStudent from './components/ViewStudent'
import AddDeposit from './components/AddDeposit'
import AddTranscation from './components/AddTransaction'
import CourseSummary from './components/CourseSummary'

export default class App extends Component {
    render(){
        return (
        <Router history={hashHistory}>
            <Route path='/' component={ViewCourses} />
            <Route path='/createcourse' component={CreateCourse} />
            <Route path='/showcourse/:cid' component={ShowCourse} />
            <Route path='/addstudent/:cid' component={AddStudent} />
            <Route path='/viewstudent/:cid/:sid' component={ViewStudent} />
            <Route path='/adddeposit/:cid/:sobj' component={AddDeposit} />
            <Route path='/addtransaction/:cid/:sobj' component={AddTranscation} />
            <Route path='/coursesummary/:cid' component={CourseSummary} />
        </Router>)
    }
}

render(<App/>,document.getElementById('app') )
