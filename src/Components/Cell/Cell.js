import React from "react";
import "./Cell.css";

const Cell = props => {
  const { cellState, xindex, yindex, showLegalMoves } = props;

  const getCell = str => {
    switch (str) {
      case "white":
        return <div className={cellState} xindex={xindex} yindex={yindex} ></div>;
      case "black":
        return <div className={cellState}></div>;
      case "blackPiece":
        return <div className={cellState} >
          <div className={"blackCircle"} onClick={(event, x, y) => showLegalMoves(event, yindex, xindex)}/>
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
