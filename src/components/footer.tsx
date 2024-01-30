
import { Link } from "react-router-dom";
import logo from '../assets/images/logo2.png'
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
         <div className="box box1">
            <img src={logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quasi perferendis saepe ad. Dicta doloremque earum alias id .</p>
         </div>

         <div className="box box2">
            <p>News Letter</p>
            <div>
               <input type="text" placeholder='subscribe now..' />
               <button>subscribe</button>
            </div>
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