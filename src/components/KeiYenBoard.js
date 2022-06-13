import React, { useState } from "react";
import "../GameBoard.css";
const Kei = (props) => {
  return <span style={{ color: "Red" }}>{props.children}</span>;
};
const Yen = (props) => {
  return <span style={{ color: "Green" }}>{props.children}</span>;
};
const Square = ({ value, onClick }) => {
  let posItem = "";
  if (value / 10 > 1) {
    posItem = <Kei>{value % 10}</Kei>;
  }
  if (value / 20 > 1) {
    posItem = <Yen>{value % 20}</Yen>;
  }
  return (
    <button className="square" onClick={onClick}>
      {posItem}
    </button>
  );
};
const KeiYenBoard = () => {
  const matrix = new Array(5).fill(0).map(() => new Array(5).fill(0));
  //Fill initial Position
  matrix[1][3] = 25;
  matrix[2][4] = 11;
  const [gridStatus, setGridStatus] = useState(matrix);
  var InitialRow, InitialColummn, FinalRow, FinalColumn;
  function checkMoveFeasibility() {
    if (
      FinalRow === InitialRow &&
      Math.abs(FinalColumn - InitialColummn) === 1 &&
      matrix[FinalRow][FinalColumn] === 0
    ) {
      //Ok to move
      alert("Ok");
      if (gridStatus[InitialRow][InitialColummn] !== 0) {
        const myMatrix = gridStatus.slice();
        myMatrix[FinalRow][FinalColumn] = myMatrix[InitialRow][InitialColummn];
        myMatrix[InitialRow][InitialColummn] = 0;
        setGridStatus(myMatrix);
      }
    } else if (
      FinalColumn === InitialColummn &&
      Math.abs(FinalRow - InitialRow) === 1 &&
      matrix[FinalRow][FinalColumn] === 0
    ) {
      //Ok to move
      alert("Ok");
      if (gridStatus[InitialRow][InitialColummn] !== 0) {
        const myMatrix = gridStatus.slice();
        myMatrix[FinalRow][FinalColumn] = myMatrix[InitialRow][InitialColummn];
        myMatrix[InitialRow][InitialColummn] = 0;
        setGridStatus(myMatrix);
      }
    } else {
      alert("Not Ok");
    }
  }
  function handleClick(row, column) {
    InitialRow = FinalRow;
    InitialColummn = FinalColumn;
    FinalRow = row;
    FinalColumn = column;
    console.log(row, column);
    alert("Last Click " + InitialRow + " " + InitialColummn);
    alert("New Click " + row + " " + column);
    alert("Trying to Move");
    checkMoveFeasibility();
  }
  const DisplayRow = ({ rowitems, rowIndex }) => {
    return (
      <div>
        {rowitems.map((item, columnIndex) => (
          <Square
            value={item}
            onClick={() => handleClick(rowIndex, columnIndex)}
          ></Square>
        ))}
      </div>
    );
  };
  return (
    <div className="dis">
      {gridStatus.map((row, rowIndex) => (
        <DisplayRow rowIndex={rowIndex} rowitems={row} />
      ))}
    </div>
  );
};
export default KeiYenBoard;
