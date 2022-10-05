import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <h1>
            todo<span>list</span>
          </h1>
        </Link>

        {user ? (
          <p onClick={onLogout} style={{ cursor: "pointer" }}>
            Logout
          </p>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
