const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const {spawn} = require('child_process');
const { type } = require("os");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "fyp",
});

router.get("/recommended", (req, res) => {
    db.query("SELECT * FROM recipes", (err, result) => {
        if(err){
            console.log(err)
        }
        res.send(result);
    });
})

router.get("/:title/:rating", (req, res) => {
    const title = req.params.title;
    const rating = req.params.rating;
    const childPython = spawn('python', ['C:/Users/Anish/Desktop/fyp/server/routes/recommendation.py', title, rating]);



childPython.stdout.on('data', (data) => {
    console.log(data.toString());
    res.send(data.toString());
})


childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
})

childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
})
})





module.exports = router;
