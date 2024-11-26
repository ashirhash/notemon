import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import { Todo } from "./models/Todo.js";

const app = express();
const port = process.env.PORT || 3001;

// Load environment variables from the .env file
dotenv.config();

app.use(cors());
app.use(express.json());

const url = process.env.MONGODB_URI;
await mongoose.connect(url);

// Route to fetch users
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

// Route to create users
app.post("/api/todos/create", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const employee = new Todo({ name });
    await employee.save();
    res.status(200).json({ message: "new user created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
    console.error(error, "error creating user");
  }
});

// Route to edit a user
app.post("/api/todos/edit", async (req, res) => {
  const { id, name } = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(id, { name });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo edited" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing Todo", error: error.message });
  }
});

// Route to delete a user
app.post("/api/todos/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Todo.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Todo", error: error.message });
  }
});

// Route to delete many users

app.post("/api/todos/deleteall", async (req, res) => {

  const { ids } = req.body;

  console.log(ids);
  

  if (!Array.isArray(ids) || ids.length === 0) {

    return res.status(400).json({ message: "Invalid or empty IDs array." });

  }

  try {

    await Todo.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Todos deleted" });

  } catch (error) {

    res
      .status(500)
      .json({ message: "Error deleting Todos", error: error.message });
  }

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
