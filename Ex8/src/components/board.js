import SquareRow from "./squarerow";
import React, { useState } from "react";
import Draggable from "react-draggable";

function Board(props) {
  const [activeDrags, setActiveDrags] = useState(0);
  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };
  let board;
  const dragHandlers = { onStart: onStart, onStop: onStop };
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
    // <Draggable bounds="game-board" {...dragHandlers}>
    <div style={{ position: "relative", width: "100vw" }}>{board}</div>
    // </Draggable>
  );
}

export default Board;
