import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { fontStyle } from "@mui/system";
import "../For You/Foryou.css";
import Profile from "../Profile/Profile";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Foryou({ search }) {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [value, setValue] = useState([]);
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    Axios.get("http://localhost:5000/upload").then((response) => {
      setRecipes(response.data);
    });
  }, [recipes]);

  const visitProfile = (uploadedby) => {
    localStorage.setItem("visitorname", uploadedby);
    history.push("/visitprofile");
  };

  const fullRecipe = (id) => {
    localStorage.setItem("recipeid", id);
    history.push("/recipedescription");
  };
  return (
    <>
      <div className="row">
        {recipes
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return val;
            } else {
              return false;
            }
          })
          .map((val) => {
            return (
              <>
                <div className="col-lg-4 col-12 pb-5">
                  <div class="card-deck">
                    <div class="card">
                      <Image cloudName="dsxghrclx" publicId={val.image} />
                      <div class="card-body">
                        <h5 class="card-title">{val.name}</h5>
                        <p class="card-text">{val.description}</p>
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </Box>
                        <p class="card-text">
                          <small class="text-muted">
                            {t("uploadedby")}:{" "}
                            <a
                              className="uploadername"
                              onClick={() => visitProfile(val.uploadedby)}
                            >
                              {" "}
                              {val.uploadedby}{" "}
                            </a>
                          </small>
                        </p>
                        <a
                          class="btn btn-primary"
                          onClick={() => fullRecipe(val.id)}
                        >
                          {t("seefulldescription")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Foryou;
