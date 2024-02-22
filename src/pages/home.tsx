import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader.tsx";
import ProductCard from "../components/product-card.tsx";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import Footer from "../components/footer.tsx";
import { IoIosPricetags } from "react-icons/io";
import { MdAllInclusive } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import arrowImg from "../assets/images/arrow.png";
import ImageSlider from "../components/imageSlider.tsx";
import { FaRegThumbsUp } from "react-icons/fa";
const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home-container">
      <section className="home">
        <div className="offer-box">
          <div className="offer-content">
            <h2>
              Winter <span>Collection</span>
            </h2>
            <p>
              Step into the season with our winter collection shoes, where
              warmth meets style in every step.
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
            <img
              src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707273814/yirdeipefttoo2zvurq4.png"
              alt="popular"
              loading="lazy"
            />
            <div className="arrow-box">
              <img src={arrowImg} alt="" />
            </div>
            <div className="offer-review-box">
              <span>4.9 | ⭐⭐⭐⭐⭐</span>
              <p>200K+ TotalReview</p>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
        </div>

        <div className="home-about-box">
          <div
            className="home-aboutimage"
            style={{
              background: `linear-gradient(to bottom, brown, white)`,
            }}
          >
            <img
              src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707273827/uefsb56yaokbu8qh8p9d.png"
              alt="aboutImg"
              loading="lazy"
            />
          </div>
          <div className="home-about-content">
            <h2>About Us</h2>
            <p>
              Redefining fashion and functionality with our exclusive collection
              of premium quality shoes for trendsetters like you.
            </p>
            <div className="home-about-box-popularity">
              <span>
                <div className="icons">
                  <MdAllInclusive />
                </div>
                <div className="description">
                  <span>Best Qaultiy Shoes</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste velit a sapiente iusto voluptate esse!
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste velit a sapiente iusto voluptate esse!
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>

        <div className="newArrivals">
          <h1>
            <span>New Arrivals</span>
            <Link to="/search" className="findmore">
              More
            </Link>
          </h1>

          <main>
            {isLoading ? (
              <Skeleton width="100vw" length={7} />
            ) : (
              data?.products.map(
                (i: {
                  _id: string;
                  name: string;
                  price: number;
                  color: string;
                  photos: string[];
                  stock: number;
                  description: string;
                }) => (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    price={i.price}
                    color={i?.color}
                   stock = {i?.stock}   
                    photos={i?.photos}
                    description={i?.description}
                  />
                )
              )
            )}
          </main>
        </div>
        <ImageSlider />
        
        <div className="popular-products">
          <div className="popular-content">
            <h2>Latest & Trending Products</h2>
            <div className="popular-box">
              <span>
                <div className="icons">
                  <TbPremiumRights className="red" />
                </div>
                <div className="description">
                  <span>Premium Quality Shoes</span>
                </div>
              </span>
              <span>
                <div className="icons">
                  <MdAllInclusive className="green" />
                </div>
                <div className="description">
                  <span>All-Inclusive Design</span>
                </div>
              </span>
              <span>
                <div className="icons">
                  <IoIosPricetags className="blue" />
                </div>
                <div className="description">
                  <span>Exclusive Shoe Collection</span>
                </div>
              </span>
              <span>
                <div className="icons">
                  <FaRegThumbsUp className="yellow" />
                </div>
                <div className="description">
                  <span>Best Qaulity Collection</span>
                </div>
              </span>
            </div>
          </div>
          <div className="popular-images">
            <div className="small-images">
              <div className="image-box" style={{background:"linear-gradient(45deg , #995130 ,white)"}}>
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707273827/uefsb56yaokbu8qh8p9d.png"
                  alt="smallImg1"
                  loading="lazy"
                />
              </div>
              <div className="image-box" style={{background:"linear-gradient(45deg , #061C0F ,white)"}}>
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1708055564/products/tlklunsunrn2kwodl5qx.png"
                  alt="smallImg2"
                  loading="lazy"
                />
              </div>
              <div className="image-box" style={{background:"linear-gradient(45deg , #780D0D ,white)"}}>
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707273814/yirdeipefttoo2zvurq4.png"
                  alt="smallImg3"
                  loading="lazy"
                />
              </div>
              <div className="image-box" style={{background:"linear-gradient(45deg , #D1BCD0 ,black)"}}>
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707274074/kwf1rzngwhxpto3slllx.png"
                  alt="smallImg4"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="main-image">
              <div
                className="image-box"
                style={{
                  background: `linear-gradient(to top, #E66D12, white)`,
                  borderRadius: "15px"
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1708535415/products/tn0ejyctexes3deo7y2h.png"
                  alt="popularImg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
};

export default Home;
