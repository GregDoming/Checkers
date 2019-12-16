const showMoves = (y, x) => {
  const boardStateCopy = JSON.parse(JSON.stringify(boardState));

  let inJump = false;
  let firstTurn = true;
  let direction = "neutral";

  const inner = (y, x) => {
    if (y < 7 && x < 7 && boardStateCopy[y + 1][x + 1] === "redPiece" && inJump) {
      direction = "neutral";
      inJump = false;

      return;
    }

    if (y < 7 && x > 0 && boardStateCopy[y + 1][x - 1] === "redPiece" && inJump) {
      direction = "neutral";
      inJump = false;

      return;
    }
    if (y < 7 && x > 0 && boardStateCopy[y + 1][x - 1] === "black" && !inJump && firstTurn) {
      boardStateCopy[y + 1][x - 1] = "blackPieceCheck";
    }

    if (y < 7 && x < 7 && boardStateCopy[y + 1][x + 1] === "black" && !inJump && firstTurn) {
      boardStateCopy[y + 1][x + 1] = "blackPieceCheck";
    }

    if (y < 7 && x > 0 && boardStateCopy[y + 1][x - 1] === "redPiece" && !inJump) {
      firstTurn = false;
      inJump = true;

      direction = "left";
      inner(y + 1, x - 1);

      direction = "right";
      inner(y + 1, x + 1);
    }

    if (y < 7 && x < 7 && boardStateCopy[y + 1][x + 1] === "redPiece" && !inJump) {
      firstTurn = false;
      inJump = true;

      direction = "right";
      inner(y + 1, x + 1);

      direction = "left";
      inner(y + 1, x - 1);
    }

    if (
      y < 7 &&
      x < 7 &&
      boardStateCopy[y + 1][x + 1] === "black" &&
      inJump &&
      direction !== "left"
    ) {
      inJump = false;
      boardStateCopy[y + 1][x + 1] = "blackPieceCheck";
      direction = "default";

      return inner(y + 1, x + 1);
    }

    if (
      y < 7 &&
      x > 0 &&
      boardStateCopy[y + 1][x - 1] === "black" &&
      inJump &&
      direction !== "right"
    ) {
      inJump = false;
      boardStateCopy[y + 1][x - 1] = "blackPieceCheck";
      direction = "default";

      return inner(y + 1, x - 1);
    }
  };
  inner(y, x);
  changeTurn();
  setBoardState(boardStateCopy);
};