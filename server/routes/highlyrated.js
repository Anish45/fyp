const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.get("/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "select * from recipes INNER Join ratings on recipes.id = ratings.recipeid where ratedby = ?",
    username,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

module.exports = router;
