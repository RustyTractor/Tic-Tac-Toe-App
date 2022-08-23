export const writeIntoSession = (
  isX,
  isPlayerTurn,
  isPlayerFirst,
  isStarted,
  difficulty,
  gameBoard
) => {
  sessionStorage.setItem("isX", JSON.stringify(isX));
  sessionStorage.setItem("isPlayerTurn", JSON.stringify(isPlayerTurn));
  sessionStorage.setItem("isPlayerFirst", JSON.stringify(isPlayerFirst));
  sessionStorage.setItem("isStarted", JSON.stringify(isStarted));
  sessionStorage.setItem("difficulty", JSON.stringify(difficulty));
  sessionStorage.setItem("gameBoard", JSON.stringify(gameBoard));
};

// If it exist, then get the data fromt the Session...
export const getIfExist = (key) => {
  if (sessionStorage.getItem(key) !== undefined) {
    return JSON.parse(sessionStorage.getItem(key));
  }
};
