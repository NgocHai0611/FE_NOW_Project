import { useState } from "react";
import PropTypes from "prop-types";
import "../css/login.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth , db} from "./firebase";
import { setDoc , doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user; // Lấy thông tin user từ userCredential
  
    //   if (user) {
    //     await setDoc(doc(db, "Users", user.uid), {
    //       email: user.email
    //     });
    //     console.log("User registered:", user);
    //     toast.success("Đăng ký thành công!",{position: "top-center"});
    //     setIsSignUp(false);
    //   }
    // } catch (error) {
    //   console.error("Lỗi đăng ký:", error.message);
    //   toast.success("Đăng ký thất bại.",{position: "bottom-center"});
    // }
  };
  

  const handleLogin = async (e) => {
    navigate("/dashboard")
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   toast.success("Đăng nhập thành công!",{position: "top-center"});
    //   onLogin();
    // } catch (error) {
    //   console.error("Lỗi đăng nhập:", error);
    //   toast.success("Sai email hoặc mật khẩu! Vui lòng thử lại.",{position: "bottom-center"});
    // }
  };

  return (
    <div className="login-page">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">{isSignUp ? "Create Account" : "Welcome 👋"}</h2>
            <p className="login-subtitle">{isSignUp ? "Sign up here" : "Please login here"}</p>
            <form onSubmit={isSignUp ? handleRegister : handleLogin} className="login-form">
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

// Auth.propTypes = {
//   onLogin: PropTypes.func.isRequired,
// };
