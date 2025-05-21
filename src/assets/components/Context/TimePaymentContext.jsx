import React, { createContext, useContext, useState, useEffect } from "react";

const TimePaymentContext = createContext();

export function TimePaymentProvider({ children }) {
  const [countdown, setCountdown] = useState(0);
  const [qrData, setQrData] = useState("");
  const [orderCode, setOrderCode] = useState(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const startCountdown = (seconds) => {
    console.log("Dang Count Down ! ");
    setCountdown(seconds);
  };

  return (
    <TimePaymentContext.Provider
      value={{
        countdown,
        setCountdown,
        qrData,
        setQrData,
        orderCode,
        setOrderCode,
        startCountdown,
      }}
    >
      {children}
    </TimePaymentContext.Provider>
  );
}

export function useCountdown() {
  return useContext(TimePaymentContext);
}
