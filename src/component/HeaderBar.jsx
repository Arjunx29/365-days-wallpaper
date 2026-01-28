import { useEffect, useState } from "react";
import "./HeaderBar.css";

const HeaderBar = () => {
    /* ---------------- TITLE ---------------- */
    const [title, setTitle] = useState(() => {
        return localStorage.getItem("dashboardTitle") || "My Arc";
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };



    const finishEditing = () => {
        const normalizedTitle = title.trim() || "My Arc";

        setTitle(normalizedTitle);               // ✅ update state
        localStorage.setItem("dashboardTitle", normalizedTitle);

        setIsEditing(false);
    };



    /* ---------------- THEME ---------------- */
  const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "light" ? "light" : "dark";
});

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
  setTheme((prev) => (prev === "dark" ? "light" : "dark"));
};




    return (
        <header className="header-bar">
            {/* LEFT — TITLE */}
            <div className="header-left">
                {isEditing ? (
                    <input
                        className="title-input"
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={finishEditing}
                        onKeyDown={(e) => e.key === "Enter" && finishEditing()}
                        autoFocus
                    />
                ) : (
                    <h1
                        className="header-title"
                        onClick={() => setIsEditing(true)}
                        title="Click to edit"
                    >
                        {title}
                    </h1>
                )}
            </div>

            {/* RIGHT — THEME TOGGLE */}
            <div className="header-right">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
                </button>

            </div>
        </header>
    );
};

export default HeaderBar;
