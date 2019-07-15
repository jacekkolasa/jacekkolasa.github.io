import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import NavbarBootstrap from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navbar: FC = () => (
  <div>
    <NavbarBootstrap bg="light" expand="lg">
      <NavbarBootstrap.Brand href="#home">
        Parental Tools
      </NavbarBootstrap.Brand>
      <NavbarBootstrap id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/growth-charts">Growth Charts</Nav.Link>
          <Nav.Link as={NavLink} to="/settings">Settings</Nav.Link>
        </Nav>
      </NavbarBootstrap>
    </NavbarBootstrap>
  </div>
);
export default Navbar;
