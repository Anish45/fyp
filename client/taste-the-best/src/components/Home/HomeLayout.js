import React from "react";
import Header from "../Header/Header";
import Home from "./Home";

function HomeLayout() {
  var retrievedData = localStorage.getItem("cuisine");
  var cuisineData = JSON.parse(retrievedData);

  return (
    <>
      <div className="container-fluid pl-0 pr-0">
        <Header />
      </div>
      <div className="container pt-lg-5">
        <Home />
      </div>
    </>
  );
}

export default HomeLayout;
