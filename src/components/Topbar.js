import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import { connect } from "react-redux";

import katonoLogo from "../static/katono-logo.svg";
import shoppingCart from "../static/shopping-cart.svg";
import backArrow from "../static/back-arrow.svg";

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

const Logo = styled.div`
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
  color: black;
`;

const Cart = styled.div`
  height: 100%;
  width: 50px;
  background-position: bottom 10px right 10px;
  background-size: 60%;
  background-image: url(${shoppingCart});
  background-repeat: no-repeat;
  cursor: pointer;
`;

const ItemCounter = styled.div`
  position: absolute;
  top: 5px;
  right: 6px;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 1.4;
  font-family: sans-serif;
  font-size: 12px;
`;

const BackButton = styled.div`
  height: 100%;
  width: 50px;
  background-position: bottom 10px right 10px;
  background-size: 60%;
  background-image: url(${backArrow});
  background-repeat: no-repeat;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: black;
`;

const Topbar = ({ showBackButton, numItemsInCart }) => (
  <StyledTopbar>
    {showBackButton ? (
      <StyledLink to="/">
        <BackButton />
      </StyledLink>
    ) : (
      <Logo />
    )}
    <StyledLink to="/">
      <Title>KATONO</Title>
    </StyledLink>
    <Cart>
      <ItemCounter>{numItemsInCart}</ItemCounter>
    </Cart>
  </StyledTopbar>
);

const mapStateToProps = ({ cart }) => ({ numItemsInCart: cart.length });

export default connect(mapStateToProps)(Topbar);