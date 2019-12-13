import React from "react";
import Cell from "../Cell/Cell";
import "./BoardRow.css";

const BoardRow = props => {
  const { rowState, clickHandler, yindex } = props;

  return (
    <div className="BoardRowContainer">
      {rowState.map((cell, index) => {
        return <Cell key={"cell" + index + yindex} cellState={cell} xindex={index} yindex={yindex} clickHandler={clickHandler}/>;
      })}
    </div>
  );
};

export default BoardRow;
