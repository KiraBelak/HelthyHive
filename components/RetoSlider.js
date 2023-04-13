import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RetoSlider = () => {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        
        swipeToSlide: true,
        afterChange: function(index) {
          console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
          );
        }}

  const retos = [
    {
        title: 'Reto de lectura',
      imageUrl: 'imagen1.png',
      progress: 25
    },
    {
        title: 'Reto de ejercicios',
      imageUrl: 'imagen2.png',
      progress: 50
    },
    {
        title: 'Reto de meditación',
      imageUrl: 'imagen3.png',
      progress: 75
    },
    {
        title: 'Reto de escritura',
      imageUrl: 'imagen4.png',
      progress: 100
    }
  ];


  return (
    <div className="w-screen box-border overflow-hidden">
        <style jsx>{`
            .slick-slide {
                margin-left: 100px;
            }
        `}</style>
      <br></br>
      <h3 className="text-2xl font-bold text-gray-700 ">
        <span className="text-black">Retos Actuales</span>
      </h3>
      <br></br>
      <Slider {...settings}>
        {retos.map((reto) => (
          <div key={reto.id} className="flex justify-between">
            <div className="col-span">
              <h3 className="text-xl text-black">{reto.title}</h3>
              <img src={reto.imageUrl} alt={reto.title} />
              <p>{`${reto.progress}%`}</p>
            </div>
          </div>
        ))}
      </Slider>
      <br></br>
      <h3 className="text-2xl font-bold text-gray-700">
        <span className="text-black">Recompensas</span>
      </h3>
    </div>
    
  );
};

export default RetoSlider;