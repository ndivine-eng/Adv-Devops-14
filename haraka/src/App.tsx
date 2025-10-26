import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
