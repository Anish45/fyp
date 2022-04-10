import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useTranslation } from "react-i18next";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";

function Recommend() {
  const [recipes, setRecipes] = useState([]);
  const [recommendedrecipes, setRecommendedrecipes] = useState([]);
  const [length, setLength] = useState(0);
  const { t } = useTranslation(["common"]);
  const history = useHistory();

useEffect(() => {

  Axios.get(`http://localhost:5000/recommendation/${localStorage.getItem("title")}/${localStorage.getItem("rating")}`).then((res) => {
    var s = res.data;
    var keys = []
    for (var k in s ) keys.push(k.toLowerCase());
    setRecommendedrecipes(keys);
    setLength(res.data.length)
  })

  Axios.get("http://localhost:5000/recommendation/recommended").then((res) => {
    setRecipes(res.data);
  })
  
}, [])


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
    
    {length != 0  ? (
      <>
      <div className='row'>
        {recipes.map((val) => {
          return(
            <>
              {recommendedrecipes.includes(val.name.toLowerCase()) ?  <div className="col-lg-4 col-12 pb-5">
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
                </div> : null}
            </>
          )
        })}
        </div>
      </>
    ) : null}
    </>
  )
}

export default Recommend