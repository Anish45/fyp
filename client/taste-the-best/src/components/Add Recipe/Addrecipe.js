import React, { useRef, useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function Addrecipe() {
  const ref = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("American");
  const [image, setImage] = useState([]);
  const [preparationtime, setPreparationtime] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const uploadedby = localStorage.getItem("username");
  const { t } = useTranslation(["common"]);

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
      toast.warn("Enter picture", {
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
      if (formData === null) {
        alert("empty image");
      } else {
        Axios.post(
          `https://api.cloudinary.com/v1_1/dsxghrclx/image/upload`,
          formData
        ).then((res) => {
          const fileName = res.data.public_id;

          Axios.post("http://localhost:5000/upload", {
            name: name,
            description: description,
            category: category,
            image: fileName,
            preparationtime: preparationtime,
            cookingtime: cookingtime,
            ingredients: ingredients,
            instructions: instructions,
            uploadedby: uploadedby,
          }).then(() => {
            toast.success("Sucessfuly Uploaded Recipe", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setName("");
            setDescription("");
            setCategory("American");
            ref.current.value = "";
            setPreparationtime("");
            setCookingtime("");
            setIngredients("");
            setInstructions("");
            console.log("hello");
          });
        });
      }
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
        <form>
          <div className="row">
            <label>{t("nameoftherecipe")}</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="row pt-3">
            <label>{t("description")}</label>
            <textarea
              className="form-control"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="row pt-5">
            <div className="col-3">
              <label>{t("recipecategory")}:</label>
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
              <label>{t("uploadimage")}:</label>
            </div>
            <div className="col-4">
              <input
                type="file"
                ref={ref}
                class="form-control-file"
                id="exampleFormControlFile1"
                onChange={(e) => setImage(e.target.files)}
              />
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-6">
              <label>{t("preparationtime")}</label>
              <input
                className="form-control"
                value={preparationtime}
                onChange={(e) => setPreparationtime(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label>{t("cookingtime")}</label>
              <input
                className="form-control"
                value={cookingtime}
                onChange={(e) => setCookingtime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row pt-3">
            <label>{t("ingredients")}</label>
            <textarea
              className="form-control"
              rows={3}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div className="row pt-3">
            <label>{t("instructions")}</label>
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
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addrecipe;
