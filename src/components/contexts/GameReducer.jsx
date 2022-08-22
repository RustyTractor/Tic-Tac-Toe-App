const GameReducer = (state, action) => {
  switch (action.type) {
    case "SET_TURN":
      return {
        ...state,
        isX: action.isX,
        isPlayerTurn: action.isPlayerTurn,
      };
    case "SET_FIRST_TURN":
      return {
        ...state,
        isPlayerFirst: action.isPlayerFirst,
      };

    case "SET_PLAYER_TURN":
      return {
        ...state,
        isPlayerTurn: action.isPlayerTurn,
      };
    default:
      return state;
  }
};

export default GameReducer;
