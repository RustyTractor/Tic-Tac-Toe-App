import React, { useContext, useEffect } from "react";
import {
  detectWinner,
  isEmptyField,
  AiCalculate,
} from "../essentialScripts/AiFunctions";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";
import { saveTheResult } from "../essentialScripts/LocalSession";

const Game = () => {
  const {
    gameBoard,
    state,
    winner,
    isStarted,
    isPlayerFirst,
    isDone,
    setIsDone,
    setWinner,
    dispatch,
    setGameBoard,
    difficulty,
  } = useContext(GameContext);

  const navigate = useNavigate();

  // Handle player's click
  const setStep = (clickedFiled) => {
    if (state.isPlayerTurn && isStarted && gameBoard[clickedFiled] === 0) {
      dispatch({
        type: "SET_TURN",
        isX: !state.isX,
        isPlayerTurn: !state.isPlayerTurn,
      });
      writeIntoBoard(clickedFiled);
    }
  };

  // If the current place is not occupied , then set the value.
  const writeIntoBoard = (field) => {
    const copy = [...gameBoard];

    if (copy[field] === 0) {
      state.isX ? (copy[field] = 1) : (copy[field] = 2);
    }

    setGameBoard(copy);
  };

  // Handle the ai step...
  const AiStep = () => {
    const step = AiCalculate(isPlayerFirst, [...gameBoard], difficulty);
    dispatch({
      type: "SET_TURN",
      isX: !state.isX,
      isPlayerTurn: !state.isPlayerTurn,
    });
    writeIntoBoard(step);
  };

  useEffect(() => {
    // If someon wins with the current step or draw , then game is done...
    if (detectWinner(gameBoard) !== 0 || isEmptyField(gameBoard) === false) {
      console.log("Lefut a győztes detektálása!");
      setIsDone(true);
      setWinner(detectWinner(gameBoard));
    }

    if (isDone) {
      console.log("Lefut a navigáció!");
      saveTheResult(difficulty, winner, isPlayerFirst);
      navigate("/end");
    }
  });

  useEffect(() => {
    !state.isPlayerTurn && isStarted && !isDone && AiStep();
  });

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
    </div>
  );
};

export default Game;
