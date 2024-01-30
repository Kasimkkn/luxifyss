import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const logoutHandler = async ()=>{
    try {
        await signOut(auth);
        toast.success("SignOut Successfully")
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  }

  return (
    <nav className={`navbar ${showMenu ? 'active' : ''}`}>
    <div className="navbar-toggle" onClick={toggleMenu}>
      <FaBars />
    </div>
    <div className="logo">
      <h2><a href="/">LUXIFY</a></h2>
    </div>
    <ul>
      <Link to={'/'}>Home</Link>
      <Link to={'/search'}>Products</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/orders'}>My Orders</Link>
    </ul>
    <div className="icons">
    <Link to={'/search'}>
        <FaSearch />
      </Link>
      <Link to={'/cart'}>
        <FaShoppingCart />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </div>
  </nav>
);
};

export default Header