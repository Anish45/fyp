import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import loginimage from "../images/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = () => {
    if (username === "") {
      toast.warn("Enter your username", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (password === "") {
      toast.warn("Enter your password", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      Axios.post("http://localhost:5000/login", { username, password })
        .then((res) => {
          if (res) {
            toast.success("Successfully Logged in", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("username", username);
            history.push("/home");
          }
        })
        .catch((err) => {
          toast.warn("Invalid Credentials", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container pt-lg-5">
        <div className="row pt-lg-5">
          <div className="d-md-flex d-none col-lg-7 col-md-12 pt-lg-5">
            <img src={loginimage} alt="food" />
          </div>
          <div className="col-lg-5 col-12 col-md-12 pt-lg-5">
            <h1>SIGN IN</h1>
            <form>
              <div class="form-group row pt-lg-4 pl-md-0 pl-3">
                <label for="inputEmail3" class="col-form-label">
                  Username
                </label>
                <div class="col">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail3"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row pt-lg-5 pl-md-0 pl-3">
                <label for="inputPassword3" class="col-form-label">
                  Password
                </label>
                <div class="col">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword3"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row pt-lg-3">
                <div class="col d-flex justify-content-end">
                  <a href="/register"> Don't have an account?Register now</a>
                </div>
              </div>
              <div class="form-group row pt-lg-3">
                <div class="col d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={login}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
