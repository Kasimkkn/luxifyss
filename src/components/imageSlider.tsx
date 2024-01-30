import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/images/slider-1.png";
import img2 from "../assets/images/slider-2.png";
const ImageSlider = () => {
  const settings = {
    dots: true,
    autoplaySpeed: 2000,
    autoplay: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        <div>
          <img src={img1} alt="Slider Image 1" className="slider-image" />
        </div>
        <div>
          <img src={img2} alt="Slider Image 2" className="slider-image" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default ImageSlider;
