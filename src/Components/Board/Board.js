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
  const [playerTurn, setPlayerTurn] = useState("black");
  const [count, setCount] = useState(0);

  const clickHandler = (event, y, x) => {
    event.preventDefault();
    // console.log("hello")
    showLegalMoves(y, x)
    

    // if (boardStateCopy[y + 1][x + 1] === "black") boardStateCopy[y + 1][x + 1] = "blackPiece";

  }

  const showLegalMoves = (x, y) => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState))
    const boardLength = boardStateCopy.length;
    const boardWidth = boardStateCopy[0].length;

    while (count < 2 && playerTurn === "black" && x <= boardWidth - 1 && y < boardLength - 1) {
      if ((boardStateCopy[y + 1][x + 1]) && boardStateCopy[y + 1][x + 1] === "black") {
        console.log("clicked")
        boardStateCopy[y + 1][x + 1] = "blackPieceCheck";

      }
      if (boardStateCopy[y + 1][x - 1] === "black") boardStateCopy[y + 1][x - 1] = "blackPieceCheck";
      if (boardStateCopy[y + 1][x + 1] === "redPiece") {
        setCount(count += 1)
        showLegalMoves(y + 1, x + 1);
      }
      if (x > 0 && y < boardLength - 1 && boardStateCopy[y + 1][x - 1] === "black") boardStateCopy[y + 1][x - 1] = "blackPieceCheck";

      setBoardState(boardStateCopy);
    }
    setCount(count = 0);
    return boardStateCopy;
  }

  return (
    <div className="BoardContainer">
      {boardState.map((cell, index) =>
      {
      return <BoardRow key={"Row" + index} rowState={cell} yindex={index} clickHandler={clickHandler} />
      })}
    </div>
  );
};

export default Board;
