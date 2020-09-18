import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/login.component";
import Home from "./components/home.component";
import "./App.css";
import { ProfileViewer } from "./components/ViewProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProfileViewer>
            <Route path="/" exact component={LoginForm}></Route>

            <Route path="/home" component={Home}></Route>
          </ProfileViewer>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
