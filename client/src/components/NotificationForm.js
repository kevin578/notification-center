import React, { Component } from "react";
import classNames from "classnames";
import axios from 'axios';

import "../css/App.css";

const styles = {
  errorMessage: {
    color: "#ff4747"
  }
};

export default class NotificationForm extends Component {
  state = {
    title: "",
    message: "",
    link: "",
    firstYear: false,
    sophmore: false,
    junior: false,
    senior: false,
    titleError: false,
    messageError: false,
    yearError: false,
    formError: false,
    isLoading: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  buttonClicked = () => {
    const {state} = this;

    const hasTitle = (state.title);
    const hasMessage = (state.message);
    const hasYear = (state.firstYear || state.sophmore || state.junior || state.senior)

      this.setState({
        titleError: !hasTitle,
        messageError: !hasMessage,
        yearError: !hasYear
      })

      if (!hasTitle || !hasMessage || !hasYear) return;

      this.setState({isLoading: true})
      const getYearArray = ()=> {
        const yearArray = [];
        if (state.firstYear) yearArray.push("First Year");
        if (state.sophmore) yearArray.push("Sophmore");
        if (state.junior) yearArray.push("Junior");
        if (state.senior) yearArray.push("Senior");
        return yearArray;
      }

      axios.post("/api/sendnotification", {
          title: state.title,
          message: state.message,
          link: state.link,
          years: [getYearArray()]
      }).then((res)=> {
        window.location.reload();
      })

  };

  render() {
    const { state } = this;
    const buttonStyles = classNames({
      "pure-button": true,
      "pure-button-primary": true,
      "button": true,
      "loading": state.isLoading
    })

    return (
      <div>
        <form
          method="post"
          name="notificationForm"
          className="pure-form pure-form-stacked containers"
        >
          <fieldset>
            <h3>Title</h3>
            <input
              className="title"
              type="text"
              name="title"
              value={state.title}
              onChange={this.handleInputChange}
            />
            {state.titleError && (
              <span className="pure-form-message" style={styles.errorMessage}>
                Enter a title.
              </span>
            )}

            <h3>Message</h3>
            <textarea
              className="message"
              name="message"
              value={state.message}
              onChange={this.handleInputChange}
            />
            {state.messageError && (
              <span className="pure-form-message" style={styles.errorMessage}>
                Enter a message.
              </span>
            )}

            <h3>Link</h3>
            <input
              className="link"
              type="text"
              name="link"
              value={state.link}
              onChange={this.handleInputChange}
            />

            <div className="checkboxes">
              <label htmlFor="firstYear" className="pure-checkbox">
                <input
                  type="checkbox"
                  name="firstYear"
                  id="firstYear"
                  checked={this.state.firstYear}
                  onChange={this.handleInputChange}
                />
                <span className="label">First Year</span>
              </label>

              <label htmlFor="sophmore" className="pure-checkbox">
                <input
                  type="checkbox"
                  name="sophmore"
                  id="sophmore"
                  checked={this.state.sophmore}
                  onChange={this.handleInputChange}
                />
                <span className="label">Sophmore</span>
              </label>
              <label htmlFor="junior" className="pure-checkbox">
                <input
                  type="checkbox"
                  name="junior"
                  id="junior"
                  checked={this.state.junior}
                  onChange={this.handleInputChange}
                />
                <span className="label">Junior</span>
              </label>

              <label htmlFor="senior" className="pure-checkbox label">
                <input
                  type="checkbox"
                  name="senior"
                  id="senior"
                  checked={this.state.senior}
                  onChange={this.handleInputChange}
                />
                <span className="label">Senior</span>
              </label>
              {state.yearError && (
                <span className="pure-form-message" style={styles.errorMessage}>
                  Enter a year.
                </span>
              )}
            </div>

            <input
              type="button"
              value="Send Notification"
              className={buttonStyles}
              onClick={this.buttonClicked}
              disabled = {state.isLoading}
            />

            {state.formError && (
              <span
                className="pure-form-message bottomError"
                style={styles.errorMessage}
              >
                Fields missing
              </span>
            )}
          </fieldset>
        </form>
      </div>
    );
  }
}
