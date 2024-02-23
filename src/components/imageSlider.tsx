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
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1708692164/dfqfray0plbwgqldpjym.png')`,
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
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1708691975/yyupxwat3iznkbzfawvt.png')`,
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
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1708691941/aq9p6ztlinndqtqe7sdw.png')`,
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
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1708691974/nnjmmhtjcbanjgnorlqk.png')`,
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
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1708691974/dyvw2kotlzcw32isncyf.png')`,
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
              backgroundImage: `url('https://res.cloudinary.com/dzwspepvg/image/upload/v1708691978/ugl1nkuvcywt0qvx4yf4.png')`,
            }}
          >
            <div className="content">
              <h2>Pro Athletic Shoes</h2>
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
