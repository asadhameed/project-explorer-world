## Available Scripts

In the project directory, you can run:

#### Problems

1. (node:9608) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. [See](https://mongoosejs.com/docs/deprecations.html#findandmodify) (Use `node --trace-deprecation ...` to show where the warning was created) <strong> Solution </strong> mongoose.set('useFindAndModify', false) (app.js)
2. !!undefine and !!null will return false(file-upload.js)

### `npm init`

This command will create a project.

### `npm install --save express`

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.<br />
[Read More About Express](https://expressjs.com/)

### `npm install --save-dev nodemon`

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.<br />
[Read More About Express](https://www.npmjs.com/package/nodemon/)

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

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm test`

Runs the test and shows the test result. The result shows how many Test suites, how many tests are passed and how many tests are failed.<br />
