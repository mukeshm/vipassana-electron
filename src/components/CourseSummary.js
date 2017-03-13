import React , {Component} from 'react'
import {hashHistory} from 'react-router'
import {ipcRenderer} from 'electron'

export default class CourseSummary extends Component {
    constructor(props){
        super(props)
        this.state = {
            sdtntTxnList : []
        }
    }

    componentWillMount(){
        ipcRenderer.send('get-course-summary', this.props.params.cid)
    }

    componentDidMount(){
        ipcRenderer.on('get-course-summary',(event, arg) => {
            this.setState({
                sdtntTxnList : arg
            })
        })
    }

    componentWillUnmount(){
        ipcRenderer.removeAllListeners(['get-course-summary'])
    }

    printSummary(){
        ipcRenderer.send('print-to-pdf')
    }

    showSummary(){
        return this.state.sdtntTxnList.map(data => {
            return (<div className="cardBody" >
                <span className="cardLabel" >Name : </span><span className="cardData">{data.name}</span>
                <span className="cardLabel" >Room No. : </span><span className="cardData">{data.roomNo}</span>
                <span className="cardLabel" >Seat No. : </span><span className="cardData">{data.seatNo}</span>
                 <span className="cardLabel" >Purchase : </span><span className="cardData">{data.monies.purchase}</span>
                 <span className="cardLabel" >Laundry : </span><span className="cardData">{data.monies.laundry}</span>
                 <span className="cardLabel" >Deposit : </span><span className="cardData">{data.monies.deposit}</span>
                </div>)
        })
    }

    render(){
        return(<div className="container">
                    <div className="header">
                        <button className="buttons nav-buttons" onClick={() => hashHistory.goBack()} >Back</button>
                        <button className="buttons add-button" onClick={() => this.printSummary()}> Print Summary </button>
                    </div>
                    <div className="pageContainer">
                        {this.showSummary()}
                    </div>
                </div>)
    }


}
