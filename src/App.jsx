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

// Payment
import PaymentProcess from "./assets/components/Payments/Payment";
import PaymentSuccess from "./assets/components/Payments/PaymentSuccess";
import PaymentFail from "./assets/components/Payments/PaymentFail";
import CheckoutTest from "./assets/components/Payments/CheckOutTest";

//Route
import ProtectedRoute from "./assets/components/ProtectedRoute/protectedRoute";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products/listProduct")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Auth />} />
              <Route
                path="/dashboard"
                element={
                    <Home products={products} />
                }
              />
              <Route
                path="/product/:id"
                element={<ProductDetail products={products} />}
              />
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
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
