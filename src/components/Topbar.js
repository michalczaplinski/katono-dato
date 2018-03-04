import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

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
  decoration: none;
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

const BackButton = styled.div`
  height: 100%;
  width: 50px;
  background-position: bottom 10px right 10px;
  background-size: 60%;
  background-image: url(${backArrow});
  background-repeat: no-repeat;
  cursor: pointer;
`;

const UnstyledLink = styled(Link)`
  text-decoration: underline;
  color: black;
`;

const Topbar = ({ showBackButton }) => (
  <StyledTopbar>
    {showBackButton ? (
      <UnstyledLink to="/">
        <BackButton />
      </UnstyledLink>
    ) : (
      <Logo />
    )}
    <UnstyledLink to="/">
      <Title>KATONO</Title>
    </UnstyledLink>
    <Cart />
  </StyledTopbar>
);

export default Topbar;
