const express = require("express");

const placesRouter = require("./src/routes/places-routes");

const app = express();
app.get("/", (req, res) => {
  console.log("Client Request");
  res.send("Ok");
});

app.use("/api/places", placesRouter);
app.use((error, req, res, next) => {
  if (res.headersSend) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown Error occurred!" });
});
app.listen(5000);
