import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Difficulty = () => {
  const { isStarted } = useContext(GameContext);
  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const navigate = useNavigate();

  useEffect(() => {
    isStarted && navigate("/");
  });

  const handleClick = (difficulty) => {
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
