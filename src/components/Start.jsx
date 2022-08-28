import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Start = () => {
  const { isStarted, newGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleNewGame = () => {
    newGame();
    navigate("/difficulty");
  };

  return (
    <div className="holder">
      <button onClick={() => handleNewGame()}>NEW GAME</button>
      {isStarted && <button onClick={() => navigate("/game")}>CONTINUE</button>}
    </div>
  );
};

export default Start;
