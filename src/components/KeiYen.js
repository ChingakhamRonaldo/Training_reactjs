import React, { useState } from "react";

const KeiYen = () => {
  let board = Array(5)
    .fill(0)
    .map(() => new Array(5).fill(0));

  const [data, setData] = useState({
    initialValue: (board[0][0] = 21),
    position: (board[0][1] = 15),
    final: board[0][2],
  });

  console.log(board);

  const handleClick = () => {
    board[0].splice(2, 1, data.initialValue);
    console.log(board);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => handleClick()}>{data.initialValue}</button>
        <button>{data.position}</button>
        <button>{data.final}</button>
        {board[0][3]}
        {board[0][4]}
      </div>
      {/* <div>
        {board[1][0]}
        {board[1][1]}
        {board[1][2]}
        {board[1][3]}
        {board[1][4]}
      </div>
      <div>
        {board[2][0]}
        {board[2][1]}
        {board[2][2]}
        {board[2][3]}
        {board[2][4]}
      </div>
      <div>
        {board[3][0]}
        {board[3][1]}
        {board[3][2]}
        {board[3][3]}
        {board[3][4]}
      </div>
      <div>
        {board[4][0]}
        {board[4][1]}
        {board[4][2]}
        {board[4][3]}
        {board[4][4]}
      </div> */}
    </div>
  );
};

export default KeiYen;



