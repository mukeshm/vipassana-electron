import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'

export default class AddTransaction extends Component {
    constructor(props){
        super(props)
        const studentObj = JSON.parse(this.props.params.sobj)
        this.state= {
            id : studentObj._id,
            name : studentObj.name,
            roomNo : studentObj.roomNo,
            seatNo : studentObj.seatNo,
            type :'purchase',
            name : null,
            rate : 0,
            quantity : 0, 
            amount : 0
        }
    }

    componentWillUnmount(){
        ipcRenderer.removeAllListeners(['add-txn'])
    }

    componentDidMount(){
        ipcRenderer.on('add-txn', (event, arg) => {
        hashHistory.goBack()
        })
    }

    updateRate(data){
        this.setState({
            rate : data,
            amount : this.state.quantity * data
        })
    }

    updateQuantity(data){
        this.setState({
            quantity : data,
            amount : data * this.state.rate
        })
    }

    handleSubmit(){
        let date = new Date()
        let txnObj = {
            studentID : this.state.id,
            type : this.state.type,
            rate : Number(this.state.rate),
            quantity : Number(this.state.quantity),
            amount : Number(this.state.amount),
            date : date.toISOString()
        }

        if (this.state.type === 'purchase'){
            txnObj.name = this.state.name
        }
        ipcRenderer.send('add-txn',txnObj)
    }

    nameInputBox(){
        return ( <div className='formField'>
                    <span className='formLabel'>Name</span>
                    <input type='text' className='addTransactionInput'  maxLength="20" onChange={e => this.setState({name : e.target.value})}/>
                 </div>)
    }

    changeType(e){
       if(e.target.value === 'laundry'){
           this.setState({
               type : 'laundry',
               name : null
           })
       }
       else{
            this.setState({
               type : 'purchase',
               name : null
           })
       }
    }

    showNameBox(){
        return (this.state.type === 'purchase' ? this.nameInputBox() : null)
    }

    render(){
        return (<div className="container">
             <div className='header'>
                <button className='buttons nav-buttons' onClick={() => hashHistory.goBack()}>
                  Back
                </button>
              </div>
              <div className="content">
                <h1>Add Transaction</h1>
                 <div className='formField'>
                    <span className='formLabel'>Type</span>
                    <select className="addTransactionSelect" onChange={e => this.changeType(e)}>
                        <option value="purchase" > Purchase </option>
                        <option value="laundry" > Laundry </option>
                    </select>
                 </div>
                {this.showNameBox()}
                 <div className='formField'>
                    <span className='formLabel'>Rate</span>
                    <input type='number' className='addTransactionInput' min="0" maxLength="5" onChange={e => this.updateRate(e.target.value)}/>
                 </div>
                 <div className='formField'>
                    <span className='formLabel'>Quantity</span>
                    <input type='number' className='addTransactionInput' min="0" maxLength="5" onChange={e => this.updateQuantity(e.target.value)}/>
                 </div>
                  <div className='formField'>
                    <span className='formLabel'>Amount</span>
                    <input type='number' disabled className='addTransactionInput' value={this.state.amount}/>
                 </div>
                <br/>
                <button className="buttons" onClick={this.handleSubmit.bind(this)}>Submit</button>
              </div>
            </div>)
    }

}