import React, { useEffect, useState } from "react";
import "../css/ShoppingCart.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ShoppingCart = ({ onClose }) => {
  const location = useLocation();

  return (
    <div className="shopping-cart-modal">
      <div className="modal-content">
        <h3>Shopping Cart</h3>
        <div className="button-container">
          <p>Subtotal</p>
          <button className="view-cart">View Cart</button>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
