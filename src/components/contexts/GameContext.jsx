import { createContext, useEffect, useReducer, useState } from "react";
import GameReducer from "./GameReducer";

import {
  getIfExist,
  writeIntoSession,
} from "../../essentialScripts/LocalSession";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const initalState = {
    isX: getIfExist("isX") || true,
    isPlayerTurn: getIfExist("isPlayerTurn") || true,
  };

  const [state, dispatch] = useReducer(GameReducer, initalState);
  const [winner, setWinner] = useState(getIfExist("winner") || 0);

  //If the SessionStorage not empty , then use those datas. Otherwise set the basic values.
  const [isStarted, setIsStarted] = useState(getIfExist("isStarted") || false);

  const [isDone, setIsDone] = useState(getIfExist("isDone") || false);

  const [difficulty, setDifficulty] = useState(
    getIfExist("difficulty") || "easy"
  );

  const [isPlayerFirst, setIsPlayerFirst] = useState(
    getIfExist("isPlayerFirst") || true
  );

  const [gameBoard, setGameBoard] = useState(
    getIfExist("gameBoard") || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  // If player is start a new game , then reset every value.

  const newGame = () => {
    dispatch({
      type: "SET_TURN",
      isX: true,
      isPlayerTurn: true,
    });
    setIsStarted(false);
    setIsDone(false);
    setGameBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  // If the game is started , then write every changes into the sessionStorage, else just drope everything.
  useEffect(() => {
    isStarted &&
      writeIntoSession(
        state.isX,
        state.isPlayerTurn,
        isPlayerFirst,
        isStarted,
        isDone,
        winner,
        difficulty,
        gameBoard
      );

    !isStarted && sessionStorage.clear();
  });

  return (
    <GameContext.Provider
      value={{
        isStarted,
        isPlayerFirst,
        gameBoard,
        state,
        difficulty,
        winner,
        isDone,
        setIsPlayerFirst,
        setIsStarted,
        setDifficulty,
        setGameBoard,
        setIsDone,
        setWinner,
        dispatch,
        newGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
