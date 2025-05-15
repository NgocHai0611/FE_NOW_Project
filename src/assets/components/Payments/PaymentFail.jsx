import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../css/paymentFails.css";

export default function PaymentFail() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="modal-overlay--fails"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content--fails"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "20%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>❌ Thanh toán thất bại!</h2>

          <button
            onClick={handleGoHome}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Back To Dashboard
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
