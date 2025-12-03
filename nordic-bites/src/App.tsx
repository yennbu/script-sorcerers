import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutPage from "./pages/About/AboutPage";
import MenuPage from "./pages/Menu/MenuPage";
//import Home from "./pages/Home/Home";
//mport CheckoutPage from "./pages/Checkout/CheckoutPage";
//import ConfirmationPage from "./pages/Confirmation/ConfirmationPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menuPage" element={<MenuPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
