import { Routes, Route } from "react-router-dom";

//mport CheckoutPage from "./pages/Checkout/CheckoutPage";
//import ConfirmationPage from "./pages/Confirmation/ConfirmationPage";

import "./App.css";

// Pages
import { Home } from "./pages/Home/Home";
import MenuPage from "./pages/Menu/MenuPage";
import CartPage from "./pages/Cart/CartPage";
import { ReceiptPage } from "./pages/Receipt/ReceiptPage";
import AboutPage from "./pages/About/AboutPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginForm from "./pages/Login/LoginForm";
import ProfilePage from "./pages/Profile/ProfilePage";
import PaymentPage from "./pages/Payment/PaymentPage";
import CardPaymentPage from "./pages/Payment/CardPaymentPage";
import SwishPage from "./pages/Payment/SwishPage";
import KlarnaPage from "./pages/Payment/KlarnaPage";
import ConfirmationPage from "./pages/Confirmation/ConfirmationPage";

// Layout
import { BottomNav } from "./components/layout/BottomNav";

function App() {
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
          <Route path="/profile" element={<ProfilePage />} />
           {/* Payment routes */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/card" element={<CardPaymentPage />} />
          <Route path="/payment/swish" element={<SwishPage />} />
          <Route path="/payment/klarna" element={<KlarnaPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
