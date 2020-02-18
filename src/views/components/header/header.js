import React from "react";
import { Navbar } from "react-bootstrap";

const Header = ({ isMobileSized }) => (
  <Navbar expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">react-hookify</Navbar.Brand>
    {isMobileSized ? (
      <Navbar.Text>
        Detected:<b> Mobile</b>
      </Navbar.Text>
    ) : (
      <Navbar.Text>
        Detected:<b> Web browser</b>
      </Navbar.Text>
    )}
  </Navbar>
);
export default Header;

