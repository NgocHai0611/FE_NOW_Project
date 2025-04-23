import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";

const PaymentProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    qrData,
    orderCode,
    countdown: initialCountdown,
  } = location.state || {};

  const [countdown, setCountdown] = useState(initialCountdown || 120); // Thời gian countdown là 2 phút (120 giây)
  const [isExpired, setIsExpired] = useState(false); // Trạng thái hết hạn

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
      navigate("/paymentFail"); // Điều hướng ngay lập tức khi hết hạn
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
            navigate(`/paymentSuccess?orderCode=${orderCode}&status=success`);
          }

          if (status === "EXPIRED" || isExpired) {
            clearInterval(interval);
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
      <h2>Thanh toán đơn hàng</h2>
      <p>Sản phẩm: Mì tôm Hảo Hảo ly</p>
      <p>Giá: 10.000 VND</p>

      {qrData && !isExpired && (
        <div style={{ marginTop: 20 }}>
          <h4>Quét mã QR để thanh toán</h4>
          <p>Còn lại: {countdown} giây</p>
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
