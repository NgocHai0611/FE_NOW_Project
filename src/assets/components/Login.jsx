import { useState, useContext } from "react"; // Added useContext to imports
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthUtils/AuthContexts";
import axios from "axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register", // Updated to match handleLogin URL
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" }, // Added headers to match handleLogin
        }
      );
      setErrorMessage(response.data.message); // Using errorMessage since that's what the component uses
      setUsername(""); // Reset form
      setPassword("");
      setIsSignUp(false); // Switch back to login view
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.error || error.message
      );
      setErrorMessage(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    console.log("Sending:", { username, password });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      console.log(token);
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
              <label>Username:</label>
              <input
                type="text" // Changed from "username" to "text" as "username" isn't a valid type
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
}
