const express = require("express");

const placesRouter = require("./src/routes/places-routes");

const app = express();
app.get("/", (req, res) => {
  console.log("Client Request");
  res.send("Ok");
});

app.use("/api/places", placesRouter);
app.listen(5000);
