import { useEffect } from "react";
import { useCountdown } from "../Context/TimePaymentContext";
import { useNavigate } from "react-router-dom";

export default function CountdownBar() {
  const {
    countdown: paymentCountdown,
    qrData: paymentQrData,
    orderCode: paymentOrderCode,
    setQrData, // 👈 lấy setQrData từ context
  } = useCountdown();

  const navigate = useNavigate();

  // 👉 Chuyển hướng khi countdown về 0
  useEffect(() => {
    if (paymentCountdown === 0 && paymentQrData) {
      setQrData(null); // 👈 reset qrData để ẩn countdown bar
      navigate("/paymentFail");
    }
  }, [paymentCountdown, paymentQrData, navigate, setQrData]);

  if (!paymentQrData) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#ffeb3b",
        padding: "10px",
        textAlign: "center",
      }}
    >
      ⏳ Thời gian còn lại: {paymentCountdown} giây
      <button
        onClick={() => navigate(`/paymentProccess`)}
        style={{ marginLeft: "10px" }}
      >
        Quay lại thanh toán
      </button>
    </div>
  );
}
