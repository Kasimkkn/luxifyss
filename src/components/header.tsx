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
import { motion } from "framer-motion";

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
    <motion.nav
      className={`navbar ${showMenu ? "active" : ""}`}
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: -50, opacity: 0 }} 
    >
      <div className="navbar-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className="logo">
        <h2>
          <Link to="/">LUXIFY</Link>
        </h2>
      </div>
      <ul>
        <motion.li whileHover={{ scale: 1.2 }}>
          <Link to={"/"}>Home</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }}>
          <Link to={"/search"}>Products</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }}>
          <Link to={"/about"}>About</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }}>
          <Link to={"/orders"}>Orders</Link>
        </motion.li>
        {user?._id && user.role === "admin" && (
          <motion.li whileHover={{ scale: 1.2 }}>
            <Link to="/admin/dashboard">Admin</Link>
          </motion.li>
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
          <motion.li whileHover={{ scale: 1.2 }}>
            <Link to={"/login"}>
              <FaUser />
            </Link>
          </motion.li>
        )}
      </div>
    </motion.nav>
  );
};

export default Header;
