import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import bank from "../bank.png";
export default class Navbars extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={bank}
              width="50"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Yield Farming
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="#deets">Account Number: {this.props.account}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
