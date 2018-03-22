import React from "react";
import styled, { css } from "styled-components";
import colors from "../styles/colors";

export default styled.div`
  cursor: pointer;
  width: 100%;
  height: 40px;
  line-height: 1.9;
  font-size: 16px;
  background-color: ${props => props.backgroundColor || colors.red};
  text-align: center;
  font-weight: bold;
  border: ${props => props.border || "4px solid #333333"};
  &:hover {
    ${props =>
      !props.disabled &&
      css`
        background-color: ${colors.turquoise};
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
