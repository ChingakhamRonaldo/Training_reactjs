import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreMiddleMatrix } from "../redux/reducer";

const storeMiddlematrix = new Array(5)
  .fill(0)
  .map(() => new Array(5).fill(0).map(() => new Array(2).fill(0)));

const Kei = (props) => {
  return <span style={{ color: "Red" }}>{props.children}</span>;
};
const Yen = (props) => {
  return <span style={{ color: "Green" }}>{props.children}</span>;
};

const Square = ({ value, myClick, myMiddleStore }) => {
  let posItem = "";
  if (value / 10 > 1) {
    posItem = <Kei>{value % 10}</Kei>;
  }
  if (value / 20 > 1) {
    posItem = <Yen>{value % 20}</Yen>;
  }

  const buttonRef = useRef(null);
  useEffect(() => {
    myMiddleStore(buttonRef.current.getBoundingClientRect());
  }, []);

  return (
    <button className="square" ref={buttonRef} onClick={() => myClick()}>
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
  var InitialRow, InitialColumn, FinalRow, FinalColumn;
  const data = useSelector((state) => state.value.storeMiddlematrix);

  console.log("data", data);
  const dispatch = useDispatch();

  function ConvertCoordinatesToPosition(row, column) {
    var ConversionMap = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
    ];
    for (let i = 0; i < ConversionMap.length; i++) {
      let conRow = ConversionMap[i][0];
      let conColumn = ConversionMap[i][1];
      if (row === conRow && column === conColumn) {
        return i;
      }
    }
  }
  function checkValidPath(startRow, startColumn, endRow, endColumn) {
    let start = ConvertCoordinatesToPosition(startRow, startColumn);
    let end = ConvertCoordinatesToPosition(endRow, endColumn);
    //Not allow to move .
    var move = [
      [1, 5],
      [5, 1],
      [1, 7],
      [7, 1],
      [3, 7],
      [7, 3],
      [3, 9],
      [9, 3],
      [5, 11],
      [11, 5],
      [7, 11],
      [11, 7],
      [7, 13],
      [13, 7],
      [9, 13],
      [13, 9],
      [11, 15],
      [15, 11],
      [11, 17],
      [17, 11],
      [13, 17],
      [17, 13],
      [13, 9],
      [9, 13],
      [15, 21],
      [21, 15],
      [17, 21],
      [21, 17],
      [17, 23],
      [23, 17],
      [19, 23],
      [23, 19],
    ];
    for (let i = 0; i < move.length; i++) {
      let Initial = move[i][0];
      let Final = move[i][1];
      if (start === Initial && end === Final) {
        return false;
      }
    }
    return true;
  }

  function checkMoveFeasibility() {
    if (
      (FinalRow === InitialRow &&
        Math.abs(FinalColumn - InitialColumn) === 1 &&
        matrix[FinalRow][FinalColumn] === 0) ||
      (FinalColumn === InitialColumn &&
        Math.abs(FinalRow - InitialRow) === 1 &&
        matrix[FinalRow][FinalColumn] === 0)
    ) {
      //Ok to move row
      alert("Ok");
      if (gridStatus[InitialRow][InitialColumn] !== 0) {
        const myMatrix = gridStatus.slice();
        myMatrix[FinalRow][FinalColumn] = myMatrix[InitialRow][InitialColumn];
        myMatrix[InitialRow][InitialColumn] = 0;
        setGridStatus(myMatrix);
      }
    } else {
      let ret = checkValidPath(
        InitialRow,
        InitialColumn,
        FinalRow,
        FinalColumn
      );
      if (
        ret === true &&
        Math.abs(FinalColumn - InitialColumn) === 1 &&
        Math.abs(FinalRow - InitialRow) === 1 &&
        matrix[FinalRow][FinalColumn] === 0
      ) {
        alert("Ok");
        if (gridStatus[InitialRow][InitialColumn] !== 0) {
          const myMatrix = gridStatus.slice();
          myMatrix[FinalRow][FinalColumn] = myMatrix[InitialRow][InitialColumn];
          myMatrix[InitialRow][InitialColumn] = 0;
          setGridStatus(myMatrix);
        }
      } else {
        alert("Not Ok");
      }
    }
  }

  const DisplayRow = ({ rowitems, rowIndex }) => {
    function handleClick(row, column) {
      InitialRow = FinalRow;
      InitialColumn = FinalColumn;
      FinalRow = row;
      FinalColumn = column;
      checkMoveFeasibility();
    }
    function handleMiddlePoint(row, column, rect) {
      InitialRow = FinalRow;
      InitialColumn = FinalColumn;
      FinalRow = row;
      FinalColumn = column;
      let x = Math.floor((rect.x + rect.x + rect.width) / 2);
      let y = Math.floor((rect.y + rect.y + rect.height) / 2);

      storeMiddlematrix[row][column][0] = x;
      storeMiddlematrix[row][column][1] = y;
    }

    return (
      <div>
        {rowitems.map((item, columnIndex) => (
          <Square
            key={columnIndex}
            value={item}
            myClick={() => {
              handleClick(rowIndex, columnIndex);
            }}
            myMiddleStore={(rect) => {
              handleMiddlePoint(rowIndex, columnIndex, rect);
            }}
          ></Square>
        ))}
      </div>
    );
  };

  const [shouldRender, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <div className="dis">
      <div style={{ position: "absolute", marginTop: "5%" }}>
        {gridStatus.map((row, rowIndex) => (
          <DisplayRow key={rowIndex} rowIndex={rowIndex} rowitems={row} />
        ))}
      </div>
      <svg style={{ height: "100vh", width: "100vw" }}>
        {/*ROW LINE*/}
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][0][0]}
          y1={storeMiddlematrix[0][0][1]}
          x2={storeMiddlematrix[0][1][0]}
          y2={storeMiddlematrix[0][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][1][0]}
          y1={storeMiddlematrix[0][1][1]}
          x2={storeMiddlematrix[0][2][0]}
          y2={storeMiddlematrix[0][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][2][0]}
          y1={storeMiddlematrix[0][2][1]}
          x2={storeMiddlematrix[0][3][0]}
          y2={storeMiddlematrix[0][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][3][0]}
          y1={storeMiddlematrix[0][3][1]}
          x2={storeMiddlematrix[0][4][0]}
          y2={storeMiddlematrix[0][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][0][0]}
          y1={storeMiddlematrix[1][0][1]}
          x2={storeMiddlematrix[1][1][0]}
          y2={storeMiddlematrix[1][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][1][0]}
          y1={storeMiddlematrix[1][1][1]}
          x2={storeMiddlematrix[1][2][0]}
          y2={storeMiddlematrix[1][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][2][0]}
          y1={storeMiddlematrix[1][2][1]}
          x2={storeMiddlematrix[1][3][0]}
          y2={storeMiddlematrix[1][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][3][0]}
          y1={storeMiddlematrix[1][3][1]}
          x2={storeMiddlematrix[1][4][0]}
          y2={storeMiddlematrix[1][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][0][0]}
          y1={storeMiddlematrix[2][0][1]}
          x2={storeMiddlematrix[2][1][0]}
          y2={storeMiddlematrix[2][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][1][0]}
          y1={storeMiddlematrix[2][1][1]}
          x2={storeMiddlematrix[2][2][0]}
          y2={storeMiddlematrix[2][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][2][0]}
          y1={storeMiddlematrix[2][2][1]}
          x2={storeMiddlematrix[2][3][0]}
          y2={storeMiddlematrix[2][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][3][0]}
          y1={storeMiddlematrix[2][3][1]}
          x2={storeMiddlematrix[2][4][0]}
          y2={storeMiddlematrix[2][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][0][0]}
          y1={storeMiddlematrix[3][0][1]}
          x2={storeMiddlematrix[3][1][0]}
          y2={storeMiddlematrix[3][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][1][0]}
          y1={storeMiddlematrix[3][1][1]}
          x2={storeMiddlematrix[3][2][0]}
          y2={storeMiddlematrix[3][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][2][0]}
          y1={storeMiddlematrix[3][2][1]}
          x2={storeMiddlematrix[3][3][0]}
          y2={storeMiddlematrix[3][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][3][0]}
          y1={storeMiddlematrix[3][3][1]}
          x2={storeMiddlematrix[3][4][0]}
          y2={storeMiddlematrix[3][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[4][0][0]}
          y1={storeMiddlematrix[4][0][1]}
          x2={storeMiddlematrix[4][1][0]}
          y2={storeMiddlematrix[4][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[4][1][0]}
          y1={storeMiddlematrix[4][1][1]}
          x2={storeMiddlematrix[4][2][0]}
          y2={storeMiddlematrix[4][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[4][2][0]}
          y1={storeMiddlematrix[4][2][1]}
          x2={storeMiddlematrix[4][3][0]}
          y2={storeMiddlematrix[4][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[4][3][0]}
          y1={storeMiddlematrix[4][3][1]}
          x2={storeMiddlematrix[4][4][0]}
          y2={storeMiddlematrix[4][4][1]}
          id="mySVG"
        />
        {/*COLUMN LINE*/}
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][0][0]}
          y1={storeMiddlematrix[0][0][1]}
          x2={storeMiddlematrix[1][0][0]}
          y2={storeMiddlematrix[1][0][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][0][0]}
          y1={storeMiddlematrix[1][0][1]}
          x2={storeMiddlematrix[2][0][0]}
          y2={storeMiddlematrix[2][0][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][0][0]}
          y1={storeMiddlematrix[2][0][1]}
          x2={storeMiddlematrix[3][0][0]}
          y2={storeMiddlematrix[3][0][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][0][0]}
          y1={storeMiddlematrix[3][0][1]}
          x2={storeMiddlematrix[4][0][0]}
          y2={storeMiddlematrix[4][0][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][1][0]}
          y1={storeMiddlematrix[0][1][1]}
          x2={storeMiddlematrix[1][1][0]}
          y2={storeMiddlematrix[1][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][1][0]}
          y1={storeMiddlematrix[1][1][1]}
          x2={storeMiddlematrix[2][1][0]}
          y2={storeMiddlematrix[2][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][1][0]}
          y1={storeMiddlematrix[2][1][1]}
          x2={storeMiddlematrix[3][1][0]}
          y2={storeMiddlematrix[3][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][1][0]}
          y1={storeMiddlematrix[3][1][1]}
          x2={storeMiddlematrix[4][1][0]}
          y2={storeMiddlematrix[4][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][2][0]}
          y1={storeMiddlematrix[0][2][1]}
          x2={storeMiddlematrix[1][2][0]}
          y2={storeMiddlematrix[1][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][2][0]}
          y1={storeMiddlematrix[1][2][1]}
          x2={storeMiddlematrix[2][2][0]}
          y2={storeMiddlematrix[2][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][2][0]}
          y1={storeMiddlematrix[2][2][1]}
          x2={storeMiddlematrix[3][2][0]}
          y2={storeMiddlematrix[3][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][2][0]}
          y1={storeMiddlematrix[3][2][1]}
          x2={storeMiddlematrix[4][2][0]}
          y2={storeMiddlematrix[4][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][3][0]}
          y1={storeMiddlematrix[0][3][1]}
          x2={storeMiddlematrix[1][3][0]}
          y2={storeMiddlematrix[1][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][3][0]}
          y1={storeMiddlematrix[1][3][1]}
          x2={storeMiddlematrix[2][3][0]}
          y2={storeMiddlematrix[2][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][3][0]}
          y1={storeMiddlematrix[2][3][1]}
          x2={storeMiddlematrix[3][3][0]}
          y2={storeMiddlematrix[3][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][3][0]}
          y1={storeMiddlematrix[3][3][1]}
          x2={storeMiddlematrix[4][3][0]}
          y2={storeMiddlematrix[4][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][4][0]}
          y1={storeMiddlematrix[0][4][1]}
          x2={storeMiddlematrix[1][4][0]}
          y2={storeMiddlematrix[1][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][4][0]}
          y1={storeMiddlematrix[1][4][1]}
          x2={storeMiddlematrix[2][4][0]}
          y2={storeMiddlematrix[2][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][4][0]}
          y1={storeMiddlematrix[2][4][1]}
          x2={storeMiddlematrix[3][4][0]}
          y2={storeMiddlematrix[3][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][4][0]}
          y1={storeMiddlematrix[3][4][1]}
          x2={storeMiddlematrix[4][4][0]}
          y2={storeMiddlematrix[4][4][1]}
          id="mySVG"
        />
        {/*DIAGONAL LINES left to right*/}
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][0][0]}
          y1={storeMiddlematrix[0][0][1]}
          x2={storeMiddlematrix[1][1][0]}
          y2={storeMiddlematrix[1][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][1][0]}
          y1={storeMiddlematrix[1][1][1]}
          x2={storeMiddlematrix[2][2][0]}
          y2={storeMiddlematrix[2][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][2][0]}
          y1={storeMiddlematrix[2][2][1]}
          x2={storeMiddlematrix[3][3][0]}
          y2={storeMiddlematrix[3][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][3][0]}
          y1={storeMiddlematrix[3][3][1]}
          x2={storeMiddlematrix[4][4][0]}
          y2={storeMiddlematrix[4][4][1]}
          id="mySVG"
        />
        {/*DIAGONAL LINES right to left*/}
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][4][0]}
          y1={storeMiddlematrix[0][4][1]}
          x2={storeMiddlematrix[1][3][0]}
          y2={storeMiddlematrix[1][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][3][0]}
          y1={storeMiddlematrix[1][3][1]}
          x2={storeMiddlematrix[2][2][0]}
          y2={storeMiddlematrix[2][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][2][0]}
          y1={storeMiddlematrix[2][2][1]}
          x2={storeMiddlematrix[3][1][0]}
          y2={storeMiddlematrix[3][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][1][0]}
          y1={storeMiddlematrix[3][1][1]}
          x2={storeMiddlematrix[4][0][0]}
          y2={storeMiddlematrix[4][0][1]}
          id="mySVG"
        />
        {/*SQUARE LINE*/}
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[0][2][0]}
          y1={storeMiddlematrix[0][2][1]}
          x2={storeMiddlematrix[1][1][0]}
          y2={storeMiddlematrix[1][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][1][0]}
          y1={storeMiddlematrix[1][1][1]}
          x2={storeMiddlematrix[2][0][0]}
          y2={storeMiddlematrix[2][0][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][0][0]}
          y1={storeMiddlematrix[2][0][1]}
          x2={storeMiddlematrix[3][1][0]}
          y2={storeMiddlematrix[3][1][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][1][0]}
          y1={storeMiddlematrix[3][1][1]}
          x2={storeMiddlematrix[4][2][0]}
          y2={storeMiddlematrix[4][2][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[4][2][0]}
          y1={storeMiddlematrix[4][2][1]}
          x2={storeMiddlematrix[3][3][0]}
          y2={storeMiddlematrix[3][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[3][3][0]}
          y1={storeMiddlematrix[3][3][1]}
          x2={storeMiddlematrix[2][4][0]}
          y2={storeMiddlematrix[2][4][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[2][4][0]}
          y1={storeMiddlematrix[2][4][1]}
          x2={storeMiddlematrix[1][3][0]}
          y2={storeMiddlematrix[1][3][1]}
          id="mySVG"
        />
        <line
          strokeWidth="2px"
          stroke="#000"
          x1={storeMiddlematrix[1][3][0]}
          y1={storeMiddlematrix[1][3][1]}
          x2={storeMiddlematrix[0][2][0]}
          y2={storeMiddlematrix[0][2][1]}
          id="mySVG"
        />
      </svg>
    </div>
  );
};
export default KeiYenBoard;
