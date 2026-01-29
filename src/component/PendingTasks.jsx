import React, { useState } from "react";
import "./Dashboard.css";

const MAX_TASKS = 5;

const PendingTasks = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("pending-tasks")) || [];
  });

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("pending-tasks", JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (tasks.length >= MAX_TASKS) return;
    saveTasks([...tasks, ""]);
  };

  const updateTask = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    saveTasks(newTasks);
  };

  const resetTasks = () => {
    setTasks([]);
    localStorage.removeItem("pending-tasks");
  };

  return (
    <div className="pending-container">
      <div className="pending-header">
        <button
          className="pending-icon"
          onClick={addTask}
          title="Add task"
          disabled={tasks.length >= MAX_TASKS}
        >
          +
        </button>

        <h2>Pending Tasks</h2>

        <button
          className="pending-icon"
          onClick={resetTasks}
          title="Reset tasks"
        >
          ↺
        </button>
      </div>

      {tasks.map((task, index) => (
        <div className="pending-item" key={index}>
          <input
            className="pending-input"
            placeholder={`Task ${index + 1}`}
            value={task}
            onChange={(e) => updateTask(index, e.target.value)}
          />
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="pending-empty">No pending tasks</div>
      )}
    </div>
  );
};

export default PendingTasks;
