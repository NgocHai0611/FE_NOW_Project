import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css";
import "font-awesome/css/font-awesome.min.css";

export default function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1); // Trạng thái cho số lượng

  if (!product) {
    return <div>Product not found</div>;
  }

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  
  return (
    <div className="product_detail_container">
      <div className="product_images">
        <img src={product.img} alt={product.name} className="main_image" />
        <div className="thumbnail_images">
          <img src={product.img} alt={product.name} className="thumbnail" />
          <img src={product.img} alt={product.name} className="thumbnail" />
          <img src={product.img} alt={product.name} className="thumbnail" />
        </div>
      </div>
      <div className="product_info">
        <h2 className="product_title">{product.name}</h2>
        <p className="product_price">${product.price}</p>
        <p className="product_description">{product.desc}</p>

        <div className="product_color">
          <h3>Color</h3>
          <div className="color_options">
            <span
              className="color_option"
              style={{ backgroundColor: "#E15353" }}
            ></span>
            <span
              className="color_option"
              style={{ backgroundColor: "#5553E1" }}
            ></span>
            <span
              className="color_option"
              style={{ backgroundColor: "#E1A053" }}
            ></span>
            <span
              className="color_option"
              style={{ backgroundColor: "#131118" }}
            ></span>
            <span
              className="color_option"
              style={{ backgroundColor: "#A3D139" }}
            ></span>
            <span
              className="color_option"
              style={{ backgroundColor: "#E1D353" }}
            ></span>
          </div>
        </div>

        <div className="product_sizes">
          <h3>Size</h3>
          <div className="sizes">
            <span className="size_option">S</span>
            <span className="size_option">M</span>
            <span className="size_option">L</span>
            <span className="size_option">XL</span>
            <span className="size_option">XXL</span>
          </div>
        </div>

        <div className="action_buttons">
          <div className="quantity_container">
            <button onClick={decreaseQuantity} className="quantity_button">
              -
            </button>
            <span className="quantity_display">{quantity}</span>
            <button onClick={increaseQuantity} className="quantity_button">
              +
            </button>
          </div>
          <button className="add_to_cart_button">Add to Cart</button>
          <button className="favorite_button">
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
