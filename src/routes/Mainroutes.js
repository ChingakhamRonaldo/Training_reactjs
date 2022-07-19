import Navbar from "../layout/NavBar";
import React from "react";
import Weather from "../components/Weather";
import Game from "../components/Game";
import KeiYenBoard from "../components/KeiYenBoard";

const Mainroutes = {
  path: "/app",
  element: <Navbar />,
  children: [
    {
      path: "weather",
      element: <Weather />,
    },
    {
      path: "game",
      element: <Game />,
    },
    {
      path: "kei-yen",
      element: <KeiYenBoard />,
    },
  ],
};

export default Mainroutes;
