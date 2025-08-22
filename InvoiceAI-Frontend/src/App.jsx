import React from "react";
import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/review/:id" element={<ReviewPage />} />
      <Route path="/summary/:id" element={<SummaryPage />} />
    </Routes>
  );
}

export default App;
