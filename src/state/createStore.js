import { createStore as reduxCreateStore } from "redux";
import { uniq } from "lodash";
import localStore from "store";

import { noop } from "../util";

const reducer = (state, action) => {
  switch (action.type) {
    case "SYNC_STORE_WITH_DATOCMS_DATA":
      console.log("syncing...");
      return Object.assign({}, state, {
        cart: action.cart
      });
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
    noop(e);
  }
}

const initialState = { cart: persistedCart };

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
