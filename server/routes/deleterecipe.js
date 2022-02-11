const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.delete("/:recipeid", (req, res) => {
  const recipeId = req.params.recipeid;
  db.query("DELETE from recipes WHERE id = ?;", recipeId, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

module.exports = router;
