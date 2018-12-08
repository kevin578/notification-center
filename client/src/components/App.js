import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import '../css/App.css';
import NotificationForm from "./NotificationForm";
import History from "./History";


class App extends Component {
  render() {
    return (
      <div>
      <Helmet>
        <title>Notification Center</title>
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w"
        crossorigin="anonymous" />
      </Helmet>
      
      <div className = "appContainer">
      <NotificationForm />
      <History />
      </div>
      </div>
    );
  }
}

export default App;
