import React, { useEffect, useState } from "react";
import "../Header/header.css";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Axios from "axios";

const Header = () => {
  useState(() => {
    var date = new Date().toDateString();
    Axios.get(
      `http://localhost:5000/notification/${localStorage.getItem("username")}`
    ).then((res) => {
      try {
        if (res.data[0].remainderdate != date) {
          localStorage.removeItem("notification");
          localStorage.setItem("notificationmessage", "No any notifications");
          setNotification(localStorage.getItem("notification"));
          setNotificationmessage(localStorage.getItem("notificationmessage"));
        } else {
          const message = "You have ingredients to buy from your shopping list";
          localStorage.setItem("notification", 1);
          localStorage.setItem("notificationmessage", message);
          setNotification(localStorage.getItem("notification"));
          setNotificationmessage(localStorage.getItem("notificationmessage"));
        }
      } catch (e) {
        localStorage.removeItem("notification");
        localStorage.setItem("notificationmessage", "No any notifications");
        console.log(e);
        setNotification(localStorage.getItem("notification"));
        setNotificationmessage(localStorage.getItem("notificationmessage"));
      }
    });
  });

  const [notification, setNotification] = useState();
  const [notificationmessage, setNotificationmessage] = useState();
  const [user, setUser] = useState();
  const history = useHistory();
  const visitProfile = () => {
    localStorage.setItem("visitorname", user);
    history.push("/visitprofile");
  };

  // localStorage.setItem("visitorname", user);
  // history.push("/visitprofile");
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <h1 className="name">Taste The Best</h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active"></li>
            <li class="nav-item"></li>
            <li class="nav-item dropdown"></li>
            <li class="nav-item"></li>
          </ul>
          <form class="form-inline my-2 my-lg-0 mr-lg-2 pr-lg-2">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search User..."
              aria-label="Search"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              onClick={visitProfile}
            >
              Search
            </button>
          </form>
          <div class="btn-group show-on-hover pr-lg-2">
            {/* <FaBell size={25} color="white" /> */}
            <Badge
              badgeContent={notification}
              color="primary"
              style={{ cursor: "pointer" }}
            >
              <FaBell size={25} color="white" />
            </Badge>

            <ul class="dropdown-menu dropdown-menu-right pl-2" role="menu">
              <span className="pt-3">{notificationmessage}</span>
            </ul>
          </div>
          {/* <FaBell size={25} color="white" /> */}
          <div class="btn-group show-on-hover">
            <button
              type="button"
              class="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
            >
              <FaUserAlt size={25} color="white" /> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right pl-2" role="menu">
              <li>
                <a href="/profile">profile</a>
              </li>
              <li>
                <a href="/">log out</a>
              </li>
            </ul>
          </div>
          <div className="pr-2 text-white">Langugage : </div>
          <select className="pl-1">
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="italian">Italian</option>
          </select>
        </div>{" "}
      </nav>
    </>
  );
};

export default Header;
