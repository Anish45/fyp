import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Home from "./Home";
import Axios from "axios";
function HomeLayout() {
  var retrievedData = localStorage.getItem("cuisine");
  var cuisineData = JSON.parse(retrievedData);
  const [reload, setReload] = useState(true);

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
