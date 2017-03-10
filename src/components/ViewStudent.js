import React, {Component} from 'react'
import {hashHistory} from 'react-router'

export default class ViewStudent extends Component {
    
    render(){
        console.log(this.props)
        return (
        <div className="container">
        <button onClick={()=>hashHistory.goBack()} >Back</button>
        </div>)
    }
}
