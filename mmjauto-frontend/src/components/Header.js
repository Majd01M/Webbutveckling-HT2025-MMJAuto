import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "./Header.css";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirect to home
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="sliding-text">Welcome to MMJAuto</div>

      <nav style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Home</Link>
        <Link to="/carmodels" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Car Models</Link>
        <Link to="/carparts" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Car Parts</Link>

        {user && user.role === "customer" && (
          <Link to="/wishlist" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
            My Wishlist
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
            Admin Dashboard
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
          </>
        ) : (
          <div ref={dropdownRef} style={{ position: "relative" }}>
            {/* Username button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {user.name} ▾
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "white",
                  color: "black",
                  minWidth: "120px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                  borderRadius: "5px",
                  zIndex: 1001,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}