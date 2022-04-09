import React, { useEffect, useState } from "react";
import "../Shopping list/shoppinglist.css";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useTranslation } from "react-i18next";

function Shoppinglist() {
  const [input, setInput] = useState();
  const [shoppinglist, setShoppinglist] = useState([]);
  const [value, setValue] = useState();

  const { t } = useTranslation(["common"]);

  useEffect(() => {
    var date = new Date().toDateString();
    Axios.get(
      `http://localhost:5000/notification/${localStorage.getItem("username")}`
    ).then((res) => {
      try {
        if (res.data[0].remainderdate !== date) {
          setValue(res.data[0].remainderdate);
          localStorage.removeItem("notification");
          localStorage.setItem("notificationmessage", "No any notifications");
        } else {
          setValue(res.data[0].remainderdate);
          const message = "You have ingredients to buy from your shopping list";
          localStorage.setItem("notification", 1);
          localStorage.setItem("notificationmessage", message);
        }
      } catch (e) {
        setValue(null);
        localStorage.removeItem("notification");
        localStorage.setItem("notificationmessage", "No any notifications");
        console.log(e);
      }
    });
  }, []);

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

  const sendnotification = (date) => {
    setValue(date.toDateString());
    Axios.put(
      `http://localhost:5000/notification/${date.toDateString()}/${localStorage.getItem(
        "username"
      )}`
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-7 col-12 d-lg-flex justify-content-end">
          <h3>{t("yourshoppinglist")}</h3>
        </div>
        <div className="col-lg-5 col-12 d-lg-flex justify-content-end">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={t("choosedatetoremind")}
              value={value}
              onChange={(newValue) => {
                sendnotification(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date()}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <div class="input-group mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              class="form-control form-control-lg"
              placeholder={t("enteringredientname")}
            />
            <div class="input-group-append">
              <button
                class="btn btn-sm btn-outline-success"
                onClick={addIngredients}
              >
                {t("addtoshoppinglist")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button class="btn btn-sm btn-outline-success" onClick={removeall}>
            {t("removeall")}
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
