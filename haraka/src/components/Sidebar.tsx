import { Home, ListTodo, BarChart2, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-md border-r border-gray-200 flex flex-col">
      {/* Logo / App name */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800">
          <span role="img" aria-label="rocket">🚀</span>
          <span>Haraka</span>
        </h1>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium text-gray-700">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 bg-blue-50 text-blue-600">
          <Home size={18} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 cursor-pointer">
          <ListTodo size={18} />
          <span>Tasks</span>
        </div>

        <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 cursor-pointer">
          <BarChart2 size={18} />
          <span>Analytics</span>
        </div>

        <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 cursor-pointer">
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button className="w-full text-left text-gray-600 text-sm font-medium hover:text-red-600 hover:bg-red-50 rounded-md px-3 py-2">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
