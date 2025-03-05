import { useState } from "react";
import "../css/myprofile.css"; // Import file CSS
import { FiSettings, FiHeart, FiUser, FiBell, FiMapPin, FiShoppingBag } from "react-icons/fi";

export default function MyProfile() {
  const [selectedTab, setSelectedTab] = useState("My Orders");

  const menuItems = [
    { name: "Personal Information", icon: <FiUser /> },
    { name: "My Orders", icon: <FiShoppingBag /> },
    { name: "My Wishlists", icon: <FiHeart /> },
    { name: "Manage Addresses", icon: <FiMapPin /> },
    { name: "Saved Cards", icon: <FiHeart /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>My Profile</h2>

        {/* Khung ảnh profile */}
        <div className="profile-picture">
          <img src="https://via.placeholder.com/100" alt="Profile" />
        </div>

        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`menu-item ${selectedTab === item.name ? "active" : ""}`}
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
        <h2>{selectedTab}</h2>
        <p>Content for {selectedTab} will appear here.</p>
      </div>
    </div>
  );
}
