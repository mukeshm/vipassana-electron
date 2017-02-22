import React, { Component } from 'react'
import {ipcRenderer} from 'electron'
import {hashHistory} from 'react-router'

 ipcRenderer.on('add-course',(event, arg)=>{
        console.log("event,arg",arg)
})
export default class CreateCourse extends Component {
  componentWillMount () {
    this.setState({
      name: '',
      startdate: '',
      duration: null,
      nameClass: 'inputText',
      dateClass: 'inputText',
      durationClass: 'inputText',
      submitted : false
    })
  }
  sendData(){
    let obj = {
        name : this.state.name,
        duration : this.state.duration,
        startDate : this.state.startdate
    }
    ipcRenderer.send('add-course',obj)
    this.setState({
        submitted : true
    })
  }
   
  handleSubmit () {
    if (this.state.name === '' || this.state.startdate === '' || this.state.duration === null || this.state.duration <= 0 ) {
      if (this.state.name === '') {
        this.setState({nameClass: 'inputText errorInput'})
      }
      if (this.state.startdate === '') {
        this.setState({dateClass: 'inputText errorInput'})
      }
      if (this.state.duration === null || this.state.duration <= 0 ) {
        this.setState({durationClass: 'inputText errorInput'})
      }
    }else {
      this.sendData()
    }
  }

  renderLoading(){
      return(
          <div className="loaderWrapper">
              <div className="loader"></div>

              </div>
      )
  }

  renderForm(){
      return(<div className='createCourseForm'>
            <h1>Start Course</h1>
              <div>
                <div className='formField'>
                  <span className='formLabel'>Course Name</span>
                  <input
                    type='text'
                    className={this.state.nameClass}
                    onChange={e => this.setState({name: e.target.value.trim(), nameClass: 'inputText'})} />
                </div>
                <div className='formField'>
                  <span className='formLabel'>Start Date</span>
                  <input type='date' className={this.state.dateClass} onChange={e => this.setState({startdate: e.target.value, dateClass: 'inputText'})} />
                </div>
                <div className='formField'>
                  <span className='formLabel'>Duration</span>
                  <input type='number' min="1" className={this.state.durationClass} onChange={e => this.setState({duration: Number(e.target.value), durationClass: 'inputText'})} />
                </div>
                <button className='submitButton buttons' onClick={this.handleSubmit.bind(this)}>
                  Submit
                </button>
              </div>
              </div>
      )
  }

  render () {
    return (<div className='container'>
            <div className="header">
                <button className="buttons nav-buttons" onClick={() => hashHistory.push('/')} >Home </button>
            </div>
            {this.state.submitted ? this.renderLoading() : this.renderForm()}
            </div>)
  }
}
