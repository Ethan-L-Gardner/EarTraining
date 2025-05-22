import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import EarTraining from "./EarTraining";
import TrainingPage from "./TrainingPage"; // your detailed level page

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eartraining" element={<EarTraining />} />
        <Route path="/training/:level" element={<TrainingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

