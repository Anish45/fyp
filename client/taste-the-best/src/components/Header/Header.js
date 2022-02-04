import React from "react";
import "../Header/header.css";
import { FaBell, FaUserAlt } from "react-icons/fa";

function Header() {
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
          <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search User..."
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <FaBell size={25} color="white" />
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
                <a href="#">Action</a>
              </li>
              <li>
                <a href="#">Another action</a>
              </li>
              <li>
                <a href="#">Something else here</a>
              </li>
              <li class="divider"></li>
              <li>
                <a href="#">Separated link</a>
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
        </div>
      </nav>
    </>
  );
}

export default Header;
