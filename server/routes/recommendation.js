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

router.post("/", (req, res) => {

})

router.get("/", (req, res) => {
    const childPython = spawn('python', ['C:/Users/Anish/Desktop/fyp/server/routes/recommendation.py', "Amazing Spider-Man, The (2012)", 1]);



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
