import React from "react";
import styled, { css } from "styled-components";
import colors from "../styles/colors";

export default styled.div`
  cursor: pointer;
  width: 127px;
  height: 31px;
  line-height: 1.8;
  background-color: ${colors.red};
  text-align: center;
  border-radius: 2px;
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
