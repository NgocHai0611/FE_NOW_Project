import { useState } from "react";
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
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthUtils/AuthContexts";
import { useContext } from "react";

export default function MyProfile() {
  const [selectedTab, setSelectedTab] = useState("My Orders");
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
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

  const menuItems = [
    { name: "Personal Information", icon: <FiUser /> },
    { name: "My Orders", icon: <FiShoppingBag /> },
    { name: "My Wishlists", icon: <FiHeart /> },
    { name: "Manage Addresses", icon: <FiMapPin /> },
    { name: "Saved Cards", icon: <FiCreditCard /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost/orders/${user.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>My Profile</h2>
        <div className="profile-picture">
          <img src="https://via.placeholder.com/100" alt="Profile" />
          <button className="change-photo">
            <FiUser />
          </button>
        </div>
        <ul>
          {menuItems.map((item) => (
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
        {selectedTab === "Personal Information" && (
          <div className="personal-info">
            <div className="header">
              <div className="profile-picture-update">
                <img src="https://via.placeholder.com/100" alt="Profile" />
                <button className="change-photo">Change Photo</button>
              </div>
              <button className="edit-profile">Edit Profile</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="text" placeholder="Email Address" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Address</label>
              <input type="text" placeholder="Address" />
            </div>
          </div>
        )}

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

        {![
          "Personal Information",
          "Manage Addresses",
          "Saved Cards",
          "Settings",
          "My Orders",
          "My Wishlists",
          "Notifications",
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
