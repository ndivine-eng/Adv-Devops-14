import React, { useState } from 'react';

const Topbar: React.FC = () => {
  const [notifications, setNotifications] = useState(0);

  const handleAddNotification = () => {
    setNotifications(notifications + 1);
  };

  return (
    <div style={{
      backgroundColor: "#6200ea",
      color: "white",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <h2>Haraka Dashboard</h2>
      <div>
        <button onClick={handleAddNotification} style={{
          background: "white",
          color: "#6200ea",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}>
          + Add Notification
        </button>
        <span style={{ marginLeft: "10px" }}>🔔 {notifications}</span>
      </div>
    </div>
  );
};

export default Topbar;
