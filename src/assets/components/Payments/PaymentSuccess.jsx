import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../css/paymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard"); // hoặc route nào bạn muốn chuyển đến
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="modal-overlay--sucess"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content--sucess"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "20%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>✅ Thanh toán thành công!</h2>
          <p>Bạn sẽ được chuyển về trang chủ trong giây lát...</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
