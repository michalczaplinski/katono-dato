/* global Raven */
import { createStore as reduxCreateStore } from "redux";
import { uniq } from "lodash";
import localStore from "store";

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
    case "CLEAR_CART":
      return Object.assign({}, state, {
        cart: []
      });
    default:
      return state;
  }
};

let persistedCart = [];
if (typeof window !== `undefined`) {
  try {
    persistedCart = JSON.parse(localStore.get("cart"));
  } catch (e) {
    Raven.captureException(e);
  }
}

const initialState = { cart: persistedCart };

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
