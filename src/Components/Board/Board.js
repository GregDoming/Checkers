import React, { useState } from "react";
import BoardRow from "../BoardRow/BoardRow";
import "./Board.css";

const initialBoardState = [
  ["white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece"],
  ["blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white"],
  ["white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece"],
  ["black", "white", "black", "white", "redPiece", "white", "black", "white"],
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece", "white"],
  ["white", "redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece"],
  ["redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece", "white"]
];

const Board = () => {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [playerTurn, setPlayerTurn] = useState("black");

  const clickHandler = (event, y, x) => {
    event.preventDefault();

    showLegalMoves(y, x);
  };

  const changeTurn = () => {
    if (playerTurn === "black") {
      setPlayerTurn("red");
    } else {
      setPlayerTurn("black");
    }
  };
  
  


  const showLegalMoves = (y, x) => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState));
    const goingRight = true;

    let count = 0;
    let direction = "neutral"

    const closure = (y, x) => {
      if (boardStateCopy[y + 1][x + 1] && y < 7 && boardStateCopy[y + 1][x + 1] === "black" && direction !== "left") {
        boardStateCopy[y + 1][x + 1] = "blackPieceCheck";
      };
      
      if (boardStateCopy[y + 1][x - 1] && y < 7 && boardStateCopy[y + 1][x - 1] === "black" && direction !== "right") {
        boardStateCopy[y + 1][x - 1] = "blackPieceCheck";
      };

      if (boardStateCopy[y + 1][x + 1] === "redPiece") {
        count += 1;
        direction = "right";
        closure(y + 1, x + 1);
      };

      if (boardStateCopy[y + 1][x - 1] === "redPiece") {
        count += 1;
        direction = "right";
        closure(y + 1, x + 1);
      };
      
      changeTurn();
      return;
    };

    closure(y, x);
    setBoardState(boardStateCopy);
  };

  return (
    <div className="BoardContainer">
      <h1>{playerTurn}</h1>
      {boardState.map((cell, index) => {
        return (
          <BoardRow
            key={"Row" + index}
            rowState={cell}
            yindex={index}
            clickHandler={clickHandler}
          />
        );
      })}
    </div>
  );
};

export default Board;
