import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import Xamvibe_logo from "./images/Xamvibe_logo.png";

const Styles = styled.div`
  .navbar {
    background-color: #222;
    min-height: 10vh;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img
          className="mr-3"
          src={Xamvibe_logo}
          alt="Logo"
          style={{ width: "50px" }}
        />
        ExamVibes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/contact">Contact</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
