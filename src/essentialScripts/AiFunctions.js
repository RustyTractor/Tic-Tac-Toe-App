const MAX = 10;
const MIN = -10;

const possibleOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Detect the Winner , if there's a winner the function will return with 1 or 2, othervise 0...
export const detectWinner = (table) => {
  for (let i = 0; i < 8; i++) {
    // If we find a combination which contains completly ones, then X wins...
    if (
      table[possibleOptions[i][0]] === 1 &&
      table[possibleOptions[i][1]] === 1 &&
      table[possibleOptions[i][2]] === 1
    ) {
      return 1;
    }
    //If we find a combination which contains completly twos , thata mean O wins...
    if (
      table[possibleOptions[i][0]] === 2 &&
      table[possibleOptions[i][1]] === 2 &&
      table[possibleOptions[i][2]] === 2
    ) {
      return -1;
    }
  }
  //Otherwise the game continue
  return 0;
};

// Is there any empty field
export const isEmptyField = (table) => {
  for (let i = 0; i < 9; i++) {
    if (table[i] === 0) {
      return true;
    }
  }

  return false;
};

// Min - Max alga with Alpha and Beta cut... https://www.javatpoint.com/mini-max-algorithm-in-ai
const minmax = (table, depth, currentDepth, isMax, alpha, beta) => {
  let score = detectWinner(table);

  if (score === 1 || score === -1) {
    return score;
  }

  if (isEmptyField(table) === false || currentDepth === depth) {
    return 0;
  }

  if (isMax) {
    let bestScore = MIN;
    for (let i = 0; i < 9; i++) {
      if (table[i] === 0) {
        table[i] = 1;

        let result = minmax(
          table,
          depth,
          currentDepth + 1,
          !isMax,
          alpha,
          beta
        );

        bestScore = Math.max(bestScore, result);
        alpha = Math.max(alpha, bestScore);

        table[i] = 0;

        if (beta <= alpha) {
          break;
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = MAX;

    for (let i = 0; i < 9; i++) {
      if (table[i] === 0) {
        table[i] = 2;

        let result = minmax(
          table,
          depth,
          currentDepth + 1,
          !isMax,
          alpha,
          beta
        );

        bestScore = Math.min(bestScore, result);
        beta = Math.min(beta, bestScore);

        table[i] = 0;

        if (beta <= alpha) {
          break;
        }
      }
    }

    return bestScore;
  }
};

//AI choice. Wich is currentli just a random number.
export const AiCalculate = (playerFirst, table) => {
  let bestValue = MAX;
  let bestMove = 0;
  let isMaxTheNext = true;
  let placeMarker = 2;

  console.log(table);

  if (!playerFirst) {
    bestValue = MIN;
    isMaxTheNext = false;
    placeMarker = 1;
  }

  // Go through at the fields..
  for (let i = 0; i < 9; i++) {
    // Check is the current field isnt marked...
    if (table[i] === 0) {
      table[i] = placeMarker;

      // Call MinMax algorithm for the best choice...
      let currentValue = minmax(table, 15, 0, isMaxTheNext, MIN, MAX);

      table[i] = 0;

      if (playerFirst) {
        if (currentValue < bestValue) {
          bestMove = i;
          bestValue = currentValue;
        }
      } else {
        if (currentValue > bestValue) {
          bestMove = i;
          bestValue = currentValue;
        }
      }
    }
  }

  return bestMove;
};
