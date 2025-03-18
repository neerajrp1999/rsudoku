import { useEffect, useState } from "react";
import "./Sudoku.css";

const App = () => {
  const initialVisibleValue = Array.from({ length: 9 }, (_, index) => index);
  const [visibleValue, setVisibleValue] = useState(-1);
  const initialSudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const initialSudokuVerificationGrid = Array.from({ length: 9 }, () => Array(9).fill(false));

  const [grid, setGrid] = useState(initialSudokuGrid);
  const [verifyCol, setVerifyCol] = useState(initialSudokuVerificationGrid);
  const [verifyRow, setVerifyRow] = useState(initialSudokuVerificationGrid);
  const [verifyCell, setVerifyCell] = useState(initialSudokuVerificationGrid);

  const verify = (i, j, k) => verifyRow[i][k] || verifyCol[j][k] || verifyCell[Math.floor(i / 3) * 3 + Math.floor(j / 3)][k];

  const handleCellClick = (i, j, index, selected) => {
    const value = selected ? index + 1 : 0;

    setGrid(prevGrid => prevGrid.map((row, rowIndex) =>
      rowIndex === i
        ? row.map((cell, colIndex) => (colIndex === j ? value : cell))
        : row
    ));

    setVerifyRow(prevGrid => prevGrid.map((row, rowIndex) =>
      rowIndex === i
        ? row.map((cell, colIndex) => (colIndex === index ? selected : cell))
        : row
    ));

    setVerifyCol(prevGrid => prevGrid.map((row, rowIndex) =>
      rowIndex === j
        ? row.map((cell, colIndex) => (colIndex === index ? selected : cell))
        : row
    ));

    setVerifyCell(prevGrid => prevGrid.map((row, rowIndex) =>
      rowIndex === Math.floor(i / 3) * 3 + Math.floor(j / 3)
        ? row.map((cell, colIndex) => (colIndex === index ? selected : cell))
        : row
    ));
  };

  return (
    <div className="sudoku-container">
      <h1 className="sudoku-title">Sudoku Generator</h1>
      <div className="sudoku-visiblenum-grid">
        {initialVisibleValue.map(i => (
          <div className={`${`sudoku-visiblenum-inner-grid ${i === visibleValue && "selected-help"}`}`} key={i} onClick={() => {
            setVisibleValue(i === visibleValue ? -1 : i);
          }}>{i + 1}</div>
        ))}
      </div>
      <div className="sudoku-grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className={`${cell ? "selectedvalue-cell" : "prefilled map-container"} ${visibleValue !== 0 && verify(i, j, visibleValue) ? "selected-help" : ""} `}>
              {cell ? (
                <b onClick={() => handleCellClick(i, j, grid[i][j] - 1, false)}>{cell}</b>
              ) : (
                Array.from({ length: 9 }, (_, index) => (
                  <div key={index} className="inner-cell">
                    {!verify(i, j, index) && (
                      <div className="inner-cell-clickable" onClick={() => handleCellClick(i, j, index, true)}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </div>
      <button className="sudoku-reset" onClick={() => {
        setGrid(initialSudokuGrid);
        setVerifyCell(initialSudokuVerificationGrid);
        setVerifyCol(initialSudokuVerificationGrid);
        setVerifyRow(initialSudokuVerificationGrid);
        setVisibleValue(-1);
      }}>
        Reset
      </button>
    </div>
  );
};

export default App;

