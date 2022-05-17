import React from "react";
// import ParticlesBackground from "./component/ParticleBackground";
import Clock from "./Clock";
import { TemperatureInCelcius, Weather } from "./Clock";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* <ParticlesBackground /> */}
      <Clock />
      <TemperatureInCelcius />
      <Weather />
    </div>
  );
};

export default App;
