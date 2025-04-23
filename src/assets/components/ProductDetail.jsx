import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Context/CartContext";

export default function ProductDetail({ products }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((item) => item.idProduct === id);

  const { handleIncreaseItem, handleDecreaseItem } = useCart();

  return (
    <div className="product_detail_container">
      <div className="product_images">
        <div className="thumbnail_images">
          <img
            src={product.imgProduct}
            alt={product.productName}
            className="thumbnail"
          />
        </div>
      </div>
      <div className="product_info">
        <h2 className="product_title">{product.productName}</h2>
        <p className="product_price">${product.unitPrice}</p>
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
            <button
              onClick={() => handleDecreaseItem(product.id)}
              className="quantity_button"
            >
              -
            </button>

            <button
              onClick={() => handleIncreaseItem(product)}
              className="quantity_button"
            >
              +
            </button>
          </div>
          <button
            className="add_to_cart_button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button className="favorite_button">
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
