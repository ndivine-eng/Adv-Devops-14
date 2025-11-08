import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    status: "Pending",
    category: "",
    deadline: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  // Fetch tasks from backend
 const fetchTasks = async () => {
  try {
    const res = await API.get("/tasks");
    // Make sure tasks is an array
    setTasks(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks by search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.category || !newTask.deadline) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await API.post("/tasks", newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", status: "Pending", category: "", deadline: "" });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditedTask({ ...task });
  };

  const handleSave = async () => {
    try {
      const res = await API.put(`/tasks/${editedTask._id}`, editedTask);
      setTasks(tasks.map((t) => (t._id === editedTask._id ? res.data : t)));
      setEditingId(null);
      setEditedTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedTask(null);
  };

  return (
    <div className="task-list">
      <h3>Task List</h3>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Task */}
      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        />
        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">➕ Add</button>
      </form>

      {/* Task Table */}
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Category</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              {editingId === task._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={editedTask.status}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedTask.category}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, category: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editedTask.deadline}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, deadline: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button type="button" onClick={handleSave}>
                      💾
                    </button>
                    <button type="button" onClick={handleCancel}>
                      ❌
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.title}</td>
                  <td className={task.status.toLowerCase().replace(" ", "-")}>
                    {task.status}
                  </td>
                  <td>{task.category}</td>
                  <td>{task.deadline}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(task)}>
                      ✏️
                    </button>
                    <button type="button" onClick={() => handleDelete(task._id)}>
                      🗑️
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
