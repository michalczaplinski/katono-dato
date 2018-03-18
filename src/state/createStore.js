import { createStore as reduxCreateStore } from "redux";
import { uniq } from "lodash";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return Object.assign({}, state, {
        cart: uniq([action.id, ...state.cart])
      });
    case "REMOVE_ITEM_FROM_CART":
      return Object.assign({}, state, {
        cart: state.cart.filter(item => item !== action.id)
      });
    default:
      return state;
  }
};

const persistedCart =
  window && window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart"))
    : [];

const initialState = { cart: persistedCart };

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
