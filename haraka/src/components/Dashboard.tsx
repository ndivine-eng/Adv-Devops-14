import React from "react";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="card">
          <h3>5</h3>
          <p>Tasks completed today</p>
        </div>
        <div className="card">
          <h3>3</h3>
          <p>Upcoming deadlines</p>
        </div>
        <div className="card">
          <h3>2</h3>
          <p>Overdue tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
