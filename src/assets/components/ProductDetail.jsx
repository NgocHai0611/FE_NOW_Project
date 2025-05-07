import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/ProductDetail.css";
import "font-awesome/css/font-awesome.min.css";
import { useCart } from "./Context/CartContext";
import { useProducts } from "./Context/ProductContext";
import axios from "axios";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost/products/product/${id}`)
      .then((res) => {
        console.log("Respone tra ve ", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const { addToCart } = useCart();

  // Số lượng hiển thị tạm thời trong component
  const [quantity, setQuantity] = useState(1);

  const handleAddProductToCart = (qtyStock) => {
    addToCart(product, quantity); // Gọi hàm context thêm vào giỏ hàng
    setQuantity(1); // Reset lại về 1
  };

  if (!product) return <div>Không tìm thấy sản phẩm</div>;

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
        <p
          className="product_price"
          style={{ fontSize: 36, width: "50%", marginLeft: 70 }}
        >
          Giá tiền: ${product.unitPrice}
        </p>
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
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="quantity_button"
            >
              -
            </button>
            <span className="quantity_display">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="quantity_button"
            >
              +
            </button>
          </div>
          <button
            className="add_to_cart_button"
            onClick={handleAddProductToCart}
          >
            Add to Cart
          </button>
          <button className="favorite_button">
            <i className="fa fa-heart"></i>
          </button>

          <div>
            <h1>Sản Phẩm Trong Kho Còn: {product.qtyStock}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
