import React, { useState } from "react";
import Axios from "axios";
import loginimage from "../images/login.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email === "" || password === "") {
      console.log("empty fields");
    } else {
      Axios.post("http://localhost:5000/login", { email, password })
        .then((res) => {
          if (res) {
            console.log("logged in");
          }
        })
        .catch((err) => {
          console.log("Invalid credentials");
        });
    }
  };

  return (
    <>
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
                  Email
                </label>
                <div class="col">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail3"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row pt-lg-4 pl-md-0 pl-3">
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
                  <a href="/register/step-1">
                    {" "}
                    Don't have an account?Register now
                  </a>
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
