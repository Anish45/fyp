require("dotenv").config();
const express = require("express");
const cors = require("cors");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const uploadrecipeRoute = require("./routes/uploadRecipe");
const profile = require("./routes/profile");
const userDetails = require("./routes/userDetails");
const recipeDetails = require("./routes/recipedescription");
const editRecipe = require("./routes/editrecipe");
const deleteRecipe = require("./routes/deleterecipe");
const editProfile = require("./routes/editprofile");
const follow = require("./routes/follow");
const checkFollow = require("./routes/checkfollow");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/upload", uploadrecipeRoute);
app.use("/profile", profile);
app.use("/userdetails", userDetails);
app.use("/recipedescription", recipeDetails);
app.use("/edit", editRecipe);
app.use("/delete", deleteRecipe);
app.use("/editprofile", editProfile);
app.use("/follow", follow);
app.use("/checkfollow", checkFollow);

app.listen(5000, () => {
  console.log("server running at port 5000");
});
