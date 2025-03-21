import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import GigsPage from "./pages/GigsPage";
import Home from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<GigsPage />} />
      </Routes>
    </>
  );
}

export default App;
