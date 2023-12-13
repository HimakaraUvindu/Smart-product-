import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import React, { useState } from 'react';

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [searchTerm, setSearchTerm] = useState("");

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const handleSearch = () => {
    
    console.log("Searching for:", searchTerm);
    setSearchTerm(""); 
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>SMART product</h2>
      </div>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />{/* Add the SearchBar component here */}

      <ul className="navbar__links">
        <li>
          <Link to="/" className="nav__link">Home</Link>
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;