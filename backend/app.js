const express = require("express");

const HttpError = require("./src/models/http-error");
const placesRouter = require("./src/routes/places-routes");

const app = express();
app.use(express.json());

app.use("/api/places", placesRouter);

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
app.listen(5000);
