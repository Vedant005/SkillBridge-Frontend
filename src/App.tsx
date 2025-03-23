import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import GigsPage from "./pages/GigsPage";
import Home from "./pages/HomePage";
import SingleGigPage from "./pages/SingleGigPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<GigsPage />} />
        <Route path="/gigs/:gigId" element={<SingleGigPage />} />
      </Routes>
    </>
  );
}

export default App;
