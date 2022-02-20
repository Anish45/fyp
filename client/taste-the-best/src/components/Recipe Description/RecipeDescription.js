import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { useTranslation } from "react-i18next";

function RecipeDescription() {
  const [recipedetails, setRecipedetails] = useState([]);

  const { t } = useTranslation(["common"]);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/recipedescription/${localStorage.getItem(
        "recipeid"
      )}`
    ).then((response) => {
      setRecipedetails(response.data);
    });
  }, []);
  return (
    <>
      {recipedetails.map((val) => {
        return (
          <div className="container pt-3">
            <h1>{t("recipedescription")}</h1>
            <div className="row pt-3">
              <div className="col-4">
                <Image
                  className="img-fluid"
                  cloudName="dsxghrclx"
                  publicId={val.image}
                />
              </div>
              <div className="col-8">
                <div className="row">{val.name}</div>
                <div className="row">Rating</div>
                <div className="row">
                  {t("category")}: {t("preparationtime")}: {t("cookingtime")}:
                </div>
                <div className="row">{t("description")}:</div>
              </div>
            </div>
            <div className="row pt-5 pl-lg-5">
              <h3>{t("ingredients")}</h3>
              <div className="col-12 d-flex align-items-left">
                Ingredients name
              </div>
            </div>
            <div className="row pt-5 pl-lg-5">
              <h3>{t("instructions")}</h3>
              <div className="col-12 d-flex align-items-left">
                Instructions given
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RecipeDescription;
