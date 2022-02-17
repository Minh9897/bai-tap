import React from "react";

function Square(props) {
  return props.winCell ? (
    <button className="square square-highlight" onClick={props.onClick}>
      {props.value}
    </button>
  ) : props.value ? (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  ) : (
    <button className="square select" onClick={props.onClick}>
      {props.player}
    </button>
  );
}

export default Square;
