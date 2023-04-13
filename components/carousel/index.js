import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoryImage from '../Stories';

const StoriesSlider = () => {
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
            <h3 className="text-2xl font-bold text-gray-700"><span className="text-black">Novedades</span></h3>
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
                            Consulta Gratis
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
                            Comida Fit
                        </h3>
                    </div>
                </div>
                <div className="flex justify-between mx-2">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            className="mx-10 box-border"
                        />
                             <h3 className="text-xl text-black">
                             Comida Fit
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
                             Comida Fit
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
                             Comida Fit
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
                             Comida Fit
                        </h3>
                    </div>
                </div>

            </Slider>
            <br></br>
            <h3 className="text-2xl font-bold text-gray-700"><span className="text-black">Descubre</span></h3>
  
        </div>

        

    );
};

export default StoriesSlider;
