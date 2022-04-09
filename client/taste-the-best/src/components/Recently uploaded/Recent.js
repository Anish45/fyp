import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { useTranslation } from "react-i18next";

function Recent({ search }) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [feed, setFeed] = useState([]);
  const { t } = useTranslation(["common"]);
  const [length, setLength] = useState();

  useEffect(() => {
    Axios.get(`http://localhost:5000/recentlyuploadedfeed`).then((response) => {
      setFeed(response.data);
      setLength(response.data.length);
    });
  }, []);

  const visitProfile = (uploadedby) => {
    localStorage.setItem("visitorname", uploadedby);
    history.push("/visitprofile");
  };

  const fullRecipe = (id) => {
    localStorage.setItem("recipeid", id);
    history.push("/recipedescription");
  };

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = diffInTime / oneDay;

    return diffInDays;
  }

  return (
    <>
      {length !== 0 ? (
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
                  {getNumberOfDays(val.date, new Date()) < 7 ? (
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
                  ) : null}
                </>
              );
            })}
        </div>
      ) : (
        <h1>No any Posts</h1>
      )}
    </>
  );
}

export default Recent;
