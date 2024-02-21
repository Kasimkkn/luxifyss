import { useEffect } from "react";
import { Link } from "react-router-dom";
const ImageSlider = () => {
  useEffect(() => {
    let next = document.querySelector(".next");
    let prev = document.querySelector(".prev");
    let slider = document.querySelector(".slider");

    const handleNextClick = () => {
      let slides = document.querySelectorAll(".slides");
      slider?.append(slides[0]);
    };

    const handlePrevClick = () => {
      let slides = document.querySelectorAll(".slides");
      slider?.prepend(slides[slides.length - 1]);
    };

    next?.addEventListener("click", handleNextClick);
    prev?.addEventListener("click", handlePrevClick);

    return () => {
      next?.removeEventListener("click", handleNextClick);
      prev?.removeEventListener("click", handlePrevClick);
    };
  }, []);

  return (
    <>
      <div className="silder-container">
        <h1>
          <span>For You...</span>
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>
        <div className="slider">
          <div
            className="slides"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1707274074/kwf1rzngwhxpto3slllx.png')`,
              background: "linear-gradient(to bottom,blac,white)",
            }}
          >
            <div className="content">
              <h2>ZenStride Flux</h2>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
          <div
            className="slides"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1707105026/0824aec2-47fc-418d-b0e0-8da78ffa3049.png')`,
            }}
          >
            <div className="content">
              <h2>Timeless Elegance Loafers</h2>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
          <div
            className="slides"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1707104889/e6af0fcf-4851-45ed-bfe2-7627b9d9f42c.png')`,
            }}
          >
            <div className="content">
              <h2>Executive Class Oxford</h2>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
          <div
            className="slides"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1707104755/1c9a4ba5-5201-411a-9413-686b64b4039c.png')`,
            }}
          >
            <div className="content">
              <h2>Urban Explorer Kick</h2>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
          <div
            className="slides"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1707273814/yirdeipefttoo2zvurq4.png')`,
            }}
          >
            <div className="content">
              <h2>Fiesta Sparkle Pumps</h2>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
          <div
            className="slides"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1707103938/5e57b124-e954-4bdd-bf33-349fee0ed981.png')`,
            }}
          >
            <div className="content">
              <h2>PowerStride Pro Athletic Shoes</h2>
              <Link className="linkBtn" to={"/search"}>
                buy now
              </Link>
            </div>
          </div>
        </div>

        <div className="buttons">
          <span className="prev"></span>
          <span className="next"></span>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
