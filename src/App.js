import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/NewLogin/login";
import UserInfo from "./components/UserInfo/userInfo";
import UserReport from "./components/UserReport/userRep";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

//App Component
class App extends Component {
  render() {
    return (
      <main className="container">
        <Switch>
          <Redirect from="/" exact to="/Login" />
          <Route path="/login" component={Login} />
          <Route path="/userInfo" component={UserInfo} />
          <Route path="/userReport" component={UserReport} />
        </Switch>
      </main>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
