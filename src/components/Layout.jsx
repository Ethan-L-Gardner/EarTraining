import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white selection:bg-pink-500 selection:text-white">
      <header className="backdrop-blur-md bg-white/10 border-b border-white/25 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <h1
            onClick={() => navigate("/")}
            tabIndex={0}
            role="button"
            aria-label="Go to Home"
            className="text-3xl font-extrabold cursor-pointer hover:text-pink-400 transition duration-300 select-none"
          >
            LanceMusic 🎵
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white font-semibold shadow-xl hover:brightness-110 active:scale-95 transition transform duration-200 focus:outline-none focus:ring-4 focus:ring-pink-500/60"
          >
            Home
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}