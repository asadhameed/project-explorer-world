const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const placesRouter = require("./src/routes/places-routes");
const usersRouter = require("./src/routes/users-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/src/uploads/images",
  express.static(path.join("src", "uploads", "images"))
);

app.use(express.static(path.join("public")));
/********************************************************************
 * Special Note 1.
 * If we put app.use(express.static(path.join("public"))); before  the placeRouter and usersRouter
 * then we can access the client side but we can not access the backend routers
 * But here is one issue if a user on the following url and refresh the page
 * http://localhost:5000/auth
 *
 *  First route go through app.use("/api/places", placesRouter)  but the url  is different so move next
 *  Then router go through app.use("/api/users", usersRouter)  but url  is different  so move next
 *  Then router go through  app.use(express.static(path.join("public")))
 *  It will checking an auth directory in the public folder which don't exist so it gives the following error
 *  Cannot GET /auth
 * so to avoid this problem  the we define another middleware function
 * // app.use((req, res, next) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// }); after PlaceRouter and usersRouter 
 *
 *****************************************************************/

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

/********************************************************************
 * Special Note 2.
 *  If we put app.use(express.static(path.join("public"))); After  the placeRouter and usersRouter
 * Any Request which reached on the backend will go through the following router
 * app.use("/api/places", placesRouter)
 * app.use("/api/users", usersRouter);
 * But any request which not handle by the upper router  then move to app.use(express.static(path.join("public")));
 * And the router will return the contain of the public folder e.g index.html file.
 * Any javascript and css file which request form react-side can be serve but this alone is not enough
 *
 * Solutions of this problem:-   Special Note 1.
 *****************************************************************/

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
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
mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Keep project file in build and Run  working ");
    console.log("Connect with mongoose and Server is running");
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => {
    console.log(`Error occur with mongoose connection ${error} `);
  });
