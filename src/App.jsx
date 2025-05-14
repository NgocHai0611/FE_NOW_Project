import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Sửa "react-router" thành "react-router-dom"
import { Navigate } from "react-router-dom";

import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import Auth from "./assets/components/Login";
import Home from "./assets/components/Home";
import CheckOut from "./assets/components/CheckOut";
import ProductDetail from "./assets/components/ProductDetail";
import ShoppingCart from "./assets/components/ShoppingCart";
import { useEffect, useState } from "react";

import ManagementProduct from "./assets/components/ManagementProduct";
import MyProfile from "./assets/components/MyProfile";
import Preview from "./assets/components/Preview";

// Context
import { AuthProvider } from "../src/assets/components/AuthUtils/AuthContexts";
import { CartProvider } from "./assets/components/Context/CartContext";
import { ProductsProvider } from "./assets/components/Context/ProductContext";

// Payment
import PaymentProcess from "./assets/components/Payments/Payment";
import PaymentSuccess from "./assets/components/Payments/PaymentSuccess";
import PaymentFail from "./assets/components/Payments/PaymentFail";
import CheckoutTest from "./assets/components/Payments/CheckOutTest";


// Thống kê
import ThongKe from "./assets/components/ThongKe";
//Route
import ProtectedRoute from "./assets/components/ProtectedRoute/protectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ProductsProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route
                  path="/managementproduct"
                  element={<ManagementProduct />}
                />
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
              <Footer />
            </ProductsProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
