import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Sửa "react-router" thành "react-router-dom"
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Auth from "../components/Login";
import Home from "../components/Home";
import CheckOut from "../components/CheckOut";
import ProductDetail from "../components/ProductDetail";
import ShoppingCart from "../components/ShoppingCart";
import { useEffect, useState } from "react";

import ManagementProduct from "../components/ManagementProduct";
import MyProfile from "../components/MyProfile";
import Preview from "../components/Preview";

// Context
import { AuthProvider } from "../components/AuthUtils/AuthContexts";
import { CartProvider } from "../components/Context/CartContext";
import { ProductsProvider } from "../components/Context/ProductContext";

// Payment
import PaymentProcess from "../components/Payments/Payment";
import PaymentSuccess from "../components/Payments/PaymentSuccess";
import PaymentFail from "../components/Payments/PaymentFail";
import CheckoutTest from "../components/Payments/CheckOutTest";

// Thống kê
import ThongKe from "../components/ThongKe";
//Route
import ProtectedRoute from "../components/ProtectedRoute/protectedRoute";

function LayoutRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/managementproduct" element={<ManagementProduct />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/checkoutTest" element={<CheckoutTest />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/prev" element={<Preview />} />
        <Route path="/paymentProccess" element={<PaymentProcess />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/paymentFail" element={<PaymentFail />} />
        <Route path="/thong-ke" element={<ThongKe />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default LayoutRoutes;
