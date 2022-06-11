import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../Profile/Profile.css";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWindows } from "react-icons/fa";


function Profile() {
  const history = useHistory();
  const [yourUploads, setYourUploads] = useState([]);
  const [details, setDetails] = useState([]);
  const [totalpost, setTotalpost] = useState(0);
  const [profile, setProfile] = useState(
    "istockphoto-1300845620-612x612_azen7e.jpg"
  );
  const [followers, setFollowers] = useState(0);
  const [followingother, setFollowingother] = useState(0);
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/checkfollow/${localStorage.getItem("username")}`
    ).then((response) => {
      setFollowers(response.data[0].countfollower);
    });

    Axios.get(
      `http://localhost:5000/follow/${localStorage.getItem("username")}`
    ).then((response) => {
      setFollowingother(response.data[0].countfollowing);
    });

    Axios.get(
      `http://localhost:5000/profile/${localStorage.getItem("username")}`
    ).then((response) => {
      setYourUploads(response.data);
      setTotalpost(response.data.length);
    });

    Axios.get(
      `http://localhost:5000/userdetails/${localStorage.getItem("username")}`
    ).then((response) => {
      setDetails(response.data);
    });
  }, [yourUploads]);

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
    toast.success("Successfully Deleted Recipe", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const uploadPicture = () => {
    const formData = new FormData();
    formData.append("file", profile[0]);
    formData.append("upload_preset", "uiarhyf8");
    Axios.post(
      `https://api.cloudinary.com/v1_1/dsxghrclx/image/upload`,
      formData
    ).then((res) => {
      const fileName = res.data.public_id;

      Axios.put(
        `http://localhost:5000/editprofile/${localStorage.getItem("username")}`,
        {
          picture: fileName,
        }
      );
    });
    document.getElementById("picturename").value = null;
    toast.success("succefully uploaded profile!!!")
  };

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container">
        <h1>{t("profile")}</h1>
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
                  <br></br>
                  <input
                    id="picturename"
                    type="file"
                    onChange={(e) => setProfile(e.target.files)}
                  />
                  <br></br>
                  <br></br>
                  <button className="btn btn-primary" onClick={uploadPicture}>
                    {t("uploadpicture")}
                  </button>
                </div>
                <div class="col-lg-8">
                  <p className="d-flex justify-content-start">
                    {t("username")}: {val.username}
                  </p>
                  <p className="d-flex justify-content-start">
                    {t("email")}: {val.email}
                  </p>
                  <p className="d-flex justify-content-start">
                    {t("totalposts")}: {totalpost}
                  </p>
                  <p className="d-flex justify-content-start">
                    {t("followers")}: {followers} {t("following")}:{" "}
                    {followingother}
                  </p>
                </div>
              </>
            );
          })}
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <h3>{t("youruploads")}</h3>
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
                        <h5>{t("category")}: {val.category}</h5>
                        <a href=""
                          class="btn btn-primary"
                          onClick={() => fullRecipe(val.id)}
                        >
                          {t("seefulldescription")}
                        </a>
                        <br />
                        <br />
                        <a
                          class="btn btn-primary"
                          onClick={() => editRecipe(val)}
                        >
                          {t("editrecipe")}
                        </a>
                        <br />
                        <br />
                        <a
                          class="btn btn-primary"
                          onClick={() => deleteRecipe(val.id)}
                        >
                          {t("deleterecipe")}
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
