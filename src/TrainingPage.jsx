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

  while (options.size < 8) {
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

  useEffect(() => {
    if (level === "easy") {
      const fileName = question.name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/[^a-z0-9]/g, "") + ".mp3";
      const audioPath = `/audio/${fileName}`;
      if (audioRef.current) {
        audioRef.current.src = audioPath;
        audioRef.current
          .play()
          .catch((e) => console.warn("Audio playback failed:", e));
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
    <div className="min-h-screen flex flex-col justify-center items-center p-8 box-border text-center text-gray-900 font-sans">
      <h1 className="text-4xl font-extrabold mb-2">{`Ear Training - ${level?.toUpperCase()}`}</h1>
      <p className="text-lg mb-6">What interval did you hear?</p>

      {level === "easy" && (
        <audio
          ref={audioRef}
          controls
          className="mb-6 w-full max-w-md"
          preload="auto"
        >
          <source type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 max-w-3xl w-full mb-8">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.name;

          let bgClass = "bg-white";
          let textClass = "text-gray-900";
          if (isSelected) {
            if (isCorrect) {
              bgClass = "bg-green-600";
              textClass = "text-white";
            } else {
              bgClass = "bg-red-600";
              textClass = "text-white";
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`${bgClass} ${textClass} font-semibold py-4 px-6 rounded-xl shadow-md cursor-pointer
                          transition-colors duration-300 ease-in-out
                          disabled:cursor-not-allowed disabled:opacity-60
                          hover:brightness-105 active:scale-95`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback && (
        <>
          <p className="text-lg font-bold mb-4">{feedback}</p>
          <button
            onClick={nextQuestion}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-md mb-4
                       hover:bg-green-700 active:scale-95 transition transform duration-200"
          >
            Next Question
          </button>
          <button
            onClick={() => navigate("/eartraining")}
            className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md
                       hover:bg-gray-700 active:scale-95 transition transform duration-200"
          >
            Back to Levels
          </button>
        </>
      )}
    </div>
  );
}