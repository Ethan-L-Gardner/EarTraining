import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 text-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to Lance Music 🎵
      </h1>
      <p className="text-lg sm:text-xl max-w-xl mb-10 font-medium drop-shadow-sm">
        Start your journey to better musical skills.
      </p>
      <button
        onClick={() => navigate("/eartraining")}
        className="bg-white text-purple-700 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:bg-purple-100 transition duration-300"
      >
        Go to Ear Training
      </button>
    </div>
  );
}