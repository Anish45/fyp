const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.put("/:username", (req, res) => {
  const userName = req.params.username;
  const picture = req.body.picture;

  db.query(
    "UPDATE user SET picture = ? WHERE username = ?;",
    [picture, userName],
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
