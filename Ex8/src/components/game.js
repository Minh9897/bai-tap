import React, { useState } from "react";
import Board from "./board";

const defaultWidth = 30;
const defaultHeight = 30;

function calculateWinner(squares, xPlayer, row, col, height, width) {
  let player, rival;

  // Get coordinates
  let coorX = row;
  let coorY = col;

  let countCol = 1;
  let countRow = 1;
  let countMainDiagonal = 1;
  let countSkewDiagonal = 1;
  let isBlock;

  if (xPlayer) {
    player = "X";
    rival = "O";
  } else {
    player = "O";
    rival = "X";
  }

  // Check col
  isBlock = true;
  let winCells = [];
  coorX -= 1;
  while (coorX >= 0 && squares[coorX][coorY] === player) {
    countCol += 1;
    winCells.push([coorX, coorY]);
    coorX -= 1;
  }
  if (coorX >= 0 && squares[coorX][coorY] !== rival) {
    isBlock = false;
  }
  coorX = row;
  winCells.push([coorX, coorY]);
  coorX += 1;
  while (coorX <= height - 1 && squares[coorX][coorY] === player) {
    countCol += 1;
    winCells.push([coorX, coorY]);
    coorX += 1;
  }
  if (coorX <= height - 1 && squares[coorX][coorY] !== rival) {
    isBlock = false;
  }
  coorX = row;
  if (isBlock === false && countCol === 5) return winCells;

  // Check row
  isBlock = true;
  winCells = [];
  coorY -= 1;
  while (coorY >= 0 && squares[coorX][coorY] === player) {
    countRow += 1;
    winCells.push([coorX, coorY]);
    coorY -= 1;
  }
  if (coorY >= 0 && squares[coorX][coorY] !== rival) {
    isBlock = false;
  }
  coorY = col;
  winCells.push([coorX, coorY]);
  coorY += 1;
  while (coorY <= width - 1 && squares[coorX][coorY] === player) {
    countRow += 1;
    winCells.push([coorX, coorY]);
    coorY += 1;
  }
  if (coorY <= width - 1 && squares[coorX][coorY] !== rival) {
    isBlock = false;
  }
  coorY = col;
  if (isBlock === false && countRow === 5) return winCells;

  // Check BL - TR diagonal
  isBlock = true;
  winCells = [];
  coorX -= 1;
  coorY -= 1;
  while (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === player) {
    countMainDiagonal += 1;
    winCells.push([coorX, coorY]);
    coorX -= 1;
    coorY -= 1;
  }
  if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
    isBlock = false;
  }
  coorX = row;
  coorY = col;
  winCells.push([coorX, coorY]);
  coorX += 1;
  coorY += 1;
  while (
    coorX <= height - 1 &&
    coorY <= width - 1 &&
    squares[coorX][coorY] === player
  ) {
    countMainDiagonal += 1;
    winCells.push([coorX, coorY]);
    coorX += 1;
    coorY += 1;
  }
  if (
    coorX <= height - 1 &&
    coorY <= width - 1 &&
    squares[coorX][coorY] !== rival
  ) {
    isBlock = false;
  }
  coorX = row;
  coorY = col;

  if (isBlock === false && countMainDiagonal === 5) return winCells;

  //  Check TL - BR diagonal
  isBlock = true;
  winCells = [];
  coorX -= 1;
  coorY += 1;
  while (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === player) {
    countSkewDiagonal += 1;
    winCells.push([coorX, coorY]);
    coorX -= 1;
    coorY += 1;
  }
  if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
    isBlock = false;
  }
  coorX = row;
  coorY = col;
  winCells.push([coorX, coorY]);
  coorX += 1;
  coorY -= 1;
  while (
    coorX <= height - 1 &&
    coorY <= width - 1 &&
    squares[coorX][coorY] === player
  ) {
    countSkewDiagonal += 1;
    winCells.push([coorX, coorY]);
    coorX += 1;
    coorY -= 1;
  }
  if (
    coorX <= defaultHeight - 1 &&
    coorY <= defaultHeight - 1 &&
    squares[coorX][coorY] !== rival
  ) {
    isBlock = false;
  }

  if (isBlock === false && countSkewDiagonal === 5) return winCells;

  return null;
}

function Game() {
  let tmpArr = Array(defaultHeight);
  for (let i = 0; i < defaultHeight; i++) {
    tmpArr[i] = Array(defaultWidth).fill(null);
  }
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [xPlayer, setxPlayer] = useState(true);
  const [winner, setWinner] = useState(false);
  const [winCells, setWinCells] = useState([]);
  const [squares, setSquares] = useState(tmpArr);

  function handleSize(squares, row, column) {
    let newSquares = squares;
    let newHeight = height;
    let newWidth = width;
    let rowIdx = row;
    let columnIdx = column;

    if (row === height - 1) {
      newHeight++;
      newSquares[height] = Array(width).fill(null);
    }

    if (row === 0) {
      newHeight++;
      rowIdx++;
      const emtyRow = Array(width).fill(null);

      newSquares = [emtyRow, ...newSquares];
    }

    if (column === width - 1) {
      newWidth++;
      for (let i = 0; i < newHeight; i++) {
        newSquares[i].push(null);
      }
    }

    if (column === 0) {
      newWidth++;
      columnIdx++;
      for (let i = 0; i < newHeight; i++) {
        newSquares[i].unshift(null);
      }
    }

    setHeight(newHeight);
    setWidth(newWidth);
    setSquares(newSquares);
    return [newSquares, rowIdx, columnIdx, newHeight, newWidth];
  }

  function handleClick(row, column) {
    let tempSquare = squares;
    let rowIdx = row;
    let columnIdx = column;
    let newHeight = height;
    let newWidth = width;
    if (!tempSquare[rowIdx][columnIdx]) {
      tempSquare[rowIdx][columnIdx] = xPlayer ? "X" : "O";
      setSquares(tempSquare);
      [tempSquare, rowIdx, columnIdx, newHeight, newWidth] = handleSize(
        tempSquare,
        rowIdx,
        columnIdx
      );
      const winCells = calculateWinner(
        tempSquare,
        xPlayer,
        rowIdx,
        columnIdx,
        newHeight,
        newWidth
      );
      if (winCells) {
        setWinner(true);
        setWinCells(winCells);
      } else {
        setxPlayer(!xPlayer);
      }
    }
  }

  function Reset() {
    setWinCells([]);
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

  return (
    <div class="content">
      <div className="game-config">
        <span className="fixed-size">Chiều rộng:</span>
        <input type="number" placeholder="Chiều rộng" value={width} />
        <br />
        <span className="fixed-size">Chiều cao:</span>
        <input type="number" placeholder="Chiều cao" value={height} />
      </div>
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={!winner ? handleClick : (i, j) => null}
            winCells={winCells}
            player={xPlayer ? "X" : "O"}
          />
        </div>
        <div className="game-info">
          <div>{status + (xPlayer ? "X" : "O")}</div>
          <div>
            <button onClick={Reset}>Chơi lại (Reset)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
