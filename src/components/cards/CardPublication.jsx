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
    <div className="carousel-container overflow-hidden w-full flex flex-col">
      <Slider {...settings}>
        {props.carouselData.map((item, index) => (
          <div key={index} className="p-4 overflow-hidden flex flex-col justify-center items-center">
            <div style={{ height:"50px" }} className="mb-1 overflow-y-auto">
              <p className='ml-1'>{item.description}</p>
            </div>
            <div style={{  maxHeight:"800px"}} className="sm:w-full w-80 overflow-y-auto flex justify-center items-center">
              <img className='m-auto object-center object-cover' src={item.img_menu_url} alt={`Imagen ${props.menu_name}`} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardPublication;
