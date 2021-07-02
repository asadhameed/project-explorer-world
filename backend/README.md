## Available Scripts

In the project directory, you can run:

#### Problems

1. (node:9608) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. [See](https://mongoosejs.com/docs/deprecations.html#findandmodify) (Use `node --trace-deprecation ...` to show where the warning was created) <strong> Solution </strong> mongoose.set('useFindAndModify', false) (app.js)
2. !!undefine and !!null will return false(file-upload.js)
3. special note if return promise then write code inside in try catch block
4. Compare String and object will give some logical error (check-auth.js)
5. Some time the browser send OPTIONS METHOD. If you use middleware function then try to call next middleware (check-auth.js).If remove the req.method="OPTIONS" when you create, update, delete the place then browser will send two request and you will never create, delete, update the place.
6. Deploy app on heroku, create directory uploads\images otherwise the application will not upload image and application will not running.

### `npm init`

This command will create a project.

### `npm install --save express`

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.<br />
[Read More About Express](https://expressjs.com/)

### `npm install --save-dev nodemon`

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.<br />
[Read More About Nodemon](https://www.npmjs.com/package/nodemon/)

### `npm install --save express-validator`

Express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions..<br />
[Read More About Express Validator](https://express-validator.github.io/docs/)

### `npm install --save axios`

Promise based HTTP client for the browser and node.js <br />
[Read More About Axios](https://axios-http.com/)

### `npm install --save mongoose`

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. <br />
[Read More About Mongoose](https://mongoosejs.com/docs/guide.html)

### `npm install --save multer`

Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form. <br />
[Read More About multer](https://github.com/expressjs/multer)

### `npm install --save uuid`

To create a random UUID. <br />
[Read More About uuid](https://www.npmjs.com/package/uuid)

### `npm install --save bcrypt`

A library to help you hash passwords. <br />
[Read More About bcrypt](https://www.npmjs.com/package/bcrypt)

### `npm install --save jsonwebtoken`

An implementation of JSON Web Tokens. <br />
[Read More About JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm install -save cors`

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.\

See the section about [cors](https://www.npmjs.com/package/cors) for more information.

### `npm test`

Runs the test and shows the test result. The result shows how many Test suites, how many tests are passed and how many tests are failed.<br />

## How can Deploy the code on heroku hosting

You can configure heroku with github directly. When you push code to the github then code directly deploy to heroku.
In our case the project consists on backend and client in github. You should do the following steps.

1. Keep src code in build folder and build code should be but in .gitignore file.
2. First time runs the heroku then do the following steps otherwise go to step 3.
   1. create a application on heroku side.
   2. If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key. `heroku login`
   3. Create a new Git repository , Initialize a git repository in a new or existing directory.\
      `cd build/`\
      `git init`\
      `heroku git:remote -a heroku_app_name`
3. Deploy your application, Commit your code to the repository and deploy it to Heroku using Git.
   `git add .`\
   `git commit -am "commit comments"`\
   `git push heroku master`

### Change the nodemon to node in package.json

Open package.json and change the following code
`"start": "nodemon app.js"` change to `"start": "node app.js"`
If you forget this then may be you face error because nodemon is running if you are working on development stage.
For production you should Run the code on hosting side node env.

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

Remove the following code from app.js Because both will running in the same server

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

## [Deploy the client and backend on same server in heroku hosting](#how-can-deploy-the-code-on-heroku-hosting)

#### The code is deploy on heroku.
