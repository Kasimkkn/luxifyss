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
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Typewriter from "../components/Typwriter.tsx";
const Home = () => {
  const offerControls = useAnimation();
  const aboutControls = useAnimation();
  const newArrivalsControls = useAnimation();
  const popularControls = useAnimation();
  const { ref: offerRef, inView: offerInView } = useInView();
  const { ref: aboutRef, inView: aboutInView } = useInView();
  const { ref: newArrivalsRef, inView: newArrivalInView } = useInView();
  const { ref: popularRef, inView: popularInView } = useInView();

  useEffect(() => {
    if (offerInView) {
      offerControls.start("visible");
    }
  }, [offerControls, offerInView]);

  useEffect(() => {
    if (aboutInView) {
      aboutControls.start("visible");
    }
  }, [aboutControls, aboutInView]);

  useEffect(() => {
    if (newArrivalInView) {
      newArrivalsControls.start("visible");
    }
  }, [newArrivalsControls, newArrivalInView]);

  useEffect(() => {
    if (popularInView) {
      popularControls.start("visible");
    }
  }, [popularControls, popularInView]);

  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home-container">
      <motion.section
        className="home"
        initial="hidden"
        animate={offerControls}
        variants={{
          visible: { opacity: 1, transition: { duration: 0.5 } },
          hidden: { opacity: 0 },
        }}
      >
        <motion.div className="offer-box" ref={offerRef}>
          <motion.div
            className="offer-content"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -550 },
            }}
          >
             <Typewriter text="Winter" speed={200} tag="h2"/> <span>Collection</span>
            <Typewriter tag="p" speed={30} text="Step into the season with our winter collection shoes, where warmth meets style in every step." />
            <Link className="linkBtn" to={"/search"}>
              Buy now
            </Link>

            <div className="offer-box-popularity">
              <span>
                <Typewriter tag="p" text="90k+" speed={90}/>
                <Typewriter tag="p" text="Collection" speed={90}/>
              </span>
              <span>
                <Typewriter tag="p" text="100k+" speed={90}/>
                <Typewriter tag="p" text="Products" speed={90}/>
              </span>
            </div>
          </motion.div>
          <motion.div
            className="offer-image"
            variants={{
              visible: { opacity: 1, x: 1 },
              hidden: { opacity: 0, x: -550 },
            }}
          >
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
              <Typewriter tag="p" text="200K+ TotalReview" speed={90}/>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={aboutControls}
          variants={{
            visible: { opacity: 1, transition: { duration: 0.5 } },
            hidden: { opacity: 0 },
          }}
          className="home-about-box"
          ref={aboutRef}
        >
          <motion.div
            variants={{
              visible: { opacity: 1, x: 1 },
              hidden: { opacity: 0, x: -550 },
            }}
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
          </motion.div>
          <motion.div
            className="home-about-content"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -550 },
            }}
          >
            <h2>About Us</h2>
              <Typewriter tag="p" speed={30} text="Redefining fashion and functionality with our exclusive collection of premium quality shoes for trendsetters like you."/>
          
            <div className="home-about-box-popularity">
              <span>
                <div className="icons">
                  <MdAllInclusive />
                </div>
                <div className="description">
                  <span>Best Qaultiy Shoes</span>
    
                   <Typewriter tag="p" speed={30} text="Our shoes are crafted with the finest materials and attention to detail, durability, and style that lasts."/> 

                </div>
              </span>
              <span>
                <div className="icons">
                  <IoIosPricetags />
                </div>
                <div className="description">
                  <span>Best Fabric Used</span>
    
                   <Typewriter tag="p" speed={30} text="We source only the highest quality fabrics for our products, comfort and sustainability in our materials."/> 

                </div>
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={newArrivalsControls}
          variants={{
            visible: { opacity: 1, transition: { duration: 0.5 } },
            hidden: { opacity: 0 },
          }}
          className="newArrivals"
          ref={newArrivalsRef}
        >
          <motion.h1
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -550 },
            }}
          >
            <span>New Arrivals</span>
            <Link to="/search" className="findmore">
              More
            </Link>
          </motion.h1>
          <motion.main
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -550 },
            }}
          >
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
                    stock={i?.stock}
                    photos={i?.photos}
                    description={i?.description}
                  />
                )
              )
            )}
          </motion.main>
        </motion.div>
        <ImageSlider />

        <motion.div
          initial="hidden"
          animate={popularControls}
          variants={{
            visible: { opacity: 1, transition: { duration: 0.5 } },
            hidden: { opacity: 0 },
          }}
          className="popular-products"
          ref={popularRef}
        >
          <motion.div
            className="popular-content"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -550 },
            }}
          >
            <h2>Latest & Trending Products</h2>
            <div className="popular-box">
              <span>
                <div className="icons">
                  <TbPremiumRights className="red" />
                </div>
                <div className="description">
                  <Typewriter tag="span" speed={100} text="Premium Quality Shoes"/>
                </div>
              </span>
              <span>
                <div className="icons">
                  <MdAllInclusive className="green" />
                </div>
                <div className="description">
                  <Typewriter tag="span" speed={100} text="All-Inclusive Design"/>
                </div>
              </span>
              <span>
                <div className="icons">
                  <IoIosPricetags className="blue" />
                </div>
                <div className="description">
                  <Typewriter tag="span" speed={100} text="Exclusive Shoe Collection"/>
                </div>
              </span>
              <span>
                <div className="icons">
                  <FaRegThumbsUp className="yellow" />
                </div>
                <div className="description">
                  <Typewriter tag="span" speed={100} text="Best Qaulity Collection"/>
                </div>
              </span>
            </div>
          </motion.div>
          <motion.div
            className="popular-images"
            variants={{
              visible: { opacity: 1, x: 1 },
              hidden: { opacity: 0, x: -550 },
            }}
          >
            <div className="small-images">
              <div
                className="image-box"
                style={{
                  background: "linear-gradient(45deg , #995130 ,white)",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707273827/uefsb56yaokbu8qh8p9d.png"
                  alt="smallImg1"
                  loading="lazy"
                />
              </div>
              <div
                className="image-box"
                style={{
                  background: "linear-gradient(45deg , #061C0F ,white)",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1708055564/products/tlklunsunrn2kwodl5qx.png"
                  alt="smallImg2"
                  loading="lazy"
                />
              </div>
              <div
                className="image-box"
                style={{
                  background: "linear-gradient(45deg , #780D0D ,white)",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1707273814/yirdeipefttoo2zvurq4.png"
                  alt="smallImg3"
                  loading="lazy"
                />
              </div>
              <div
                className="image-box"
                style={{
                  background: "linear-gradient(45deg , #D1BCD0 ,black)",
                }}
              >
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
                  borderRadius: "15px",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dzwspepvg/image/upload/v1708535415/products/tn0ejyctexes3deo7y2h.png"
                  alt="popularImg"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Footer />
      </motion.section>
    </div>
  );
};

export default Home;
