import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarModelsPage from "./pages/CarModelsPage";
import CarPartsPage from "./pages/CarPartsPage";

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
      </Routes>
    </Router>
  );
}

export default App;
