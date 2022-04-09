import React, { useEffect, useState } from "react";
import {Image} from "cloudinary-react";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { useHistory } from "react-router-dom";


function Highlyrated() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation(["common"]);
  const [length, setLength]= useState();
  

  useEffect(() => {
    Axios.get(`http://localhost:5000/highlyrated/${localStorage.getItem("username")}`).then((res) => {
      setRecipes(res.data);
      setLength(res.data.length);
    })
  })


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
      {recipes.map((val) => {
        return(
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
                                {val.uploadedby}
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
        )
      })}
    </div>) : (<h1>No any Posts Here</h1>)}
    </>
  );
}

export default Highlyrated;
