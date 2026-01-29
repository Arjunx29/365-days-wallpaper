import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Goals = () => {
  const [tasks, setTasks] = useState(() => {
    return {
      most: JSON.parse(localStorage.getItem("goal-most")) || { text: "", done: false },
      important: JSON.parse(localStorage.getItem("goal-important")) || { text: "", done: false },
      habit: JSON.parse(localStorage.getItem("goal-habit")) || { text: "", done: false }
    };
  });

  const resetGoals = () => {
    const empty = {
      most: { text: "", done: false },
      important: { text: "", done: false },
      habit: { text: "", done: false }
    };

    setTasks(empty);

    localStorage.removeItem("goal-most");
    localStorage.removeItem("goal-important");
    localStorage.removeItem("goal-habit");
  };


  const updateTask = (key, field, value) => {
    const newData = {
      ...tasks,
      [key]: {
        ...tasks[key],
        [field]: value
      }
    };
    setTasks(newData);
    localStorage.setItem(`goal-${key}`, JSON.stringify(newData[key]));
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
  <h2>Today's Goals</h2>
  <button
    className="goals-reset"
    onClick={resetGoals}
    title="Reset goals"
  >
    ↺
  </button>
</div>



      <div className="goal-item">
        <input
          type="checkbox"
          checked={tasks.most.done}
          onChange={() => updateTask("most", "done", !tasks.most.done)}
        />
        <input
          className={`goal-input ${tasks.most.done ? "done" : ""}`}
          placeholder="Most Important Task.."
          value={tasks.most.text}
          onChange={(e) => updateTask("most", "text", e.target.value)}
        />
      </div>

      <div className="goal-item">
        <input
          type="checkbox"
          checked={tasks.important.done}
          onChange={() => updateTask("important", "done", !tasks.important.done)}
        />
        <input
          className={`goal-input ${tasks.important.done ? "done" : ""}`}
          placeholder="Important Task.."
          value={tasks.important.text}
          onChange={(e) => updateTask("important", "text", e.target.value)}
        />
      </div>

      <div className="goal-item">
        <input
          type="checkbox"
          checked={tasks.habit.done}
          onChange={() => updateTask("habit", "done", !tasks.habit.done)}
        />
        <input
          className={`goal-input ${tasks.habit.done ? "done" : ""}`}
          placeholder="Habit.."
          value={tasks.habit.text}
          onChange={(e) => updateTask("habit", "text", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Goals;
