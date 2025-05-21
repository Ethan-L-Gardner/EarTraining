import { useParams, useNavigate } from "react-router-dom";

export default function TrainingPage() {
  const { level } = useParams();
  const navigate = useNavigate();

  const capitalizedLevel = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 style={styles.title}>{capitalizedLevel} Level Ear Training</h1>
      <p style={styles.description}>
        Welcome to the <strong>{capitalizedLevel}</strong> level. Here you will find interactive exercises to train your ear and improve your musical skills.
      </p>

      {/* Placeholder for actual training content */}
      <div style={styles.exerciseBox}>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          🎧 [Exercise content will go here — sounds, quizzes, etc.] 🎵
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "3rem 2rem",
    background: "#f5f7fa",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: "1.5rem",
    backgroundColor: "#764ba2",
    color: "white",
    border: "none",
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
    transition: "background-color 0.3s ease",
  },
  title: {
    fontSize: "3rem",
    color: "#333",
    marginBottom: "0.5rem",
    fontWeight: "800",
  },
  description: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    color: "#666",
    marginBottom: "3rem",
    textAlign: "center",
  },
  exerciseBox: {
    width: "100%",
    maxWidth: "600px",
    padding: "2rem",
    borderRadius: "16px",
    backgroundColor: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};