import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

const TimePaymentContext = createContext();

export function TimePaymentProvider({ children }) {
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [orderData, setOrderData] = useState("");
  const [qrData, setQRData] = useState("");
  const timerId = useRef(null);

  // Bắt đầu đếm ngược với số giây truyền vào
  const startCountdown = (seconds) => {
    setCountdown(seconds);
    setIsRunning(true);
  };

  // Dừng đếm ngược
  const stopCountdown = () => {
    setIsRunning(false);
    setCountdown(0);
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  useEffect(() => {
    if (isRunning && countdown > 0) {
      timerId.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerId.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [isRunning]);

  return (
    <TimePaymentContext.Provider
      value={{ countdown, isRunning, startCountdown, stopCountdown }}
    >
      {children}
    </TimePaymentContext.Provider>
  );
}

// Hook tiện lợi dùng ở các component
export const useCountdown = () => useContext(TimePaymentContext);
