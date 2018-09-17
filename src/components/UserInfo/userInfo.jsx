import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import cookie from "react-cookies";
import { Route, Redirect } from "react-router";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      studentId: "",
      department: "",
      navigate: false
    };

    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.idChangeHandler = this.idChangeHandler.bind(this);
    this.depChangeHandler = this.depChangeHandler.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  idChangeHandler = e => {
    this.setState({
      studentId: e.target.value
    });
  };

  depChangeHandler = e => {
    this.setState({
      department: e.target.value
    });
  };

  addUser = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      name: this.state.name,
      studentId: this.state.studentId,
      department: this.state.department
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/userInfo", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          navigate: true
        });
        console.log(response);
        console.log("redirected");
      } else {
        console.log("User was not added!");
      }
    });
  };

  render() {
    //if not logged in go to login page
    if (this.state.navigate) {
      return <Redirect to="/userReport" />;
    }

    return (
      <div>
        <h1>User Information</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={this.nameChangeHandler}
              type="text"
              className="form-control"
              placeholder="name"
              name="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentid">StudentId</label>
            <input
              onChange={this.idChangeHandler}
              type="text"
              className="form-control"
              placeholder="studentId"
              name="Student Id"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              onChange={this.depChangeHandler}
              type="text"
              className="form-control"
              placeholder="department"
              name="Department"
            />
          </div>
          <button className="btn btn-primary">Clear</button>
          <button className="btn btn-secondary" onClick={this.addUser}>
            Add a User
          </button>
        </form>
      </div>
    );
  }
}
//export Home Component
export default UserInfo;
