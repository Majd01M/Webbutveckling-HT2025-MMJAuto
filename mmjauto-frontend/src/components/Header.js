import { Link } from "react-router-dom";
import "./Header.css"; 

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#1976d2",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <h1 style={{ margin: 0 }}>MMJAuto</h1>

      {/* Sliding text */}
      <div className="sliding-text">
        Welcome to MMJAuto
      </div>

      <nav>
        <Link to="/" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Home</Link>
        <Link to="/carmodels" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Car Models</Link>
        <Link to="/carparts" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Car Parts</Link>
        <Link to="/login" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Login</Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
      </nav>
    </header>
  );
}
