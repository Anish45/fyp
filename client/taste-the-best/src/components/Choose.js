import React from "react";

function Choose() {
  return (
    <>
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 d-flex justify-content-center">
            <h3>Please Choose(at least 3)Cuisine you love</h3>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
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
              />
              <label class="custom-control-label" for="customCheck6">
                French
              </label>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-12 d-flex justify-content-center">
            <button type="button" class="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Choose;
