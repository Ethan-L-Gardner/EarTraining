import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white selection:bg-pink-500 selection:text-white">
      <header className="backdrop-blur-md bg-white/10 border-b border-white/25 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div
            onClick={() => navigate("/")}
            tabIndex={0}
            role="button"
            aria-label="Go to Home"
            className="cursor-pointer flex items-center space-x-2 hover:opacity-80 transition duration-300"
          >
            <img
              src="/src/assets/logo.png" // Adjust this path based on where your logo file is located
              alt="LanceMusic Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white font-semibold shadow-lg hover:brightness-110 transition duration-200 focus:outline-none focus:ring-4 focus:ring-pink-500/60"
            >
              Menu ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in">
                <button
                  onClick={() => {
                    navigate("/");
                    setDropdownOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 transition"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => {
                    navigate("/EarTraining");
                    setDropdownOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 transition"
                >
                  🎧 Ear Training
                </button>
                <button
                  onClick={() => {
                    navigate("/AboutMe");
                    setDropdownOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 transition"
                >
                  👤 About Me
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}