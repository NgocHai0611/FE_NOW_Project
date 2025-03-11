import React from "react";
import '../css/ShoppingCart.css';

const ShoppingCart = ({ onClose }) => {
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