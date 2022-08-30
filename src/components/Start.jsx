import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Start = () => {
  const { isStarted, newGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleNewGame = () => {
    setTimeout(() => {
      newGame();
      navigate("/difficulty");
    }, 250);
  };

  return (
    <div className="holder">
      <button onClick={() => handleNewGame()}>NEW GAME</button>
      {isStarted && (
        <button
          onClick={() =>
            setTimeout(() => {
              navigate("/game");
            }, 1000)
          }
        >
          CONTINUE
        </button>
      )}
    </div>
  );
};

export default Start;
