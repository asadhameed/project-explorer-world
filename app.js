const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const HttpError = require("./src/models/http-error");
const placesRouter = require("./src/routes/places-routes");
const usersRouter = require("./src/routes/users-routes");

const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin , X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   res.setHeader("Access-Control-Allow-Methods", "GET  , PATCH, DELETE");
//   next();
// });
app.use(
  "/src/uploads/images",
  express.static(path.join("src", "uploads", "images"))
);

/********************************************************************
 * Special Note
 * If we put app.use(express.static(path.join("public"))); before  the placeRouter and usersRouter
 * then we can access the client side but we can not access the backend routers
 * so to avoid this problem  the we define another middleware function
 *
 *****************************************************************/
app.use(express.static(path.join("public")));

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// app.use((req, res, next) => {
//   throw new HttpError("couldn't found Path", 404);
// });

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
mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Keep project file in build and Run it ");
    console.log("Connect with mongoose and Server is running");
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => {
    console.log(`Error occur with mongoose connection ${error} `);
  });
