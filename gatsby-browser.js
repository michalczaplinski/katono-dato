/* global window, CustomEvent, Raven */
import "babel-polyfill";

import React, { createElement } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import localStore from "store";
import { Transition } from "react-transition-group";
import createHistory from "history/createBrowserHistory";

import createStore from "./src/state/createStore";

const store = createStore();
store.subscribe(() => {
  try {
    const { cart } = store.getState();
    const cartString = JSON.stringify(cart);
    localStore.set("cart", cartString);
  } catch (e) {
    Raven.capturException(e);
  }
});

exports.replaceRouterComponent = ({ history }) => {
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};

const getTransitionStyles = (timeout, isBack) => ({
  entering: {
    transform: `translateY(${isBack ? "-" : ""}10px)`,
    opacity: 0
  },
  entered: {
    transition: `all ${timeout}ms ease-out`,
    transform: `translateY(0px)`,
    opacity: 100
  },
  exiting: {
    transition: `all ${timeout}ms ease-in`,
    transform: `translateY(${isBack ? "" : "-"}10px)`,
    opacity: 0
  }
});

const getTransitionStyle = ({ timeout, status, isBack }) =>
  getTransitionStyles(timeout, isBack)[status];

const timeout = 300;
const historyExitingEventType = `history::exiting`;

const getUserConfirmation = (pathname, callback) => {
  const event = new CustomEvent(historyExitingEventType, {
    detail: { pathname }
  });
  window.dispatchEvent(event);
  setTimeout(() => {
    callback(true);
  }, timeout);
};

const history = createHistory({ getUserConfirmation });
// block must return a string to conform
history.block((location, action) => location.pathname);

exports.replaceHistory = () => history;

class ReplaceComponentRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exiting: false, nextPageResources: {} };
    this.listenerHandler = this.listenerHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener(historyExitingEventType, this.listenerHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.setState({ exiting: false, nextPageResources: {} });
    }
  }

  componentWillUnmount() {
    window.removeEventListener(historyExitingEventType, this.listenerHandler);
  }

  listenerHandler(event) {
    const nextPageResources =
      this.props.loader.getResourcesForPathname(
        event.detail.pathname,
        nextPageResources => this.setState({ nextPageResources })
      ) || {};
    this.setState({ exiting: true, nextPageResources });
  }

  render() {
    const transitionProps = {
      timeout: {
        enter: 0,
        exit: timeout
      },
      appear: true,
      in: !this.state.exiting,
      key: this.props.location.key
    };

    return (
      <Transition {...transitionProps}>
        {status =>
          createElement(this.props.pageResources.component, {
            ...this.props,
            ...this.props.pageResources.json,
            transition: {
              status,
              timeout,
              style: getTransitionStyle({
                isBack: window.__isBack,
                status,
                timeout
              }),
              nextPageResources: this.state.nextPageResources
            }
          })
        }
      </Transition>
    );
  }
}

exports.onRouteUpdate = ({ location }) => {
  window.__isBack = false;
};

// eslint-disable-next-line react/display-name
exports.replaceComponentRenderer = ({ props, loader }) => {
  if (props.layout) {
    return undefined;
  }

  return createElement(ReplaceComponentRenderer, {
    ...props,
    loader
  });
};
