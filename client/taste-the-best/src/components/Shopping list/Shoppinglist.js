import React, { useEffect, useState } from "react";
import "../Shopping list/shoppinglist.css";
import Axios from "axios";
function Shoppinglist() {
  const [input, setInput] = useState();
  const [shoppinglist, setShoppinglist] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/addshoppinglist/${localStorage.getItem(
        "username"
      )}`
    ).then((response) => {
      setShoppinglist(response.data);
    });
  }, [shoppinglist]);

  const addIngredients = () => {
    Axios.post("http://localhost:5000/addshoppinglist", {
      ingredientname: input,
      uploader: localStorage.getItem("username"),
    }).then(() => {
      setInput("");
    });
  };

  const deleteShoppinglist = (id) => {
    Axios.delete(`http://localhost:5000/addshoppinglist/${id}`);
  };

  const removeall = () => {
    Axios.delete(
      `http://localhost:5000/addshoppinglist/removeall/${localStorage.getItem(
        "username"
      )}`
    );
  };

  return (
    <>
      <h3>Your Shopping List</h3>
      <div className="row pt-3">
        <div className="col-12">
          <div class="input-group mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter a Ingredients Name..."
            />
            <div class="input-group-append">
              <button class="btn btn-outline-success" onClick={addIngredients}>
                Add to Shopping List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button class="btn btn-outline-success" onClick={removeall}>
            Remove All
          </button>
        </div>
      </div>

      <div className="row pt-3">
        {shoppinglist.map((val) => {
          return (
            <>
              <div className="col-12 d-flex justify-content-center">
                <h3>
                  {val.ingredientname}{" "}
                  <span
                    className="delete"
                    onClick={() => deleteShoppinglist(val.id)}
                  >
                    ❌
                  </span>
                </h3>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Shoppinglist;
