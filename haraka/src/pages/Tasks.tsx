import React from "react";
import TaskList from "../components/TaskList";
import Topbar from "../components/Topbar";

const Tasks: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Topbar />
      <TaskList />
    </div>
  );
};

export default Tasks;
