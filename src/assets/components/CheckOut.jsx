import { useState } from "react"; // Không cần import React ở React 17+

import "../css/checkout.css";
import { FaTrash } from "react-icons/fa";

export default function CheckOut() {
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hieu Nhan ",
      size: "S",
      price: 100.0,
      quantity: 1,
      image: "https://th.bing.com/th/id/OIP.NJJC0T8dYoFsgExhJ5PnzgHaFE?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      availableSizes: ["S", "M", "L"]
    },
    {
      id: 2,
      name: "Dai Loc",
      size: "Regular",
      price: 100.0,
      quantity: 1,
      image: "https://th.bing.com/th/id/R.be354a4580086fc5178de6e7b47435e7?rik=s3Wm8DE1hUq09g&riu=http%3a%2f%2fwww.john2031.com%2fpiper_j4_cub_coupe%2fg-afwh.jpg&ehk=vJXmOK9KFvKrXfbiGvOIJtXvC%2flbRBXqf1nUW6L5OJI%3d&risl=&pid=ImgRaw&r=0",
      availableSizes: ["Regular", "Large"]
    },
    {
      id: 3,
      name: "Hong Danh",
      size: "M",
      price: 100.0,
      quantity: 1,
      image: "https://th.bing.com/th/id/OIP.vq9wmb2c_ZW8jChPDs4angHaFE?w=1024&h=702&rs=1&pid=ImgDetMain",
      availableSizes: ["S", "M", "L"]
    },
  ]);

  const deliveryCharge = 5;

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "FLAT50") {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const handleQuantityChange = (id, change) => {
    setProducts((prevProducts) => {
      return prevProducts
        .map((product) =>
          product.id === id ? { ...product, quantity: product.quantity + change } : product
        )
        .filter((product) => product.quantity > 0);
    });
  };

  const handleRemoveProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleSizeChange = (id, newSize) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, size: newSize } : product
      )
    );
  };

  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const grandTotal = subtotal - discount + deliveryCharge;

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="product-header">
        <span className="header-item-product-column">Product</span>
        <span className="header-item-price-column">Price</span>
        <span className="header-item-quantity-column">Quantity</span>
      </div>
      <div className="checkout-content">
        {/* Danh sách sản phẩm */}
        <div className="checkout-products">
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-info product-column">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    <select
                      className="product-size"
                      value={product.size}
                      onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    >
                      {product.availableSizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="product-price price-column">${product.price.toFixed(2)}</p>
                <div className="quantity-control quantity-column">
                  <button className="quantity-button" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                  <span>{product.quantity}</span>
                  <button className="quantity-button" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                </div>
                <button className="delete-button" onClick={() => handleRemoveProduct(product.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Phần thanh toán */}
        <div className="checkout-summary">
          <h3 className="subtotal">Subtotal <span>${subtotal.toFixed(2)}</span></h3>
          <div className="discount-section">
            <input
              type="text"
              className="discount-input"
              placeholder="Enter Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="apply-button" onClick={handleApplyDiscount}>Apply</button>
          </div>
          <h3>Delivery Charge <span>${deliveryCharge.toFixed(2)}</span></h3>
          <h2 className="total-amount">Grand Total <span>${grandTotal.toFixed(2)}</span></h2>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}