import React from "react";
import { GameProvider } from "./components/contexts/GameContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
import Difficulty from "./components/Difficulty";
import Game from "./components/Game";
import Choice from "./components/Choice";
import End from "./components/End";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/difficulty" element={<Difficulty />} />
            <Route path="/choice" element={<Choice />} />
            <Route path="/game" element={<Game />} />
            <Route path="/end" element={<End />} />
          </Routes>
        </main>
      </Router>
    </GameProvider>
  );
};

export default App;
