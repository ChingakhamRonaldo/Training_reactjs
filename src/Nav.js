import React from "react";
import { ReactComponent as Logo } from "./logo.svg";
import "./Nav.css";

const Item = ({ itemName, url }) => <a href={url}>{itemName}</a>;

const Home = () => {
  return (
    <div className="header">
      <a href="#">
        <Logo style={{ width: 30, marginLeft: 10 }} />
      </a>
      <ul className="main-nav">
        <Item
          itemName="Home"
          url="https://developer.mozilla.org/en-US/docs/Web/CSS/:hover"
        />
        <Item itemName="Profile" />
        <Item itemName="About" />
      </ul>
    </div>
  );
};

export default Home;
