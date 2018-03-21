import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: auto;
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  display: inline-block;
`;

const Grid = styled.div`
  column-gap: 1em;

  @media (min-width: 300px) {
    column-count: 2;
  }
  @media (min-width: 650px) {
    column-count: 3;
  }
  @media (min-width: 900px) {
    column-count: 4;
  }
`;

export { Grid, Box };
