import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ShoppingCart from "./ShoppingCart";
import logo from "../imgs/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthUtils/AuthContexts";
import { CartProvider, useCart } from "./Context/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { totalItem } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toLogin = async (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const handleToProfile = () => {
    navigate("/myprofile");
  };

  return (
    <div className="container__header">
      <div className="header">
        <img src={logo} alt="" className="header--logo" />
        <ul className="list__header--link">
          <li>
            <Link to={`/dashboard`}>
              <p>Home</p>
            </Link>
          </li>
          <li>
            <a href="">
              <p>Shop</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </a>
          </li>
          <li>
            <a href="">
              <p>Our Story</p>
            </a>
          </li>
          <li>
            <a href="">
              <p>Blog</p>
            </a>
          </li>
          <li>
            <a href="">
              <p>Contact Us</p>
            </a>
          </li>
          {user?.isAdmin === true && (
            <li>
              <Link to="/revenue">
                <p>Revenue</p>
              </Link>
            </li>
          )}
        </ul>

        <ul className="list__header--icon">
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
          </li>
          <li onClick={toggleModal} style={{ cursor: "pointer" }}>
            <div className="cart-icon-container">
              <FontAwesomeIcon icon={faCartShopping} />
              <div className="container__totalItem">
                <p>{totalItem}</p>
              </div>
            </div>
          </li>
        </ul>

        {console.log(user)}

        {user ? (
          <div className="layout__user">
            <img
              src={user.pic}
              alt=""
              className="avatar__login"
              onClick={handleToProfile}
            />
            <button onClick={handleLogout}>Đăng Xuất</button>
          </div>
        ) : (
          <button className="btn--login" onClick={toLogin}>
            Login
          </button>
        )}
      </div>
      {isOpen && <ShoppingCart onClose={toggleModal} />}
    </div>
  );
}
