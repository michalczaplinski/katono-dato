import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: auto;
  padding-left: 2%;
  padding-right: 2%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Grid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: row wrap;

  @media (max-width: 300px) {
    display: block;
  }

  ${Box} {
    width: 100%;

    @media (min-width: 300px) {
      width: 50%;
      height: auto;
    }
    @media (min-width: 650px) {
      width: 33.333%;
      height: auto;
    }
    @media (min-width: 920px) {
      width: 25%;
      height: auto;
    }
    @media (min-width: 1220px) {
      width: 20%;
      height: auto;
    }
  }
`;

export { Grid, Box };
