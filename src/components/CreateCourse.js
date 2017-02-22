import React, { Component } from 'react'

export default class CreateCourse extends Component {
  componentWillMount () {
    this.setState({
      name: '',
      startdate: '',
      duration: '',
      nameClass: 'inputText',
      dateClass: 'inputText',
      durationClass: 'inputText'
    })
  }
  handleSubmit () {
    if (this.state.name === '' || this.state.startdate === '' || this.state.duration === '') {
      if (this.state.name === '') {
        this.setState({nameClass: 'inputText errorInput'})
      }
      if (this.state.startdate === '') {
        this.setState({dateClass: 'inputText errorInput'})
      }
      if (this.state.duration === '') {
        this.setState({durationClass: 'inputText errorInput'})
      }
    }else {
      console.log(this.state)
    }
  }
  render () {
    return (<div className='container'>
              <h1>Start Course</h1>
              <div className='createCourseForm'>
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
                  <input type='text' className={this.state.durationClass} onChange={e => this.setState({duration: e.target.value.trim(), durationClass: 'inputText'})} />
                </div>
                <button className='submitButton buttons' onClick={this.handleSubmit.bind(this)}>
                  Submit
                </button>
              </div>
            </div>)
  }
}
