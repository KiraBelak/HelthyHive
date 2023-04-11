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
        <div className="w-full ml-10">
            <Slider {...settings}>

                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            text="Story 1"
                            className="mx-10"
                        />
                    </div>
                    <div className="col-span-6">
                        <div className="mt-1 flex justify-between text-center">
                            <h3 className="text-xl text-black">
                                hola mundo
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            text="Story 1"
                            className="mx-10"
                        />
                    </div>
                    <div className="col-span-6">
                        <div className="mt-1 flex justify-between text-center">
                            <h3 className="text-xl text-black">
                                hola mundo
                            </h3>
                        </div>
                    </div>
                </div>  <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            text="Story 1"
                            className="mx-10"
                        />
                    </div>
                    <div className="col-span-6">
                        <div className="mt-1 flex justify-between text-center">
                            <h3 className="text-xl text-black">
                                hola mundo
                            </h3>
                        </div>
                    </div>
                </div>  <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            text="Story 1"
                            className="mx-10"
                        />
                    </div>
                    <div className="col-span-6">
                        <div className="mt-1 flex justify-between text-center">
                            <h3 className="text-xl text-black">
                                hola mundo
                            </h3>
                        </div>
                    </div>
                </div>  <div className="flex justify-between">
                    <div className="col-span">
                        <StoryImage
                            imageSrc="https://source.unsplash.com/random/100x100"
                            altText="Story 1"
                            text="Story 1"
                            className="mx-10"
                        />
                    </div>
                    <div className="col-span-6">
                        <div className="mt-1 flex justify-between text-center">
                            <h3 className="text-xl text-black">
                                hola mundo
                            </h3>
                        </div>
                    </div>
                </div>



            </Slider>
        </div>

    );
};

export default StoriesSlider;
