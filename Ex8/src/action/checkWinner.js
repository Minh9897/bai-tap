export function checkWinner(squares, xPlayer, row, col, height, width) {
  let player, rival;

  // Get coordinates
  let coorX = row;
  let coorY = col;

  let countCol = 1;
  let countRow = 1;
  let countTLBRDiagonal = 1;
  let countBLTRDiagonal = 1;
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

  // Check TL - BR diagonal
  isBlock = true;
  winCells = [];
  coorX -= 1;
  coorY -= 1;
  while (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === player) {
    countTLBRDiagonal += 1;
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
    countTLBRDiagonal += 1;
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

  if (isBlock === false && countTLBRDiagonal === 5) return winCells;

  //  Check BL - TR diagonal
  isBlock = true;
  winCells = [];
  coorX -= 1;
  coorY += 1;
  while (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === player) {
    countBLTRDiagonal += 1;
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
    countBLTRDiagonal += 1;
    winCells.push([coorX, coorY]);
    coorX += 1;
    coorY -= 1;
  }
  if (
    coorX <= height - 1 &&
    coorY <= width - 1 &&
    squares[coorX][coorY] !== rival
  ) {
    isBlock = false;
  }

  if (isBlock === false && countBLTRDiagonal === 5) return winCells;

  return null;
}
