import React from "react";
import styled from "styled-components";

const Box = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;

  @media (max-width: 400px) {
    display: block;
  }

  ${Box} {
    width: 100%;

    @media (min-width: 401px) {
      width: 47%;
    }
    @media (min-width: 700px) {
      width: 31%;
    }
    @media (min-width: 920px) {
      width: 23%;
    }
    @media (min-width: 1220px) {
      width: 19%;
    }
  }
`;

export { Grid, Box };
