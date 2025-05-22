import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Lance Music 🎵</h1>
      <p style={styles.subtitle}>Start your journey to better musical skills.</p>
      <button
        style={styles.button}
        onClick={() => navigate("/eartraining")}
      >
        Go to Ear Training
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
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
  button: {
    backgroundColor: "white",
    color: "#764ba2",
    border: "none",
    padding: "1rem 3rem",
    fontSize: "1.4rem",
    fontWeight: "700",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(118, 75, 162, 0.4)",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};