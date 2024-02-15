import { useParams } from "react-router-dom";
import { useSingleProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/loader";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/Types";
import { useState } from "react";

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

  return isLoading ? (
    <Skeleton length={20} />
  ) : (
    <div className="product-details">
      <div className="product-images" >
          {data?.product.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${data?.product.name} - ${index}`}
            />
          ))}
      </div>
      <div className="product-description">
        <h1>{data?.product.name}</h1>
        <h5>{data?.product.category}</h5>
        <span>
          <del>1499</del> ₹{data?.product.price}
        </span>
        <p>
          🚚 Free Delivery Across India<br/>
          💸 Cash on Delivery Option Available<br/>
          👟 Handmade By Expert Artisans<br/>
          🗯️ Extra Padding for Greater Comfort<br/>
          🕶️ Stylish and Elegant Design<br/>
          💨 Breathable Mesh Upper<br/>
          ✨ Light Weight and Comfortable
        </p>
        <div className="sizes-box">
          {[5, 6, 7, 8, 9].map((option) => (
            <span
              className={`size ${option === size ? 'selected' : ''}`}
              key={option}
              onClick={() => setSize(option)}
            >
              {option}
            </span>
          ))}
        </div>
        <table >
          <tbody>
            <tr>
              <td>Material</td>
              <td>Denim / Vegan Leather</td>
            </tr>
            <tr>
              <td>Toe Type</td>
              <td>Round Toe</td>
            </tr>
            <tr>
              <td>Insole</td>
              <td>Comfort Insole</td>
            </tr>
            <tr>
              <td>Sole Material</td>
              <td>Airmax First Sole</td>
            </tr>
            <tr>
              <td>Occasion</td>
              <td>Everyday</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td>3 Months</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() =>
            addToCartHandler({
              productId: params.id || "",
              price: data?.product.price || 0,
              name: data?.product.name || "",
              photo: data?.product.photos[0] || "",
              stock: data?.product.stock || 0,
              size: size || 8,
              quantity: 1,
            })
          }
        >
          Add to cart
        </button>
        <div className="szie-chart">
          <h2>Size Chart</h2>
          <img src="https://cdn.shopify.com/s/files/1/0611/3676/5182/products/SizeChart-TheAurous_5b08ca89-8144-4730-88d3-2500d3ea0c52_480x480.png?v=1655890981" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
