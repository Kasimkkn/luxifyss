import img1 from '../assets/images/sketcher-1.png';
import img2 from '../assets/images/wintercol.png';
import img3 from '../assets/images/sketcher-4.png';
import img4 from '../assets/images/sketcher-1.png';
import img5 from '../assets/images/wintercol.png';
import img6 from '../assets/images/sketcher-4.png';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const ImageSlider = () => {
  useEffect(() => {
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let slider = document.querySelector('.slider');

    const handleNextClick = () => {
      let slides = document.querySelectorAll('.slides');
      slider?.append(slides[0]);
    };

    const handlePrevClick = () => {
      let slides = document.querySelectorAll('.slides');
      slider?.prepend(slides[slides.length - 1]);
    };

    next?.addEventListener('click', handleNextClick);
    prev?.addEventListener('click', handlePrevClick);

    return () => {
      next?.removeEventListener('click', handleNextClick);
      prev?.removeEventListener('click', handlePrevClick);
    };
  }, []);
  
  return (
    <>
    <div className="silder-container">   
      <div className="slider">
            <div className="slides" style={{backgroundImage:`url(${img1})`}}>
                <div className="content">
                    <Link className='linkBtn' to={'/search'}>buy now</Link>
                </div>
            </div>
            <div className="slides" style={{backgroundImage:`url(${img2})`}}>
                <div className="content">
                    <Link className='linkBtn' to={'/search'}>buy now</Link>
                </div>
            </div>
            <div className="slides" style={{backgroundImage:`url(${img3})`}}>
                <div className="content">
                    <Link className='linkBtn' to={'/search'}>buy now</Link>
                </div>
            </div>
            <div className="slides" style={{backgroundImage:`url(${img4})`}}>
                <div className="content">
                    <Link className='linkBtn' to={'/search'}>buy now</Link>
                </div>
            </div>
            <div className="slides" style={{backgroundImage:`url(${img5})`}}>
                <div className="content">
                    <Link className='linkBtn' to={'/search'}>buy now</Link>
                </div>
            </div>
            <div className="slides" style={{backgroundImage:`url(${img6})`}}>
                <div className="content">
                    <Link className='linkBtn' to={'/search'}>buy now</Link>
                </div>
            </div>
        </div>

    <div className="buttons">
      <span className="prev" ></span>
      <span className="next" ></span>
    </div>
  </div>

  </>

  
);
};

export default ImageSlider;
