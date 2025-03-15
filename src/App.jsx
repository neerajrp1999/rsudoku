import { useState } from "react";
import "./Sudoku.css";

const initialGrid = [
  ["", "", "7", "", "6", "", "4", "", ""],
  ["1", "", "2", "6", "", "", "", "", ""],
  ["9", "", "", "", "", "3", "", "6", "8"],
  ["8", "", "", "", "5", "6", "", "4", "7"],
  ["", "2", "", "3", "", "", "", "8", ""],
  ["", "5", "4", "", "", "", "", "", "2"],
  ["9", "3", "1", "", "", "7", "5", "6", ""],
  ["", "7", "", "9", "", "5", "4", "2", ""],
  ["", "5", "", "", "", "3", "", "9", ""]
];

const App = () => {
  const [grid, setGrid] = useState(initialGrid);

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;
    const newGrid = grid.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setGrid(newGrid);
  };

  return (
    <div className="sudoku-container">
      <h1 className="sudoku-title">Sudoku</h1>
      <div className="sudoku-grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              maxLength="1"
              className={`sudoku-cell ${cell ? "prefilled" : "editable"} ${
                (i % 3 === 2 && i !== 8 ? "border-bottom" : "") +
                (j % 3 === 2 && j !== 8 ? " border-right" : "")
              }`}
              value={cell}
              onChange={(e) => handleChange(i, j, e.target.value)}
              disabled={!!cell}
            />
          ))
        )}
      </div>
      <button className="sudoku-reset" onClick={() => setGrid(initialGrid)}>
        Reset
      </button>
    </div>
  );
}
export default App;