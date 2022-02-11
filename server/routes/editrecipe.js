const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.get("/:recipeid", (req, res) => {
  const recipeId = req.params.recipeid;
  db.query("SELECT * FROM recipes WHERE id = ?;", recipeId, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

router.put("/:editRecipeId", (req, res) => {
  const editRecipeId = req.params.editRecipeId;
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const image = req.body.image;
  const preparationtime = req.body.preparationtime;
  const cookingtime = req.body.cookingtime;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;
  const date = new Date().toDateString();

  db.query(
    "UPDATE recipes SET name = ?, description = ?, category = ?, image = ?, preparationtime = ?, cookingtime = ?, ingredients = ?, instructions = ?, date = ?  WHERE id  = ?;",
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
      editRecipeId,
    ],
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
