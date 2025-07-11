import React, { useState, useEffect } from 'react';
import './Slider.css';
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';
import img5 from '../assets/img5.jpeg';
import img6 from '../assets/img6.jpeg';
import img7 from '../assets/img7.jpeg';
import img8 from '../assets/img8.jpeg';
import img9 from '../assets/img9.jpeg';
//import img10 from '../assets/img10_instruct.jpg';
import img11 from '../assets/img11.jpeg';
import img12 from '../assets/img12.jpeg';
import img13 from '../assets/img13.jpeg';
import img14 from '../assets/img14.jpeg';
import img15 from '../assets/img15.jpeg';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { images: [img1, img2, img3], id: 1 },
    { images: [img4, img5, img6], id: 2 },
    { images: [img7, img8, img9], id: 3 },
    { images: [img1, img11, img12], id: 4 },
    { images: [img13, img14, img15], id: 5 },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount or re-render
  }, [nextSlide]); // Dependency on nextSlide to ensure it uses the latest function

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="slide"
          >
            <div className="slide-content">
              {slide.images.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image}
                    alt={`Slide ${slide.id} Image ${index + 1}`}
                    className="slide-image"
                  />
                  <button className="start-button">Start with this template</button>
                </div>
              ))}
            </div>
            <div className="slide-overlay" />
          </div>
        ))}
      </div>
      <button className="nav-arrow prev" onClick={prevSlide}>
        ←
      </button>
      <button className="nav-arrow next" onClick={nextSlide}>
        →
      </button>
      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;