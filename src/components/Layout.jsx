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
    <div className="min-h-screen bg-[#E5ECE9] text-[#1F2D2B] selection:bg-[#A3C1AD] selection:text-white">
      <header className="backdrop-blur-md bg-white/80 border-b border-[#CAD8D4] sticky top-0 z-50 shadow-md">
        <div className="mx-auto flex items-center justify-between px-8 py-4  max-w-7xl">
          <div
            onClick={() => navigate("/")}
            tabIndex={0}
            role="button"
            aria-label="Go to Home"
            className="cursor-pointer flex items-center space-x-2 hover:opacity-80 transition duration-300"
          >
            <img
              src="/images/logo.png"
              alt="LanceMusic Logo"
              className="h-12 w-auto object-contain rounded-xl"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-6 py-3 rounded-2xl bg-[#A3C1AD] text-white font-semibold shadow hover:bg-[#8EA798] transition duration-200 focus:outline-none focus:ring-4 focus:ring-[#A3C1AD]/50"
            >
              Menu ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white text-[#1F2D2B] rounded-xl shadow-xl overflow-hidden border border-[#CAD8D4] animate-fade-in">
                <button
                  onClick={() => {
                    navigate("/");
                    setDropdownOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left flex items-center space-x-3 hover:bg-[#F0F5F3] transition"
                >
                  <img
                    src="/images/logo.png" // Ensure this path is correct (should be in /public/images)
                    alt="Home"
                    className="h-5 w-5 object-contain rounded-md"
                  />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/EarTraining");
                    setDropdownOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-[#F0F5F3] transition"
                >
                  🎧 Ear Training
                </button>
                <button
                  onClick={() => {
                    navigate("/about");
                    setDropdownOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-[#F0F5F3] transition"
                >
                  👤 About Me
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}