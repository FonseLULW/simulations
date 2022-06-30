const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("index.html");
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})