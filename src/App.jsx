import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[time.getDay()];
  const day = time.getDate();
  const month = months[time.getMonth()];
  const year = time.getFullYear();
  const [is24Hour, setIs24Hour] = useState(() => {
    return localStorage.getItem("timeFormat") === "24";
  });

  // const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formattedTime = time.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: !is24Hour,
});
const toggleFormat = () => {
  const newFormat = !is24Hour;
  setIs24Hour(newFormat);
  localStorage.setItem("timeFormat", newFormat ? "24" : "12");
};

  // Calculate today's day number of year
  const start = new Date(time.getFullYear(), 0, 0);
  const diff =
    time - start +
    (start.getTimezoneOffset() - time.getTimezoneOffset()) * 60 * 1000;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Dot list for full year
  const dots = Array.from({ length: 365 }, (_, i) => i + 1);

  // Month day count for placing separators
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthBreaks = [];
  let count = 0;
  for (let m = 0; m < 12; m++) {
    count += monthDays[m];
    monthBreaks.push(count);
  }

  // Helper to convert dot number → actual date
  function dateFromDayNumber(n) {
    let temp = new Date(year, 0);
    temp.setDate(n);
    return temp;
  }

  return (
    <div className="app">
      <div className="top-section">
        <div className="date-text">{dayName} {day} {month}</div>
        <div className="time-text">{formattedTime}</div>
        
      </div>

      <div className="dots-container">
        {dots.map((n) => {
          let cls = "dot";

          if (n < dayOfYear) cls += " past";
          else if (n === dayOfYear) cls += " today";
          else cls += " future";

          const d = dateFromDayNumber(n);
          const tooltip = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;

          return (
            <div key={n} className="dot-wrapper">
              <div className={cls} data-tooltip={tooltip}></div>

              {/* Month break */}
              {/* {monthBreaks.includes(n) && (
                <div className="month-separator"></div>
              )} */}
            </div>
          );
        })}
      </div>
          <div className="toggle-container">
  <label className="switch">
    <input 
      type="checkbox" 
      checked={is24Hour}
      onChange={toggleFormat}
    />
    <span className="slider"></span>
  </label>

  <span className="toggle-label">
    {is24Hour ? "24-Hour" : "12-Hour"}
  </span>
</div>
    </div>
  );
}

export default App;
