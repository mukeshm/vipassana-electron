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
                     <div className='tableHeader'>
                        <div className='tableColumn dateColumn'>
                        Date
                        </div>
                        <div className='tableColumn typeColumn'>
                        Type
                        </div>
                        <div className='tableColumn nameColumn'>
                        Name
                        </div>
                        <div className='tableColumn rateColumn'>
                        Rate
                        </div>
                        <div className='tableColumn quantityColumn'>
                        Quantity
                        </div>
                        <div className='tableColumn amountColumn'>
                        Amount
                        </div>
                    </div>
                    <div className="txnTableBody">
                        <div className="tableRow">
                            <div className='txntableColumn dateColumn'>
                            12/01/2017
                            </div>
                            <div className='txntableColumn typeColumn'>
                            Purchase
                            </div>
                            <div className='txntableColumn nameColumn'>
                            Tooth Paste
                            </div>
                            <div className='txntableColumn rateColumn'>
                            50
                            </div>
                            <div className='txntableColumn quantityColumn'>
                            20
                            </div>
                            <div className='txntableColumn amountColumn'>
                            1000
                            </div>
                        </div>
                        <div className="tableRow">
                            <div className='txntableColumn dateColumn'>
                            15/01/2017
                            </div>
                            <div className='txntableColumn typeColumn'>
                            Deposit
                            </div>
                            <div className='txntableColumn nameColumn'>
                            -
                            </div>
                            <div className='txntableColumn rateColumn'>
                            -
                            </div>
                            <div className='txntableColumn quantityColumn'>
                            -
                            </div>
                            <div className='txntableColumn amountColumn'>
                            2000
                            </div>
                        </div>
                        <div className="tableRow">
                            <div className='txntableColumn dateColumn'>
                            09/03/2017
                            </div>
                            <div className='txntableColumn typeColumn'>
                            Laundry
                            </div>
                            <div className='txntableColumn nameColumn'>
                            -
                            </div>
                            <div className='txntableColumn rateColumn'>
                            20
                            </div>
                            <div className='txntableColumn quantityColumn'>
                            10
                            </div>
                            <div className='txntableColumn amountColumn'>
                            200
                            </div>
                        </div>
                    </div>
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
