const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

module.exports = router;
