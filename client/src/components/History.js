import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

export default class History extends Component {

    state = {
        history: []
    }

    componentDidMount() {
        this.getHistory()
    }

    getHistory = ()=> {
        axios.get("/api/getHistory").then((history)=> {
            this.setState({history: history.data})
        })
    }

    convertYears = (years)=> {
        let yearString = "";
        
        
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

    render() {
        return (
            <div className = "historyContainer containers">
                <h3>History</h3>
                {this.renderHistory()}
            </div>
        )
    }
}