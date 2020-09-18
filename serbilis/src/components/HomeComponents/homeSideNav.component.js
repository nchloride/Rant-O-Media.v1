import React, { useEffect, useContext } from "react";
import WorkIcon from "@material-ui/icons/Work";
import "../../styles/sideNav.css";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import FolderIcon from "@material-ui/icons/Folder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory, NavLink } from "react-router-dom";
import { User } from ".././UserAuth";
export default function SideNav(props) {
  let history = useHistory();
  const userInformation = useContext(User);
  const logOut = async () => {
    await fetch("/logout").then((res) => {
      history.push("/");

      window.location.reload(false);
      localStorage.removeItem("secretkey");
      sessionStorage.removeItem("token");
    });
  };

  useEffect(() => {
    const getCredentials = async () => {
      console.log("HomeSideNav Userinformation: ", userInformation);
      if (
        userInformation !== "No User Found" &&
        typeof userInformation !== "undefined" &&
        localStorage.getItem("secretkey") !== null
      ) {
        localStorage.setItem("secretkey", userInformation?.password);
      } else {
        history.push("/");
      }
    };
    getCredentials();
  }, [userInformation]);

  return (
    <div className="sideNav">
      <div className="appTitle">
        <div className="appLogo">
          <WorkIcon />
          <h1>SERBILIS</h1>
        </div>
        <h2>{userInformation && userInformation.fullname}</h2>
      </div>
      <div>
        <ul className="navLinks">
          <li>
            <NavLink
              to={"/home/newsfeed"}
              activeStyle={{
                color: "black",
                backgroundColor: "white",
              }}
              tabIndex="0"
              className="tabLink"
            >
              <HomeIcon />
              NewsFeed
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/home/messages"}
              activeStyle={{
                color: "black",
                backgroundColor: "white",
              }}
              tabIndex="0"
              className="tabLink"
            >
              <FolderIcon />
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/workers"
              activeStyle={{
                color: "black",
                backgroundColor: "white",
              }}
              tabIndex="0"
              className="tabLink"
            >
              <PeopleIcon />
              Workers
            </NavLink>
          </li>
          <li>
            <div className="tabLink">
              <NotificationsIcon />
              Notifications
            </div>
          </li>
          <li onClick={logOut}>
            <NavLink to="/home/newsfeed" className="tabLink">
              <ExitToAppIcon />
              LOG-OUT
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
