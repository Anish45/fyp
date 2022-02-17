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
  const userName = req.params.username;
  db.query(
    "SELECT * FROM recipes WHERE uploadedby IN (SELECT following FROM followers where followedby = ?);",
    userName,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

module.exports = router;
