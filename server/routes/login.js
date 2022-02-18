const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { response } = require("express");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE username = ?", username, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.status(200).json({ message: "Logged in" });
        } else {
          res.status(400).json({ message: "Invalid Credentials" });
        }
      });
    } else {
      res.status(400).json({ message: "can't find user" });
    }
  });
});

router.get("/:user", (req, res) => {
  const user = req.params.user;

  db.query("SELECT * FROM user WHERE username = ?", user, (err, result) => {
    if (result) {
      res.send(result);
    }
  });
});

module.exports = router;
