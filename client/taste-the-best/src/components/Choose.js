import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Choose(props) {
  const [nepali, setNepali] = useState();
  const [american, setAmerican] = useState();
  const [spanish, setSpanish] = useState(false);
  const [indian, setIndian] = useState(false);
  const [italian, setItalian] = useState(false);
  const [french, setFrench] = useState(false);

  const history = useHistory();

  const [cuisine, setCuisine] = useState([]);

  const checkboxes = document.querySelectorAll(".custom-control-input");

  for (const checkbox of checkboxes) {
    if (checkbox.checked === true) {
      if (!cuisine.includes(checkbox.value)) {
        cuisine.push(checkbox.value);       
      }
    } else if (checkbox.checked === false) {
      if (cuisine.includes(checkbox.value)) {
        cuisine.pop(checkbox.value);     
      }
    }
  }
  const handleChoose = (e) => {
    if (cuisine.length >= 3) {
      console.log("success");
      setCuisine(cuisine);
      localStorage.setItem("cuisine", JSON.stringify(cuisine));
      history.push("/home");
    } else {
      toast.warn("Choose at least 3 category of cuisines", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 d-flex justify-content-center">
            <h3>Choose Your Favourite Category of Cuisines</h3>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
                value="Nepali"
                onChange={(e) => setNepali(e.target.value)}
              />
              <label class="custom-control-label" for="customCheck1">
                Nepali
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck2"
                value="American"
                onChange={(e) => setAmerican(e.target.value)}
              />
              <label class="custom-control-label" for="customCheck2">
                American
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck3"
                value="Spanish"
                onChange={(e) => setSpanish(e.target.value)}
              />
              <label class="custom-control-label" for="customCheck3">
                Spanish
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck4"
                value="Indian"
                onChange={(e) => setIndian(e.target.value)}
              />
              <label class="custom-control-label" for="customCheck4">
                Indian
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck5"
                value="Italian"
                onChange={(e) => setItalian(e.target.value)}
              />
              <label class="custom-control-label" for="customCheck5">
                Italian
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck6"
                value="French"
                onChange={(e) => setFrench(e.target.value)}
              />
              <label class="custom-control-label" for="customCheck6">
                French
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-12 d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={handleChoose}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Choose;
