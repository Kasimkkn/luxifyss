import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "../types/Types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  const words = name.split(" ");
  const limitedName = words.slice(0, 6).join(" ");
    return (
    <div className="cart-item">
      <div className="cart-item-img">
      <img src={`${photo}`} alt={name} loading="lazy"/>
      </div>
      <article>
        <Link to={`/product/${productId}`}>{limitedName}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;