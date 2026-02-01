import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import beethoven from "../assets/notification.mp3";

const TimerPanel = () => {
  const [seconds, setSeconds] = useState(1500);
  const [initial, setInitial] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  const bellRef = useRef(null);
  const intervalRef = useRef(null);
  const ringCountRef = useRef(0);

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("timer-history")) || [];
  });
  const resetHistory = () => {
    setHistory([]);
    localStorage.removeItem("timer-history");
  };

  /* ---------------- Timer Logic ---------------- */
  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  /* ---------------- When Timer Ends ---------------- */
  useEffect(() => {
    if (seconds !== 0) return;

    setIsRunning(false);
    ringCountRef.current = 0;

    playBellTwice();

    const entry = {
      duration: formatTime(initial),
      completedAt: new Date().toLocaleTimeString(),
    };

    const updated = [entry, ...history].slice(0, 6);
    setHistory(updated);
    localStorage.setItem("timer-history", JSON.stringify(updated));
  }, [seconds]);

  /* ---------------- Helpers ---------------- */
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m < 10 ? "0" : ""}${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const preset = (min) => {
    const total = min * 60;
    setInitial(total);
    setSeconds(total);
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(initial);
  };

  const stopAudio = () => {
    bellRef.current.pause();
    bellRef.current.currentTime = 0;
    ringCountRef.current = 2;
  };

  const playBellTwice = () => {
    const bell = bellRef.current;
    if (!bell) return;

    bell.currentTime = 0;
    bell.play().catch(() => { });

    bell.onended = () => {
      ringCountRef.current += 1;
      if (ringCountRef.current < 2) {
        bell.currentTime = 0;
        bell.play().catch(() => { });
      }
    };
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="timer-container">

      {/* Heading */}
      {/* <h2 className="timer-heading">Timer</h2> */}

      {/* Time Display */}
      <div className="timer-time">
        {formatTime(seconds)}
      </div>

      {/* Presets */}
      <div className="preset-box">
        <button onClick={() => preset(25)}>25</button>
        <button onClick={() => preset(45)}>45</button>
        <button onClick={() => preset(60)}>60</button>
      </div>

      {/* Controls */}

      <div className="timer-buttons">
        <button onClick={() => setIsRunning(true)}>▶</button>
        <button onClick={() => setIsRunning(false)}>⏸</button>
        <button onClick={reset}>↺</button>
        <button onClick={stopAudio}>🔇</button>
      </div>

      <audio ref={bellRef} src={beethoven} preload="auto" />

      {/* History */}
    {/* History Header */}
<div className="history-header">
  <h3 className="history-title">History</h3>

  {history.length > 0 && (
    <button className="history-reset" onClick={resetHistory}>
      ↺
    </button>
  )}
</div>

<ul className="timer-history">
  {history.map((h, idx) => (
    <li key={idx}>
      {h.duration} — {h.completedAt}
    </li>
  ))}
</ul>


    </div>
  );
};

export default TimerPanel;
