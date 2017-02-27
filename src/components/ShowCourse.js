import React , {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'

export default class ShowCourse extends Component {
    componentWillMount(){
        ipcRenderer.send('get-course',this.props.params.cid )

    }
    componentDidMount(){
        ipcRenderer.on('get-course',(event,arg)=> {
            this.setState({
                coursedata : arg
            })
        })
    }

    renderData(){
        return(<h1>Loading</h1>)
    }

    render(){
        console.log(this.state)
        return (<div className="container">
             <div className='header'>
                <button className='buttons nav-buttons' onClick={() => hashHistory.goBack()}>
                  Back
                </button>
              </div>
            <h1>{this.props.params.cid}</h1>
            </div>)
    }
}