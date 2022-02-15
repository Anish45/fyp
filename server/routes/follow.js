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
    "INSERT INTO followers (followedby, following) VALUES (?, ?);",
    [followedby, following],
    (err, results) => {
      res.send(results);
    }
  );
});

router.get("/:followedby", (req, res) => {
  const followedby = req.params.followedby;

  db.query(
    "SELECT COUNT(followedby) as countfollowing FROM followers where followedby = ?",
    followedby,
    (err, results) => {
      res.send(results);
    }
  );
});

router.delete("/:followedby/:following", (req, res) => {
  const followedby = req.params.followedby;
  const following = req.params.following;
  db.query(
    "DELETE FROM followers WHERE (followedby = ?) and (following = ?)",
    [followedby, following],
    (err, results) => {
      res.send(results);
    }
  );
});
module.exports = router;
