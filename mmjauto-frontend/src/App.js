import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarModelsPage from "./pages/CarModelsPage";
import CarPartsPage from "./pages/CarPartsPage";
import AdminPage from "./pages/AdminPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/carmodels" element={<CarModelsPage />} />
        <Route path="/carparts" element={<CarPartsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
