import React from "react";
import { useNavigate } from "react-router-dom";

export default function EarTraining() {
  const navigate = useNavigate();

  function handleSelect(level) {
    navigate(`/training/${level.toLowerCase()}`);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ear Training</h1>
      <p style={styles.subtitle}>
        Sharpen your musical skills through interactive listening exercises.
      </p>

      {/* Harmonic Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Harmonic Ear Training</h2>
        <div style={styles.buttonGroup}>
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
      </section>

      {/* Tempo Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tempo Ear Training</h2>
        <p style={styles.tempoNote}>Coming soon: Practice identifying tempos by ear!</p>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "white",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
    borderRadius: "12px",  // <-- adds rounded corners
  },
  title: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
    textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
  },
  subtitle: {
    fontSize: "1.2rem",
    opacity: 0.85,
    maxWidth: "600px",
    marginBottom: "2rem",
  },
  section: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: "2rem",
    borderRadius: "15px",
    marginBottom: "2rem",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#fff",
    color: "#2575fc",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    minWidth: "100px",
    transition: "transform 0.2s, background-color 0.3s",
  },
  tempoNote: {
    opacity: 0.7,
    fontStyle: "italic",
    marginTop: "0.5rem",
  },
};
