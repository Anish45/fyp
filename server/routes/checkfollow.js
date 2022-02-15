const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.post("/", (req, res) => {
  const followedby = req.body.followedby;
  const following = req.body.following;

  db.query(
    "SELECT * FROM followers WHERE (followedby = ?) AND (following = ?)",
    [followedby, following],
    (err, results) => {
      if (results.length > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  );
});

router.get("/:following", (req, res) => {
  const following = req.params.following;

  db.query(
    "SELECT COUNT(following) as countfollower FROM followers where following = ?",
    following,
    (err, results) => {
      res.send(results);
    }
  );
});
module.exports = router;
