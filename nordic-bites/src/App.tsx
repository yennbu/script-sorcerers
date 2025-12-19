import { Routes, Route } from "react-router-dom";

import "./App.css";

import { useEffect } from "react";
import { useAuthStore } from "./Store/authStore.tsx";

// Pages
import { Home } from "./pages/Home/Home";
import MenuPage from "./pages/Menu/MenuPage";
import CartPage from "./pages/Cart/CartPage";
import { ReceiptPage } from "./pages/Receipt/ReceiptPage";
import AboutPage from "./pages/About/AboutPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginForm from "./pages/Login/LoginForm";
import PaymentPage from "./pages/Payment/PaymentPage";
import CardPaymentPage from "./pages/Payment/CardPaymentPage";
import SwishPage from "./pages/Payment/SwishPage";
import KlarnaPage from "./pages/Payment/KlarnaPage";
import ConfirmationPage from "./pages/Confirmation/ConfirmationPage";
import Dashboard from "./pages/Admin/Dashboard";

// Layout
import { BottomNav } from "./components/layout/BottomNav";

function App() {
  const restoreSession = useAuthStore(state => state.restoreSession);

  useEffect(() => {
    restoreSession();
  }, []);


  return (
    <div className="app">
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/orders" element={<ReceiptPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loginForm" element={<LoginForm />} />
          {/* Payment routes */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/card" element={<CardPaymentPage />} />
          <Route path="/payment/swish" element={<SwishPage />} />
          <Route path="/payment/klarna" element={<KlarnaPage />} />
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
