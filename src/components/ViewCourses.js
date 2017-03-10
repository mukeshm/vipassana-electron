import React , { Component } from 'react'
import { ipcRenderer } from 'electron'
import { hashHistory } from 'react-router'

export default class ViewCourses extends Component {
  componentWillMount () {
    ipcRenderer.send('get-courses')
    this.setState({
      courseList: null
    })
  }
  
  componentDidMount () {
    ipcRenderer.on('get-courses', (event, arg) => {
      this.setState({
        courseList: arg
      })
    })
  }

  componentWillUnmount(){
        ipcRenderer.removeAllListeners(['get-courses'])
  }
  
  renderLoading () {
    return (
      <div className='loaderWrapper'>
        <div className='loader'></div>
      </div>
    )
  }

  showTableBody(){
    return this.state.courseList.map(course=> {
              let date = new Date(course.startDate)
              return(
                <div key={course._id} className='tableRow' onClick={()=> hashHistory.push(`/showcourse/${course._id}`)}>
                    <div className='tableColumn courseName'>
                    {course.name}
                    </div>
                    <div className='tableColumn courseDate'>
                    {date.toLocaleDateString(undefined,{year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </div>
                    <div className='tableColumn courseDuration'>
                    {course.duration}
                    </div>
                </div>
              )}
          )
  }

  renderData () {
    return (
      <div className='dashboard'>
        <div className='tableContainer'>
          <div className='tableHeader'>
            <div className='tableColumn courseName'>
              Name
            </div>
            <div className='tableColumn courseDate'>
              Start Date
            </div>
            <div className='tableColumn courseDuration'>
              Duration
            </div>
          </div>
          <div className='tableBody'>
            {this.showTableBody()}
          </div>
        </div>
      </div>)
  }

  getData(){
    return this.state.courseList ? this.renderData() : this.renderLoading()
  }
  
  render () {
    return (
      <div className='container'>
        <div className='header'>
          <button className='buttons add-button' onClick={() => hashHistory.push('/createcourse')}>
            Add Course
          </button>
        </div>
        {this.getData()}
      </div>)
  }
}
