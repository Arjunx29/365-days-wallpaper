import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";       // Load your main App (NOT WallpaperApp)
import "./App.css";                // Global CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
