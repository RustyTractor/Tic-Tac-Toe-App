import { createContext, useEffect, useReducer, useState } from "react";
import GameReducer from "./GameReducer";
import { AiCalculate } from "../../essentialScripts/AiFunctions";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const initalState = {
    isX: true,
    isPlayerTurn: true,
  };
  const [isStarted, setIsStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isPlayerFirst, setIsPlayerFirst] = useState(false);
  const [gameBoard, setGameBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [state, dispatch] = useReducer(GameReducer, initalState);

  const newGame = () => {
    setIsStarted(false);
    setGameBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const setStep = (clickedFiled) => {
    if (state.isPlayerTurn && isStarted) {
      dispatch({
        type: "SET_TURN",
        isX: !state.isX,
        isPlayerTurn: !state.isPlayerTurn,
      });
      writeIntoBoard(clickedFiled);
    }
  };

  const writeIntoBoard = (field) => {
    const copy = [...gameBoard];

    if (copy[field] === 0) {
      state.isX ? (copy[field] = 1) : (copy[field] = 2);
    }

    setGameBoard(copy);
  };

  const modifyPlayerTurn = (trun) => {
    dispatch({
      type: "SET_PLAYER_TURN",
      isPlayerTurn: trun,
    });
  };

  const AiStep = () => {
    const step = AiCalculate(isPlayerFirst, [...gameBoard]);
    dispatch({
      type: "SET_TURN",
      isX: !state.isX,
      isPlayerTurn: !state.isPlayerTurn,
    });
    writeIntoBoard(step);
  };

  useEffect(() => {
    !state.isPlayerTurn && AiStep();
  });

  return (
    <GameContext.Provider
      value={{
        isStarted,
        newGame,
        gameBoard,
        isX: state.isX,
        isPlayerTurn: state.isPlayerTurn,
        setStep,
        setIsPlayerFirst,
        setIsStarted,
        modifyPlayerTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
