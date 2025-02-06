import logoFooter from "../imgs/logoFooter.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faPhone,
  faLocationDot,
  faArrowRight,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart, faEnvelope } from "@fortawesome/free-regular-svg-icons"; //

export default function Footer() {
  return (
    <div className="container__footer">
      <div className="footer">
        <div className="footer__nav--item">
          <img src={logoFooter} alt="" className="img__footer" />
          <ul className="list__footer--item">
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <p>(704) 555-0127</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>krist@example.com</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faLocationDot} />
              <p>3791 Ranchview California</p>
            </li>
          </ul>
        </div>

        <div className="footer__nav--item">
          <ul className="list__footer--item">
            <h1 className="nav__item--headline">Information</h1>
            <li>My Account</li>
            <li>Login</li>
            <li>My Cart</li>
            <li>My Wishlist</li>
            <li>Checkout</li>
          </ul>
        </div>

        <div className="footer__nav--item">
          <ul className="list__footer--item">
            <h1 className="nav__item--headline">Service</h1>
            <li>About Us</li>
            <li>Careers</li>
            <li>Delivery Infomation</li>
            <li>Privacy Policy</li>
            <li>Term & Conditions</li>
          </ul>
        </div>

        <div className="footer__nav--item footer__nav--item--subricse">
          <ul className="list__footer--item">
            <h1 className="nav__item--headline">Subscribe</h1>
            <li>
              <p className="title__enter--mail">
                Enter your email below to be the first to know about new
                collections and product launches
              </p>
            </li>
            <li>
              <input
                type="text"
                placeholder="Your Email"
                className="input__email"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
