# Project Description

This is a MERN Fullstack Project with React, Nodejs, MongoDB and Express. How to connect React with Nodejs, MOngoDB and express.

1. User can make profile
2. Authentication & Authorization
3. Create a place, Update and delete a place.
4. User can view places of other users

#### Project Structure

This project consist of tow modules

1.  Client, The client code is deploy on [firebase](https://console.firebase.google.com) hosting side. For more details please click on clint folder.
2.  BackEnd, The backend code is deploy on [heroku](http://heroku.com/) hosting side. For more details please click on backend folder.

## Deploying a Combined App (Backend and client) on heroku

The following steps should required to keep both side on one server

1. Copy the backend code in build-combine folder.
2. On client change the .env.production REACT_APP_BACKEND_URL variable to your heroku app address.
3. On client or frontend `npm run build` it will build the frontend code into a static pages.
4. copy all files from client/build and paste it in the backend build-combine/public folder.
5. Inside on backend/build-combine have the app.js file so do the following changes

Remove the following code from app.js.

```js
app.use((req, res, next) => {
  throw new HttpError("couldn't found Path", 404);
});
```

And before placesRouter and usersRouter put the following code

```js
app.use(express.static(path.join("public")));
```

And After placesRouter and userRouter put the following code

```js
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
```

The overall code will be the following

```js
app.use(express.static(path.join("public")));

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
```

Remove the following code from app.js Because both projects will running in the same server

```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET  , PATCH, DELETE");
  next();
});
```

## How can Deploy the code on heroku hosting

You can configure heroku with github directly. When you push code to the github then code directly deploy to heroku.
In our case the project consists on backend and client in github. You should do the following steps.

1. Keep src code in build folder and build code should be but in .gitignore file.
2. First time runs the heroku then do the following steps otherwise go to step 3.
   1. create a application on heroku side.
   2. If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key. `npm heroku login`
   3. Create a new Git repository , Initialize a git repository in a new or existing directory.
      `cd build/`
      `git init`
      `heroku git:remote -a heroku_app_name`
3. Deploy your application, Commit your code to the repository and deploy it to Heroku using Git.
   `git add .`
   `git commit -am "commit comments"`
   `git push heroku master`

###### The App.js file is available so you can copy and paste inside backend/build-combine
