import * as actionTypes from "../constants/cartConstant";

const CART_INITIAL_STATE = {
  cartItems: [],
  successMessage: '',
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
      case actionTypes.CHECKOUT_SUCCESS_MESSAGE:
        return {
          ...state,
          successMessage: action.payload,
        };
      default:
        return state;
    }
};