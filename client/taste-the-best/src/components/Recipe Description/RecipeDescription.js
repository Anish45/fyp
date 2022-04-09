import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { useTranslation } from "react-i18next";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function RecipeDescription() {
  const [rating, setRating] = useState([]);
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

    Axios.get(`http://localhost:5000/rate/getrate/${localStorage.getItem("recipeid")}/${localStorage.getItem("username")}`)
    .then((response) => {
      try{
      setRating(response.data[0].rating);
      }catch{}
    })

  }, []);


  const Rate = (value) => {
    setRating(value);
    Axios.post("http://localhost:5000/rate",
    {ratedby: localStorage.getItem("username"), 
      rating: value,
      recipeid: localStorage.getItem("recipeid")
  })
  localStorage.setItem("rated", true);
}


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
                <div className="row">{t("nameoftherecipe")}: {val.name}</div>
                <div className="row">
                <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                              Rate(newValue);
                            }}
                          />
                        </Box>
                </div>
                <div className="row">
                  {t("category")}: {val.category} || {t("preparationtime")}: {val.preparationtime} || {t("cookingtime")}: {val.cookingtime}
                </div>
                <div className="row text-justify">{t("description")}: {val.description}</div>
              </div>
            </div>
            <div className="row pt-5 pl-lg-5">
              <h3>{t("ingredients")}</h3>
              <div className="col-12 d-flex text-justify">
                {val.ingredients}
              </div>
            </div>
            <div className="row pt-5 pl-lg-5">
              <h3>{t("instructions")}</h3>
              <div className="col-12 pb-3 d-flex text-justify">
                {val.instructions}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RecipeDescription;
