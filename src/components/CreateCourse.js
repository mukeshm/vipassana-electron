import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { hashHistory } from 'react-router'
import { isCourseNameValid} from './validation'

ipcRenderer.on('add-course', (event, arg) => {
  hashHistory.push(`/showcourse/${arg}`)
})

export default class CreateCourse extends Component {
  componentWillMount () {
    this.setState({
      name: '',
      startdate: '',
      duration: 0,
      nameClass: 'inputText',
      dateClass: 'inputText',
      durationClass: 'inputText',
      submitted: false
    })
  }
  sendData () {
    let obj = {
      name: this.state.name,
      duration: this.state.duration,
      startDate: this.state.startdate
    }
    ipcRenderer.send('add-course', obj)
    this.setState({
      submitted: true
    })
  }
  
  handleSubmit () {
    let nameValidation = isCourseNameValid(this.state.name, this)
    let dateValidation = isDateValid(this.state.startdate, this)
    let durationValidation = isDurationValid(this.state.duration, this)
    if ( nameValidation && dateValidation && durationValidation) {
      this.sendData()
    }
  }

  renderLoading () {
    return (
      <div className='loaderWrapper'>
        <div className='loader'></div>
      </div>
    )
  }

  renderForm () {
    return (<div>
              <div className='header'>
                <button className='buttons nav-buttons' onClick={() => hashHistory.push('/')}>
                  Home
                </button>
              </div>
              <div className='createCourseForm'>
                <h1>Start Course</h1>
                <div className='formField'>
                  <span className='formLabel'>Course Name</span>
                  <input type='text' className={this.state.nameClass} onChange={e => this.setState({name: e.target.value.trim(), nameClass: 'inputText'})} />
                  <span className="courseNameHint">Maximum 25 Characters</span>
                </div>
                <div className='formField'>
                  <span className='formLabel'>Start Date</span>
                  <input type='date' className={this.state.dateClass} onChange={e => this.setState({startdate: e.target.value, dateClass: 'inputText'})} />
                </div>
                <div className='formField'>
                  <span className='formLabel'>Duration</span>
                  <input
                    type='number'
                    min='1'
                    className={this.state.durationClass}
                    onChange={e => this.setState({duration: Number(e.target.value), durationClass: 'inputText'})} />
                </div>
                <button className='submitButton buttons' onClick={this.handleSubmit.bind(this)}>
                  Submit
                </button>
              </div>
            </div>
    )
  }

  getData(){
    return this.state.submitted ? this.renderLoading() : this.renderForm()
  }

  render () {
    return (<div className='container'>
             {this.getData()}
            </div>)
  }
}
