import React, { useState } from "react";
import BoardRow from "../BoardRow/BoardRow";
import "./Board.css";

const initialBoardState = [
  ["white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece"],
  ["blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white"],
  ["white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece"],
  ["black", "white", "black", "white", "black", "white", "black", "white"],
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece", "white"],
  ["white", "redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece"],
  ["redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece", "white"]
];

const Board = () => {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [playerTurn, setPlayerTurn] = useState("red");

  const showLegalMoves = (event, y, x) => {
    event.preventDefault();
    const boardStateCopy = JSON.parse(JSON.stringify(boardState))
    console.log(boardStateCopy.length)

    if ( x < boardStateCopy.length - 1  && y < boardStateCopy.length - 1 && boardStateCopy[y + 1][x + 1] === "black") boardStateCopy[y + 1][x + 1] = "blackPiece";
    setBoardState(boardStateCopy)
    // if (boardStateCopy[y + 1][x + 1] === "black") boardStateCopy[y + 1][x + 1] = "blackPiece";



  }

  return (
    <div className="BoardContainer">
      {boardState.map((cell, index) =>
      {
      return <BoardRow key={"Row" + index} rowState={cell} yindex={index} showLegalMoves={showLegalMoves} />
      })}
    </div>
  );
};

export default Board;
