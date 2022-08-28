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

  //If the SessionStorage not empty , then use those datas. Otherwise set the basic values.
  const [isStarted, setIsStarted] = useState(getIfExist("isStarted") || false);

  const [difficulty, setDifficulty] = useState(
    getIfExist("difficulty") || "easy"
  );

  const [isPlayerFirst, setIsPlayerFirst] = useState(
    getIfExist("isPlayerFirst") || true
  );

  const [gameBoard, setGameBoard] = useState(
    getIfExist("gameBoard") || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  // If the game is started , then write every changes into the sessionStorage, else just drope everything.
  useEffect(() => {
    isStarted &&
      writeIntoSession(
        state.isX,
        state.isPlayerTurn,
        isPlayerFirst,
        isStarted,
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
        setIsPlayerFirst,
        setIsStarted,
        setDifficulty,
        setGameBoard,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
