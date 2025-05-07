import React from "react";
import { useCart } from "./Context/CartContext";
import "../css/ShoppingCart.css"; // nếu bạn có file CSS riêng
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ onClose }) => {
  const { cartItems, totalItem, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleToCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="shopping-cart-modal">
      <div className="modal-content">
        <div className="headline__sidebar">
          <h3>Shopping Cart</h3>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imgProduct}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.productName}</p>
                  <p>Qty: {item.qty}</p>
                  <p>Price: ${item.unitPrice}</p>
                  <p>Total: ${item.unitPrice * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="subtotal-section">
          <p>Total Items: {totalItem}</p>
          <p>Subtotal: ${totalPrice.toFixed(2)}</p>
        </div>

        <div className="button-container">
          <button className="view-cart">View Cart</button>
          <button className="checkout" onClick={handleToCheckOut}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
