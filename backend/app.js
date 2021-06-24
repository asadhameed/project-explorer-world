const express = require("express");
const mongoose = require("mongoose");

const HttpError = require("./src/models/http-error");
const placesRouter = require("./src/routes/places-routes");
const usersRouter = require("./src/routes/users-routes");

const app = express();
app.use(express.json());

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

/******************************************
 * Register A new Middleware function
 * This only runs if we didn't send the response to one of our routes before
 */
app.use((req, res, next) => {
  throw new HttpError("couldn't found Path", 404);
});

app.use((error, req, res, next) => {
  if (res.headersSend) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown Error occurred!" });
});

mongoose
  .connect("mongodb://localhost:27017/placeVisited", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect with mongoose and Server is running");
    app.listen(5000);
  })
  .catch((error) =>
    console.log(`Error occur with mongoose connection ${error} `)
  );
