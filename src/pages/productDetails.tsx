import { useParams } from "react-router-dom"
import { useSingleProductDetailsQuery } from "../redux/api/productAPI";
import { server } from "../redux/store";
import {  Skeleton} from "../components/loader";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/Types";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params   = useParams();
  const { data, isLoading,isError } = useSingleProductDetailsQuery(params.id!);
  console.log(data?.product)
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));

    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    isLoading ? 
      <Skeleton length={20} /> : 
      <div className="product-details" style={{ background:`linear-gradient(to left,${data?.product.color} -51%,#171717 70%` }}>
        <div className="product-images">
          <img src={`${server}/${data?.product.photo}`} alt="" />
        </div>
        <div className="product-description">
          <h1>{data?.product.name}</h1>
          <span><del>1499</del> ₹{data?.product.price}</span>
          <p>{data?.product.description}</p>
          <select name="size" value="size" >
            <option value="0">Select Size</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          <h5>{data?.product.category}</h5>
          
          <button onClick={() => addToCartHandler({
            productId: params.id || "",
            price: data?.product.price || 0,
            name: data?.product.name ||"",
            photo: data?.product.photo || "",
            stock: data?.product.stock || 0,
            quantity: 1,
          })}>Add to cart</button>
        </div>
      </div>
  );
}

export default ProductDetails