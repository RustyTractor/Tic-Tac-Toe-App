import React, { useContext } from "react";
import GameContext from "./contexts/GameContext";
import { useNavigate } from "react-router-dom";

const End = () => {
  const { gameBoard, state, winner, newGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleNewGame = () => {
    newGame();
    navigate("/difficulty");
  };
  return (
    <div className="conatiner">
      <div className="gameboard blur">
        {gameBoard.map((field, num) => (
          <div key={num} className={`field ${field !== 0 && "fixed"}`}>
            <div
              className={`shape ${
                (field === 0 && (state.isX ? "x" : "o")) ||
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
      <div className="end">
        <div className="textHolder">
          {winner === 1 && <p className="x">X is the Winner!</p>}
          {winner === -1 && <p className="o">O is the Winner!</p>}
          {winner === 0 && <p className="d">Draw game!</p>}
        </div>
        <div className="resultHolder"></div>

        <div className="buttonHolder">
          <button onClick={() => handleNewGame()}>NEW GAME</button>
        </div>
      </div>
    </div>
  );
};

export default End;
