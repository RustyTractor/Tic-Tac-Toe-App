import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "./contexts/GameContext";

const Choice = () => {
  const { isStarted, setIsPlayerFirst, setIsStarted, modifyPlayerTurn } =
    useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    isStarted && navigate("/");
  });

  const handleClick = (choice) => {
    if (choice === "x") {
      setIsPlayerFirst(true);
      modifyPlayerTurn(true);
    } else {
      setIsPlayerFirst(false);
      modifyPlayerTurn(false);
    }
    setIsStarted(true);
    navigate("/game");
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
