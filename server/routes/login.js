const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM register WHERE email = ?", email, (err, result) => {
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

module.exports = router;
