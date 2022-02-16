import React from "react";
import Square from "./square";

function SquareRow(props) {
  let squareRow = props.row.map((square, idx) => {
    let k = "s" + idx;
    let win = false;
    let winCells = props.winCells;
    let rowIdx = props.rowIdx;
    if (winCells) {
      const a = JSON.stringify([rowIdx, idx]);
      const b = JSON.stringify(winCells);
      const c = b.indexOf(a);
      if (c !== -1) {
        win = true;
      }
    }
    return (
      <Square
        win={win}
        value={square}
        onClick={() => props.onClick(props.rowIdx, idx)}
        key={k}
        player={props.player}
      />
    );
  });
  return <div className="board-row">{squareRow}</div>;
}

export default SquareRow;
