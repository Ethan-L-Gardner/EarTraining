import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EarTraining() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);

  function handleSelect(level) {
    setSelectedLevel(level);
    navigate(`/eartraining/${level.toLowerCase()}`);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎵 Ear Training</h1>
      <p style={styles.subtitle}>
        Sharpen your musical ear with interactive exercises and challenges.
      </p>

      <div style={styles.levelSelector}>
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            style={styles.button}
            onClick={() => handleSelect(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {selectedLevel && (
        <p style={styles.selectionMessage}>
          You chose <strong>{selectedLevel}</strong> level!
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    padding: "2rem",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    marginBottom: "0.5rem",
    textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
  },
  subtitle: {
    fontSize: "1.3rem",
    maxWidth: "480px",
    marginBottom: "3rem",
    fontWeight: "500",
    lineHeight: 1.5,
    textShadow: "1px 1px 5px rgba(0,0,0,0.15)",
  },
  levelSelector: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "600px",
    width: "100%",
  },
  button: {
    flex: "1 1 120px",
    backgroundColor: "white",
    color: "#764ba2",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.4rem",
    fontWeight: "700",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(118, 75, 162, 0.4)",
    transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
    userSelect: "none",
  },
  selectionMessage: {
    marginTop: "1.5rem",
    fontSize: "1.1rem",
  },
};