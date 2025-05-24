import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center px-4 pt-20 text-center bg-[#E5ECE9] text-[#1F2D2B] "
      style={{
        background:
          "linear-gradient(135deg, #E5ECE9 0%, #C9D9CC 100%)",
        // subtle noise texture overlay, very low opacity
        backgroundImage:
          `linear-gradient(135deg, #E5ECE9 0%, #C9D9CC 100%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='1' cy='1' r='1' fill='%2399A89C' fill-opacity='0.02'/></svg>")`,
        backgroundRepeat: "repeat",
        backgroundSize: "100px 100px",
      }}
    >
      <div className="max-w-7xl w-full p-16 rounded-3xl shadow-2xl bg-white/85 backdrop-blur-md border border-[#CAD8D4]">
        {/* Logo */}
        <img
          src="/images/logo.png" // Update this path to your logo file location
          alt="LanceMusic Logo"
          className="mx-auto mb-8 h-28 w-auto object-contain rounded-2xl"
        />

        {/* Welcome Text */}
        <h1
          className="
            text-5xl sm:text-6xl font-extrabold mb-6 text-[#2F4F4F]
            animate-fadeInScale
          "
          style={{ lineHeight: 1.1 }}
        >
          Welcome to
        </h1>

        {/* LanceMusic box */}
        <div
          className="
            inline-block
            px-8 py-4
            mb-10
            rounded-2xl
            bg-[#A3C1AD]
            text-white
            font-extrabold
            text-5xl sm:text-6xl
            shadow-lg
            tracking-wide
          "
        >
          LanceMusic
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl mb-14 text-[#3B4D48] font-medium leading-relaxed max-w-3xl mx-auto">
          Start your journey to better musical skills with our interactive tools.
          Our platform offers personalized ear training, tutorials, and more to help you
          become a confident musician.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/eartraining")}
          className="bg-[#4C7068] text-white font-semibold text-lg px-10 py-4 rounded-3xl shadow-xl hover:bg-[#3F5B53] transition duration-300"
        >
          Go to Ear Training
        </button>
      </div>

      {/* Custom animation styles */}
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 1s ease forwards;
        }
      `}</style>
    </div>
  );
}