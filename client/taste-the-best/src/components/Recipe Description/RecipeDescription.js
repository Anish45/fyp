import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import Axios from "axios";

function RecipeDescription() {
  const [recipedetails, setRecipedetails] = useState([]);

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
            <h1>Recipe Description</h1>
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
                <div className="row">Category PreparationTime CookingTime</div>
                <div className="row">Description</div>
              </div>
            </div>
            <div className="row pt-5 pl-lg-5">
              <h3>Ingredients</h3>
              <div className="col-12 d-flex align-items-left">
                Ingredients name
              </div>
            </div>
            <div className="row pt-5 pl-lg-5">
              <h3>Instructions</h3>
              <div className="col-12 d-flex align-items-left">
                Instructions given
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className="container pt-3">
        <h1>Recipe Description</h1>
        <div className="row pt-3">
          <div className="col-4">
            <Image
              className="img-fluid"
              cloudName="dsxghrclx"
              publicId="eytggmqmme0lsyzkaj2s"
            />
          </div>
          <div className="col-8">
            <div className="row">Name</div>
            <div className="row">Rating</div>
            <div className="row">Category PreparationTime CookingTime</div>
            <div className="row">Description</div>
          </div>
        </div>
        <div className="row pt-5 pl-lg-5">
          <h3>Ingredients</h3>
          <div className="col-12 d-flex align-items-left">Ingredients name</div>
        </div>
        <div className="row pt-5 pl-lg-5">
          <h3>Instructions</h3>
          <div className="col-12 d-flex align-items-left">
            Instructions given
          </div>
        </div>
      </div> */}
    </>
  );
}

export default RecipeDescription;
