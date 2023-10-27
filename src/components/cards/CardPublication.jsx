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
          <div key={index} style={{ height: "300px" }} className="p-4 overflow-hidden flex flex-col">
            <div style={{ height:"50px" }} className="mb-1 overflow-y-auto">
              <p className='ml-2'>{item.description}</p>
            </div>
            <div style={{ height: "600px" }} className="max-h-full max-w-full overflow-y-auto">
              <img className='m-auto max-h-full max-w-full object-center object-cover' src={item.img_menu_url} alt={`Imagen ${props.menu_name}`} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardPublication;
