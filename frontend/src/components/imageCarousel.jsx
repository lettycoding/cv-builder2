import React, { useState, useEffect } from 'react';
import './imageCarousel.css';
import img1 from '../assets/anime.webp';
import img2 from '../assets/anime1.webp';
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

const ImageCarousel = () => {
  const images = [img1,img2,img2];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 === images.length) {
        setDisableTransition(true);
        setTimeout(() => setDisableTransition(false), 0);
        return 0;
      }
      return prevIndex + 1;
    });
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className={`carousel ${disableTransition ? 'no-transition' : ''}`}
        style={{
          transform: `rotateY(${currentIndex * -90}deg)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="carousel-image"
            style={{
              transform: `rotateY(${index * 90}deg) translateZ(150px)`, // Smaller radius
            }}
          />
        ))}
      </div>
      
    </div>
  );
};

export default ImageCarousel;