// actions/checkoutActions.js

import axios from 'axios';

export const checkout = (orderItems) => async (dispatch) => {
  try {
    // Make a POST request to the backend to process the order
    await axios.post('/api/checkout', { orderItems });

    dispatch({ type: 'CHECKOUT_SUCCESS_MESSAGE', payload: 'Order successfully processed' });
    
    // If the request is successful, you can clear the cart or perform other actions
    dispatch({ type: 'CHECKOUT_SUCCESS' });
  } catch (error) {
    // Handle any errors
    dispatch({ type: 'CHECKOUT_FAIL', payload: error.message });
  }
};
