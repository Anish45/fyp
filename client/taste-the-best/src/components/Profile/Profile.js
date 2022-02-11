import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../Profile/Profile.css";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  const [yourUploads, setYourUploads] = useState([]);
  const [details, setDetails] = useState([]);
  const [totalpost, setTotalpost] = useState(0);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/profile/${localStorage.getItem("username")}`
    ).then(
      (response) => {
        setYourUploads(response.data);
        setTotalpost(response.data.length);
      },
      [yourUploads]
    );

    Axios.get(
      `http://localhost:5000/userdetails/${localStorage.getItem("username")}`
    ).then((response) => {
      setDetails(response.data);
    });
  }, [details]);

  const fullRecipe = (id) => {
    localStorage.setItem("recipeid", id);
    history.push("/recipedescription");
  };

  const editRecipe = (val) => {
    localStorage.setItem("editRecipeId", val.id);
    localStorage.setItem("editname", val.name);
    localStorage.setItem("editdescription", val.description);
    localStorage.setItem("editcategory", val.category);
    localStorage.setItem("editimage", val.image);
    localStorage.setItem("editpreparationtime", val.preparationtime);
    localStorage.setItem("editcookingtime", val.cookingtime);
    localStorage.setItem("editingredients", val.ingredients);
    localStorage.setItem("editinstructions", val.instructions);
    localStorage.setItem("editdate", val.date);
    localStorage.setItem("edituploadedby", val.uploadedby);
    history.push("/edit");
  };

  const deleteRecipe = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`);
  };
  return (
    <>
      <div className="container">
        <h1>Profile</h1>
        <div class="row pt-3">
          {details.map((val, key) => {
            return (
              <>
                <div class="col-lg-2">
                  <Image
                    className="img-fluid"
                    cloudName="dsxghrclx"
                    publicId={val.picture}
                  />
                  <br></br>
                  <button>Upload picture</button>
                </div>
                <div class="col-lg-8 pt-5">
                  <p className="d-flex justify-content-start">
                    Username: {val.username}
                  </p>
                  <p className="d-flex justify-content-start">
                    Email: {val.email}
                  </p>
                  <p className="d-flex justify-content-start">
                    Total posts: {totalpost}
                  </p>
                </div>
              </>
            );
          })}
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <h3>Your Uploads</h3>
          </div>
        </div>
        <div className="row pt-3">
          {yourUploads.map((val, key) => {
            return (
              <>
                <div className="col-lg-4 col-12 pb-5">
                  <div class="card-deck">
                    <div class="card">
                      <Image cloudName="dsxghrclx" publicId={val.image} />
                      <div class="card-body">
                        <h5 class="card-title">{val.name}</h5>
                        <p class="card-text">{val.description}</p>
                        <h5>Rating</h5>
                        <a
                          class="btn btn-primary"
                          onClick={() => fullRecipe(val.id)}
                        >
                          See full description
                        </a>
                        <br />
                        <br />
                        <a
                          class="btn btn-primary"
                          onClick={() => editRecipe(val)}
                        >
                          Edit Recipe
                        </a>
                        <br />
                        <br />
                        <a
                          class="btn btn-primary"
                          onClick={() => deleteRecipe(val.id)}
                        >
                          Delete Recipe
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Profile;
