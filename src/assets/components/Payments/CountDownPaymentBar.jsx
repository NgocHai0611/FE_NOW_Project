import { useCountdown } from "../Context/TimePaymentContext";
import { useNavigate } from "react-router-dom";

export default function CountdownBar() {
  const { countdown, qrData, orderCode } = useCountdown();
  const navigate = useNavigate();

  if (!qrData) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-300 p-2 text-center">
      ⏳ Thời gian còn lại: {countdown} giây
      <button onClick={() => navigate(`/paymentProccess`)}>
        Quay lại thanh toán
      </button>
    </div>
  );
}
