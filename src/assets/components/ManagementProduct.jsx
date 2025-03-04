import React, { useState, useEffect } from "react";
import '../css/managementproduct.css';

export default function ManagementProduct() {
  const [product, setProduct] = useState({
    idProduct: "",
    productName: "",
    unitPrice: "",
    desc: "",
    size: "",
    imgProduct: "",
  });

  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:3001/listProduct")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:3001/updateProduct/${product.idProduct}`
      : "http://localhost:3001/addProduct";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert(isEditing ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm thành công!");
        setProduct({
          idProduct: "",
          productName: "",
          unitPrice: "",
          desc: "",
          size: "",
          imgProduct: "",
        });
        setIsEditing(false);
        fetchProducts();
      } else {
        alert("Lỗi khi thêm/cập nhật sản phẩm.");
      }
    } catch (error) {
      console.error("Error processing product:", error);
      alert("Lỗi kết nối tới server.");
    }
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setIsEditing(true);
  };

  const handleDelete = async (idProduct) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      try {
        const response = await fetch(`http://localhost:3001/deleteProduct/${idProduct}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Xoá sản phẩm thành công!");
          fetchProducts();
        } else {
          alert("Lỗi khi xoá sản phẩm.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Lỗi kết nối tới server.");
      }
    }
  };

  return (
    <div className="home_container">
      <div className="form_container">
        <h2>{isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Mã sản phẩm</label>
          <input type="text" name="idProduct" value={product.idProduct} onChange={handleChange} required disabled={isEditing} />

          <label>Tên sản phẩm</label>
          <input type="text" name="productName" value={product.productName} onChange={handleChange} required />

          <label>Giá</label>
          <input type="number" name="unitPrice" value={product.unitPrice} onChange={handleChange} required />

          <label>Mô tả</label>
          <textarea name="desc" value={product.desc} onChange={handleChange} required />

          <label>Kích thước</label>
          <textarea name="size" value={product.size} onChange={handleChange} required />

          <label>Hình ảnh (URL)</label>
          <input type="text" name="imgProduct" value={product.imgProduct} onChange={handleChange} required />

          <div className="form_buttons">
            <button type="button" className="cancel_btn" onClick={() => {
              setProduct({ idProduct: "", productName: "", unitPrice: "", desc: "", size: "", imgProduct: "" });
              setIsEditing(false);
            }}>Hủy</button>
            <button type="submit" className="submit_btn">{isEditing ? "Cập nhật" : "Thêm sản phẩm"}</button>
          </div>
        </form>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="table_container">
        <h2>Danh sách sản phẩm</h2>
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Kích thước</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.idProduct}>
                <td><img src={prod.imgProduct} alt={prod.productName} width="50" /></td>
                <td>{prod.idProduct}</td>
                <td>{prod.productName}</td>
                <td>${prod.unitPrice.toFixed(2)}</td>
                <td>{prod.desc}</td>
                <td>{prod.size}</td>
                <td>
                  <button className="edit_btn" onClick={() => handleEdit(prod)}>Sửa</button>
                  <button className="delete_btn" onClick={() => handleDelete(prod.idProduct)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
