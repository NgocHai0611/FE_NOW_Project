import { useContext, useState } from "react";
import { AuthContext } from "./AuthUtils/AuthContexts";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(""); // Đổi từ username thành email
  const { handleSetUserLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(""); // Thêm state cho name
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      setErrorMessage("Please enter your name, email, and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    try {
      const response = await axios.post(
        "http://localhost:3004/api/auth/register", // API endpoint
        {
          name, // Gửi thêm name
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Registration successful:", response.data);
      setErrorMessage("Registration successful! Please log in.");
      setName(""); // Reset name field
      setEmail(""); // Reset email field
      setPassword(""); // Reset password field
      setIsSignUp(false); // Chuyển về chế độ đăng nhập
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.error || error.message
      );
      setErrorMessage(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
    console.log("Sending:", { email, password });
  
    try {
      const response = await axios.post(
        "http://localhost:3004/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Response:", response.data);
      const { token, user } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      login(user); // Gọi hàm login từ AuthContext
      console.log("User:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Authentication failed:",
        error.response?.data || error.message
      );
      setToken(null);
      localStorage.removeItem("token");
  
      if (error.response && error.response.data) {
        setErrorMessage(
          typeof error.response.data === "string"
            ? error.response.data
            : "Authentication failed. Please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">
              {isSignUp ? "Create Account" : "Welcome 👋"}
            </h2>
            <p className="login-subtitle">
              {isSignUp ? "Sign up here" : "Please login here"}
            </p>
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "1rem" }}>
                {errorMessage}
              </div>
            )}
            <form
              onSubmit={isSignUp ? handleRegister : handleLogin}
              className="login-form"
            >
              {isSignUp && ( // Chỉ hiển thị trường name khi đăng ký
                <>
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </>
              )}

              <label>Email:</label>
              <input
                type="email" // Đổi placeholder và type cho phù hợp
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />

              <div className="login-options">
                {!isSignUp && (
                  <div className="remember-me">
                    <input type="checkbox" id="rememberMe" disabled={loading} />
                    <label htmlFor="rememberMe"> Remember Me</label>
                  </div>
                )}
                <a
                  href="#"
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(!isSignUp);
                    setErrorMessage(null);
                  }}
                >
                  {isSignUp
                    ? "Already have an account? Login"
                    : "Forgot Password? Sign up"}
                </a>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
