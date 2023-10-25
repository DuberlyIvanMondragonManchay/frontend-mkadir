
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
            <p className='font-semibold my-2 ml-2'>{item.description}</p>
            <img src={item.img_menu_url} alt={`Imagen ${props.menu_name}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardPublication;