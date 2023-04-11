import React from 'react';

const StoryImage = ({ imageSrc, altText, text }) => {
    return (
        <div className="relative h-20 w-20">
            <img
                src="https://source.unsplash.com/random/100x100"
                alt={altText}
                className="rounded-full object-cover absolute inset-0 h-full w-full"
            />
            <div className="absolute bottom-0 right-0 h-5 w-5 bg-yellow-500 border-2 border-white rounded-md flex justify-center items-center">
                <i className="material-icons text-white text-xs">whatshot</i>
            </div>
            <div className="mt-1 text-center">
                <p className="text-lg text-gray-700">{text}</p>
            </div>
        </div>
    );
};

export default StoryImage;
