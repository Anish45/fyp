const mysql = require("mysql");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  //const password = req.body.password;

  if (email === "" || username === "" || password === "") {
    res.send("empty field");
  } else {
    db.query("SELECT * FROM register WHERE email = ?", email, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.status(422).json({ message: "user already exist" });
      } else {
        db.query(
          "INSERT INTO register(email, username, password) VALUES (?,?,?)",
          [email, username, password],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("successfully registered");
            }
          }
        );
      }
    });
  }
});

router.post("/getemail", (req, res) => {
  db.query("Select email from register"),
    (err,
    (result) => {
      console.log(err);
    });
});

module.exports = router;
