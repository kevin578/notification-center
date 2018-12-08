import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import Loader from 'react-loader-spinner';

export default class History extends Component {

    state = {
        history: [],
        isLoading: false
    }

    componentDidMount() {
        this.getHistory()
    }

    getHistory = ()=> {
        axios.get("/api/getHistory").then((history)=> {
            this.setState({history: history.data})
        })
    }

    renderHistory = ()=> {
        return this.state.history.map((notification)=> {
            return (
            <div className = "historyItemContainer">
            <p className = "notificationTitle">{notification.title}</p>
            <p className = "notificationMessage">{notification.message}</p>
            <p className = "notificationYears">{notification.years.join()}</p>
            <p className = "notificationDate">{moment.unix(parseInt(notification.date/1000)).format("MM/DD/YY hh:mm A")}</p>
            </div>
            )
        })
    }

    clearHistory = ()=> {
        this.setState({isLoading: true});
        axios.post("/api/deleteHistory").then(()=> {
            window.location.reload();
        })
    }

    renderClearHistory = ()=> {
        const {state} = this;
        if (state.isLoading) {
            return (
                <div className = "loader">
                <Loader 
                type="TailSpin"
                color="#a0a0a0"
                height="20"	
                width="20"
             /> 
             </div>
            )
        }
        return (
            <p className = "clearHistory" onClick = {()=> this.clearHistory()}>Clear history</p>
        )
    }

    render() {
        return (
            <div className = "historyContainer containers">
                <div className = "historyHeader">
                <h3>History</h3>
                {this.renderClearHistory()}
   
                </div>
                {this.renderHistory()}
            </div>
        )
    }
}