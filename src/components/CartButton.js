import React from "react";
import styled, { css } from "styled-components";
import colors from "../styles/colors";

export default styled.div`
  cursor: pointer;
  width: 127px;
  height: 31px;
  line-height: 1.4;
  background-color: ${props => props.backgroundColor || "red"};
  text-align: center;
  font-weight: bold;
  border: ${props => props.border || "4px solid black"};
  &:hover {
    ${props =>
      !props.disabled &&
      css`
        background-color: ${colors.lightBlue};
      `};
  }
  transition: all 400ms ease-in-out;
  ${props =>
    props.disabled &&
    css`
      background-color: ${colors.honeydew};
      color: #c1c0c0;
      cursor: default;
    `};
`;
