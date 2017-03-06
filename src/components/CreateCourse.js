import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { hashHistory } from 'react-router'

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

  componentDidMount(){
    ipcRenderer.on('add-course', (event, arg) => {
      console.log('event,arg', arg)
      hashHistory.push(`/showcourse/${arg}`)
    })
  }
  
  componentWillUnmount(){
        ipcRenderer.removeAllListeners(['add-course'])
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

  isNameValid(name){
     if (name === '' || name.length >25 ) {
        this.setState({nameClass: 'inputText errorInput'})
        return false
      }
    return true
  }

  isDateValid(date){
    if (date === '') {
        this.setState({dateClass: 'inputText errorInput'})
        return false
      }
    return true
  }
  
  isDurationValid(duration){
       if (duration <= 0) {
        this.setState({durationClass: 'inputText errorInput'})
        return false
      }
      return true
  }
  
  
  handleSubmit () {
    let nameValidation = this.isNameValid(this.state.name)
    let dateValidation = this.isDateValid(this.state.startdate)
    let durationValidation = this.isDurationValid(this.state.duration)
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

  render () {
    return (<div className='container'>
              {this.state.submitted ? this.renderLoading() : this.renderForm()}
            </div>)
  }
}
