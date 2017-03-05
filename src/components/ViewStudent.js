import React, {Component} from 'react'
import {hashHistory} from 'react-router'

export default class ViewStudent extends Component {
    constructor(props){
        super(props)
        const studentObj = JSON.parse(this.props.params.sid)
        this.state = {
            id : studentObj._id,
            name : studentObj.name,
            roomNo : studentObj.roomNo,
            seatNo : studentObj.seatNo
        }
    }
    render(){
        console.log(this.state)
         return (<div className="container">
             <div className='header'>
                <button className='buttons nav-buttons' onClick={() => hashHistory.goBack()}>
                  Back
                </button>
             </div>
             <div className="content">
                 <div className="studentDetails">
                    <div className="detailsHeader studentDetailsName">Name :  {this.state.name}</div>
                    <div className="headerSecondLine">
                        <div className="detailsHeader studentDetailsRoomNo">Room No. : {this.state.roomNo}</div>
                        <div className="detailsHeader studentDetailsSeatNo">Seat No. :  {this.state.seatNo}</div>
                    </div>
                 </div>
                 <div className="transactionsTable">
                     <h1>demo </h1>
                 </div>
                 <div className='footer'>
                    <button className='buttons footer-buttons' onClick={() => hashHistory.push(`/adddeposit/${this.props.params.cid}/${this.props.params.sid}`)}>
                        Add Deposit
                    </button>
                    <button className='buttons footer-buttons addTransactionButton' onClick={() => hashHistory.push(`/addtransaction/${this.props.params.cid}/${this.props.params.sid}`)}>
                        Add Purchase/Laundry
                    </button>
                 </div>
             </div>
            </div>)
    }
}
