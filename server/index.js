require("dotenv").config();
const express = require("express");
const cors = require("cors");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const uploadrecipeRoute = require("./routes/uploadRecipe");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/upload", uploadrecipeRoute);

app.listen(5000, () => {
  console.log("server running at port 5000");
});
