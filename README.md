# NoteMon - A simple note-taking app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with a backend in Express and MongoDB.

**[Live Demo](https://notemon.vercel.app/)**

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB running locally or in a cloud environment

## Installation

From the root of the project, install node_modules for both root and the backend.

```bash
  npm install
```

```bash
  cd backend
  npm install
```
Create an env file inside the backend folder. Create the following variables inside the env file:

`MONGODB_URI` ([MongoDB connection string](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string))

`PORT` (A port which does not conflict with your React application)

Go to package.json in the root directory and add the same port as the proxy key, for example if you set `PORT=3001`, then set:

`"proxy": "http://localhost:3001"`

## How to run

After making sure your mongoDB is live, you would need two terminals to run frontend and backend seperately.

From the root of the project, run

```bash
  npm run start
```

From a new terminal and root of the project, run

```bash
  cd backend
  node server.js
```

And that's it! Your project should be up and running.
