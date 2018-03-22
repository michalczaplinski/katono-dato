import React from "react";
import { navigateTo } from "gatsby-link";
import styled from "styled-components";

import CartButton from "../components/CartButton";

const PageContainer = styled.div`
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  color: #333333;
`;

const NotFoundPage = ({ transition }) => (
  <div style={transition && transition.style}>
    <PageContainer>
      <h1>HUH? </h1>
      <h1>WHAT ARE YOU DOING HERE? </h1>
      <CartButton onClick={() => navigateTo("/")}>
        GO PICK SOME STUFF 👉
      </CartButton>
    </PageContainer>
  </div>
);

export default NotFoundPage;
