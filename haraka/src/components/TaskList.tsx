import React, { useState } from "react";
import "../styles/TaskList.css";

type Task = {
  id: number;
  title: string;
  status: string;
  category: string;
  deadline: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design homepage", status: "Pending", category: "UI", deadline: "2025-10-29" },
    { id: 2, title: "Develop API", status: "In Progress", category: "Backend", deadline: "2025-10-30" },
    { id: 3, title: "Write unit tests", status: "Done", category: "Testing", deadline: "2025-10-27" },
  ]);

  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    status: "Pending",
    category: "",
    deadline: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  // 🔍 Filter tasks
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.category || !newTask.deadline) {
      alert("Please fill in all fields before adding a task.");
      return;
    }

    const newItem: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      status: newTask.status,
      category: newTask.category,
      deadline: newTask.deadline,
    };

    setTasks([...tasks, newItem]);
    setNewTask({ title: "", status: "Pending", category: "", deadline: "" });
  };

  // 🗑️ Delete
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✏️ Edit
  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  // 💾 Save edit
  const handleSave = () => {
    if (editedTask) {
      setTasks(tasks.map(task => (task.id === editedTask.id ? editedTask : task)));
      setEditingId(null);
      setEditedTask(null);
    }
  };

  // ❌ Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditedTask(null);
  };

  return (
    <div className="task-list">
      <h3>Task List</h3>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ➕ Add Task Form */}
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
        <button type="submit" className="add-btn">➕ Add</button>
      </form>

      {/* 📋 Task Table */}
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
            <tr key={task.id}>
              {editingId === task.id && editedTask ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={editedTask.status}
                      onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
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
                      onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editedTask.deadline}
                      onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
                    />
                  </td>
                  <td>
                    <button className="save" onClick={handleSave}>💾</button>
                    <button className="cancel" onClick={handleCancel}>❌</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.title}</td>
                  <td className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                  </td>
                  <td>{task.category}</td>
                  <td>{task.deadline}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(task)}>✏️</button>
                    <button className="delete" onClick={() => handleDelete(task.id)}>🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}

          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "gray" }}>
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
