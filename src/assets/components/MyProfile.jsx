import { useState, useContext, useEffect } from "react";
import "../css/myprofile.css";
import {
  FiSettings,
  FiHeart,
  FiUser,
  FiBell,
  FiMapPin,
  FiShoppingBag,
  FiEdit,
  FiTrash2,
  FiPhone,
  FiCreditCard,
} from "react-icons/fi";

import { FaUsers } from "react-icons/fa";

import axios from "axios";
import { AuthContext } from "./AuthUtils/AuthContexts";
import { useProducts } from "./Context/ProductContext";
import { useCart } from "./Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [selectedTab, setSelectedTab] = useState("My Orders");
  const { user, login } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const { products } = useProducts();
  const {
    cartItems,
    setCartItems,
    handleIncreaseItem,
    handleDecreaseItem,
    removeFromCart,
    setTotalPay,
    totalPay,
  } = useCart();
  const navigate = useNavigate();
  const [orderUpdate, setOrderUpdate] = useState([]);

  // State cho form chỉnh sửa thông tin
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    pic: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Robert Fox",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
      phone: "(209) 555-0104",
    },
    {
      id: 2,
      name: "John Willions",
      address: "1234 Elm St. Springfield, Illinois 62704",
      phone: "(312) 555-0198",
    },
    {
      id: 3,
      name: "Alexa Johnson",
      address: "789 Main St. Boston, Massachusetts 02108",
      phone: "(617) 555-0174",
    },
  ]);

  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: "**** **** **** 1234",
      holder: "Robert Fox",
      expiry: "12/25",
    },
    {
      id: 2,
      cardNumber: "**** **** **** 5678",
      holder: "John Willions",
      expiry: "06/27",
    },
  ]);

  const handleDeleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.phone) {
      setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
      setNewAddress({ name: "", address: "", phone: "" });
      setShowForm(false);
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== id)
    );
  };

  const handleEditAddress = (id) => {
    const editedAddress = addresses.find((address) => address.id === id);
    if (editedAddress) {
      setNewAddress(editedAddress);
      setShowForm(true);
    }
  };

  const handleUpdateOrder = (order) => {
    console.log("Order Update ", order);
    const newItemsUpdate = order.orderDetails.map((detail) => {
      console.log(detail);
      const product = products.find((p) => p.idProduct === detail.productID);
      return {
        id: product?.id || detail.productID,
        productName: detail.nameProduct,
        unitPrice: detail.unitPrice,
        qty: detail.qty,
        imgProduct: product?.imgProduct || null,
      };
    });

    setOrderUpdate(newItemsUpdate);
    // setCartItems(newItemsUpdate); // hoặc updateLocalStorage(newCartItems

    navigate("/checkout", {
      state: {
        statusOrder: "update",
        orderUpdate: order,
        itemOrderUpdate: newItemsUpdate,
      },
    });
  };

  const handleCancelOrder = (order) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không?"
    );

    if (!confirmed) return;

    axios
      .delete(`http://localhost/orders/cancelOrder/${order.orderID}`)
      .then((res) => {
        console.log(res.data);
        alert("Xóa Đơn Hàng Thành Công ");
        getOrders(); // Hàm reload danh sách đơn hàng
      })
      .catch((err) => {
        console.log("Lỗi khi hủy đơn hàng:", err);
      });
  };

  const handleGrantAdmin = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/api/auth/grant-admin/${userId}`
      );
      const updatedUser = response.data;

      // Cập nhật lại danh sách user trong state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      alert("Cấp Quyền Thành Công !");
    } catch (error) {
      console.error("Lỗi khi cấp quyền admin:", error);
      alert("Không thể cấp quyền cho người dùng này!");
    }
  };
  // Xử lý thay đổi input file ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, pic: file });
    }
  };

  // Xử lý gửi form cập nhật
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    if (editForm.name) formData.append("name", editForm.name);
    if (editForm.email) formData.append("email", editForm.email);
    if (editForm.password) formData.append("password", editForm.password);
    if (editForm.pic) formData.append("pic", editForm.pic);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3004/api/auth/update/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Cập nhật thông tin user trong context
      login(response.data.user);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { name: "Personal Information", icon: <FiUser /> },
    { name: "My Orders", icon: <FiShoppingBag /> },
    { name: "My Wishlists", icon: <FiHeart /> },
    { name: "Manage Addresses", icon: <FiMapPin /> },
    { name: "Saved Cards", icon: <FiCreditCard /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Settings", icon: <FiSettings /> },
    { name: "Users", icon: <FaUsers /> },
  ];

  const getOrders = () => {
    axios.get(`http://localhost/orders/${user.id}`).then((res) => {
      setOrders(res.data);
    });
  };

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;

    const fetchOrders = () => {
      return axios.get(`http://localhost/orders/${user.id}`);
    };

    const fetchUsers = () => {
      return axios.get("http://localhost:3004/api/auth/getAllUser");
    };

    const fetchDataWithRetry = async () => {
      while (retryCount < maxRetries) {
        try {
          // Gọi cùng lúc 2 API
          const [ordersRes, usersRes] = await Promise.all([
            fetchOrders(),
            fetchUsers(),
          ]);

          // Nếu thành công thì set dữ liệu và thoát vòng lặp
          setOrders(ordersRes.data);
          setUsers(usersRes.data);
          setErrorMsg(""); // reset lỗi nếu có trước đó
          return;
        } catch (error) {
          retryCount++;

          if (retryCount < maxRetries) {
            setErrorMsg("Có 1 chút sự cố vui lòng đợi...");
          } else {
            setErrorMsg(
              "Server hiện tại đang có vấn đề. Vui lòng quay lại sau."
            );
            return;
          }
          // đợi 1 giây trước khi thử lại
          await new Promise((res) => setTimeout(res, 3000));
        }
      }
    };

    fetchDataWithRetry();
  }, []);

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>My Profile</h2>
        <div className="profile-picture">
          <img src={user.pic} alt="Profile" />
          <button className="change-photo">
            <FiUser />
          </button>
        </div>
        <ul>
          {menuItems
            .filter((item) => item.name !== "Users" || user.isAdmin)
            .map((item) => (
              <li
                key={item.name}
                className={`menu-item ${
                  selectedTab === item.name ? "active" : ""
                }`}
                onClick={() => setSelectedTab(item.name)}
              >
                <span className="icon">{item.icon}</span>
                {item.name}
              </li>
            ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {/* Edit Profile */}
        {selectedTab === "Personal Information" && (
          <div className="personal-info">
            <h2>Personal Information</h2>
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "1rem" }}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div style={{ color: "green", marginBottom: "1rem" }}>
                {successMessage}
              </div>
            )}
            <form onSubmit={handleUpdateProfile} className="edit-profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Password </label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm({ ...editForm, password: e.target.value })
                  }
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {editForm.pic && (
                  <img
                    src={URL.createObjectURL(editForm.pic)}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "10px",
                    }}
                  />
                )}
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        )}

        {/* Các phần còn lại giữ nguyên */}
        {selectedTab === "Manage Addresses" && (
          <div className="manage-addresses">
            <button className="add-address" onClick={() => setShowForm(true)}>
              + Add New Address
            </button>
            {showForm && (
              <div className="address-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                />
                <button onClick={handleAddAddress}>Save</button>
              </div>
            )}
            <div className="address-list">
              {addresses.map((item) => (
                <div className="address-item" key={item.id}>
                  <div className="address-info">
                    <h3>{item.name}</h3>
                    <p>{item.address}</p>
                    <p>
                      <FiPhone /> {item.phone}
                    </p>
                  </div>
                  <div className="address-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditAddress(item.id)}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteAddress(item.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "Saved Cards" && (
          <div className="saved-cards">
            <h2>Saved Cards</h2>
            <div className="card-list">
              {cards.map((card) => (
                <div className="card-item" key={card.id}>
                  <div className="card-left">
                    <img
                      src="https://th.bing.com/th/id/OIP.RHG1AoZg4uAfq0vXKGwWUQHaE8?rs=1&pid=ImgDetMain"
                      alt="Card"
                      className="card-image"
                    />
                  </div>
                  <div className="card-info">
                    <p>
                      <FiCreditCard /> {card.cardNumber}
                    </p>
                    <p>Holder: {card.holder}</p>
                    <p>Expiry: {card.expiry}</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "Settings" && (
          <div className="settings">
            <div className="setting-item">
              <div>
                <h3>Appearance</h3>
                <p>Customize how your theme looks on your device</p>
              </div>
              <select>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            <div className="setting-item">
              <div>
                <h3>Language</h3>
                <p>Select your language</p>
              </div>
              <select>
                <option>English</option>
                <option>Vietnamese</option>
              </select>
            </div>

            <div className="setting-item">
              <div>
                <h3>Two-factor Authentication</h3>
                <p>Keep your account secure by enabling 2FA via mail</p>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <h3>Push Notifications</h3>
                <p>Receive push notification</p>
              </div>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <h3>Desktop Notification</h3>
                <p>Receive push notification in desktop</p>
              </div>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive email notification</p>
              </div>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        )}

        {selectedTab === "Users" && user.isAdmin && (
          <div className="user-list-container">
            <h2>Danh sách người dùng</h2>
            <div className="user-list-scroll">
              {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
              {users.map((user, index) => (
                <div className="user-card" key={index}>
                  <img src={user.pic} alt={user.name} className="user-avatar" />
                  <div className="user-info">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
                    </p>

                    {!user.isAdmin && (
                      <button
                        className="grant-button"
                        onClick={() => handleGrantAdmin(user._id)}
                      >
                        Cấp quyền
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "My Orders" && (
          <div>
            <div className="scroll-area">
              <div className="orders-container">
                {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
                {orders.map((order) => (
                  <div key={order.orderID} className="order-card">
                    <div className="order-header">
                      <div className="order__header--info">
                        <p>
                          <strong>Ngày Đặt Hàng:</strong>{" "}
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Tổng Tiền :</strong>{" "}
                          {order.total.toLocaleString()} VND
                        </p>
                        <p>
                          <strong>Status:</strong> {order.status}
                        </p>
                      </div>

                      <div className="order__btn--process">
                        {order.status === "PENDING" &&
                          (() => {
                            const orderDate = new Date(order.orderDate);
                            const now = new Date();
                            const timeDiff = now - orderDate;
                            const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <button
                                  className="btn--process payment-btn"
                                  onClick={() => handleUpdateOrder(order)}
                                >
                                  Thanh Toán
                                </button>
                                {daysDiff <= 3 && (
                                  <button
                                    className="btn--process cancel-btn"
                                    onClick={() => handleCancelOrder(order)}
                                  >
                                    Cancel Order
                                  </button>
                                )}
                              </div>
                            );
                          })()}
                      </div>
                    </div>

                    {order.orderDetails.map((item) => {
                      const product = products.find(
                        (p) => p.idProduct === item.productID
                      );

                      return (
                        <div
                          key={item.idOrderDetails}
                          className="order-item"
                          style={{ display: "flex", marginBottom: "10px" }}
                        >
                          {product ? (
                            <img
                              src={product.imgProduct}
                              alt={item.nameProduct}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                marginRight: "10px",
                                borderRadius: "5px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "80px",
                                height: "80px",
                                background: "#eee",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <div>
                            <p>
                              <strong>{item.nameProduct}</strong>
                            </p>
                            <p>
                              Qty: {item.qty} | Unit Price:{" "}
                              {item.unitPrice.toLocaleString()} VND
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {![
          "Personal Information",
          "Manage Addresses",
          "Saved Cards",
          "Settings",
          "My Orders",
          "My Wishlists",
          "Notifications",
          user.isAdmin && "Users",
        ].includes(selectedTab) && (
          <div className="default-content">
            <h2>{selectedTab}</h2>
            <p>Content for {selectedTab} will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
