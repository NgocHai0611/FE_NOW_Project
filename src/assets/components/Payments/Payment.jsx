import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import Loading from "../Loading/Loading";
import { AuthContext } from "../AuthUtils/AuthContexts";
import { useCart } from "../Context/CartContext";
import "../../css/paymentProcess.css";

const PaymentProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    qrData,
    orderCode,
    countdown: initialCountdown,
    statusOrder,
    orderUpdate,
  } = location.state || {};

  const [countdown, setCountdown] = useState(initialCountdown || 120); // Thời gian countdown là 2 phút (120 giây)
  const [isExpired, setIsExpired] = useState(false); // Trạng thái hết hạn
  const [loading, setLoading] = useState(false);
  const deliveryCharge = 5;

  const {
    cartItems,
    clearCart,
    handleIncreaseItem,
    handleDecreaseItem,
    removeFromCart,
    setTotalPay,
    totalPay,
  } = useCart();

  const { user } = useContext(AuthContext);

  const subtotal = cartItems.reduce(
    (acc, product) => acc + product.unitPrice * product.qty,
    0
  );
  const grandTotal = subtotal - 0 + deliveryCharge;

  // Handle Edit Order
  const handleUpdateOrder = (status) => {
    setLoading(true); // bắt đầu loading
    const userID = user.id;
    console.log(userID);

    console.log("Dang Thuc Hien Update Order ");

    axios
      .post("http://localhost/orders/updateOrder", {
        items: cartItems,
        userID,
        orders: orderUpdate,
        status,
        grandTotal,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false); // dừng loading nếu có lỗi
        console.log(err);
      });
  };

  // Hanlde Save Order
  const handleSaveOrder = (status) => {
    setLoading(true); // bắt đầu loading
    const userID = user.id;
    console.log(userID);

    axios
      .post("http://localhost/orders/saveOrder", {
        cartItems,
        userID,
        grandTotal,
        status,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false); // dừng loading nếu có lỗi
        console.log(err);
      });
  };

  const handleUpdateProduct = () => {
    setLoading(true); // bắt đầu loading
    axios
      .post("http://localhost/products/update-stock", {
        cartItems,
      })
      .then((res) => {})
      .catch((err) => {
        setLoading(false); // dừng loading nếu có lỗi
        console.log(err);
      });
  };

  // useEffect 1: Countdown và ẩn mã QR sau 2 phút
  useEffect(() => {
    let timer;

    if (qrData && countdown > 0) {
      // Countdown giảm mỗi giây
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Hết thời gian (2 phút)
      timer = setTimeout(() => {
        setQrData(""); // Ẩn mã QR
        setIsExpired(true); // Đặt trạng thái mã QR hết hạn
        alert("Mã QR đã hết hạn, vui lòng tạo lại.");

        // Điều hướng tới trang thất bại
        navigate("/paymentFail");
      }, 2 * 60 * 1000); // 2 phút

      // Cleanup
      return () => {
        clearInterval(countdownTimer);
        clearTimeout(timer); // Dọn dẹp countdown và timeout
      };
    } else if (countdown === 0 && !isExpired) {
      setIsExpired(true); // Đặt trạng thái hết hạn khi countdown về 0
      if (statusOrder && orderUpdate) {
        navigate("/paymentFail");
      } else {
        handleSaveOrder("PENDING");
        navigate("/paymentFail"); // Điều hướng ngay lập tức khi hết hạn
      }
    }
  }, [qrData, countdown, isExpired, navigate]); // Đảm bảo useEffect này chạy lại khi countdown thay đổi

  // useEffect 2: Kiểm tra trạng thái thanh toán mỗi 5 giây
  useEffect(() => {
    let interval;
    if (orderCode && !isExpired) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(
            `http://localhost:3003/check-payment-status/${orderCode}`
          );
          console.log(res.data);
          const status = res.data.status;

          console.log("Trạng thái hiện tại:", status);

          if (status === "PAID") {
            clearInterval(interval);
            if (statusOrder && orderUpdate) {
              handleUpdateOrder("PAID");
              handleUpdateProduct();
            } else {
              handleSaveOrder("PAID");
              handleUpdateProduct();
            }

            clearCart(user.id);
            navigate(`/paymentSuccess?orderCode=${orderCode}&status=success`);
          }

          if (status === "EXPIRED" || isExpired) {
            clearInterval(interval);
            handleSaveOrder("PENDING");
            clearCart(user.id);
            navigate(`/paymentFail?orderCode=${orderCode}&status=fail`);
          }
        } catch (err) {
          console.error("Lỗi khi kiểm tra trạng thái thanh toán", err);
        }
      }, 5000); // kiểm tra mỗi 5 giây

      // Cleanup
      return () => clearInterval(interval);
    }
  }, [orderCode, navigate, isExpired]);

  return (
    <div style={{ padding: 30 }}>
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
                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
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
          <p className="product-qty">Quantity : {product.qty}</p>
          <p className="product-price price-column">
            ${product.unitPrice.toFixed(2)}
          </p>
        </div>
      ))}

      {loading && <Loading />}

      {qrData && !isExpired && (
        <div style={{ marginTop: 20 }}>
          <h4>Scan QR To Payment</h4>
          <p>Time Expire: {countdown} sec</p>
          <div style={{ background: "white", padding: 16 }}>
            <QRCode value={qrData} size={256} />
          </div>
        </div>
      )}

      {isExpired && <p>Mã QR đã hết hạn, vui lòng tạo lại.</p>}

      {!qrData && countdown === 0 && !isExpired && (
        <p>Vui lòng tạo lại mã QR.</p>
      )}
    </div>
  );
};

export default PaymentProcess;
