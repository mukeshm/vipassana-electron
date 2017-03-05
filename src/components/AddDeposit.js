import React, {Component} from 'react'
import {hashHistory} from 'react-router'

export default class AddDeposit extends Component {
    constructor(props){
        super(props)
        const studentObj = JSON.parse(this.props.params.sobj)
        this.state= {
            id : studentObj._id,
            name : studentObj.name,
            roomNo : studentObj.roomNo,
            seatNo : studentObj.seatNo,
            amount : 0
        }
    }

    handleSubmit(){
        let txnObj = {
            studentId : this.state.id,
            type : 'deposit',
            amount : this.state.amount
        }
        console.log(txnObj)
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
                    Name : {this.state.name}<br/>
                    Room No. : {this.state.roomNo}<br/>
                    Seat No. : {this.state.seatNo}<br/>
                    Amount : <input type='number' min="0" className='inputDeposit' maxLength="4" onChange={e => this.setState({amount : e.target.value})}/>
                </div>
                <br/>
                <button className="buttons" onClick={this.handleSubmit.bind(this)}>Submit</button>
              </div>
        
            </div>)
    }

}