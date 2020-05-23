import React, { Component } from "react";
import "./App.css";

// 1 - Begin with a regular form w/ state & handleChange
// 2 - Add state to hold input errors
// 3 - create divs near the inputs that will display a potential error
// 4 - in your handleSubmit, create a variable that points to a validate method
// 5 - wrap the functionality of your handleSubmit in if(isValid) then go onto creating the validate method
// 6 - write logic in your validate function to see if your state variable contians what you need
// 6.5 - if it doesn't set error state with a value & return false, otherwise return true
// this will prevent your form from submitting and display errors
// 7 - in the handleSubmit, reset your form & state variables on a successful submit
// 8 also consider using an initial state objct instead of re typing state twice

const initialState = {
  username: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // handle change that works on check boxes
  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.username) {
      nameError = "Name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Invalid Email";
    }

    if (emailError || nameError) {
      // setting state & variable value the same so no need to say emailError:emailError
      this.setState({ emailError, nameError });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState(initialState);
    }
  };

  render() {
    return (
      <form action="POST" onSubmit={this.handleSubmit} className="myForm">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <div style={{ color: "red" }}>{this.state.nameError}</div>
        <input
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <div style={{ color: "red" }}>{this.state.emailError}</div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <div style={{ color: "red" }}>{this.state.passwordError}</div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default App;
