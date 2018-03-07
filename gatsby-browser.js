import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import createStore from "./src/state/createStore";

const store = createStore();
store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

exports.replaceRouterComponent = ({ history }) => {
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};
