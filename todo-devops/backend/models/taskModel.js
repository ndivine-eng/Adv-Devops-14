// backend/models/taskModel.js
import mongoose from "mongoose";

// 1️ Define the Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "pending" },
  category: { type: String, default: "" },
  deadline: { type: Date },
}, { timestamps: true });

// 2️ Create the Task model
const Task = mongoose.model("Task", taskSchema);

// 3️ CRUD functions
export const createTask = async (data) => {
  const task = new Task(data);
  return await task.save();
};

export const getAllTasks = async () => {
  return await Task.find(); // fetch all tasks
};

export const getTaskById = async (id) => {
  return await Task.findById(id);
};

export const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  return result ? true : false;
};
