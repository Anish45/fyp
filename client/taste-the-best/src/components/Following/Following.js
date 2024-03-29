import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Following({ search }) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [feed, setFeed] = useState([]);
  const { t } = useTranslation(["common"]);
  const [length, setLength] = useState();

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/followingfeed/${localStorage.getItem("username")}`
    ).then((response) => {
      setFeed(response.data);
      setLength(response.data.length);
    });
  });

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
      {length != 0 ? (
        <div className="row">
          {feed
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
                          <p class="card-text">{t("category")}: {val.category}</p>
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
      ) : (
        <h1>No any Posts Here</h1>
      )}
    </>
  );
}

export default Following;
