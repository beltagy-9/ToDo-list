// src/pages/TodayPage.jsx
import { useState } from "react";



export default function TodayPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 " 
        style={{backgroundColor:"var(--color-bg-card)"}}>
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4"
        style={{backgroundColor:"var(--color-bg-card)"}}> Today Tasks</h1>

        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className=" text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            style={{backgroundColor:"var(--color-primary)"}}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-3 rounded-lg shadow-sm"
                          style={{backgroundColor:"var(--color-bg-page)"}}

            >
              <span
                onClick={() => toggleTask(task.id)}
                className="flex-1 cursor-pointer "
                style={{
    textDecoration: task.completed ? "line-through" : "none",
    color: task.completed ? "var(--color-completed)" : "inherit",
  }}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-sm "
        style={{ color: "var(--color-text-muted)" }}
        >
          Total: {tasks.length} | Completed:{" "}
          {tasks.filter((t) => t.completed).length} | Remaining:{" "}
          {tasks.filter((t) => !t.completed).length}
        </div>
      </div>
    </div>
  );
}
