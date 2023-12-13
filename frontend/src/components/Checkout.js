// Checkout.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkout } from '../redux/actions/checkoutActions';
import { showCheckoutSuccessMessage } from '../redux/actions/cartActions'; // Import the new action

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleCheckout = async () => {
    const orderItems = cart.cartItems.map((item) => ({
      product: item.product,
      qty: item.qty,
    }));

    try {
      // Dispatch the checkout action
      await dispatch(checkout(orderItems));
      dispatch(showCheckoutSuccessMessage('Order successfully processed')); // Set the success message
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
