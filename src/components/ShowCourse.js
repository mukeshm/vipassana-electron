import React , {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'

export default class ShowCourse extends Component {
    componentWillMount(){
        ipcRenderer.send('get-course',this.props.params.cid )
        ipcRenderer.send('get-students', this.props.params.cid )
        this.setState({
            courseData : null,
            studentsList : null
        })
    }
    componentDidMount(){
        ipcRenderer.on('get-course',(event,arg)=> {
            this.setState({
                courseData : arg
            })
        })
        ipcRenderer.on('get-students',(event,arg)=> {
            this.setState({
                studentsList : arg
            })
        })
    }

    renderLoading(){
        return(<h1>Loading</h1>)
    }

    renderData(){
        const that = this
        const startDate = new Date(this.state.courseData.startDate)
        return(<div className="content">
            <div className="courseDetails">
                <div className="detailsHeader courseDetailsName">Name :  {this.state.courseData.name}</div>
                <div className="headerSecondLine">
                <div className="detailsHeader courseDetailsDate">Start Date :  {startDate.toLocaleDateString(undefined,{year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
                <div className="detailsHeader courseDetailsDuration">Duration :  {this.state.courseData.duration}</div>
                </div>
            </div>
            <div className="tableContainer studentsTable">
                 <div className='tableHeader'>
            <div className='tableColumn StudentName'>
              Name
            </div>
            <div className='tableColumn StudentRoomNo'>
            Room No.
            </div>
            <div className='tableColumn studentSeat'>
              Seat No.
            </div>
          </div>
           <div className='tableBody studentsTableBody'>
                {this.state.studentsList.map(student=> {
                  return(
                     <div key={student._id} className='StudentTableRow' onClick={() => hashHistory.push(`/viewstudent/${that.props.params.cid}/${student._id}`)}>
                        <div className='studentTableColumn StudentName'>
                            {student.name}
                        </div>
                        <div className='studentTableColumn StudentRoomNo'>
                            {student.roomNo}
                        </div>
                        <div className='studentTableColumn studentSeat'>
                            {student.seatNo}
                        </div>
                    </div>    
                  )}
                )}
               </div>
            </div>
             <div className='footer'>
                <button className='buttons footer-buttons' onClick={() => hashHistory.push(`/addstudent/${this.props.params.cid}`)}>
                  Add Student
                </button>
              </div>
            </div>)
    }

    render(){
        console.log(this.state)
           return (<div className="container">
             <div className='header'>
                <button className='buttons nav-buttons' onClick={() => hashHistory.goBack()}>
                  Back
                </button>
              </div>
           {(this.state.courseData && this.state.studentsList)? this.renderData() : this.renderLoading()}
            </div>)
    }
}