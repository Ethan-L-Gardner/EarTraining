import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EarTraining() {
  const navigate = useNavigate();

  // Function to navigate to the selected training module page
  function handleSelect(title) {
    // Convert the training module title to a URL-friendly path
    const path = title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    navigate(`/training/${path}`);
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

              {/* Show "Coming soon..." message for all other modules except Interval Recognition */}
              {title !== "Interval Recognition" && (
                <p className="text-[#406C58] opacity-80 italic">Coming soon...</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}