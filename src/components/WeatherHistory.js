import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const api = {
  base: "https://6274a251345e1821b22db49d.mockapi.io/",
};
const WeatherHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    fetch(`${api.base}history`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setHistoryData(res);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {historyData.map(({ address, temperature, date }) => {
        return (
          // <div className={temperature > 16 ? "his" : "h"}>
          <Card
            className="bg-dark text-white"
            style={{ width: "20%", height: "15%", marginRight: "10px" }}
          >
            <Card.Img
              src={
                temperature > 16
                  ? "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  : "https://images.pexels.com/photos/813872/pexels-photo-813872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
            />
            <Card.ImgOverlay>
              <Card.Title>{address}</Card.Title>
              <Card.Text>{temperature}°c</Card.Text>
              <Card.Text> {date}</Card.Text>
            </Card.ImgOverlay>
          </Card>
        );
      })}
    </div>
  );
};

export default WeatherHistory;
