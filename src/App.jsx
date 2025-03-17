import { useEffect, useState } from "react";
import "./Sudoku.css";


const App = () => {
  const initialSudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const [grid, setGrid] = useState(initialSudokuGrid);
  console.log(grid);

  const handleCellClick = (i, j, value) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((cell, colIndex) => (colIndex === j ? value : cell))
          : row
      )
    );
    console.log(grid);
  };


  return (
    <div className="sudoku-container">
      <h1 className="sudoku-title">Sudoku Generator</h1>
      <div className="sudoku-grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <>
              {
                grid[i][j] === 0 ?
                  <div className={`prefilled map-container`} key={`${i}-${j}`}>
                    {Array.from({ length: 9 }, (_, index) => (
                      <div key={index} className="inner-cell" onClick={() => handleCellClick(i, j, index + 1)}>{index + 1}</div>
                    ))}
                  </div>
                  :
                  <div className="selectedvalue-cell" onClick={() => {
                    setGrid((prevGrid) =>
                      prevGrid.map((row, rowIndex) =>
                        rowIndex === i
                          ? row.map((cell, colIndex) => (colIndex === j ? 0 : cell))
                          : row
                      )
                    )
                  }
                  }>
                    {grid[i][j]}
                  </div>
              }
            </>
          ))
        )}
      </div>
      <button className="sudoku-reset" onClick={() => setGrid(initialSudokuGrid)}>
        Reset
      </button>
    </div>
  );
};

export default App;


