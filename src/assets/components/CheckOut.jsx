import { useState } from "react"; // Không cần import React ở React 17+

import "../css/checkout.css";

export default function CheckOut() {
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const deliveryCharge = 5;

  const handleApplyDiscount = () => {
    if (discountCode === "FLAT50") {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const products = [
    {
      id: 1,
      name: "Hieu Nhan ",
      size: "S",
      price: 100.0,
      image: "https://th.bing.com/th/id/OIP.NJJC0T8dYoFsgExhJ5PnzgHaFE?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      name: "Dai Loc",
      size: "Regular",
      price: 100.0,
      image: "https://th.bing.com/th/id/R.be354a4580086fc5178de6e7b47435e7?rik=s3Wm8DE1hUq09g&riu=http%3a%2f%2fwww.john2031.com%2fpiper_j4_cub_coupe%2fg-afwh.jpg&ehk=vJXmOK9KFvKrXfbiGvOIJtXvC%2flbRBXqf1nUW6L5OJI%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      name: "Hong Danh",
      size: "M",
      price: 100.0,
      image: "https://th.bing.com/th/id/OIP.vq9wmb2c_ZW8jChPDs4angHaFE?w=1024&h=702&rs=1&pid=ImgDetMain",
    },
  ];

  const subtotal = products.reduce((acc, product) => acc + product.price, 0);
  const grandTotal = subtotal - discount + deliveryCharge;

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-content">
        {/* Danh sách sản phẩm */}
        <div className="checkout-products">
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <p className="product-name">{product.name}</p>
                  <p>Size: {product.size}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phần thanh toán */}
        <div className="checkout-summary">
          <h3>Subtotal <span>${subtotal.toFixed(2)}</span></h3>
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