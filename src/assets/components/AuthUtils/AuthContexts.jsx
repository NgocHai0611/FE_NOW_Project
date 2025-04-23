import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // <-- Add a loading state
  const [user, setUser] = useState();
  const [idUser, setIdUser] = useState("");

  const handleSetUserLogin = (user) => {
    setUser(user);
    setIdUser(user._id);
  };

  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    // setToken(storedToken);

    // console.log(`User trong auth context ${user}`);

    setLoading(false); // Mark loading as complete after setting the token
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, loading, handleSetUserLogin, user, idUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
