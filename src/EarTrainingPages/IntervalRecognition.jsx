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

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomInterval() {
  const index = Math.floor(Math.random() * INTERVALS.length);
  return INTERVALS[index];
}

export default function IntervalRecognition() {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("Easy");
  const [isTimed, setIsTimed] = useState(false);

  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const [question, setQuestion] = useState(getRandomInterval());
  const [options, setOptions] = useState(shuffleArray(INTERVALS.map((i) => i.name)));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [timedScore, setTimedScore] = useState(0);

  const [correctStreak, setCorrectStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // New states for score submission
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!isTimed) {
      setCorrectStreak(0);
      setHighScore(0);
    }
    if (isTimed) {
      setCountdown(3);
      setTimer(60);
      setTimedScore(0);
      setGameStarted(false);
      setGameOver(false);
      setPlayerName("");
      setSubmitError(null);
      setSubmitSuccess(false);
    } else {
      setCountdown(null);
      setGameStarted(false);
      setGameOver(false);
      setTimer(60);
      setTimedScore(0);
      setPlayerName("");
      setSubmitError(null);
      setSubmitSuccess(false);
    }

    nextQuestion();
    setSelectedAnswer(null);
    setFeedback(null);
  }, [difficulty, isTimed]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timeout = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timeout);
    }
    if (countdown === 0) {
      setCountdown(null);
      setGameStarted(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (!gameStarted) return;

    if (timer === 0) {
      setGameOver(true);
      setGameStarted(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  useEffect(() => {
    if (
      difficulty === "Easy" &&
      audioRef.current &&
      (!isTimed || (isTimed && gameStarted))
    ) {
      const fileName = question.name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/[^a-z0-9]/g, "") + ".mp3";
      audioRef.current.src = `/audio/${fileName}`;
      audioRef.current.play().catch((e) => console.warn("Audio error:", e));
    }
  }, [question, difficulty, isTimed, gameStarted]);

  function nextQuestion() {
    const newQ = getRandomInterval();
    setQuestion(newQ);
    setOptions(shuffleArray(INTERVALS.map((i) => i.name)));
    setSelectedAnswer(null);
    setFeedback(null);
  }

  function handleAnswer(option) {
    setSelectedAnswer(option);

    if (option === question.name) {
      setFeedback("Correct! 🎉");

      if (isTimed && gameStarted) {
        setTimedScore((score) => score + 1);
      } else if (!isTimed && difficulty === "Easy") {
        setCorrectStreak((streak) => {
          const newStreak = streak + 1;
          if (newStreak > highScore) setHighScore(newStreak);
          return newStreak;
        });
      }
    } else {
      setFeedback(`Oops! The correct answer was ${question.name}.`);

      if (!isTimed && difficulty === "Easy") {
        setCorrectStreak(0);
      }
    }
  }

  // Replay audio for Easy mode button
  function replayAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.warn("Audio error:", e));
    }
  }

  // Restart timed challenge
  function restartTimedChallenge() {
    setCountdown(3);
    setTimer(60);
    setTimedScore(0);
    setGameOver(false);
    setGameStarted(false);
    setPlayerName("");
    setSubmitError(null);
    setSubmitSuccess(false);
    nextQuestion();
    setSelectedAnswer(null);
    setFeedback(null);
  }

