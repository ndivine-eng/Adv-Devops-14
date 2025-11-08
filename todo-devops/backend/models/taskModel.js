import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "Pending" }, // Add status
  category: { type: String, default: "General" }, // Add category
  deadline: { type: String, default: "" }, // Add deadline
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

export const getAllTasks = async () => {
  return await Task.find();
};

export const getTaskById = async (id) => {
  return await Task.findById(id);
};

export const updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, { new: true, runValidators: true });
};

export const deleteTask = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  return !!result;
};
