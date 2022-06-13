import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import WeatherHistory from "./components/WeatherHistory";
import WeatherForecast from "./components/WeatherForecast";

const api = {
  key: "9c3a377f2a0c4be0c8bf461078e1967d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [history, setHistory] = useState(true);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((res) => {
          setWeather(res);
          setQuery("");
          console.log(res);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="location-box">
            <div>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}{" "}
        <div>
          <Button variant="outline-info" onClick={() => setHistory(!history)}>
            Click
          </Button>
          {history ? (
            <div>
              <Card.Header className="history-text">5-days History</Card.Header>
              <WeatherHistory />
            </div>
          ) : (
            <div>
              <Card.Header className="history-text">
                5-days Forecast
              </Card.Header>
              <WeatherForecast />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
