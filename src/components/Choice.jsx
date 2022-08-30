import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Choice = () => {
  const { isStarted, setIsPlayerFirst, setIsStarted, dispatch } =
    useContext(GameContext);

  const navigate = useNavigate();

  // If the game started , then the player can't reach the character select option...
  useEffect(() => {
    isStarted && navigate("/");
  });

  const modifyPlayerTurn = (trun) => {
    dispatch({
      type: "SET_PLAYER_TURN",
      isPlayerTurn: trun,
    });
  };

  // Select the current character, and start the game...
  const handleClick = (choice) => {
    if (choice === "x") {
      setIsPlayerFirst(true);
      modifyPlayerTurn(true);
    } else {
      setIsPlayerFirst(false);
      modifyPlayerTurn(false);
    }

    setTimeout(() => {
      setIsStarted(true);
      navigate("/game");
    }, 250);
  };
  return (
    <div className="choiceHolder">
      <div onClick={() => handleClick("x")} className="choice choiceX">
        <div className="choiceShape x">
          <div></div>
          <div></div>
        </div>
      </div>
      <div onClick={() => handleClick("o")} className="choice choiceO">
        <div className="choiceShape o">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Choice;
