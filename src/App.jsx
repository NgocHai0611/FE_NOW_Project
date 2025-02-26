import { useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import ListItem from "./assets/components/ListItem";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";

import Auth from "./assets/components/Login";
import Home from "./assets/components/Home";


function App() {
 

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Auth />} />
            <Route path="dashboard" element={<Home></Home>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
