import React, { useEffect, useState } from "react";

const Weather = () => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    for (let i = 1; i < 6; i++) {
      setTemp(temp + i);
      console.log("useEffect");
    }
  }, []);
  return (
    <div>
      <h2>It is {temp}.</h2>
    </div>
  );
};

export default Weather;
