import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Home from "./Home";
import { io } from "socket.io-client";
function HomeLayout() {
  var retrievedData = localStorage.getItem("cuisine");
  var cuisineData = JSON.parse(retrievedData);
  //const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("http://localhost:5001"));
  // }, []);

  // useEffect(() => {
  //   socket?.on("Notification", (msg) => {
  //     console.log(msg);
  //   });
  // });

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
