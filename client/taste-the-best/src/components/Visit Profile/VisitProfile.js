import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../Visit Profile/visitProfile.css";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";

function VisitProfile() {
  const history = useHistory();
  const [yourUploads, setYourUploads] = useState([]);
  const [details, setDetails] = useState([]);
  const [following, setFollowing] = useState(true);
  const [totalpost, setTotalpost] = useState(0);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/profile/${localStorage.getItem("visitorname")}`
    ).then((response) => {
      setYourUploads(response.data);
      setTotalpost(response.data.length);
    });

    Axios.get(
      `http://localhost:5000/userdetails/${localStorage.getItem("visitorname")}`
    ).then((response) => {
      setDetails(response.data);
    });
  }, []);

  const fullRecipe = (id) => {
    localStorage.setItem("recipeid", id);
    history.push("/recipedescription");
  };

  const follow = () => {
    setFollowing(false);
  };

  const unfollow = () => {
    setFollowing(true);
  };

  return (
    <>
      <div className="container">
        <h1>Profile</h1>
        <div class="row pt-3">
          {details.map((val, key) => {
            if (val.username != localStorage.getItem("username")) {
              return (
                <>
                  <div class="col-lg-2">
                    <Image
                      className="img-fluid"
                      cloudName="dsxghrclx"
                      publicId={val.picture}
                    />
                  </div>
                  <div class="col-lg-4 pt-3">
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
                  <div className="col-lg-3 pt-3">
                    {following ? (
                      <a id="follow" class="btn btn-primary" onClick={follow}>
                        Follow
                      </a>
                    ) : (
                      <a
                        id="unfollow"
                        class="btn btn-primary"
                        onClick={unfollow}
                      >
                        UnFollow
                      </a>
                    )}
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div class="col-lg-2">
                    <Image
                      className="img-fluid"
                      cloudName="dsxghrclx"
                      publicId={val.picture}
                    />
                  </div>
                  <div class="col-lg-4 pt-3">
                    <p className="d-flex justify-content-start">
                      Username: {val.username}
                    </p>
                    <p className="d-flex justify-content-start">
                      Email: {val.email}
                    </p>
                    <p className="d-flex justify-content-start">
                      Total posts: 2
                    </p>
                  </div>
                </>
              );
            }
          })}
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-center">
            <h3>Uploads</h3>
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

export default VisitProfile;
