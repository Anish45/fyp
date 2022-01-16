import React, { useState } from "react";
import registerimage from "../images/register.jpg";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const choose = () => {
    if (email === "") {
      toast.warn("Email cannot be empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (name === "") {
      toast.warn("Username cannot be empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (password === "") {
      toast.warn("Password cannot be empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      Axios.post("http://localhost:5000/register", {
        email,
        name,
        password,
      })
        .then((res) => {
          toast.warn("Successfully registered", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/choose");
        })
        .catch((err) => {
          toast.warn("Already Registered from this Email", {
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
            <img src={registerimage} alt="food" />
          </div>
          <div className="col-lg-5 col-12 col-md-12 pt-lg-5">
            <h1>SIGN UP</h1>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="form-group row pt-lg-4 pl-md-0 pl-3">
                <label for="inputEmail3" class="col-form-label">
                  Name
                </label>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="inputusername"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={choose}
                  >
                    Register
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

export default Register;
