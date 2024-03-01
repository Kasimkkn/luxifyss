import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import {  useState } from "react";
import { User } from "../types/Types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems);
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
      animate={{ y: 0, opacity: 1, transition: { duration: 1 } }} 
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
      <motion.ul>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to={"/"} onClick={() => setShowMenu(false)}>Home</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to={"/search"} onClick={() => setShowMenu(false)}>Products</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to={"/about"} onClick={() => setShowMenu(false)}>About</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to={"/orders"} onClick={() => setShowMenu(false)}>Orders</Link>
        </motion.li>
        {user?._id && user.role === "admin" && (
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/admin/dashboard" onClick={() => setShowMenu(false)}>Admin</Link>
          </motion.li>
        )}
      </motion.ul>
      <div className="icons">
        <Link to={"/search"}>
          <FaSearch />
        </Link>
        <Link to={"/cart"}>
          <FaShoppingCart />
          <span className="totalCartItems">{cartItems.length || 0}</span>
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
    </motion.nav>
  );
};

export default Header;
