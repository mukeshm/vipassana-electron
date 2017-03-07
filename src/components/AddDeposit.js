import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'
import {isNumberValid} from '../js/checkValidation'

export default class AddDeposit extends Component {
    constructor(props){
        super(props)
        const studentObj = JSON.parse(this.props.params.sobj)
        this.state= {
            id : studentObj._id,
            name : studentObj.name,
            roomNo : studentObj.roomNo,
            seatNo : studentObj.seatNo,
            amount : 0,
            depositClass : 'inputDeposit'
        }
    }

    componentDidMount(){
        ipcRenderer.on('add-txn', (event, arg) => {
        hashHistory.goBack()
        })
    }
    
    componentWillUnmount(){
        ipcRenderer.removeAllListeners(['add-txn'])
    }

    submitData(){
        let date = new Date()
        let txnObj = {
            studentID : this.state.id,
            type : 'deposit',
            amount : Number(this.state.amount),
            date : date.toISOString()
        }
        ipcRenderer.send('add-txn',txnObj)
    }

    validateDeposit(amount){
        let depositValidation = isNumberValid(amount , 50000)
        if(depositValidation) {
            return true
        }
        this.setState({
            depositClass : 'inputDeposit errorInput'
        })
        return false
    }

    handleSubmit(){
       let isDepositValid = this.validateDeposit(this.state.amount)
       if(isDepositValid){
            this.submitData()
       }
    }

    updateDeposit(data){
        this.setState({
            amount : data,
            depositClass : 'inputDeposit'})
    }

    render(){
        return (<div className="container">
             <div className='header'>
                <button className='buttons nav-buttons' onClick={() => hashHistory.goBack()}>
                  Back
                </button>
              </div>
              <div className="content">
                <h1>Add Deposit</h1>
                <div className="depositForm">
                    <div className='formField'>
                        <span className='formLabel'>Name : </span>
                         {this.state.name}
                    </div>
                     <div className='formField'>
                        <span className='formLabel'>Room No. : </span>
                         {this.state.roomNo}
                    </div>
                     <div className='formField'>
                        <span className='formLabel'>Seat No. : </span>
                         {this.state.seatNo}
                    </div>
                    <div className='depositField'>
                        <span className='formLabel'>Amount : </span>
                        <input type='number' min="0" max="50000" className={this.state.depositClass} maxLength="4" onChange={e => this.updateDeposit(e.target.value)}/>
                        <span className="Hint">0-50000</span>
                    </div>          
                </div>
                <br/>
                <button className="buttons" onClick={this.handleSubmit.bind(this)}>Submit</button>
              </div>
        
            </div>)
    }

}