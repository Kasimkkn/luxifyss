import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/Types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("SignOut Successfully");
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className={`navbar ${showMenu ? "active" : ""}`}>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className="logo">
        <h2>
          <Link to="/">LUXIFY</Link>
        </h2>
      </div>
      <ul>
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>Products</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/orders"}>Orders</Link>
        {user?._id && user.role === "admin" && (
          <Link to="/admin/dashboard">Admin</Link>
        )}
      </ul>
      <div className="icons">
        <Link to={"/search"}>
          <FaSearch />
        </Link>
        <Link to={"/cart"}>
          <FaShoppingCart />
        </Link>

        {user?._id ? (
          <>
            <button onClick={logoutHandler}>
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to={"/login"}>
            <FaUser />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
