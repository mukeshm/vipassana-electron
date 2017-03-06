import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'

ipcRenderer.on('add-student', (event, arg) => {
  console.log(arg)
  hashHistory.goBack()
})

export default class AddStudent extends Component{
    componentWillMount () {
    this.setState({
      nameClass: 'inputText',
      roomClass: 'inputText',
      seatClass: 'inputText',
      submitted: false,
      name:'',
      roomNo: '',
      seatNo: ''
    })
  }
  
  componentWillUnmount(){
      ipcRenderer.removeAllListeners(['add-student'])
  }

  isNameValid(name){
     if (name === '' || name.length >25 ) {
        this.setState({nameClass: 'inputText errorInput'})
        return false
      }
    return true
  }

  isRoomNoValid(room){
    if (room === '' || room.length > 7) {
        this.setState({roomClass: 'inputText errorInput'})
        return false
      }
    return true
  }

  isSeatNoValid(seat){
    if (seat === '' || seat.length > 7) {
        this.setState({seatClass: 'inputText errorInput'})
        return false
      }
    return true
  }

  sendData(){
     let obj = {
      name: this.state.name,
      roomNo: this.state.roomNo,
      seatNo: this.state.seatNo,
      courseID: this.props.params.cid
    }
    ipcRenderer.send('add-student',obj)
  }

  handleSubmit(){
    let nameValidation = this.isNameValid(this.state.name)
    let roomValidation = this.isRoomNoValid(this.state.roomNo)
    let seatValidation = this.isSeatNoValid(this.state.seatNo)

    if(nameValidation && roomValidation && seatValidation){
      this.sendData()
    }    
  }
    render(){
        return ( <div className='container'>
        <div className='header'>
          <button className='buttons nav-buttons' onClick={() => hashHistory.goBack()}>
            Back
          </button>
        </div>
         <div className="addStudentForm">
                <h1>Add Student</h1>
                <div className='formField'>
                  <span className='formLabel'>Student Name</span>
                  <input type='text' className={this.state.nameClass} maxLength="25" onChange={e => this.setState({name: e.target.value.trim(), nameClass: 'inputText'})}/>
                  <span className="Hint">Maximum 25 Characters</span>
                </div>
                <div className='formField'>
                  <span className='formLabel'>Room No.</span>
                  <input type='text' className={this.state.roomClass} maxLength="7" onChange={e => this.setState({roomNo: e.target.value.trim(), roomClass: 'inputText'})}/>
                   <span className="Hint">Maximum 7 Characters</span>
                </div>
                <div className='formField'>
                  <span className='formLabel'>Seat No.</span>
                  <input type='text' className={this.state.seatClass} maxLength="7" onChange={e => this.setState({seatNo: e.target.value.trim(), seatClass: 'inputText'})}/>
                   <span className="Hint">Maximum 7 Characters</span>
                </div>
                <button className='submitButton buttons' onClick={this.handleSubmit.bind(this)}>
                  Submit
                </button>
              </div>
      </div>)
    }
}