import React from "react";
import { Button } from "react-bootstrap";

const Square = ({ onClick, value }) => {
  return (
    <div className="square">
      <Button onClick={onClick}>{value}</Button>
    </div>
  );
};

export default Square;
