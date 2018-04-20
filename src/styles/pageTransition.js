import React from "react";

const pageTransition = Component => ({ transition, ...props }) => (
  <div style={transition && { ...transition.style, width: "100%" }}>
    <Component {...props} />
  </div>
);

export default pageTransition;
