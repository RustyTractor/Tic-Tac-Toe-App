export const writeIntoSession = (
  isX,
  isPlayerTurn,
  isPlayerFirst,
  isStarted,
  isDone,
  winner,
  difficulty,
  gameBoard
) => {
  sessionStorage.setItem("isX", JSON.stringify(isX));
  sessionStorage.setItem("isPlayerTurn", JSON.stringify(isPlayerTurn));
  sessionStorage.setItem("isPlayerFirst", JSON.stringify(isPlayerFirst));
  sessionStorage.setItem("isStarted", JSON.stringify(isStarted));
  sessionStorage.setItem("isDone", JSON.stringify(isDone));
  sessionStorage.setItem("winner", JSON.stringify(winner));
  sessionStorage.setItem("difficulty", JSON.stringify(difficulty));
  sessionStorage.setItem("gameBoard", JSON.stringify(gameBoard));
};

// If it exist, then get the data fromt the Session...
export const getIfExist = (key) => {
  if (sessionStorage.getItem(key) !== undefined) {
    return JSON.parse(sessionStorage.getItem(key));
  }
};

export const saveTheResult = (difficulty, winner, isPlayerFirst) => {
  let results = [];
  let endResult;

  switch (winner) {
    case 0:
      endResult = "DRAW";
      break;
    case 1:
      if (isPlayerFirst) {
        endResult = "PLAYER";
      } else {
        endResult = "AI";
      }
      break;
    case -1:
      if (isPlayerFirst) {
        endResult = "AI";
      } else {
        endResult = "PLAYER";
      }
      break;
    default:
      endResult = "DRAW";
  }

  if (localStorage.getItem("results") !== null) {
    results = JSON.parse(localStorage.getItem("results"));
  }

  results.push({ difficulty: difficulty, winner: endResult });

  localStorage.setItem("results", JSON.stringify(results));
};
