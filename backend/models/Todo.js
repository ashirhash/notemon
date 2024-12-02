import mongoose from 'mongoose';
import { Schema } from "mongoose";

const TodoSchema = new Schema({
  name: String,
});

export const Todo = mongoose.model('Todo', TodoSchema);