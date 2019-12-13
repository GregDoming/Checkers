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

  return (
    <div className="BoardContainer">
      {boardState.map((cell, index) =>
      {
      return <BoardRow key={"Row" + index} rowState={cell} rowIndex={index} />
      })}
    </div>
  );
};

export default Board;
