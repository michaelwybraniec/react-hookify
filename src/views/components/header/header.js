import React from "react";
import { Navbar } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">react-hookify</Navbar.Brand>
        {this.props.isMobileSized ? (
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
  }
}
export default Header;
