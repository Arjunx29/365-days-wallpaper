

import React, { useState } from "react";
import "./Dashboard.css";

const WhyPanel = () => {
  const [text, setText] = useState("");
//   const [showInput, setShowInput] = useState(true);
const [showInput, setShowInput] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("why-list")) || [];
  return saved.length === 0;
});


  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("why-list")) || [];
  });

  /* -------- Add Why -------- */
  const addWhy = () => {
    if (!text.trim()) return;

    const updated = [...list, text.trim()];
    setList(updated);
    localStorage.setItem("why-list", JSON.stringify(updated));

    setText("");
    setShowInput(false); // hide input after add
  };

  /* -------- Reset -------- */
  const resetWhy = () => {
    setList([]);
    localStorage.removeItem("why-list");
    setText("");
    setShowInput(true);
  };

  /* -------- Add More -------- */
  const addMore = () => {
    setShowInput(true);
  };

  return (
    <div className="timer-container">

      {/* Header line */}
      <div className="why-header">
        <h2 className=" timer-heading why-title">Why ?</h2>

        {list.length > 0 && (
          <div className="why-actions">
            <button onClick={addMore}>＋</button>
            <button onClick={resetWhy}>↺</button>
          </div>
        )}
      </div>

      {/* Input Box */}
      {showInput && (
        <>
          <textarea
            className="why-input"
            placeholder="Write your reason..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
          />

          <button className="why-add-btn" onClick={addWhy}>
            Add
          </button>
        </>
      )}

      {/* Why List */}
      <ul className="why-list">
        {list.map((item, idx) => (
          <li key={idx}>
            <span className="why-index">{idx + 1}.</span>
            <span className="why-text">{item}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default WhyPanel;
