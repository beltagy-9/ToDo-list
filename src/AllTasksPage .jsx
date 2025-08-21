import { useState } from "react";

export default function AllTasksPage() {
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
    <div
      style={{ backgroundColor: "var(--color-bg-page)" }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div
        style={{ backgroundColor: "var(--color-bg-card)" }}
        className="shadow-lg rounded-2xl w-full max-w-lg p-6"
      >
        <h1
          style={{ color: "var(--color-text-main)" }}
          className="text-2xl font-bold text-center mb-4"
        >
          📋 All Tasks
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            style={{
              border: "1px solid var(--color-text-muted)",
              color: "var(--color-text-main)",
            }}
            className="flex-1 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
          />
          <button
            onClick={addTask}
            style={{
              backgroundColor: "var(--color-primary)",
            }}
            className="text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{ backgroundColor: "var(--color-task-bg)" }}
              className="flex justify-between items-center p-3 rounded-lg shadow-sm"
            >
              <span
                onClick={() => toggleTask(task.id)}
                style={{
                  color: task.completed
                    ? "var(--color-completed)"
                    : "var(--color-text-main)",
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                className="flex-1 cursor-pointer"
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ color: "var(--color-danger)" }}
                className="hover:opacity-80 ml-2"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {/* Counter */}
        <div
          style={{ color: "var(--color-text-muted)" }}
          className="mt-4 text-sm"
        >
          Total: {tasks.length} | Completed:{" "}
          {tasks.filter((t) => t.completed).length} | Remaining:{" "}
          {tasks.filter((t) => !t.completed).length}
        </div>
      </div>
    </div>
  );
}
