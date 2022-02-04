const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const image = req.body.image;
  const preparationtime = req.body.preparationtime;
  const cookingtime = req.body.cookingtime;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;
  const date = new Date().toLocaleString();

  db.query(
    "INSERT INTO recipes (name, description, category, image, preparationtime, cookingtime, ingredients, instructions, date) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?);",
    [
      name,
      description,
      category,
      image,
      preparationtime,
      cookingtime,
      ingredients,
      instructions,
      date,
    ],
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
