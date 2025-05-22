import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>
          <h1 style={styles.title} onClick={() => navigate("/")} tabIndex={0} role="button" aria-label="Go to Home">
            LanceMusic 🎵
          </h1>
          <button style={styles.homeButton} onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </header>
      <main style={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

const styles = {
  header: {
    width: "100%",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Your branding colors
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    padding: "1rem 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderRadius: "12px",  // <-- adds rounded corners
  },
  container: {
    maxWidth: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.8rem",
    cursor: "pointer",
    userSelect: "none",
  },
  homeButton: {
    backgroundColor: "#fff",
    color: "#2575fc",
    fontWeight: "700",
    border: "none",
    padding: "0.5rem 1.25rem",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(37, 117, 252, 0.6)",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  main: {
    maxWidth: "100%",
    margin: "2rem 0",
    padding: "0 0",
  },
};