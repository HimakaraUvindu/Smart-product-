import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import { checkout } from "../redux/actions/checkoutActions";
import { showCheckoutSuccessMessage } from "../redux/actions/cartAction";


const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems,successMessage } = cart;
  const [showMessage, setShowMessage] = useState(false);


  useEffect(() => {
    if (showMessage){
      const messageTimer = setTimeout(()=>{
        setShowMessage(false);
      }, 4000); // 4 seconds
      return () => clearTimeout(messageTimer);
    }
  }, [showMessage]);


  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.product,
      qty: item.qty,
      imageUrl: item.imageUrl,
    }));
  
    try {
      // Dispatch the checkout action
      await dispatch(checkout(orderItems));
      dispatch(showCheckoutSuccessMessage('Order successfully processed')); // Set the success message
      setShowMessage(true);
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
  };
  

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            <>
              {/* Header Row */}
              <div className="cartitem cartitem__heder">
                <div className="cartitem__image">
                  <p>Image</p>
                </div>
                <div className="cartitem__Item name">
                  <p>Item Name</p>
                </div>
                <div className="cartitem__price">
                  <p>Price</p>
                </div>
                <div className="cartitem__quantity">
                  <p>Quantity</p>
                </div>
                <div className="cartitem__delete">
                  <p>Delete</p>
                </div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeFromCartHandler}
                />
              ))}
            </>
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>Rs.{getCartSubTotal()}</p>
          </div>
          {/*Display order summary*/}
          <div className="order-summary">
            <h3>Order summary</h3>
            <div className="order-summary-item">
              {cartItems.map((item) =>(
                <div key={item.product} className="order-summary-ite,">
                  <span>{item.name}</span>
                  <spane> x {item.qty}</spane>
                  <span> Rs.{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button onClick={handleCheckout}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
      {/* Display the success message as a top-middle popup when showMessage is true */}
      {showMessage && (
        <div className={`success-message show-message`} onClick={() => setShowMessage(false)}>
          {successMessage}
        </div>
      )}
      </>
  );
};

export default CartScreen;
