import React from "react";
import { useNavigate } from "react-router-dom";

export default function EarTraining() {
  const navigate = useNavigate();

  function handleSelect(level) {
    navigate(`/training/${level.toLowerCase()}`);
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center px-6 py-12 text-center box-border rounded-lg">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        Ear Training
      </h1>
      <p className="text-lg max-w-xl mb-12 opacity-90">
        Sharpen your musical skills through interactive listening exercises.
      </p>

      {/* Harmonic Section */}
      <section className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-md p-8 mb-12 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Harmonic Ear Training</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => handleSelect(level)}
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl shadow-sm min-w-[100px] 
                         hover:bg-blue-100 transition transform duration-200 active:scale-95 cursor-pointer"
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* Tempo Section */}
      <section className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-md p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-3">Tempo Ear Training</h2>
        <p className="italic opacity-70">
          Coming soon: Practice identifying tempos by ear!
        </p>
      </section>
    </div>
  );
}