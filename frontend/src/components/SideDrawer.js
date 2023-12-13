import "./SideDrawer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/" className="side__link">Home</Link>
        </li>
        <li>
          <Link to="/products" className="side__link">Products</Link>
        </li>
        <li>
          <Link to="/projects" className="side__link">Projects</Link>
        </li>
        <li>
          <Link to="/packages" className="side__link">Packages</Link>
        </li>
        <li>
          <Link to="/reviews" className="side__link">Reviews</Link>
        </li>
        <li>
          <Link to="/about" className="side__link">About</Link>
        </li>
        <li>
          <Link to="/cart" className="side__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
