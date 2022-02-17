import React from "react";
import Square from "./square";

function SquareRow(props) {
  let squareRow = props.row.map((square, idx) => {
    let k = "s" + idx;
    let winCell = false;
    let winArray = props.winArray;
    let rowIdx = props.rowIdx;
    if (winArray) {
      const a = JSON.stringify([rowIdx, idx]);
      const b = JSON.stringify(winArray);
      const c = b.indexOf(a);
      if (c !== -1) {
        winCell = true;
      }
    }
    return (
      <Square
        winCell={winCell}
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
