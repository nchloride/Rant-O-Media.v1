import React, { useContext, useEffect } from "react";
import SideNav from "./HomeComponents/homeSideNav.component";
import "../styles/home.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewsFeed from "./HomeComponents/SideNavLink/newsfeed.component";
import WorkersComponent from "./HomeComponents/SideNavLink/workers.component";
import MessageComponent from "./HomeComponents/SideNavLink/messages.component";

import { UserAuth } from "./UserAuth";
import { ProfileView } from "./ViewProfile";
import ProfileComponent from "./HomeComponents/SideNavLink/workersComponents/profile.component";
export default function Home(props) {
  const [viewProfile] = useContext(ProfileView);

  useEffect(() => {
    const getCredentials = async () => {
      const userData = await fetch("/islogin");
      const data = await userData.json();
      if (data.data !== "No User Found") {
        props.history.push("/home");
      } else {
        props.history.push("/");
      }
    };
    getCredentials();
  }, []);
  return (
    <div className="homePage">
      <Router>
        <UserAuth>
          <SideNav />

          <Switch>
            <Route path="/home/newsfeed" exact component={NewsFeed} />
            <Route path="/home/messages" exact component={MessageComponent} />
            <Route path="/home/workers" exact component={WorkersComponent} />
          </Switch>
          {viewProfile?.showProfile && <ProfileComponent />}
        </UserAuth>
      </Router>
    </div>
  );
}
