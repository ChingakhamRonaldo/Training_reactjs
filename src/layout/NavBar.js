import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/weather"}>
              Weather
            </Nav.Link>
            <Nav.Link as={Link} to={"/game"}>
              Game
            </Nav.Link>
            <Nav.Link as={Link} to={"/kei-yen"}>
              KeiYenBoard
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavBar;
