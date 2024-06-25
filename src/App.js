import "./App.css";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function App() {
  return (
       <div className="main-container">
      <h1>To do List</h1>
      <div className="body-container">
      <AddTask/>
      <TaskList/>
      </div>
    </div>
  );
}

export default App;
