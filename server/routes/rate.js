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
    const ratedby = req.body.ratedby;
    const rating = req.body.rating;
    const recipeid = req.body.recipeid;
  
    db.query(
      "INSERT INTO ratings(ratedby, rating, recipeid) VALUES (?, ?, ?);",
      [
       ratedby,
       rating,
       recipeid,
      ],
      (err, results) => {
        res.send(results);
      }
    );
  });


  router.get("/getrate/:recipeid/:username", (req, res) => {
      const recipeid = req.params.recipeid;
      const username = req.params.username;

      db.query("SELECT rating from ratings where recipeid = ? and ratedby = ?", [recipeid, username], (err, results) => {
          if(err){
              console.log(err);
          }
          res.send(results);
      })
  })


  module.exports = router;