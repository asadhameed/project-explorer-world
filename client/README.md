# Getting Started with Create React App

#### Problems

1. When a user switch from login to signUp the input value is don't rest. (Inputs.js comments). For rest the input value i change the logic and introduce the restInput props (Input.js) and change code inside from_hook.js
2. If Request send for fetch and if we change the page so fast then we may be get an error because we update the component which don't part of the screen. The solution is the ongoing request can cancel (http-hook.js const activeHttpRequest logic is used)

#### Package Install

### `npm install --save react-router-dom`

### `npm install --save react-transition-group`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### Errors:-

- 1. Error: Too many re-renders. React limits the number of renders to prevent an infinite loop. Because i call function setFormDate (PlaceUpdate.js) and this re-renders components again and again.</br>
     <strong> Solution </strong> Use the useEffect hook from React (PlaceUpdate.js).
- 2. LogicalError: After useEffect then state change in PlaceUpdate but the input did not show the values because the input
     is first initial. </br>
     <strong> Solution:-</strong> Check the state.inputs.title.value if empty then return loading page otherwise update the input fields (PlaceUpdate.js)
