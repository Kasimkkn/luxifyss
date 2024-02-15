import { useParams } from "react-router-dom";
import { useSingleProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/Types";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const [size, setSize] = useState(5);
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isLoading, isError } = useSingleProductDetailsQuery(params.id!);

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    isLoading ? (
      <Skeleton length={20} />
    ) : (
      <div className="product-details" style={{ background: `linear-gradient(to left,${data?.product.color} -51%,black` }}>
        <div className="product-images">
          <Slider {...settings}>
            {data?.product.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`${data?.product.name} - ${index}`} />
            ))}
          </Slider>
        </div>
        <div className="product-description">
          <h1>{data?.product.name}</h1>
          <span><del>1499</del> ₹{data?.product.price}</span>
          <p>{data?.product.description}</p>
          <select name="size" value={size} onChange={(e) => setSize(Number(e.target.value))}>
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
            name: data?.product.name || "",
            photo: data?.product.photos[0] || "", // Use the first photo as the default photo
            stock: data?.product.stock || 0,
            size: size || 8,
            quantity: 1,
          })}>Add to cart</button>
        </div>
      </div>
    )
  );
}

export default ProductDetails;
