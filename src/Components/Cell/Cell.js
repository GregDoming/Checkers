import React from "react";
import "./Cell.css";

const Cell = props => {
  const { cellState } = props;

  const getCell = str => {
    switch (str) {
      case "white":
        return <div className={cellState}></div>;
      case "black":
        return <div className={cellState}></div>;
      case "blackPiece":
        return <div className={cellState}>
          <div className={"blackCircle"}/>
        </div>;
      case "redPiece":
        return <div className={cellState}>
          <div className={"redSquare"}/>
        </div>;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      {getCell(cellState)}
    </React.Fragment>

  )
};

export default Cell;
