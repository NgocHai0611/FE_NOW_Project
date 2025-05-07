import { useContext, useState } from "react";
import "../css/checkout.css";
import { FaTrash } from "react-icons/fa";
import { useCart } from "./Context/CartContext";
import { AuthContext } from "./AuthUtils/AuthContexts";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Loading from "./Loading/Loading";

export default function CheckOut() {
  const {
    cartItems,
    handleIncreaseItem,
    handleDecreaseItem,
    removeFromCart,
    setTotalPay,
    totalPay,
  } = useCart();

  const { user } = useContext(AuthContext);

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const deliveryCharge = 5;
  const [qrData, setQrData] = useState("");
  const [orderCode, setOrderCode] = useState(null);
  const [countdown, setCountdown] = useState(120); // Thời gian countdown là 2 phút (120 giây)
  const [isExpired, setIsExpired] = useState(false); // Trạng thái hết hạn
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle Check Out
  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3003/create-payment-link",
        { grandTotal, cartItems }
      );
      setQrData(res.data.qrCode);
      setOrderCode(res.data.orderCode);
      setCountdown(120); // Reset countdown khi tạo mã QR mới
      setIsExpired(false); // Đặt trạng thái hết hạn là false

      // Chuyển sang trang PaymentProcess và truyền dữ liệu qua state
      navigate("/paymentProccess", {
        state: {
          qrData: res.data.qrCode,
          orderCode: res.data.orderCode,
          countdown: 120,
        },
      });
    } catch (err) {
      console.error("Lỗi khi tạo mã QR", err);
      alert("Không thể tạo mã QR.");
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "FLAT50") {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, product) => acc + product.unitPrice * product.qty,
    0
  );
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
        <div className="checkout-products">
          <div className="product-list">
            {cartItems.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-info product-column">
                  <img
                    src={product.imgProduct}
                    alt={product.productName}
                    className="product-image"
                  />
                  <div className="product-details">
                    <p className="product-name">{product.productName}</p>
                    {product.availableSizes && (
                      <select
                        className="product-size"
                        value={product.size}
                        onChange={(e) =>
                          handleSizeChange(product.id, e.target.value)
                        }
                      >
                        {product.availableSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <p className="product-price price-column">
                  ${product.unitPrice.toFixed(2)}
                </p>
                <div className="quantity-control quantity-column">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecreaseItem(product.id)}
                  >
                    -
                  </button>
                  <span>{product.qty}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncreaseItem(product)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="delete-button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Thanh toán */}
        <div className="checkout-summary">
          <h3 className="subtotal">
            Subtotal <span>${subtotal.toFixed(2)}</span>
          </h3>
          <div className="discount-section">
            <input
              type="text"
              className="discount-input"
              placeholder="Enter Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="apply-button" onClick={handleApplyDiscount}>
              Apply
            </button>
          </div>
          <h2>
            Delivery Charge <span>${deliveryCharge.toFixed(2)}</span>
          </h2>
          <h3 className="total-amount">
            Grand Total <span>${grandTotal.toFixed(2)}</span>
          </h3>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}
