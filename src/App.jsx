import { useEffect, useState } from "react";
import "./Sudoku.css";


const App = () => {
  const initialSudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const initialSudokuVerificationGrid = Array.from({ length: 9 }, () => Array(9).fill(false));
  const [grid, setGrid] = useState(initialSudokuGrid);
  const [verifycol, setVerifyCol] = useState(initialSudokuVerificationGrid);
  const [verifyrow, setVerifyRow] = useState(initialSudokuVerificationGrid);
  const [verifycell, setVerifyCell] = useState(initialSudokuVerificationGrid);
  console.log(grid);
  const verify = (i, j, k) => verifyrow[i][k] || verifycol[j][k] ;

  const handleCellClick = (i, j, value) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((cell, colIndex) => (colIndex === j ? value : cell))
          : row
      )
    );

    setVerifyRow((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((cell, colIndex) => (colIndex === value - 1 ? true : cell))
          : row
      )
    );

    setVerifyCol((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        rowIndex === j
          ? row.map((cell, colIndex) => (colIndex === value - 1 ? true : cell))
          : row
      )
    );

  };
  
  useEffect(()=>{
    console.log(grid);
    console.log(verifyrow);
    console.log(verifycol);
  },[verifycol])


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
                      <div key={index} className="inner-cell">
                        {/* {index + 1} */}
                        {verify(i, j, index) ? <></>:
                        <div className="inner-cell-clickeble" onClick={() => handleCellClick(i, j, index + 1)}>{index + 1}</div>}
                      </div>
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
                    {/* {verifyrow[i][grid[i][j]] ? <></>:grid[i][j]} */}
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


