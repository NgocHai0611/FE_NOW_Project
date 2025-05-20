import React, { useState, useEffect } from "react";
import "../css/managementproduct.css";
import axios from "axios";

export default function ManagementProduct() {
  const [product, setProduct] = useState({
    idProduct: "",
    productName: "",
    unitPrice: "",
    desc: "",
    size: "",
    qtyStock: "",
    imgProduct: null,
  });
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    // Đóng modal bằng phím Esc
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/listProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Error fetching products");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, imgProduct: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("idProduct", product.idProduct);
    formData.append("productName", product.productName);
    formData.append("unitPrice", product.unitPrice);
    formData.append("desc", product.desc);
    formData.append("size", product.size);
    formData.append("qtyStock", product.qtyStock);
    if (product.imgProduct) {
      formData.append("imgProduct", product.imgProduct);
    }

    const url = isEditing
      ? `http://localhost:3001/updateProduct/${product.idProduct}`
      : "http://localhost:3001/addProduct";
    const method = isEditing ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        isEditing
          ? "Cập nhật sản phẩm thành công!"
          : "Thêm sản phẩm thành công!"
      );
      setProduct({
        idProduct: "",
        productName: "",
        unitPrice: "",
        desc: "",
        size: "",
        qtyStock: "",
        imgProduct: null,
      });
      setPreviewImage(null);
      setIsEditing(false);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error processing product:", error);
      setErrorMessage(error.response?.data?.error || "Error processing product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (prod) => {
    setProduct({
      idProduct: prod.idProduct,
      productName: prod.productName,
      unitPrice: prod.unitPrice,
      desc: prod.desc,
      size: prod.size,
      qtyStock: prod.qtyStock,
      imgProduct: null, // Không cần tải lại ảnh cũ
    });
    setPreviewImage(prod.imgProduct);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (idProduct) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await axios.delete(`http://localhost:3001/deleteProduct/${idProduct}`);
        alert(response.data.message || "Xóa sản phẩm thành công!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        const errorMsg = error.response?.data?.error || "Không thể xóa sản phẩm. Vui lòng thử lại.";
        setErrorMessage(errorMsg);
      }
    }
  };

  const openModal = () => {
    setProduct({
      idProduct: "",
      productName: "",
      unitPrice: "",
      desc: "",
      size: "",
      qtyStock: "",
      imgProduct: null,
    });
    setPreviewImage(null);
    setIsEditing(false);
    setErrorMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProduct({
      idProduct: "",
      productName: "",
      unitPrice: "",
      desc: "",
      size: "",
      qtyStock: "",
      imgProduct: null,
    });
    setPreviewImage(null);
    setIsEditing(false);
    setErrorMessage("");
  };

  return (
    <div className="home_container">
      <div className="table_container">
        <div className="table_header">
          <h2>Danh sách sản phẩm</h2>
          <button className="add_product_btn" onClick={openModal}>
            Thêm sản phẩm
          </button>
        </div>
        {errorMessage && (
          <div className="error_message">{errorMessage}</div>
        )}
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Kích thước</th>
              <th>Tồn kho</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.idProduct}>
                <td>
                  <img
                    src={prod.imgProduct}
                    alt={prod.productName}
                    width="50"
                  />
                </td>
                <td>{prod.idProduct}</td>
                <td>{prod.productName}</td>
                <td>{prod.unitPrice.toLocaleString()} VND</td>
                <td>{prod.desc}</td>
                <td>{prod.size}</td>
                <td>{prod.qtyStock}</td>
                <td>
                  <button className="edit_btn" onClick={() => handleEdit(prod)}>
                    Sửa
                  </button>
                  <button
                    className="delete_btn"
                    onClick={() => handleDelete(prod.idProduct)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={`modal ${showModal ? "show" : ""}`}>
          <div className="modal_content">
            <span className="close_btn" onClick={closeModal}>
              ×
            </span>
            <h2>{isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Mã sản phẩm</label>
              <input
                type="text"
                name="idProduct"
                value={product.idProduct}
                onChange={handleChange}
                required
                disabled={isEditing}
              />

              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                required
              />

              <label>Giá</label>
              <input
                type="number"
                name="unitPrice"
                value={product.unitPrice}
                onChange={handleChange}
                required
                min="0"
              />

              <label>Mô tả</label>
              <textarea
                name="desc"
                value={product.desc}
                onChange={handleChange}
                required
              />

              <label>Kích thước</label>
              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
                required
              />

              <label>Số lượng tồn kho</label>
              <input
                type="number"
                name="qtyStock"
                value={product.qtyStock}
                onChange={handleChange}
                required
                min="0"
              />

              <label>Hình ảnh</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!isEditing}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview_image"
                />
              )}

              {errorMessage && (
                <div className="error_message">{errorMessage}</div>
              )}

              <div className="form_buttons">
                <button
                  type="button"
                  className="cancel_btn"
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="submit_btn"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Đang xử lý..."
                    : isEditing
                    ? "Cập nhật"
                    : "Thêm sản phẩm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}