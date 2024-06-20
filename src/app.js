const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("index.html");
});

app.post("/upload", (req, res) => {
    console.log("POST");
    console.log(req.worldStateFile);
    res.sendStatus(200);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})