// Submit score to backend
async function submitScore() {
  if (!playerName.trim()) {
    setSubmitError("Please enter your name.");
    return;
  }

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const response = await fetch("http://localhost:5000/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: playerName.trim(),
        score: timedScore,
        module: "Interval Recognition",  // 👈 Update this if the module name changes
        difficulty: difficulty            // 👈 This should already be in your component's state
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit score.");
    }

    setSubmitSuccess(true);
  } catch (error) {
    setSubmitError(error.message || "Something went wrong.");
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <div className="min-h-screen bg-[#E5ECE9] text-gray-900 px-6 py-12 flex justify-center">
      <div className="relative max-w-7xl w-full bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-xl p-10 text-center">

        {/* Difficulty selection buttons */}
        <div className="flex justify-center gap-4 mb-2">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              disabled={isTimed && gameStarted}
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

        {/* Timed Challenge toggle button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              if (!gameStarted) setIsTimed((t) => !t);
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border ${
              isTimed
                ? "bg-[#406C58] text-white border-[#406C58]"
                : "bg-white text-[#406C58] border-[#406C58]"
            }`}
          >
            Timed Challenge
          </button>
        </div>

        {/* Countdown display */}
        {countdown !== null && (
          <div className="text-9xl text-[#406C58] font-extrabold select-none">{countdown}</div>
        )}

        {/* Timed mode game UI */}
        {gameStarted && !gameOver && (
          <div>
            <div className="mb-4 text-4xl font-bold text-[#406C58]">Time left: {timer}s</div>
            <div className="mb-4 text-3xl font-semibold text-[#406C58]">Score: {timedScore}</div>
            <div className="mb-8 text-xl font-medium">Identify the interval:</div>

            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {options.map((option) => (
                <button
                  key={option}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(option)}
                  className={`px-4 py-3 rounded-lg text-lg font-semibold border ${
                    selectedAnswer === option
                      ? option === question.name
                        ? "bg-green-400 border-green-700 text-white"
                        : "bg-red-400 border-red-700 text-white"
                      : "bg-white border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-6 text-2xl font-semibold text-[#406C58]">{feedback}</div>
            )}

            {selectedAnswer && (
              <button
                onClick={() => {
                  nextQuestion();
                }}
                className="mt-8 px-8 py-3 bg-[#406C58] text-white rounded-full font-semibold hover:bg-[#31513f]"
              >
                Next Question
              </button>
            )}
          </div>
        )}

        {/* Timed mode game over with name input */}
        {gameOver && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-4xl font-bold text-red-600">
              Time's up! Your score: {timedScore}
            </div>

            {!submitSuccess ? (
              <>
                <div>
                  <label htmlFor="playerName" className="block mb-2 font-semibold text-[#406C58]">
                    Enter your name to save your score:
                  </label>
                  <input
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#406C58]"
                    disabled={isSubmitting}
                  />
                </div>

                {submitError && (
                  <div className="text-red-600 font-semibold">{submitError}</div>
                )}

                <button
                  onClick={submitScore}
                  disabled={isSubmitting}
                  className={`w-full mt-4 py-3 rounded-full font-semibold text-white ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#406C58] hover:bg-[#31513f]"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Save Score"}
                </button>
              </>
            ) : (
              <div className="text-green-600 font-semibold text-xl">
                Score saved successfully! 🎉
              </div>
            )}

            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={restartTimedChallenge}
                className="px-8 py-3 bg-[#406C58] text-white rounded-full font-semibold hover:bg-[#31513f]"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-3 border border-[#406C58] rounded-full font-semibold text-[#406C58] hover:bg-[#dbe5db]"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Non-timed mode UI */}
        {!isTimed && (
          <div>
            <div className="mb-6 text-3xl font-bold text-[#406C58]">
              {difficulty} Mode
            </div>

            <div className="mb-4 text-2xl font-semibold text-[#406C58]">Identify the interval:</div>

            {difficulty === "Easy" && (
              <button
                onClick={replayAudio}
                className="mb-4 px-6 py-2 bg-[#406C58] text-white rounded-full font-semibold hover:bg-[#31513f]"
              >
                Replay Audio
              </button>
            )}

            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {options.map((option) => (
                <button
                  key={option}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(option)}
                  className={`px-4 py-3 rounded-lg text-lg font-semibold border ${
                    selectedAnswer === option
                      ? option === question.name
                        ? "bg-green-400 border-green-700 text-white"
                        : "bg-red-400 border-red-700 text-white"
                      : "bg-white border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-6 text-2xl font-semibold text-[#406C58]">{feedback}</div>
            )}

            {selectedAnswer && (
              <button
                onClick={nextQuestion}
                className="mt-8 px-8 py-3 bg-[#406C58] text-white rounded-full font-semibold hover:bg-[#31513f]"
              >
                Next Question
              </button>
            )}

            {difficulty === "Easy" && (
              <div className="mt-8 text-xl font-semibold text-[#406C58]">
                Current Streak: {correctStreak} | High Score: {highScore}
              </div>
            )}
          </div>
        )}

        <audio ref={audioRef} />
      </div>
    </div>
  );
}
