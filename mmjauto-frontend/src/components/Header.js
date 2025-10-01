import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/carmodels">Car Models</Link> |{" "}
      <Link to="/carparts">Car Parts</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Header;
