import { useRoutes } from "react-router-dom";
import Authroutes from "./Authroutes";
import Mainroutes from "./Mainroutes";

const ThemeRoutes = () => {
  return useRoutes([Mainroutes, Authroutes]);
};

export default ThemeRoutes;
