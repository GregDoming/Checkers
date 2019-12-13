import React from "react";
import Cell from "../Cell/Cell"
import "./BoardRow.css"


const BoardRow = props => {
  const { rowState, rowIndex } = props;

  return (
    <div className="BoardRowContainer">
      {rowState.map((cell, index) => {
        return (
          <Cell key={"cell" + index + rowIndex} cellState={cell}/>
        )
      })}
    </div>
  )
};

export default BoardRow;