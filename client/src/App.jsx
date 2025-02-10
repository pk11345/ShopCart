import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import ProductPage from "./pages/ProductPage";
import axios from "axios";
import CartPage from "./pages/CartPage";

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
