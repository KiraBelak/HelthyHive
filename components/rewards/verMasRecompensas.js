import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoryImage from '../Stories';


const StoriesSliderRewards = () => {
    const settings = {
        dots: true,
        infinite: true,
        center: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    return (
        <div className="w-screen box-border overflow-hidden">
            <br></br>
            <h3 className="text-2xl font-bold text-gray-700"><span className="text-black">Mis recompensas</span></h3>
            <br></br>
            <Slider {...settings}>

                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                        <h3 className="text-xl text-black">
                           Consulta gratis
                        </h3>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                             <h3 className="text-xl text-black">
                            Psicologo gratis
                        </h3>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                             <h3 className="text-xl text-black">
                             Consulta gratis
                        </h3>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                             <h3 className="text-xl text-black">
                          Gratis Talent Land
                        </h3>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                             <h3 className="text-xl text-black">
                             Consulta gratis
                        </h3>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                             <h3 className="text-xl text-black">
                             Consulta gratis
                        </h3>
                    </div>
                </div>

            </Slider>
            <br></br>
        
  
        </div>

        

        

    );
};

export default StoriesSliderRewards;
