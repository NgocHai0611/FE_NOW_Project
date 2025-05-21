import { createContext, useContext, useState } from "react";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [countdown, setCountdown] = useState(null); // null nếu chưa active
  const [isActive, setIsActive] = useState(false); // để biết khi nào đang đếm

  return (
    <TimeContext.Provider
      value={{ countdown, setCountdown, isActive, setIsActive }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext);
