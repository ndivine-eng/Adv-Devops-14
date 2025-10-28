import React from "react";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h1 className="logo"> Haraka</h1>
      <nav className="menu">
        <a href="#" className="active">Dashboard</a>
        <a href="#">Tasks</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
      <a href="#" className="logout">Logout</a>
    </div>
  );
};

export default Sidebar;
