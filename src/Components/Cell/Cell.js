import React from "react";
import "./Cell.css";

const Cell = props => {
  const { cellState, xindex, yindex, clickHandler } = props;

  const getCell = str => {
    switch (str) {
      case "white":
        return <div className={cellState} xindex={xindex} yindex={yindex}></div>;
      case "black":
        return <div className={cellState}></div>;
      case "blackPiece":
        return (
          <div className={cellState}>
            <div
              className={"blackCircle"}
              onClick={(event, x, y) => clickHandler(event, yindex, xindex)}
            />
          </div>
        );
      case "blackPieceCheck":
        return (
          <div className={cellState}>
            <div className={"blackCircleCheck"} />
          </div>
        );
      case "redPiece":
        return (
          <div className={cellState}>
            <div
              className={"redSquare"}
              onClick={(event, x, y) => clickHandler(event, yindex, xindex)}
            />
          </div>
        );
      case "redPieceCheck":
        return (
          <div className={cellState}>
            <div className={"redSquareCheck"} />
          </div>
        );
      default:
        break;
    }
  };

  return <React.Fragment>{getCell(cellState)}</React.Fragment>;
};

export default Cell;
