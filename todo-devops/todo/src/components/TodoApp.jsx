import { useState, useEffect } from "react";
import API from "../api"; // Axios instance

function HarakaApp() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    status: "Pending",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.deadline) {
      alert("Please fill in Title, Category, and Deadline.");
      return;
    }

    try {
      if (editingId) {
        const res = await API.put(`/${editingId}`, form);
        setTasks(tasks.map((t) => (t._id === editingId ? res.data : t)));
        setEditingId(null);
      } else {
        const res = await API.post("/", form);
        setTasks([...tasks, res.data]);
      }
      setForm({
        title: "",
        description: "",
        category: "",
        deadline: "",
        status: "Pending",
      });
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Start editing
  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      category: task.category,
      deadline: task.deadline,
      status: task.status,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Haraka App</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-gray-50 p-4 rounded shadow space-y-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Deadline</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border p-2">{task.title}</td>
              <td className="border p-2">{task.description}</td>
              <td className="border p-2">{task.category}</td>
              <td className="border p-2">{task.deadline}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No tasks yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HarakaApp;
