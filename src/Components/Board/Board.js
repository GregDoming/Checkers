import React, { useState, useEffect } from "react";
import BoardRow from "../BoardRow/BoardRow";
import "./Board.css";
import { inheritInnerComments } from "@babel/types";

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
  const [duringTurn, setDuringTurn] = useState(false);
  const [currentBlackXPos, setCurrentBlackXPos] = useState(-1);
  const [currentBlackYPos, setCurrentBlackYPos] = useState(-1);

  const clickHandler = (event, yCord, xCord) => {
    event.preventDefault();
    if (playerTurn === "black" && boardState[yCord][xCord] === "blackPiece" && !duringTurn) {
      setCurrentBlackXPos(xCord);
      setCurrentBlackYPos(yCord);
      showMoves(yCord, xCord);
      setDuringTurn(true);
    }

    if (playerTurn === "red" && boardState[yCord][xCord] === "redPiece" && !duringTurn) {
      setCurrentBlackXPos(xCord);
      setCurrentBlackYPos(yCord);
      showMoves(yCord, xCord);
      setDuringTurn(true);
    }
  };

  const replaceGreyPieces = arr => {
    const newArr = arr.map(ele => {
      for (let i = 0; i < ele.length; i++) {
        if (ele[i] === "blackPieceCheck" || ele[i] === "redPieceCheck") {
          ele[i] = "black";
        }
      }
      return ele;
    });
    return newArr;
  };

  const moveHandler = event => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState));
    if (playerTurn === "black") {
      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentBlackYPos + 1][currentBlackXPos - 1] === "blackPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos + 1][currentBlackXPos - 1] = "blackPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentBlackYPos + 2][currentBlackXPos - 2] === "blackPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos + 1][currentBlackXPos - 1] = "black";
        boardStateCopy[currentBlackYPos + 2][currentBlackXPos - 2] = "blackPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentBlackYPos + 1][currentBlackXPos + 1] === "blackPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos + 1][currentBlackXPos + 1] = "blackPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentBlackYPos + 2][currentBlackXPos + 2] === "blackPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos + 1][currentBlackXPos + 1] = "black";
        boardStateCopy[currentBlackYPos + 2][currentBlackXPos + 2] = "blackPiece";
      }
      setBoardState(replaceGreyPieces(boardStateCopy));
      setDuringTurn(false);
      setPlayerTurn("red");
    } else if (playerTurn === "red") {
      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentBlackYPos - 1][currentBlackXPos - 1] === "redPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos - 1][currentBlackXPos - 1] = "redPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentBlackYPos - 2][currentBlackXPos - 2] === "redPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos - 1][currentBlackXPos - 1] = "black";
        boardStateCopy[currentBlackYPos - 2][currentBlackXPos - 2] = "redPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentBlackYPos - 1][currentBlackXPos + 1] === "redPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos - 1][currentBlackXPos + 1] = "redPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentBlackYPos - 2][currentBlackXPos + 2] === "redPieceCheck"
      ) {
        boardStateCopy[currentBlackYPos][currentBlackXPos] = "black";
        boardStateCopy[currentBlackYPos - 1][currentBlackXPos + 1] = "black";
        boardStateCopy[currentBlackYPos - 2][currentBlackXPos + 2] = "redPiece";
      }
      setBoardState(replaceGreyPieces(boardStateCopy));
      setDuringTurn(false);
      setPlayerTurn("black");
    }

    // setBoardState(replaceGreyPieces(boardStateCopy));
    // setDuringTurn(false);
  };

  useEffect(() => {
    window.addEventListener("onKeyDown", moveHandler);

    return () => {
      window.removeEventListener("onKeyDown", moveHandler);
    };
  }, []);

  const changeTurn = () => {
    if (playerTurn === "black") {
      setPlayerTurn("red");
    } else {
      setPlayerTurn("black");
    }
  };

  const showMoves = (y, x) => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState));

    let inJump = false;
    let direction = "neutral";

    const inner = (y, x) => {
      if (playerTurn === "black") {
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
      } else if (playerTurn === "red") {
        if (y > 0 && x > 0 && boardStateCopy[y - 1][x - 1] === "black" && !inJump) {
          boardStateCopy[y - 1][x - 1] = "redPieceCheck";
        }

        if (y > 0 && x < 7 && boardStateCopy[y - 1][x + 1] === "black" && !inJump) {
          boardStateCopy[y - 1][x + 1] = "redPieceCheck";
        }

        if (y > 0 && x > 0 && boardStateCopy[y - 1][x - 1] === "blackPiece" && !inJump) {
          inJump = true;
          direction = "left";
          return inner(y - 1, x - 1);
        }

        if (y > 0 && x < 7 && boardStateCopy[y - 1][x + 1] === "blackPiece" && !inJump) {
          inJump = true;
          direction = "right";
          return inner(y - 1, x + 1);
        }

        if (
          y > 0 &&
          x < 7 &&
          boardStateCopy[y - 1][x + 1] === "black" &&
          inJump &&
          direction !== "left"
        ) {
          inJump = false;
          boardStateCopy[y - 1][x + 1] = "redPieceCheck";
          return;
        }

        if (
          y < 7 &&
          x > 0 &&
          boardStateCopy[y - 1][x - 1] === "black" &&
          inJump &&
          direction !== "right"
        ) {
          inJump = false;
          boardStateCopy[y - 1][x - 1] = "redPieceCheck";
          return;
        }

        if (y < 7 && x > 0 && boardStateCopy[y - 1][x - 1] === "redPiece") {
          return;
        }

        if (y < 7 && x < 7 && boardStateCopy[y - 1][x + 1] === "redPiece") {
          return;
        }
      }
    };
    inner(y, x);
    console.log(boardStateCopy);
    setBoardState(boardStateCopy);
  };

  const handleResetPress = (event) => {
    event.preventDefault()
    setBoardState(initialBoardState);
  }

  return (
    <div tabIndex="0" className="BoardContainer" onKeyDown={event => moveHandler(event)}>
      <h1>{playerTurn}</h1>
      <button onClick={event => handleResetPress(event)}>Reset</button>

      {/* <h2>{currentBlackPos["y"]}</h2> */}
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
