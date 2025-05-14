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
  const { user } = useContext(AuthContext);
  const { totalItem } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toLogin = async (e) => {
    e.preventDefault();
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
          <li>
            <Link to="/thong-ke">
              <p>Thống kê</p>
            </Link>
          </li>
        </ul>

        <ul className="list__header--icon">
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
          </li>
          <li onClick={toggleModal} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faCartShopping} />
            <div className="container__totalItem">
              <p style={{ color: "white" }}>{totalItem}</p>
            </div>
          </li>
        </ul>

        {console.log(user)}

        {user ? (
          <div onClick={handleToProfile}>
            <img src={user.pic} alt="" className="avatar__login" />
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
