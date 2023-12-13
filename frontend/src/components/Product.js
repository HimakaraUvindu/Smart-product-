import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className="product">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="product__image" />
      )}

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.slice(0, 100)}...</p>

        <p className="info__price">Rs.{price}</p>

        <Link to={`/product/${productId}`} className="info__button">
          View Details
        </Link>
      </div>
    </div>
  );
};

Product.propTypes = {
  imageUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
};

export default Product;
