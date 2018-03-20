import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

const Fade = ({ children }) => (
  <CSSTransitionGroup
    transitionName="fade"
    transitionEnterTimeout={400}
    transitionLeaveTimeout={250}
  >
    {children}
  </CSSTransitionGroup>
);

export default Fade;
