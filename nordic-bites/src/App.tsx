import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home/Home";
//mport CheckoutPage from "./pages/Checkout/CheckoutPage";
//import ConfirmationPage from "./pages/Confirmation/ConfirmationPage";
import "./App.css";

// Pages
import { Home } from "./pages/Home/Home";
import { MenuPage } from "./pages/Menu/MenuPage";
import { CartPage } from "./pages/Cart/CartPage";
import { ReceiptPage } from "./pages/Receipt/ReceiptPage";
import AboutPage from "./pages/About/AboutPage";

// Layout
import { BottomNav } from "./components/layout/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<ReceiptPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menuPage" element={<MenuPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
