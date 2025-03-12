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
import { AuthProvider } from "../src/assets/components/AuthUtils/AuthContexts";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://6494e6aeb08e17c91791736d.mockapi.io/api/book/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="login" />} />
              <Route path="login" element={<Auth />} />

<<<<<<< HEAD
              <Route path="dashboard" element={<Home />} />
              <Route path="managementproduct" element={<ManagementProduct />} />
              <Route path="myprofile" element={<MyProfile />} />

              <Route path="dashboard" element={<Home products={products} />} />
              <Route
                path="/product/:id"
                element={<ProductDetail products={products} />}
              />
            </Route>
          </Routes>
          <Footer />
=======
            <Route path="dashboard" element={<Home />} />
            <Route path="managementproduct" element={<ManagementProduct />} />
            <Route path="myprofile" element={<MyProfile />} />
<<<<<<< HEAD
=======
            <Route path="checkout" element={<CheckOut />} />
            <Route path="prev" element={<Preview />} />

>>>>>>> a2358fb6473c7380920e78839b278449e616e96f
            <Route path="dashboard" element={<Home products={products} />} />
            <Route
              path="/product/:id"
              element={<ProductDetail products={products} />}/>
             <Route path="shoppingcart" element={<ShoppingCart />} />
          </Route>
        </Routes>
        <Footer />
>>>>>>> a3d0deb0ab4411643065510b59b4112f4f6277d8
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
