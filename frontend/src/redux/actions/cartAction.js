import * as actionTypes from "../constants/cartConstant";
import axios from "axios";

// Function to add a product to the shopping cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  // Dispatch an action to add the product to the cart
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

// Function to remove a product from the shopping cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  // Update the cart data in local storage
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

// Function to show a checkout success message
export const showCheckoutSuccessMessage = (message) => (dispatch) => {
  dispatch({
    type: actionTypes.CHECKOUT_SUCCESS_MESSAGE,
    payload: message,
  });
};