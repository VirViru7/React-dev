import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  let cartItems = getState().carts.cartItems
    ? getState().carts.cartItems?.slice()
    : [];
  let alreadyExist = false;
  cartItems.forEach((element) => {
    if (element._id === product._id) {
      alreadyExist = true;
      element.count++;
    }
  });
  if (!alreadyExist) {
    cartItems.push({ ...product, count: 1 });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().carts.cartItems
    ? getState().carts.cartItems?.slice().filter((x) => x._id !== product._id)
    : [];
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
