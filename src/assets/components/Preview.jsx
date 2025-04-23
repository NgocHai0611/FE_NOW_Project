import { useState } from "react";
import "../css/preview.css";
import { FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { CiEdit } from "react-icons/ci";
import Modal from "./Modal/Modal";

export default function Preview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hieu Nhan ",
      size: "S",
      price: 100.0,
      quantity: 1,
      image:
        "https://th.bing.com/th/id/OIP.NJJC0T8dYoFsgExhJ5PnzgHaFE?w=213&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      name: "Dai Loc",
      size: "Regular",
      price: 100.0,
      quantity: 1,
      image:
        "https://th.bing.com/th/id/R.be354a4580086fc5178de6e7b47435e7?rik=s3Wm8DE1hUq09g&riu=http%3a%2f%2fwww.john2031.com%2fpiper_j4_cub_coupe%2fg-afwh.jpg&ehk=vJXmOK9KFvKrXfbiGvOIJtXvC%2flbRBXqf1nUW6L5OJI%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      name: "Hong Danh",
      size: "M",
      price: 100.0,
      quantity: 1,
      image:
        "https://th.bing.com/th/id/OIP.vq9wmb2c_ZW8jChPDs4angHaFE?w=1024&h=702&rs=1&pid=ImgDetMain",
    },
  ]);

  const [address, setAddress] = useState({
    id: 1,
    addressCustomer: "12/21/21 Tan Hung Thuan Quan 12 HCM",
    customerName: "Ngoc Hai",
  });

  const deliveryCharge = 5;

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "FLAT50") {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const handleQuantityChange = (id, change) => {
    setProducts((prevProducts) => {
      return prevProducts
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + change }
            : product
        )
        .filter((product) => product.quantity > 0);
    });
  };

  const handleRemoveProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const grandTotal = subtotal - discount + deliveryCharge;

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="checkout_container">
      <h2 className="checkout_title">Review Your Order</h2>
      <p className="estimated_delivery">Ngày giao hàng dự kiến: / / /</p>
      <div className="checkout_content">
        <div className="checkout_products">
          <div className="product_list">
            {products.map((product) => (
              <div key={product.id} className="product_item">
                <div className="product_info">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product_image"
                  />
                  <div className="product_details">
                    <p className="product_name">{product.name}</p>
                    <p className="product_price">${product.price.toFixed(2)}</p>
                    <p className="product_size">Size: {product.size}</p>
                  </div>
                </div>
                <div className="quantity_control">
                  <button onClick={() => handleQuantityChange(product.id, -1)}>
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>
                    +
                  </button>
                </div>
                <button
                  className="delete_button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <h1>Shipping Address</h1>
          </div>

          <div className="shipping_address--info--container">
            <div className="shipping_address--info">
              <p style={{ fontSize: 20 }}>{address.addressCustomer}</p>
              <p>{address.customerName}</p>
            </div>

            <div className="shipping_address--fix--icon">
              <CiEdit fontSize={30} />
            </div>
          </div>
        </div>

        <div className="checkout_summary">
          <h3 className="subtotal">
            Subtotal <span>${subtotal.toFixed(2)}</span>
          </h3>
          <div className="discount_section">
            <input
              type="text"
              className="discount_input"
              placeholder="Enter Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="apply_button" onClick={handleApplyDiscount}>
              Apply
            </button>
          </div>
          <h3>
            Delivery Charge <span>${deliveryCharge.toFixed(2)}</span>
          </h3>
          <h2 className="total_amount">
            Grand Total <span>${grandTotal.toFixed(2)}</span>
          </h2>
          <button className="checkout_button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Checkout Confirmation</h2>
          <p>Are you sure you want to proceed with the checkout?</p>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={() => alert("Checkout Successful!")}>Confirm</button>
        </Modal>
      </div>
    </div>
  );
}
