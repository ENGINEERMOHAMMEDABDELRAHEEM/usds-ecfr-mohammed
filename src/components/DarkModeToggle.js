import React from "react";
import { useTheme } from "../ThemeContext";

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        padding: "0.5rem 1rem",
        backgroundColor: darkMode ? "#444" : "#ccc",
        color: darkMode ? "#fff" : "#000",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
