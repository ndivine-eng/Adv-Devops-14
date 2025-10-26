import { Edit, Trash2 } from "lucide-react";

interface Task {
  id: number;
  task: string;
  status: "Pending" | "In Progress" | "Done";
  category: string;
  deadline: string;
}

const tasks: Task[] = [
  { id: 1, task: "Design homepage", status: "Pending", category: "UI", deadline: "Sep 15" },
  { id: 2, task: "Develop API", status: "In Progress", category: "Backend", deadline: "Sep 12" },
  { id: 3, task: "Write unit tests", status: "Done", category: "Testing", deadline: "Sep 10" },
  { id: 4, task: "Create landing page", status: "Pending", category: "UI", deadline: "Sep 18" },
];

const TaskTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mt-4">
      <h3 className="text-lg font-semibold mb-4">Task List</h3>
      <input
        type="text"
        placeholder="Search"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:ring focus:ring-blue-200"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="py-2">Task</th>
            <th>Status</th>
            <th>Category</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{task.task}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
              <td>{task.category}</td>
              <td>{task.deadline}</td>
              <td className="flex gap-3">
                <Edit size={16} className="text-gray-500 cursor-pointer hover:text-blue-500" />
                <Trash2 size={16} className="text-gray-500 cursor-pointer hover:text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
