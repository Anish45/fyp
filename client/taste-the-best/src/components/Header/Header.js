import React, { useEffect, useState } from "react";
import "../Header/header.css";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Axios from "axios";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Header = () => {
  const { i18n, t } = useTranslation(["common"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 3) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    var date = new Date().toDateString();
    Axios.get(
      `http://localhost:5000/notification/${localStorage.getItem("username")}`
    ).then((res) => {
      try {
        if (res.data[0].remainderdate !== date) {
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
        <h1 className="name">{t("Tastethebest")}</h1>
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
              placeholder={t("SearchUser")}
              aria-label="Search"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              onClick={visitProfile}
            >
              {t("Search")}
            </button>
          </form>
          <div class="btn-group show-on-hover pr-lg-2">
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
                <a href="/profile">{t("profile")}</a>
              </li>
              <li>
                <a href="/">{t("logout")}</a>
              </li>
            </ul>
          </div>
          <div className="pr-2 text-white">{t("Language")} : </div>
          <select
            className="pl-1"
            value={localStorage.getItem("i18nextLng")}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ita">Italian</option>
          </select>
        </div>{" "}
      </nav>
    </>
  );
};

export default Header;
