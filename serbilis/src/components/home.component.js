import React, { useContext } from "react";
import SideNav from "./HomeComponents/homeSideNav.component";
import "../styles/home.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NewsFeed from "./HomeComponents/SideNavLink/newsfeed.component";
import WorkersComponent from "./HomeComponents/SideNavLink/workers.component";
import MessageComponent from "./HomeComponents/SideNavLink/messages.component";

import { UserAuth } from "./UserAuth";
import { ProfileView } from "./ViewProfile";
import ProfileComponent from "./HomeComponents/SideNavLink/workersComponents/profile.component";
export default function Home(props) {
  const [viewProfile] = useContext(ProfileView);
  return (
    <div className="homePage">
      <BrowserRouter>
        <UserAuth>
          <SideNav />

          <Switch>
            <Route path="/home/newsfeed" exact component={NewsFeed} />
            <Route path="/home/messages" exact component={MessageComponent} />
            <Route path="/home/workers" exact component={WorkersComponent} />
          </Switch>
          {viewProfile?.showProfile && <ProfileComponent />}
        </UserAuth>
      </BrowserRouter>
    </div>
  );
}
