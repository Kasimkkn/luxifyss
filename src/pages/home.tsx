import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader.tsx";
import ProductCard from "../components/product-card.tsx";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import Footer from "../components/footer.tsx";
import { IoIosPricetags } from "react-icons/io";
import { MdAllInclusive  } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";

import arrowImg from '../assets/images/arrow.jpeg'
import { server } from "../redux/store.ts";
const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <section className="home">
      <div className="offer-box">
        <div className="offer-content">
          <h2>
            Winter <span>Collection</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            molestiae iste natus veniam. Corrupti, inventore.
          </p>
          <Link className="linkBtn" to={"/search"}>
            Buy now
          </Link>

          <div className="offer-box-popularity">
            <span>
              <p>90k+</p>
              <p>Collection</p>
            </span>
            <span>
              <p>100k+</p>
              <p>Products</p>
            </span>
          </div>
        </div>
        <div className="offer-image">
          <img src={`${server}/${data?.products[0]?.photo}`} alt="" />
          <div className="arrow-box">
            <img src={arrowImg} alt="" />
          </div>
          <div className="offer-review-box">
            <span>4.9 | ⭐⭐⭐⭐⭐</span>
            <p>200K+ TotalReview</p>
          </div>
        </div>
      </div>

    
      <h1>
        New Arrivals
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="100vw" length={7} />
        ) : (
          data?.products.map((i: { _id: string ; name: string; price: number; color: string; photo: string; }) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              color={i?.color}
              photo={i.photo}
            />
          ))
        )}
      </main>

      <div className="home-about-box">
        <div className="home-aboutimage" style={{ background:`linear-gradient(to bottom,${data?.products[2]?.color},white` }}>
          <img src={`${server}/${data?.products[2]?.photo}`} alt="" />
        </div>
        <div className="home-about-content">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            molestiae iste natus veniam.Lorem ipsum dolor
          </p>
          <div className="home-about-box-popularity">
            <span>
              <div className="icons">
                <MdAllInclusive />
              </div>
              <div className="description">
                <span>Best Qaultiy Shoes</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  velit a sapiente iusto voluptate esse!
                </p>
              </div>
            </span>
            <span>
              <div className="icons">
                <IoIosPricetags />
              </div>
              <div className="description">
                <span>Best Qaultiy Shoes</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  velit a sapiente iusto voluptate esse!
                </p>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div className="popular-products-box">
  <div className="popular-products">
    <div className="popular-content">
      <h2>Discover the Unmatched Features of Our Latest & Trending Products</h2>
      <div className="popular-box">
        <span>
          <div className="icons">
            <TbPremiumRights/>
          </div>
          <div className="description">
            <span>Premium Quality Shoes</span>
            <p>
              Elevate your style with our collection of premium quality shoes.
              Crafted with precision and comfort in mind, our shoes redefine
              fashion and functionality.
            </p>
          </div>
        </span>
        <span>
          <div className="icons">
            <MdAllInclusive/>
          </div>
          <div className="description">
            <span>All-Inclusive Design</span>
            <p>
              Experience versatility never before with our all-inclusive
              designs. From casual to formal, adapt to your
              lifestyle, ensuring you stay stylish on every occasion.
            </p>
          </div>
        </span>
        <span>
          <div className="icons">
            <IoIosPricetags/>
          </div>
          <div className="description">
            <span>Exclusive Shoe Collection</span>
            <p>
              Indulge in luxury with our exclusive shoe collection. Each pair is
              a testament to exquisite craftsmanship, ensuring you stand out
              with sophistication and style.
            </p>
          </div>
        </span>
      </div>
    </div>
    <div className="popular-image">
      <div
        className="image-box"
        style={{
          background: `linear-gradient(to top, ${data?.products[1]?.color}, white)`,
        }}
      >
        <img src={`${server}/${data?.products[1]?.photo}`} alt="" />
      </div>
    </div>
  </div>
</div>

      <Footer />
    </section>
  );
};

export default Home;
