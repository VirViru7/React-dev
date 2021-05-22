import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { productReducer } from "./reducers/productReducers";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducers } from "./reducers/orderReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers({
    products: productReducer,
    carts: cartReducer,
    orders: orderReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
