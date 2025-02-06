import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ListItem() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // Tối đa 4 sản phẩm/trang

  useEffect(() => {
    axios
      .get("https://6494e6aeb08e17c91791736d.mockapi.io/api/book/product") // Thay bằng API của bạn
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <div
        style={{
          height: "600px",
          overflow: "hidden",
          border: "1px solid #ccc",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        {currentProducts.map((product) => (
          <div
            key={product.id}
            style={{
              height: "150px",
              background: "#f0f0f0",
              marginBottom: "10px",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{product.name}</h3>
              <p>Giá: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nút phân trang */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "8px 12px",
              margin: "0 5px",
              backgroundColor: currentPage === index + 1 ? "#007bff" : "#ddd",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
