import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutTest = () => {
  const [qrData, setQrData] = useState("");
  const [orderCode, setOrderCode] = useState(null);
  const [countdown, setCountdown] = useState(120); // Thời gian countdown là 2 phút (120 giây)
  const [isExpired, setIsExpired] = useState(false); // Trạng thái hết hạn
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:3003/create-payment-link");
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

  return (
    <div className="checkout">
      <h2>Chi tiết đơn hàng</h2>
      <p>
        <strong>Sản phẩm:</strong> Mì tôm Hảo Hảo ly
      </p>
      <p>
        <strong>Giá:</strong> 10,000 VNĐ
      </p>
      <button onClick={handleCheckout}>Thanh toán ngay</button>
    </div>
  );
};

export default CheckoutTest;
