import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'

export default class ViewStudent extends Component {
    constructor(props){
        super(props)
        const studentObj = JSON.parse(this.props.params.sid)
        this.state = {
            id : studentObj._id,
            name : studentObj.name,
            roomNo : studentObj.roomNo,
            seatNo : studentObj.seatNo,
            txnsList : []
        }
    }

    componentWillMount(){
        ipcRenderer.send('get-txns', this.state.id)
    }

    componentDidMount(){
        ipcRenderer.on('get-txns',(event, arg) => {
            this.setState({
                txnsList : arg
            })
        })
    }

    componentWillUnmount(){
        ipcRenderer.removeAllListeners(['get-txns'])
    }

    maybeValue(value){
        return value ? value : '-'
    }

    showTableBody(){
        return this.state.txnsList.map(txn=>{
            let date = new Date(txn.date)
            return ( 
                <div key={txn._id} className="tableRow">
                    <div className='txntableColumn dateColumn'>
                        {date.toLocaleDateString(undefined,{year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </div>
                    <div className='txntableColumn typeColumn'>
                        {txn.type}
                    </div>
                    <div className='txntableColumn nameColumn'>
                        {this.maybeValue(txn.name)}
                    </div>
                    <div className='txntableColumn rateColumn'>
                        {this.maybeValue(txn.rate)}
                    </div>
                    <div className='txntableColumn quantityColumn'>
                        {this.maybeValue(txn.quantity)}
                    </div>
                    <div className='txntableColumn amountColumn'>
                        {txn.amount}
                    </div>
                </div>)



            
        })
    }

    render(){
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
                        {this.showTableBody()}
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
