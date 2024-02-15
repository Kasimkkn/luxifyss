import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photos: string[];
  name: string;
  color: string;
  price: number;
};

const ProductCard = ({
  productId,
  price,
  name,
  photos,
  color
}: ProductsProps) => {
  const words = name.split(" ");
  const limitedName = words.slice(0, 3).join(" ");
  return (
    <Link to={`/product/${productId}`} className="product-card" style={{ background:`linear-gradient(to bottom,${color},white` }}>
        <img src={photos[0]} alt={name} loading="lazy" />
      <p>{limitedName}...</p>
      <span>₹{price}</span>

    </Link>
  );
};

export default ProductCard;
