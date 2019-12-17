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
  const [currentXPos, setCurrentXPos] = useState(-1);
  const [currentYPos, SetCurrentYPos] = useState(-1);

  //Listen for the onKeyDown event and run moveHandler if event is fired
  useEffect(() => {
    window.addEventListener("onKeyDown", moveHandler);
  
    return () => {
      window.removeEventListener("onKeyDown", moveHandler);
    };
  }, []);

  //Deal with initial Piece Select
  const clickHandler = (event, yCord, xCord) => {
    event.preventDefault();
    if (playerTurn === "black" && boardState[yCord][xCord] === "blackPiece" && !duringTurn) {
      setCurrentXPos(xCord);
      SetCurrentYPos(yCord);
      showMoves(yCord, xCord);
      setDuringTurn(true);
    }

    if (playerTurn === "red" && boardState[yCord][xCord] === "redPiece" && !duringTurn) {
      setCurrentXPos(xCord);
      SetCurrentYPos(yCord);
      showMoves(yCord, xCord);
      setDuringTurn(true);
    }
  };
  //Clean up any Pieces that represented potential moves
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

  //After selecting piece with mouse click handles logic for moving pselected peice left or right with mouse click and cleans up any jumped pieces.
  const moveHandler = event => {
    const boardStateCopy = JSON.parse(JSON.stringify(boardState));
    if (playerTurn === "black") {
      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentYPos + 1][currentXPos - 1] === "blackPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos + 1][currentXPos - 1] = "blackPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentYPos + 2][currentXPos - 2] === "blackPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos + 1][currentXPos - 1] = "black";
        boardStateCopy[currentYPos + 2][currentXPos - 2] = "blackPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentYPos + 1][currentXPos + 1] === "blackPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos + 1][currentXPos + 1] = "blackPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentYPos + 2][currentXPos + 2] === "blackPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos + 1][currentXPos + 1] = "black";
        boardStateCopy[currentYPos + 2][currentXPos + 2] = "blackPiece";
      }
      setBoardState(replaceGreyPieces(boardStateCopy));
      setDuringTurn(false);
      setPlayerTurn("red");
    } else if (playerTurn === "red") {
      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentYPos - 1][currentXPos - 1] === "redPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos - 1][currentXPos - 1] = "redPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 37 &&
        boardState[currentYPos - 2][currentXPos - 2] === "redPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos - 1][currentXPos - 1] = "black";
        boardStateCopy[currentYPos - 2][currentXPos - 2] = "redPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentYPos - 1][currentXPos + 1] === "redPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos - 1][currentXPos + 1] = "redPiece";
      }

      if (
        duringTurn &&
        event.keyCode === 39 &&
        boardState[currentYPos - 2][currentXPos + 2] === "redPieceCheck"
      ) {
        boardStateCopy[currentYPos][currentXPos] = "black";
        boardStateCopy[currentYPos - 1][currentXPos + 1] = "black";
        boardStateCopy[currentYPos - 2][currentXPos + 2] = "redPiece";
      }
      setBoardState(replaceGreyPieces(boardStateCopy));
      setDuringTurn(false);
      setPlayerTurn("black");
    }

    // setBoardState(replaceGreyPieces(boardStateCopy));
    // setDuringTurn(false);
  };


  const changeTurn = () => {
    if (playerTurn === "black") {
      setPlayerTurn("red");
    } else {
      setPlayerTurn("black");
    }
  };
  //Shows Possible moves on click in Grey
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
    setBoardState(boardStateCopy);
  };

  const handleResetPress = (event) => {
    event.preventDefault()
    setBoardState(initialBoardState);
  }

  return (
    <div tabIndex="0" className="BoardContainer" onKeyDown={event => moveHandler(event)}>
      {!duringTurn ? (
        <h2>Click {playerTurn} Piece to Move</h2>
      ) : (
        <h2>Move Piece with Left Arrow or Right Arrow</h2>
      )}
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
