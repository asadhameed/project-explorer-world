const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
// const cors = require("cors");

const HttpError = require("./src/models/http-error");
const placesRouter = require("./src/routes/places-routes");
const usersRouter = require("./src/routes/users-routes");

const app = express();
app.use(express.json());
// app.use(cors({}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET  , PATCH, DELETE");
  next();
});
app.use(
  "/src/uploads/images",
  express.static(path.join("src", "uploads", "images"))
);
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
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      if (error) console.log(error);
    });
  }

  if (res.headersSend) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown Error occurred!" });
});
console.log(process.env.DB_URL);
mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connect with mongoose and Server is running");
    app.listen(5000);
  })
  .catch((error) => {
    console.log(`Error occur with mongoose connection ${error} `);
  });
