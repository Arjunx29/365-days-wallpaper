import React, { useEffect, useState } from "react";

const STREAK_KEY = "dashboard_streak_data";

const getTodayUTC = () => {
  const now = new Date();
  return new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )).toISOString().split("T")[0];
};

const getDayDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = d2 - d1;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const StreakBar = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(3);
  const [nextIncrement, setNextIncrement] = useState(4);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [alreadyCompletedToday, setAlreadyCompletedToday] = useState(false);
  const [blinkingIndex, setBlinkingIndex] = useState(null);

  // 🔹 Load + Validate on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STREAK_KEY));
    const today = getTodayUTC();

    if (saved) {
      const {
        currentStreak,
        currentTarget,
        nextIncrement,
        lastCompletedDate
      } = saved;

      if (lastCompletedDate) {
        const diff = getDayDifference(lastCompletedDate, today);

        if (diff === 0) {
          setAlreadyCompletedToday(true);
        } else if (diff > 1) {
          // Missed a day → reset
          localStorage.removeItem(STREAK_KEY);
          return;
        }
      }

      setCurrentStreak(currentStreak);
      setCurrentTarget(currentTarget);
      setNextIncrement(nextIncrement);
      setLastCompletedDate(lastCompletedDate);
    }
  }, []);

  // 🔹 Persist state
  useEffect(() => {
    localStorage.setItem(
      STREAK_KEY,
      JSON.stringify({
        currentStreak,
        currentTarget,
        nextIncrement,
        lastCompletedDate
      })
    );
  }, [currentStreak, currentTarget, nextIncrement, lastCompletedDate]);

  const completeToday = () => {
    if (alreadyCompletedToday) return;

    const today = getTodayUTC();
    const newStreak = currentStreak + 1;

    let newTarget = currentTarget;
    let newNextIncrement = nextIncrement;

    // Expand streak milestone
    if (newStreak === currentTarget) {
      newTarget = currentTarget + nextIncrement;
      newNextIncrement = nextIncrement === 3 ? 4 : 3;
      setCurrentTarget(newTarget);
      setNextIncrement(newNextIncrement);
    }

    setCurrentStreak(newStreak);
    setLastCompletedDate(today);
    setAlreadyCompletedToday(true);

    // Blink the newly filled dot
    setBlinkingIndex(newStreak - 1);
    setTimeout(() => setBlinkingIndex(null), 600);
  };

  return (
    <>
  <div style={styles.parent}>
  <div style={styles.containerx}>
    {Array.from({ length: currentTarget }).map((_, index) => (
      <div
        key={index}
        style={{
          ...styles.dot,
          ...(index < currentStreak ? styles.filled : {}),
          ...(blinkingIndex === index ? styles.blink : {})
        }}
      />
    ))}
  </div>

  <div style={styles.containery}>
    <button
      onClick={completeToday}
      disabled={alreadyCompletedToday}
      style={{
        marginLeft: "20px",
        padding: "6px 12px",
        background: alreadyCompletedToday ? "#333" : "#111",
        color: "white",
        border: "1px solid #444",
        cursor: alreadyCompletedToday ? "not-allowed" : "pointer"
      }}
    >
      {alreadyCompletedToday ? "Completed" : "Complete Today"}
    </button>
  </div>
</div>


      <style>
        {`
          @keyframes blinkEffect {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.6); opacity: 0.3; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

const styles = {
  parent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom:"0px",
    paddingBottom:"0px",
    gap: "10px",
    width: "100%",
  },

  containerx: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "12px",
    width: "100%",
    marginTop: "25px",
    marginLeft: "25px",
    backgroundColor: "#000000",
    overflowX: "auto",

  },

   containery: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    width: "100%",
    marginTop: "20px",
    marginRight: "25px",
    backgroundColor: "#000000",
    overflowX: "auto",

  },

  dot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: "#444",
    transition: "transform 0.2s ease, background 0.3s ease"
  },

  filled: {
    backgroundColor: "white",
  },

  blink: {
    animation: "blinkEffect 0.6s ease"
  }
};


export default StreakBar;
