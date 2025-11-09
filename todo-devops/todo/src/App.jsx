import React from "react";
import TodoApp from "./components/TodoApp";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div>
      {/* <TaskList/> */}
       {/* TaskList component is now integrated within TodoApp  */}
      <TodoApp />        
    </div>
  );
}

export default App;
