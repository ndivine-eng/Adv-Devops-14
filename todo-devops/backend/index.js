import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Make backend run on 5000 to match Axios
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/taskdb";

// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/tasks", taskRouter);

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
