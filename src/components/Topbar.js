import React from "react";
import styled, { injectGlobal } from "styled-components";
import katonoLogo from "../static/vectorpaint.svg";
import "../styles/fonts.css";

const StyledTopbar = styled.div`
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin-bottom: 60px;
  background-color: white;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  border: 0px;
`;

const Icon = styled.div`
  height: 100%;
  width: 50px;
  background-position: bottom 2px left 10px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-image: url(${katonoLogo});
`;

const Title = styled.div`
  font-family: "Permanent Marker", cursive;
  font-size: 34px;
`;

const Cart = styled.div`
  height: 100%;
`;

export default class Topbar extends React.Component {
  render() {
    return (
      <StyledTopbar>
        <Icon />
        <Title>KATONO</Title>
        <Cart>cart</Cart>
      </StyledTopbar>
    );
  }
}
