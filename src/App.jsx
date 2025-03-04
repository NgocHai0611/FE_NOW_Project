import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Sửa "react-router" thành "react-router-dom"
import { Navigate } from "react-router-dom";

import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import Auth from "./assets/components/Login";
import Home from "./assets/components/Home";
import ManagementProduct from "./assets/components/ManagementProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Auth />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="managementproduct" element={<ManagementProduct />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
