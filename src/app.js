import React ,{Component} from 'react'
import {render} from 'react-dom'
import {Route, Router, hashHistory } from 'react-router'

import Home from './components/Home.js'
import CreateCourse from './components/CreateCourse.js'
export default class App extends Component {
    render(){
        return (
        <Router history={hashHistory}>
            <Route path='/' component={Home} />
            <Route path='/createcourse' component={CreateCourse} />
        </Router>)
    }
}

render(<App/>,document.getElementById('app') )