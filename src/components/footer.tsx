
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
         <div className="box box1">
            <h2>LUXIFY</h2>
            <p>The Premium and Trendy Footwear With Unique Style</p>
         </div>

         <div className="box box3">
            <p>Follow Us</p>
            <div>
               <FaGithub />
               <FaInstagram />
               <FaFacebook />
            </div>
         </div>
         <div className="box box4">
            <ul>
               <Link to={'/'}>Home</Link>
               <Link to={'/products'}>Products</Link>
               <Link to={'/about'}>About</Link>
               <Link to={'/orders'}>My Orders</Link>
            </ul>
         </div>
      </footer>
  )
}

export default Footer