
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const CardPublication = (props) => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {props.carouselData.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={`Imagen ${index + 1}`} />
            <p className='mt-2'>{item.caption}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardPublication;
