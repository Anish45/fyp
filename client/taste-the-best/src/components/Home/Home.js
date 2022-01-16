import React from "react";
import "./style.css";
import Foryou from "../For You/Foryou";
import Addrecipe from "../Add Recipe/Addrecipe";
function Home() {
  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search Recipe..."
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-3 pt-lg-5">
          <div
            class="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active pt-lg-3"
              id="v-pills-home-tab"
              data-toggle="pill"
              href="#v-pills-home"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              💇‍♂️ For You
            </a>
            <span className="pt-lg-3"></span>
            <a
              class="nav-link pt-lg-3"
              id="v-pills-following-tab"
              data-toggle="pill"
              href="#v-pills-following"
              role="tab"
              aria-controls="v-pills-following"
              aria-selected="false"
            >
              🧑‍🤝‍🧑 Following
            </a>
            <span className="pt-lg-3"></span>
            <a
              class="nav-link pt-lg-3"
              id="v-pills-recent-tab"
              data-toggle="pill"
              href="#v-pills-recent"
              role="tab"
              aria-controls="v-pills-recent"
              aria-selected="false"
            >
              ⏲️ Recently Uploaded
            </a>
            <span className="pt-lg-3"></span>
            <a
              class="nav-link pt-lg-3"
              id="v-pills-highrated-tab"
              data-toggle="pill"
              href="#v-pills-highrated"
              role="tab"
              aria-controls="v-pills-highrated"
              aria-selected="false"
            >
              ⭐ Highly Rated
            </a>
            <span className="pt-lg-3"></span>
            <a
              class="nav-link pt-lg-3"
              id="v-pills-shoppinglist-tab"
              data-toggle="pill"
              href="#v-pills-shoppinglist"
              role="tab"
              aria-controls="v-pills-shoppinglist"
              aria-selected="false"
            >
              🛒 Shopping List
            </a>
            <span className="pt-lg-3"></span>
            <a
              class="nav-link pt-lg-3"
              id="v-pills-addyourrecipe-tab"
              data-toggle="pill"
              href="#v-pills-addyourrecipe"
              role="tab"
              aria-controls="v-pills-addyourrecipe"
              aria-selected="false"
            >
              ➕ Add Your Recipe
            </a>
          </div>
        </div>
        <div class="col-9 pt-lg-5">
          <div class="tab-content" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <Foryou />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-following"
              role="tabpanel"
              aria-labelledby="v-pills-following-tab"
            >
              Following
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-recent"
              role="tabpanel"
              aria-labelledby="v-pills-recent-tab"
            >
              Recent
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-highrated"
              role="tabpanel"
              aria-labelledby="v-pills-highrated-tab"
            >
              High Rated
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-shoppinglist"
              role="tabpanel"
              aria-labelledby="v-pills-shoppinglist-tab"
            >
              Shopping List
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-addyourrecipe"
              role="tabpanel"
              aria-labelledby="v-pills-addyourrecipe-tab"
            >
              <Addrecipe />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
