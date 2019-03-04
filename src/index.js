const express = require("express");
const app = express();

app.get("/api", (req, res, next) => {
    res.json(["Test1","Test2","Test3","Test4","Test5"]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});