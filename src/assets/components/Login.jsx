import { useState } from "react";
import PropTypes from "prop-types";
import "../css/login.css";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Hàm kiểm tra định dạng email hợp lệ
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra email hợp lệ trước khi gửi yêu cầu
    if (!isValidEmail(email)) {
      alert("Email không hợp lệ!");
      return;
    }
    
    try {
      const response = await fetch("https://6758792b60576a194d10add8.mockapi.io/Login");
      const users = await response.json();

      if (isSignUp) {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          alert("Email đã tồn tại!");
          return;
        }
        // Gửi yêu cầu tạo tài khoản mới
        await fetch("https://6758792b60576a194d10add8.mockapi.io/Login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        alert("Đăng ký thành công! Hãy đăng nhập.");
        setIsSignUp(false);
      } else {
        // Xác thực đăng nhập
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          onLogin();
        } else {
          alert("Sai tài khoản hoặc mật khẩu!");
        }
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Không thể kết nối đến máy chủ!");
    }
  };

  return (
    <div className="login-page">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">{isSignUp ? "Create Account" : "Welcome 👋"}</h2>
            <p className="login-subtitle">{isSignUp ? "Sign up here" : "Please login here"}</p>
            <form onSubmit={handleSubmit} className="login-form">
              <label>Email Address:</label>
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="login-options">
                {!isSignUp && (
                  <div className="remember-me">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe"> Remember Me</label>
                  </div>
                )}
                <a href="#" className="forgot-password" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Already have an account? Login" : "Forgot Password? Sign up"}
                </a>
              </div>
              
              <button type="submit" className="login-button">
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Auth.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
