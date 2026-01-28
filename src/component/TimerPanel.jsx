// import React, { useState, useEffect, useRef } from "react";
// import "./Dashboard.css";
// import beethoven from "../assets/beethoven.mp3";
// const TimerPanel = () => {

//   // --- States ---
//   const [seconds, setSeconds] = useState(1500);       // Current countdown
//   const [initial, setInitial] = useState(1500);       // For reset & progress ring
//   const [isRunning, setIsRunning] = useState(false);

//   const [minInput, setMinInput] = useState("");
//   const [secInput, setSecInput] = useState("");

//   const bellRef = useRef(null);

//   const [history, setHistory] = useState(() => {
//     return JSON.parse(localStorage.getItem("timer-history")) || [];
//   });

//   // Prevent duplicate history entries in StrictMode
//   const hasCompletedRef = useRef(false);


//   /* -------------------------------------------------
//       MAIN TIMER COUNTDOWN
//   ------------------------------------------------- */
//   useEffect(() => {
//     let interval = null;

//     // Countdown
//     if (isRunning && seconds > 0) {
//       interval = setInterval(() => setSeconds(s => s - 1), 1000);
//     }

//     // When timer reaches 0
//     if (seconds === 0 && !hasCompletedRef.current) {
//       hasCompletedRef.current = true;     // BLOCK duplicate execution
//       setIsRunning(false);

//       // Play bell
//       bellRef.current.play();

//       // Save history entry
//       const entry = {
//         duration: formatTime(initial),
//         completedAt: new Date().toLocaleTimeString()
//       };

//       const newHistory = [entry, ...history].slice(0, 6);
//       setHistory(newHistory);
//       localStorage.setItem("timer-history", JSON.stringify(newHistory));
//     }

//     return () => clearInterval(interval);
//   }, [isRunning, seconds]);


//   /* -------------------------------------------------
//       Reset duplicate-protection flag when duration changes
//   ------------------------------------------------- */
//   useEffect(() => {
//     hasCompletedRef.current = false;
//   }, [initial]);


//   /* -------------------------------------------------
//       Helpers
//   ------------------------------------------------- */
//   const formatTime = (s) => {
//     const m = Math.floor(s / 60);
//     const sec = s % 60;
//     return `${m}:${sec < 10 ? "0" + sec : sec}`;
//   };

//   const preset = (min) => {
//     const total = min * 60;
//     setInitial(total);
//     setSeconds(total);
//     setIsRunning(false);
//   };

//   const applyCustomTime = () => {
//     const m = parseInt(minInput || 0);
//     const s = parseInt(secInput || 0);
//     const total = m * 60 + s;

//     if (total <= 0) return;

//     setInitial(total);
//     setSeconds(total);
//     setMinInput("");
//     setSecInput("");
//     setIsRunning(false);
//   };

//   const reset = () => {
//     setIsRunning(false);
//     setSeconds(initial);
//   };


//   /* -------------------------------------------------
//       Progress Ring Calculation
//   ------------------------------------------------- */
//   const radius = 80;
//   const circumference = 2 * Math.PI * radius;
//   const progress = seconds / initial;
//   const dashOffset = circumference - circumference * progress;


//   return (
//     <div className="timer-container">

//       <h2>Timer</h2>

//       {/* Circular Timer */}
//       <div className="circle-wrapper">
//         <svg width="200" height="200">
//           <circle className="bg-ring" cx="100" cy="100" r={radius} />
//           <circle
//             className="progress-ring"
//             cx="100"
//             cy="100"
//             r={radius}
//             strokeDasharray={circumference}
//             strokeDashoffset={dashOffset}
//           />
//           <text className="timer-text-svg" x="100" y="110" textAnchor="middle">
//             {formatTime(seconds)}
//           </text>
//         </svg>
//       </div>

//       {/* Presets */}
//       <div className="preset-box">
//         <button onClick={() => preset(10)}>10m</button>
//         <button onClick={() => preset(15)}>15m</button>
//         <button onClick={() => preset(25)}>25m</button>
//         <button onClick={() => preset(45)}>45m</button>
//       </div>

//       {/* Custom Inputs */}
//       <div className="custom-time-box">
//         <input
//           type="number"
//           placeholder="Min"
//           value={minInput}
//           onChange={(e) => setMinInput(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Sec"
//           value={secInput}
//           onChange={(e) => setSecInput(e.target.value)}
//         />
//         <button onClick={applyCustomTime}>Set</button>
//       </div>

//       {/* Controls */}
//       <div className="timer-buttons">
//         <button onClick={() => setIsRunning(true)}>Start</button>
//         <button onClick={() => setIsRunning(false)}>Pause</button>
//         <button onClick={reset}>Reset</button>
//       </div>

//       {/* Bell (default, hidden UI) */}
// <audio ref={bellRef} src={beethoven}></audio>

//       <h3>History</h3>
//       <ul className="timer-history">
//         {history.map((h, idx) => (
//           <li key={idx}>{h.duration} — {h.completedAt}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TimerPanel;




import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import beethoven from "../assets/beethoven.mp3";

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
      <h3>History</h3>
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
