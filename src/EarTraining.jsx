import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EarTraining() {
  const navigate = useNavigate();

  // State to hold leaderboard scores fetched from the server
  const [leaderboard, setLeaderboard] = useState([]);
  // State to control whether the leaderboard is shown or hidden
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  // State to track loading status when fetching leaderboard data
  const [loading, setLoading] = useState(false);
  // State to store any error message during fetching
  const [error, setError] = useState(null);

  // Function to navigate to the selected training module page
  function handleSelect(title) {
    // Convert the training module title to a URL-friendly path
    const path = title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    navigate(`/training/${path}`);
  }

  // Async function to fetch top 10 scores from the backend API
  async function fetchLeaderboard() {
    setLoading(true);  // Start loading state
    setError(null);    // Clear previous errors
    try {
      // Request the scores from the backend
      const res = await fetch("/api/scores");
      if (!res.ok) throw new Error("Failed to fetch leaderboard"); // Handle non-200 responses
      const data = await res.json();  // Parse JSON response
      setLeaderboard(data);            // Save the scores in state
      setShowLeaderboard(true);       // Show the leaderboard
    } catch (err) {
      setError(err.message);          // Save error message in state
    } finally {
      setLoading(false);              // Stop loading state
    }
  }

  // List of all training modules
  const trainingSections = [
    "Interval Recognition",
    "Melodic Ear Training",
    "Chord Progression Recognition",
    "Pitch Tuning Accuracy",
    "Modes and Scales Recognition",
    "Meter Perception",
    "Phase and Polarity Training",
    "BONUS Training (Audio Illusions)",
    "Tempo Ear Training",
  ];

  return (
    // Main container with background color, padding, and centered content
    <div className="min-h-screen bg-[#E5ECE9] selection:bg-[#A3C1AD] selection:text-white flex flex-col items-center py-12 px-6">
      {/* Content box with white translucent background and rounded corners */}
      <div className="max-w-7xl w-full bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-lg p-12 flex flex-col items-center">
        {/* Page title */}
        <h1 className="text-6xl font-extrabold text-[#406C58] drop-shadow-md mb-10 text-center">
          Ear Training
        </h1>

        {/* Grid container for all training modules */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trainingSections.map((title) => (
            // Individual training module card
            <section
              key={title}
              className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl shadow-md p-10 flex flex-col items-center text-center"
            >
              {/* Module title */}
              <h2 className="text-3xl font-semibold text-[#2E4F3E] mb-6">
                {title}
              </h2>

              {/* Start button to navigate to the module */}
              <button
                onClick={() => handleSelect(title)}
                className="bg-[#A3C1AD] text-white font-semibold py-3 px-10 rounded-3xl shadow-lg 
                           hover:bg-[#8EA798] transition transform duration-200 active:scale-95 cursor-pointer mb-3"
              >
                Start
              </button>

              {/* Conditionally render Leaderboard button only for Interval Recognition */}
              {title === "Interval Recognition" && (
                <button
                  onClick={fetchLeaderboard}
                  className="bg-[#6B8E5A] text-white font-semibold py-2 px-8 rounded-3xl shadow-md 
                             hover:bg-[#557944] transition transform duration-200 active:scale-95 cursor-pointer mb-4"
                >
                  Leaderboard
                </button>
              )}

              {/* Show "Coming soon..." message for all other modules except Interval Recognition */}
              {title !== "Interval Recognition" && (
                <p className="text-[#406C58] opacity-80 italic">Coming soon...</p>
              )}

              {/* Display the leaderboard below buttons for Interval Recognition when toggled */}
              {title === "Interval Recognition" && showLeaderboard && (
                <div className="mt-4 w-full max-w-md text-left bg-white bg-opacity-80 rounded-xl shadow-inner p-4">
                  {/* Leaderboard header */}
                  <h3 className="text-xl font-semibold text-[#2E4F3E] mb-3">
                    Top 10 Scores
                  </h3>

                  {/* Show loading text while fetching data */}
                  {loading && <p>Loading...</p>}
                  {/* Show error message if fetch failed */}
                  {error && <p className="text-red-600">Error: {error}</p>}
                  {/* Show message if there are no scores */}
                  {!loading && !error && leaderboard.length === 0 && (
                    <p>No scores yet.</p>
                  )}

                  {/* List of top scores */}
                  <ol className="list-decimal list-inside space-y-1">
                    {leaderboard.map(({ _id, name, score, createdAt }) => (
                      <li key={_id} className="flex justify-between">
                        <span>{name}</span>
                        <span>{score}</span>
                        <span className="text-sm text-gray-500">
                          {/* Format date to locale string */}
                          {new Date(createdAt).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}