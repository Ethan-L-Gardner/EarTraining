import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const INTERVALS = [
  { name: "Minor 2nd", semitones: 1 },
  { name: "Major 2nd", semitones: 2 },
  { name: "Minor 3rd", semitones: 3 },
  { name: "Major 3rd", semitones: 4 },
  { name: "Perfect 4th", semitones: 5 },
  { name: "Diminished 5th", semitones: 6 },
  { name: "Perfect 5th", semitones: 7 },
  { name: "Minor 6th", semitones: 8 },
  { name: "Major 6th", semitones: 9 },
  { name: "Minor 7th", semitones: 10 },
  { name: "Major 7th", semitones: 11 },
  { name: "Octave", semitones: 12 },
];

function getRandomInterval() {
  const index = Math.floor(Math.random() * INTERVALS.length);
  return INTERVALS[index];
}

function generateOptions(correctInterval) {
  const options = new Set();
  options.add(correctInterval.name);

  while (options.size < 4) {
    const randomInterval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
    options.add(randomInterval.name);
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
}

export default function TrainingPage() {
  const { level } = useParams(); // 'easy', 'medium', 'hard'
  const navigate = useNavigate();

  const [question, setQuestion] = useState(getRandomInterval());
  const [options, setOptions] = useState(generateOptions(question));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const audioRef = useRef(null);

  // Play audio for easy level
  useEffect(() => {
    if (level === "easy") {
      const fileName = question.name.toLowerCase().replace(/\s/g, "").replace(/[^a-z0-9]/g, "") + ".mp3";
      const audioPath = `/audio/${fileName}`;
      if (audioRef.current) {
        audioRef.current.src = audioPath;
        audioRef.current.play().catch((e) => {
          console.warn("Audio playback failed:", e);
        });
      }
    }
  }, [question, level]);

  function handleAnswer(option) {
    setSelectedAnswer(option);
    setFeedback(
      option === question.name
        ? "Correct! 🎉"
        : `Oops! The correct answer was ${question.name}.`
    );
  }

  function nextQuestion() {
    const newQuestion = getRandomInterval();
    setQuestion(newQuestion);
    setOptions(generateOptions(newQuestion));
    setSelectedAnswer(null);
    setFeedback(null);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ear Training - {level?.toUpperCase()}</h1>
      <p style={styles.subtitle}>What interval did you hear?</p>

      {level === "easy" && (
        <audio ref={audioRef} controls style={{ marginBottom: "1.5rem" }}>
          <source type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div style={styles.optionsContainer}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedAnswer}
            style={{
              ...styles.optionButton,
              backgroundColor:
                selectedAnswer === option
                  ? option === question.name
                    ? "#4CAF50"
                    : "#F44336"
                  : "#fff",
              color: selectedAnswer === option ? "white" : "#333",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <>
          <p style={styles.feedback}>{feedback}</p>
          <button style={styles.nextButton} onClick={nextQuestion}>
            Next Question
          </button>
          <button
            style={styles.backButton}
            onClick={() => navigate("/eartraining")}
          >
            Back to Levels
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    padding: "2rem",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    justifyContent: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "0.3rem",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "1.5rem",
  },
  optionsContainer: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "600px",
    marginBottom: "2rem",
  },
  optionButton: {
    flex: "1 1 140px",
    padding: "1rem 1.5rem",
    fontSize: "1.2rem",
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    userSelect: "none",
    cursor: "pointer",
  },
  feedback: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
    fontWeight: "700",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  backButton: {
    backgroundColor: "#555",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};