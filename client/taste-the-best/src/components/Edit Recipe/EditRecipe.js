import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditRecipe() {
  const history = useHistory();
  const [name, setName] = useState(localStorage.getItem("editname"));
  const [description, setDescription] = useState(
    localStorage.getItem("editdescription")
  );
  const [category, setCategory] = useState(
    localStorage.getItem("editcategory")
  );
  const [image, setImage] = useState([]);

  const [preparationtime, setPreparationtime] = useState(
    localStorage.getItem("editpreparationtime")
  );
  const [cookingtime, setCookingtime] = useState(
    localStorage.getItem("editcookingtime")
  );
  const [ingredients, setIngredients] = useState(
    localStorage.getItem("editingredients")
  );
  const [instructions, setInstructions] = useState(
    localStorage.getItem("editinstructions")
  );
  const uploadedby = localStorage.getItem(
    localStorage.getItem("edituploadedby")
  );
  const [recipedata, setRecipedata] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://localhost:5000/edit/${localStorage.getItem("editRecipeId")}`
    ).then((response) => {
      setRecipedata(response.data);
    });
  }, [recipedata]);

  const upload = () => {
    if (name === "") {
      toast.warn("Enter name", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (description === "") {
      toast.warn("Enter description", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (preparationtime === "") {
      toast.warn("Enter preparation time", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (cookingtime === "") {
      toast.warn("Enter cooking time", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (ingredients === "") {
      toast.warn("Enter ingredients", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (instructions === "") {
      toast.warn("Enter instructions", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (image.length === 0) {
      Axios.put(
        `http://localhost:5000/edit/${localStorage.getItem("editRecipeId")}`,
        {
          name: name,
          description: description,
          category: category,
          image: localStorage.getItem("editimage"),
          preparationtime: preparationtime,
          cookingtime: cookingtime,
          ingredients: ingredients,
          instructions: instructions,
          uploadedby: uploadedby,
        }
      );
      toast.success("Sucessfuly Edited Recipe", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "uiarhyf8");

      Axios.post(
        `https://api.cloudinary.com/v1_1/dsxghrclx/image/upload`,
        formData
      ).then((res) => {
        const fileName = res.data.public_id;

        Axios.put(
          `http://localhost:5000/edit/${localStorage.getItem("editRecipeId")}`,
          {
            name: name,
            description: description,
            category: category,
            image: fileName,
            preparationtime: preparationtime,
            cookingtime: cookingtime,
            ingredients: ingredients,
            instructions: instructions,
            uploadedby: uploadedby,
          }
        );
      });
      toast.success("Sucessfuly Edited Recipe", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
        {recipedata.map((val) => {
          return (
            <form>
              <div className="row">
                <label>Name of the Recipe</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="row pt-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="row pt-5">
                <div className="col-3">
                  <label>Recipe Category:</label>
                </div>
                <div className="col-4">
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>American</option>
                    <option>Nepali</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Italian</option>
                    <option>Indian</option>
                  </select>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-3">
                  <label>Upload Image:</label>
                </div>
                <div className="col-4">
                  <input
                    type="file"
                    class="form-control-file"
                    id="imageupload"
                    onChange={(e) => setImage(e.target.files)}
                  />
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-6">
                  <label>Preparation Time</label>
                  <input
                    className="form-control"
                    value={preparationtime}
                    onChange={(e) => setPreparationtime(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label>Cooking Time</label>
                  <input
                    className="form-control"
                    value={cookingtime}
                    onChange={(e) => setCookingtime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row pt-3">
                <label>Ingredients</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                />
              </div>
              <div className="row pt-3">
                <label>Instructions</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  required
                />
              </div>
              <div className="row pt-5 pb-5">
                <button type="button" class="btn btn-primary" onClick={upload}>
                  submit
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </>
  );
}

export default EditRecipe;
