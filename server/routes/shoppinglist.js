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
  const ingredientname = req.body.ingredientname;
  const uploader = req.body.uploader;

  db.query(
    "INSERT INTO shoppinglist (ingredientname, uploader ) VALUES (?, ?);",
    [ingredientname, uploader],
    (err, results) => {
      res.send(results);
    }
  );
});

router.get("/:uploader", (req, res) => {
  const uploader = req.params.uploader;
  db.query(
    "SELECT * FROM shoppinglist WHERE uploader = ?",
    uploader,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE from shoppinglist WHERE id = ?;", id, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

router.delete("/removeall/:uploader", (req, res) => {
  const uploader = req.params.uploader;

  db.query(
    "DELETE from shoppinglist WHERE uploader = ?;",
    uploader,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

module.exports = router;
