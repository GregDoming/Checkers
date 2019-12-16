import React, { useState } from "react";
import BoardRow from "../BoardRow/BoardRow";
import "./Board.css";
import { inheritInnerComments } from "@babel/types";

const initialBoardState = [
  ["white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece"],
  ["blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white"],
  ["white", "blackPiece", "white", "blackPiece", "white", "blackPiece", "white", "blackPiece"],
  ["black", "white", "black", "white", "redPiece", "white", "redPiece", "white"],
  ["white", "black", "white", "black", "white", "black", "white", "black"],
  ["redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece", "white"],
  ["white", "redPiece", "white", "black", "white", "black", "white", "black"],
  ["redPiece", "white", "redPiece", "white", "redPiece", "white", "redPiece", "white"]
];

const Board = () => {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [playerTurn, setPlayerTurn] = useState("black");
  const [duringTurn, setDuringTurn] = useState(false);
  const [currentBlackXPos, setCurrentBlackXPos] = useState(-1);
  const [currentBlackYPos, setCurrentBlackYPos] = useState(-1);

  const [currentRedPos, setCurrentRedPosition] = useState({ x: -1, y: 0 });

  const clickHandler = (event, yCord, xCord) => {
    event.preventDefault();
    if (playerTurn === "black" && boardState[yCord][xCord] === "blackPiece" && !duringTurn) {
      setCurrentBlackXPos(xCord);
      setCurrentBlackYPos(yCord);
      showMoves(yCord, xCord);
      setDuringTurn(true);
    }
  };

  const moveHandler = event => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState));

    if (
      duringTurn &&
      event.keyCode === 37 &&
      boardState[currentBlackYPos + 1][currentBlackXPos - 1] === "blackPieceCheck"
    ) {
      if (boardState[currentBlackYPos + 1][currentBlackXPos + 1] === "blackPieceCheck")
        boardStateCopy[currentBlackYPos + 1][currentBlackXPos + 1] = "black";
      boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
      boardStateCopy[currentBlackYPos + 1][currentBlackXPos - 1] = "blackPiece";
    }

    if (
      duringTurn &&
      event.keyCode === 37 &&
      boardState[currentBlackYPos + 2][currentBlackXPos - 2] === "blackPieceCheck"
    ) {
      if (boardState[currentBlackYPos + 2][currentBlackXPos + 2] === "blackPieceCheck")
        boardStateCopy[currentBlackYPos + 2][currentBlackXPos + 2] = "black";
      boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
      boardStateCopy[currentBlackYPos + 1][currentBlackXPos - 1] = "black";
      boardStateCopy[currentBlackYPos + 2][currentBlackXPos - 2] = "blackPiece";
    }

    if (
      duringTurn &&
      event.keyCode === 39 &&
      boardState[currentBlackYPos + 1][currentBlackXPos + 1] === "blackPieceCheck"
    ) {
      if (boardState[currentBlackYPos + 1][currentBlackXPos - 1] === "blackPieceCheck")
        boardStateCopy[currentBlackYPos + 1][currentBlackXPos - 1] = "black";
      boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
      boardStateCopy[currentBlackYPos + 1][currentBlackXPos + 1] = "blackPiece";
    }

    if (
      duringTurn &&
      event.keyCode === 39 &&
      boardState[currentBlackYPos + 2][currentBlackXPos + 2] === "blackPieceCheck"
    ) {
      if (
        boardState[currentBlackYPos + 2][currentBlackXPos - 2] &&
        boardState[currentBlackYPos + 2][currentBlackXPos - 2] === "blackPieceCheck"
      )
        boardStateCopy[currentBlackYPos + 2][currentBlackXPos - 2] = "black";
      boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
      boardStateCopy[currentBlackYPos + 1][currentBlackXPos + 1] = "black";
      boardStateCopy[currentBlackYPos + 2][currentBlackXPos + 2] = "blackPiece";
    }
    setBoardState(boardStateCopy);
    console.log(boardState);
  };

  const moveSelectedPiece = (x, y) => {};

  const changeTurn = () => {
    if (playerTurn === "black") {
      setPlayerTurn("red");
    } else {
      setPlayerTurn("black");
    }
  };

  const handleTurn = () => {};
  const showMoves = (y, x) => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState));

    let inJump = false;
    let direction = "neutral";

    const inner = (y, x) => {
      if (y < 7 && x > 0 && boardStateCopy[y + 1][x - 1] === "black" && !inJump) {
        boardStateCopy[y + 1][x - 1] = "blackPieceCheck";
      }

      if (y < 7 && x < 7 && boardStateCopy[y + 1][x + 1] === "black" && !inJump) {
        boardStateCopy[y + 1][x + 1] = "blackPieceCheck";
      }

      if (y < 7 && x > 0 && boardStateCopy[y + 1][x - 1] === "redPiece" && !inJump) {
        inJump = true;
        direction = "left";
        inner(y + 1, x - 1);
      }

      if (y < 7 && x < 7 && boardStateCopy[y + 1][x + 1] === "redPiece" && !inJump) {
        inJump = true;
        direction = "right";
        inner(y + 1, x + 1);
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
        return;
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
        return;
      }

      if (y < 7 && x > 0 && boardStateCopy[y + 1][x - 1] === "blackPiece") {
        return;
      }

      if (y < 7 && x < 7 && boardStateCopy[y + 1][x + 1] === "blackPiece") {
        return;
      }
    };
    inner(y, x);
    setBoardState(boardStateCopy);
    console.log(boardState);
  };

  return (
    <div tabIndex="0" className="BoardContainer" onKeyDown={event => moveHandler(event)}>
      <h1>{playerTurn}</h1>

      {/* <h2>{currentBlackPos["y"]}</h2> */}
      {boardState.map((cell, index) => {
        return (
          <BoardRow
            key={"Row" + index}
            rowState={cell}
            yindex={index}
            clickHandler={clickHandler}
            onKeyDown={event => moveHandler(event)}
          />
        );
      })}
    </div>
  );
};

export default Board;
