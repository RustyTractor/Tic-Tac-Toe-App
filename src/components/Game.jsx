import React, { useContext } from "react";
import GameContext from "./contexts/GameContext";

const Game = () => {
  const { gameBoard, isX, setStep } = useContext(GameContext);

  const checkTheWinner = () => {};
  return (
    <div className="conatiner">
      <div className="gameboard">
        {gameBoard.map((field, num) => (
          <div
            onClick={() => setStep(num)}
            key={num}
            className={`field ${field !== 0 && "fixed"}`}
          >
            <div
              className={`shape ${
                (field === 0 && (isX ? "x" : "o")) ||
                (field === 1 && "x") ||
                (field === 2 && "o")
              }`}
            >
              <div></div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
