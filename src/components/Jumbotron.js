import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import boatImage from "../assets/boatImage.jpg";
import "./css/jumbo.css";
import { Link } from "react-router-dom";
const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    min-height: 90vh;
    position: relative;
    z-index: -2;
    text-align: right;
  }
  .overlay {
    color: yellow;
    margin-top: 50vh;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Explore yourself</h1>
        <p>Learn, Practice Because Knowldge is Power</p>
        <div class="">
          <button className="btn btn-primary ">
            <Link to="/about" style={{ color: "red" }}>
              Explore More..
            </Link>
          </button>
        </div>
      </Container>
    </Jumbo>
  </Styles>
);
