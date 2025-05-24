import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

// Shuffle array elements randomly (Fisher-Yates algorithm)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Get a random interval from INTERVALS list
function getRandomInterval() {
  const index = Math.floor(Math.random() * INTERVALS.length);
  return INTERVALS[index];
}

export default function IntervalRecognition() {
  const navigate = useNavigate();

  // State for difficulty mode, current question, options order, selected answer and feedback message
  const [difficulty, setDifficulty] = useState("Easy");
  const [question, setQuestion] = useState(getRandomInterval());
  const [options, setOptions] = useState(shuffleArray(INTERVALS.map(i => i.name)));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Audio player reference
  const audioRef = useRef(null);

  // Easy mode: track current streak and all-time high score
  const [correctStreak, setCorrectStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Play audio for current interval question when difficulty or question changes (only Easy)
  useEffect(() => {
    if (difficulty === "Easy") {
      const fileName = question.name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/[^a-z0-9]/g, "") + ".mp3";
      const audioPath = `/audio/${fileName}`;
      if (audioRef.current) {
        audioRef.current.src = audioPath;
        audioRef.current.play().catch((e) => console.warn("Audio error:", e));
      }
    }
  }, [question, difficulty]);

  // Reset streaks and load new question on difficulty change
  useEffect(() => {
    setCorrectStreak(0);
    setHighScore(0);
    nextQuestion();
  }, [difficulty]);

  // Handle user answer selection, update feedback, streaks, and high score accordingly
  function handleAnswer(option) {
    setSelectedAnswer(option);

    if (option === question.name) {
      setFeedback("Correct! 🎉");
      if (difficulty === "Easy") {
        setCorrectStreak((prev) => {
          const newStreak = prev + 1;
          if (newStreak > highScore) setHighScore(newStreak);
          return newStreak;
        });
      }
    } else {
      setFeedback(`Oops! The correct answer was ${question.name}.`);
      if (difficulty === "Easy") {
        setCorrectStreak(0);
      }
    }
  }

  // Load a new question and shuffle options; reset answer and feedback
  function nextQuestion() {
    const newQ = getRandomInterval();
    setQuestion(newQ);
    setOptions(shuffleArray(INTERVALS.map(i => i.name)));
    setSelectedAnswer(null);
    setFeedback(null);
  }

  return (
    <div className="min-h-screen bg-[#E5ECE9] text-gray-900 px-6 py-12 flex justify-center">
      <div className="relative max-w-7xl w-full bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-xl p-10 text-center">
        {/* Streak and Highscore box (visible only in Easy mode) */}
        {difficulty === "Easy" && (
          <div className="absolute top-6 right-6 bg-[#A3C1AD] bg-opacity-80 rounded-xl px-6 py-4 shadow-md text-[#2E4F3E] font-extrabold text-2xl select-none w-48">
            <div>🔥 Streak: {correctStreak}</div>
            <div className="mt-2 italic text-lg text-[#406C58]">Highscore: {highScore}</div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-[#2E4F3E]">Interval Recognition</h1>

        {/* Difficulty selection buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level);
                nextQuestion();
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                difficulty === level
                  ? "bg-[#406C58] text-white"
                  : "bg-white text-[#406C58] border border-[#406C58]"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <p className="text-lg mb-4 font-medium">What interval did you hear?</p>

        {/* Audio player only for Easy difficulty */}
        {difficulty === "Easy" && (
          <audio ref={audioRef} controls className="mb-6 w-full max-w-md mx-auto">
            <source type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}

        {/* Interval answer buttons, randomized order, 12 fixed-size buttons */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 mb-6 justify-center">
          {options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.name;

            let bgClass = "bg-white";
            let textClass = "text-gray-900";
            if (isSelected) {
              bgClass = isCorrect ? "bg-green-600" : "bg-red-600";
              textClass = "text-white";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                style={{ minHeight: "72px" }}
                className={`${bgClass} ${textClass} font-semibold py-4 px-6 rounded-xl shadow-sm cursor-pointer
                  transition duration-200 disabled:opacity-60 hover:brightness-105 active:scale-95`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback and next question button */}
        {feedback && (
          <>
            <p className="text-lg font-bold mb-4">{feedback}</p>
            <button
              onClick={nextQuestion}
              className="bg-green-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md mb-4
              hover:bg-green-700 active:scale-95 transition duration-200"
            >
              Next Question
            </button>
          </>
        )}

        {/* Navigation back to Ear Training menu */}
        <button
          onClick={() => navigate("/eartraining")}
          className="mt-4 text-sm underline text-[#406C58] hover:text-[#2e4f3e] transition"
        >
          ⬅ Back to Ear Training Menu
        </button>
      </div>
    </div>
  );
}
