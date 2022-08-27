import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Difficulty = () => {
  const { isStarted, setDifficulty } = useContext(GameContext);
  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const navigate = useNavigate();

  // If the game started , then the player cant reach these options
  useEffect(() => {
    isStarted && navigate("/");
  });

  // Set the difficulty and jump to the next selectable options...
  const handleClick = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/choice");
  };

  return (
    <div className="buttons">
      {difficulties.map((diff) => (
        <button
          className={diff.toLowerCase()}
          key={diff.toLowerCase()}
          onClick={() => handleClick(diff)}
        >
          {diff}
        </button>
      ))}
    </div>
  );
};

export default Difficulty;
