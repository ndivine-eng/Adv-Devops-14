import React from "react";
import Topbar from "../components/Topbar";
import Dashboard from "../components/Dashboard";
import TaskList from "../components/TaskList";

const Home: React.FC = () => {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h1>Hello, User 👋</h1>
        <Topbar />
      <Dashboard />
      <TaskList />
    </div>
  );
};

export default Home;
