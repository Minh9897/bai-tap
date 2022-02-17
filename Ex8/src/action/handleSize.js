export function handleSize(squares, row, column, height, width) {
  let tempSquares = squares;
  let tempHeight = height;
  let tempWidth = width;
  let rowIdx = row;
  let columnIdx = column;

  if (row === height - 1) {
    tempHeight++;
    tempSquares[height] = Array(width).fill(null);
  }

  if (row === 0) {
    tempHeight++;
    rowIdx++;
    const emtyRow = Array(width).fill(null);

    tempSquares = [emtyRow, ...tempSquares];
  }

  if (column === width - 1) {
    tempWidth++;
    for (let i = 0; i < tempHeight; i++) {
      tempSquares[i].push(null);
    }
  }

  if (column === 0) {
    tempWidth++;
    columnIdx++;
    for (let i = 0; i < tempHeight; i++) {
      tempSquares[i].unshift(null);
    }
  }
  return [tempSquares, rowIdx, columnIdx, tempHeight, tempWidth];
}
