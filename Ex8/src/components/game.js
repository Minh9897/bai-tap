import React, { useState, useEffect } from "react";
import Board from "./board";
import { checkWinner } from "../action/checkWinner";
import { handleSize } from "../action/handleSize";

const defaultWidth = 30;
const defaultHeight = 30;
const defaultTime = 20 * 60;

function Game() {
  let tmpArr = Array(defaultHeight);
  for (let i = 0; i < defaultHeight; i++) {
    tmpArr[i] = Array(defaultWidth).fill(null);
  }
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [xPlayer, setxPlayer] = useState(true);
  const [winner, setWinner] = useState(false);
  const [winArray, setWinArray] = useState([]);
  const [squares, setSquares] = useState(tmpArr);
  const [name1, setName1] = useState();
  const [name2, setName2] = useState();
  const [timer, setTimer] = useState();

  function pad(val) {
    return val > 9 ? val : "0" + val;
  }

  let time = defaultTime;

  function countdown() {
    console.log(time);
    document.getElementById("seconds").innerHTML = pad(Math.floor(time % 60));
    document.getElementById("minutes").innerHTML = pad(Math.floor(time / 60));
    time--;
  }

  function start() {
    setTimer(setInterval(countdown, 1000));
  }

  function handleClick(row, column) {
    let tempSquare = squares;
    let rowIdx = row;
    let columnIdx = column;
    let tempHeight = height;
    let tempWidth = width;
    if (!tempSquare[rowIdx][columnIdx]) {
      tempSquare[rowIdx][columnIdx] = xPlayer ? "X" : "O";
      [tempSquare, rowIdx, columnIdx, tempHeight, tempWidth] = handleSize(
        tempSquare,
        rowIdx,
        columnIdx,
        tempHeight,
        tempWidth
      );
      const winArray = checkWinner(
        tempSquare,
        xPlayer,
        rowIdx,
        columnIdx,
        tempHeight,
        tempWidth
      );
      setSquares(tempSquare);
      if (winArray) {
        setWinner(true);
        setWinArray(winArray);
        clearInterval(timer);
      } else {
        setHeight(tempHeight);
        setWidth(tempWidth);
        setxPlayer(!xPlayer);
      }
    }
  }

  function Reset() {
    clearInterval(timer);
    // start();
    setWinArray([]);
    setxPlayer(true);
    setWinner(false);
    setSquares(tmpArr);
    setWidth(defaultWidth);
    setHeight(defaultHeight);
  }

  let status;
  if (winner) {
    status = "Winner: ";
  } else {
    status = "Player: ";
  }

  useEffect(() => {
    let input;
    input = name1;
    do {
      input = prompt("Nhập tên người chơi 1 (X)");
      setName1(input);
    } while (input === null || input === "");
    input = name2;
    do {
      input = prompt("Nhập tên người chơi 2 (O)");
      setName2(input);
    } while (input === null || input === "");
    start();
  }, []);

  return (
    <div class="content">
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={!winner ? handleClick : (i, j) => null}
            winArray={winArray}
            player={!winner ? (xPlayer ? "X" : "O") : ""}
          />
        </div>
        <div className="game-info">
          <div>{status + (xPlayer ? name1 + "(X)" : name2 + "(O)")}</div>
          <div>
            Time: <span id="minutes">00</span>:<span id="seconds">00</span>
          </div>
          <div>
            <button onClick={Reset}>Chơi lại (Reset)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
