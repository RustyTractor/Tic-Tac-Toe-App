import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Start = () => {
  const { isStarted, dispatch, setIsStarted, setGameBoard } =
    useContext(GameContext);
  const navigate = useNavigate();

  const handleNewGame = () => {
    newGame();
    navigate("/difficulty");
  };

  // If player is start a new game , then reset every value.
  const newGame = () => {
    dispatch({
      type: "SET_TURN",
      isX: true,
      isPlayerTurn: true,
    });
    setIsStarted(false);
    setGameBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };
  return (
    <div className="holder">
      <button onClick={() => handleNewGame()}>NEW GAME</button>
      {isStarted && <button onClick={() => navigate("/game")}>CONTINUE</button>}
    </div>
  );
};

export default Start;
