const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.get("/:uploader", (req, res) => {
  const uploader = req.params.uploader;
  db.query(
    "SELECT DISTINCT(remainderdate) FROM shoppinglist WHERE uploader = ?;",
    uploader,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

router.put("/:remainderdate/:uploader", (req, res) => {
  const remainderdate = req.params.remainderdate;
  const uploader = req.params.uploader;
  db.query(
    "UPDATE shoppinglist SET remainderdate = ?  WHERE uploader  = ?;",
    [remainderdate, uploader],
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
