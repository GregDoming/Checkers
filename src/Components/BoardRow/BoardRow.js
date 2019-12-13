import React from "react";
import Cell from "../Cell/Cell";
import "./BoardRow.css";

const BoardRow = props => {
  const { rowState, showLegalMoves, yindex } = props;

  return (
    <div className="BoardRowContainer">
      {rowState.map((cell, index) => {
        return <Cell key={"cell" + index + yindex} cellState={cell} xindex={index} yindex={yindex} showLegalMoves={showLegalMoves}/>;
      })}
    </div>
  );
};

export default BoardRow;
