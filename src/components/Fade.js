import React from "react";
import { Transition } from "react-transition-group";
import PropTypes from "prop-types";

function Fade({
  children,
  in: inProp,
  enter,
  exit,
  enterDuration,
  exitDuration,
  enterDelay
}) {
  const defaultStyle = {
    transitionProperty: "opacity"
  };

  const transitionStyles = {
    entering: {
      opacity: 0
    },
    entered: {
      transition: `${enterDuration}ms ease-in`,
      transitionDelay: `${enterDelay}ms`,
      opacity: 1
    },
    exiting: {
      transition: `${exitDuration}ms ease-in`,
      opacity: 0
    }
  };

  return (
    <Transition
      in={inProp}
      enter={enter}
      exit={exit}
      timeout={{
        enter: enterDuration,
        exit: exitDuration
      }}
    >
      {status => {
        if (status === "exited") {
          return null;
        }

        const currentStyles = transitionStyles[status];
        return React.cloneElement(children, {
          style: Object.assign({}, defaultStyle, currentStyles)
        });
      }}
    </Transition>
  );
}

Fade.defaultProps = {
  enter: true,
  exit: true,
  in: false,
  enterDuration: 400,
  exitDuration: 400,
  enterDelay: 0
};

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  in: PropTypes.bool,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  enterDuration: PropTypes.number,
  exitDuration: PropTypes.number,
  enterDelay: PropTypes.number
};

export default Fade;
