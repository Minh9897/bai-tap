import React, { useState, useEffect } from "react";
import Board from "./board";
import { checkWinner } from "../action/checkWinner";
import { handleSize } from "../action/handleSize";
import { useInterval } from "../hook/useInterval";

const defaultWidth = 30;
const defaultHeight = 30;
const defaultTime = 20 * 60 * 10;

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
  const [time, setTime] = useState(defaultTime);

  function pad(val) {
    return val > 9 ? val : "0" + val;
  }

  function displayTime(time) {
    document.getElementById("seconds").innerHTML = pad(
      Math.ceil(time / 10) % 60
    );
    document.getElementById("minutes").innerHTML = pad(
      Math.floor(Math.ceil(time / 10) / 60)
    );
  }

  let status;
  if (time !== -1) {
    if (winner) {
      status = "Winner: " + (xPlayer ? name1 + "(X)" : name2 + "(O)");
    } else {
      status = "Player: " + (xPlayer ? name1 + "(X)" : name2 + "(O)");
    }
  } else {
    status = "Tie";
  }

  useInterval(
    () => {
      displayTime(time);
      setTime(time - 1);
    },
    !winner ? (time !== -1 ? 100 : null) : null
  );

  useEffect(() => {
    if (winner) {
      const timePlay = defaultTime - time;
      const minutes = pad(Math.floor(timePlay / 600));
      const seconds = pad(Math.floor(timePlay / 10) % 60);
      alert(
        "The winner is " +
          (xPlayer ? name1 + " (X)" : name2 + " (O)") +
          "\nPlay Time: " +
          minutes +
          ":" +
          seconds
      );
    }
  }, [winner]);

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
        setWinArray(winArray);
        setWinner(true);
      } else {
        setHeight(tempHeight);
        setWidth(tempWidth);
        setxPlayer(!xPlayer);
      }
    }
  }

  function Reset() {
    setTime(defaultTime);
    setWinArray([]);
    setxPlayer(true);
    setSquares(tmpArr);
    setWidth(defaultWidth);
    setHeight(defaultHeight);
    setWinner(false);
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
          <table cellspacing="10" style={{ textAlign: "left" }}>
            <tr>
              <th>{status}</th>
            </tr>
            <tr>
              <th>
                Time: <span id="minutes">00</span>:<span id="seconds">00</span>
              </th>
            </tr>
            <tr>
              <button onClick={Reset}>Chơi lại (Reset)</button>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Game;
