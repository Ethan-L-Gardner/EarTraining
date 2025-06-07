import React from "react";
import { useNavigate } from "react-router-dom";

export default function AboutMe() {
    const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center px-4 pt-20 text-center bg-[#E5ECE9] text-[#1F2D2B]"
      style={{
        background:
          "linear-gradient(135deg, #E5ECE9 0%, #C9D9CC 100%)",
        backgroundImage:
          `linear-gradient(135deg, #E5ECE9 0%, #C9D9CC 100%), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='1' cy='1' r='1' fill='%2399A89C' fill-opacity='0.02'/></svg>")`,
        backgroundRepeat: "repeat",
        backgroundSize: "100px 100px",
      }}
    >
      <div className="max-w-5xl w-full p-12 rounded-3xl shadow-2xl bg-white/85 backdrop-blur-md border border-[#CAD8D4] space-y-8">
        {/* <img
          src="/images/hero-cello.jpg"
          alt="Lance playing cello"
          className="mx-auto rounded-2xl object-cover w-full h-64 shadow-lg"
        /> */}

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2F4F4F]">🎻 About Lance Music</h1>

        <p className="text-lg sm:text-xl text-[#3B4D48] font-medium max-w-3xl mx-auto">
          Hi! Welcome to Lance Music, I am a cellist and music enthusiast and this is my personal project to make ear training more intuitive, creative, and fun (and to play with MERN full stack development!). Whether you're a beginner trying to recognize intervals or a seasoned player refining your pitch accuracy, this site has some interactive tools and tests designed to sharpen your ear and deepen your connection to music.
        </p>

        <div className="bg-[#E6F0EA] p-6 rounded-2xl text-left shadow-md">
          <h2 className="text-2xl font-semibold mb-2">🎧 Why Ear Training?</h2>
          <p>
            Ear training is one of the most powerful yet overlooked musical skills. Lance Music was built to provide the tools I always wished I had as I grew as a performer and teacher. Every exercise here is built from real-world musical needs.
          </p>
        </div>

        <div className="bg-[#E6F0EA] p-6 rounded-2xl text-left shadow-md">
          <h2 className="text-2xl font-semibold mb-2">🔧 What You’ll Find Here</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Interactive Ear Training Tools</strong> – Interval recognition, chord recognition, melodic dictation, and more.</li>
            <li><strong>Sheet Music Repository</strong> – Coming soon...</li>
            <li><strong>Progress Tracking</strong> – Coming soon...</li>
          </ul>
        </div>

        <div className="bg-[#E6F0EA] p-6 rounded-2xl text-left shadow-md">
          <h2 className="text-2xl font-semibold mb-2">📺 Cello Covers on YouTube</h2>
          <p>
            When I’m not coding ear training tools, I’m arranging and recording cello covers of the music I love – mostly from games and film OSTs.
          </p>
        <div className="mt-6 aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-96 rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/X8ji0Zhua64"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
        </div>
          <a
            href="https://www.youtube.com/@lancemusic1591"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 rounded-3xl bg-[#4C7068] text-white font-semibold hover:bg-[#3F5B53] transition"
          >
            Visit My YouTube Channel
          </a>
        </div>

        <p className="text-lg sm:text-xl text-[#3B4D48] font-medium max-w-3xl mx-auto">
          Lance Music is an evolving project, just like every musician’s journey – thanks for stopping by!
        </p>

        <p className="italic">Stay tuned,<br />– Lance Music</p>
      </div>
    </div>
  );
}