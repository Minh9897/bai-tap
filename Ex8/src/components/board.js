import React from "react";
import SquareRow from "./squarerow";

function Board(props) {
  let board;
  board = props.squares.map((row, idx) => {
    let k = "r" + idx;
    return (
      <SquareRow
        winArray={props.winArray}
        rowIdx={idx}
        row={row}
        onClick={props.onClick}
        key={k}
        player={props.player}
      />
    );
  });
  return (
    <div
      style={{
        position: "relative",
        width: `calc(${props.squares[0].length - 1}*34px + 4px)`,
      }}
    >
      {board}
    </div>
  );
}

export default Board;
