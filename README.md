# NoteMon - A simple note-taking app 📝

![Cover Image](https://raw.githubusercontent.com/ashirhashmi/notemon/refs/heads/main/frontend/public/github-cover.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with a backend in Express and MongoDB.

**[Live Demo](https://notemon.vercel.app/)**

## 💻 Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB running locally or in a cloud environment

## 📖 Installation

Install node modules for both frontend and backend.

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

#### Environment Variables

Create an env file inside the frontend folder with the following variables:

```REACT_APP_BACKEND_URL``` 

[a url where the backend is hosted]

Create an env file inside the backend folder with the following variables:

`MONGODB_URI` 

[[MongoDB connection string](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string)]

`PORT` 

[A port which does not conflict with your React application e.g `3001`]

## 🚀 How to run (locally)

After making sure your mongoDB is live, you would need two terminals to run frontend and backend seperately:

From the root of the project, run

```bash
cd frontend
npm run start
```

then from a new terminal, run:

```bash
cd backend
npm run start
```

And that's it! Your project should be up and running ❤.
