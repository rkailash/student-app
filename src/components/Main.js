import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./NewLogin/login";
import UserInfo from "./UserInfo/userInfo";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/userInfo" component={UserInfo} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
