import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../types/Types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

type ProductsProps = {
  productId: string;
  photos: string[];
  name: string;
  color: string;
  stock: number;
  price: number;
  description: string;
};

const ProductCard = ({
  productId,
  price,
  name,
  photos,
  color,
  stock,
  description,
}: ProductsProps) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const cartItem: CartItem = {
      productId,
      photo: photos[0],
      name,
      price,
      stock: stock,
      size: 6,
      quantity: 1,
    };
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const words = name.split(" ");
  const limitedName = words.slice(0, 2).join(" ");

  const descwords = description.split(" ");
  const limiteddesc = descwords.slice(0, 4).join(" ");
  return (
    <div className="product-card">
      <Link to={`/product/${productId}`}
        style={{ background: `linear-gradient(to bottom,${color},white` }}
        className="image-div"
      >
        <img src={photos[0]} alt={name} loading="lazy" />
      </Link>
      <div className="content-div">
        <div className="content1">
          <p>{limitedName}...</p>
          <span>₹{price}</span>
        </div>

        <div className="content2">
          <p>{limiteddesc}...</p>
          <button
            onClick={(e) => {
              e.isDefaultPrevented();
              addToCartHandler();
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
