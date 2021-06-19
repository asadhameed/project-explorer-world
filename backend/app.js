const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("Client Request");
  res.send("Ok");
});

app.listen(5000);
