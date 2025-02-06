import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons"; //
import logo from "../imgs/logo.png";

export default function Header() {
  return (
    <div className="container__header">
      <div className="header">
        <img src={logo} alt="" className="header--logo" />
        <ul className="list__header--link">
          <li>
            <a href="">
              <p>Home</p>
            </a>
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
        </ul>

        <ul className="list__header--icon">
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
          </li>
          <li>
            <FontAwesomeIcon icon={faCartShopping} />
          </li>
        </ul>

        <button className="btn--login">Login</button>
      </div>
    </div>
  );
}
