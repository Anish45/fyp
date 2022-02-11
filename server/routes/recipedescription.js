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

module.exports = router;
