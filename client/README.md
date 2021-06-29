# Project Description

The front-end of the web application of <strong>Visited Places</strong>. <br>
The application has the following pages:

- <strong> Log in Page </strong>
- <strong> Sign Up Page </strong>
- <strong> Create A place, Delete a place, Update a place</strong>
- If A user is login or sign up then save token in localStorage but the token will expire in 1 hour. So after one hour later the user will be logout automatically (Auth-hooks.js).

# Project Note

1. [see concept Code-Splitting](https://reactjs.org/docs/code-splitting.html). Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don’t accidentally make it so large that your app takes a long time to load.

#### Problems

1. When a user switch from login to signUp the input value is don't rest. (Inputs.js comments). For rest the input value i change the logic and introduce the restInput props (Input.js) and change code inside from_hook.js
2. If Request send for fetch and if we change the page so fast then we may be get an error because we update the component which don't part of the screen. The solution is the ongoing request can cancel (http-hook.js const activeHttpRequest logic is used)
3. (http-hooks.js) If not use the useCallback hook then inside(Users.js) if the component update then call again the http-hooks then it will re render infinite time.
4. In fetch post method, without JSON.stringify (Place.js) gives an error "Access to fetch at 'http://localhost:5000/api/places/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled."
5. To redirect from one page to another you can also use useHistory hook form react-router-dom (see:- Place.js)
6. In delete place when used the useHistory hook that didn't update the page because router already in the same page (PlaceItem.js see the comments).
   <strong> Solution </strong> define a deleteHandler where filter the array and remove the element.
7. when use React.lazy(app.js) without fallback and Suspense give a error "Error: A React component suspended while rendering, but no fallback UI was specified." <strong> solution </strong> use the suspense component from react library and use it in the code

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

### Make a copy of .env and keep name of .env.production

#### Errors:-

- 1. Error: Too many re-renders. React limits the number of renders to prevent an infinite loop. Because i call function setFormDate (PlaceUpdate.js) and this re-renders components again and again.</br>
     <strong> Solution </strong> Use the useEffect hook from React (PlaceUpdate.js).
- 2. LogicalError: After useEffect then state change in PlaceUpdate but the input did not show the values because the input
     is first initial. </br>
     <strong> Solution:-</strong> Check the state.inputs.title.value if empty then return loading page otherwise update the input fields (PlaceUpdate.js)
