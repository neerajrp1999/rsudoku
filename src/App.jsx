import { useState } from "react";
import "./Sudoku.css";


const App = () => {
  const initialSudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const [grid, setGrid] = useState(initialSudokuGrid);

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;
    const newGrid = grid.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? Number(value) || 0 : c))
    );
    setGrid(newGrid);
  };

  return (
    <div className="sudoku-container">
      <h1 className="sudoku-title">Sudoku Generator</h1>
      <div className="sudoku-grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div className=" prefilled map-container ">
              {Array.from({ length: 9 }, (_, index) => (
                <div key={index} className="inner-cell">{index + 1}</div>
              ))}
            </div>
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
