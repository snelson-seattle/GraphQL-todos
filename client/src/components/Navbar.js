import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">todolist</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
        &nbsp;/&nbsp;
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
