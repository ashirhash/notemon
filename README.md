# NoteMon - A simple note-taking app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with a backend in Express and MongoDB.

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
Create an env file inside the backend folder. Create the following variables inside the env file, which by default are as follows:

`MONGODB_URI = mongodb://localhost:27017/todolist` 

([MongoDB connection string](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string))

`PORT = 3001`

(A port which does not conflict with your React application)

Go to package.json in the root directory and add the same port as the proxy key, for example:

`"proxy": "http://localhost:3001"`

## How to run

After making sure your mongoDB is live, you would need two terminals to run frontend and backend seperately.

From the root of the project, run

```bash
  npm run start
```

From a new terminal, run

```bash
  cd backend
  node server.js
```

And that's it! Your project should be up and running.