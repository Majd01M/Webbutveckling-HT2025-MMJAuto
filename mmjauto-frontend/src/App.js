import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import CarModelsPage from "./pages/CarModelsPage";
import CarPartsPage from "./pages/CarPartsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      {/* Header will show on all pages */}
      <Header />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carmodels" element={<CarModelsPage />} />
        <Route path="/carparts" element={<CarPartsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
