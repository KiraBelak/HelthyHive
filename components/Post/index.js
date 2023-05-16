// src/components/Post/index.js
import React, { useState } from 'react';

const Post = ({data}) => {
    const { title, txt, tiempo, name, img,image } = data;
    //funcion para sacar hace cuanto se hizo el post
    const haceCuanto = (fecha) => {
        // conseguir formatear la fecha
        const pub = new Date(fecha);
        const ahora = new Date();
        const tiempo = ahora.getTime() - pub.getTime();
        const segundos = Math.floor(tiempo / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const meses = Math.floor(dias / 30);
        const anios = Math.floor(meses / 12);
        if (anios > 0) {
            return `${anios} años`;
        } else if (meses > 0) {
            return `${meses} meses`;
        } else if (dias > 0) {
            return `${dias} dias`;
        } else if (horas > 0) {
            return `${horas} horas`;
        } else if (minutos > 0) {
            return `${minutos} minutos`;
        } else if (segundos > 0) {
            return `${segundos} segundos`;
        } else {
            return 'Ahora';
        }
    };

    const [likes, setLikes] = useState(0);
    return (
        <div className="max-w-md w-full mx-auto bg-white rounded-md shadow-md overflow-hidden mb-4">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
                {/* Empieza el usario y el tiempo */}
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full mr-2"
                        src={img}
                        alt="User avatar" />
                    <span className="text-sm font-medium text-gray-900">{name}</span>
                </div>
                <div className="flex items-center">
                    <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="ml-1 text-xs font-medium text-gray-500">{haceCuanto(tiempo)}</span>
                </div>
                {/* Termina el usario y el tiempo */}
            </div>
            {image && <img
                className="w-full"
                src="https://source.unsplash.com/random/600x600"
                alt="Post image" />}
            <div className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900 mb-2">{title}</div>
                <div className="text-sm text-gray-800">
                    {txt}
                </div>
            </div>

            {/* likes */}

            <div className="px-4 py-2 bg-gray-100">
                <div className="flex items-center">
                    <button onClick={() => setLikes(likes + 1)}>
                        <svg className={`h-6 w-6 text-gray-600 mr-1 ${likes > 0 ? 'text-yellow-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} fill={likes > 0 ? 'yellow' : 'none'} d="M12 2l3.09 6.63 7.01 1.02-5.09 4.95 1.2 7.0L12 19.24l-6.22 3.37 1.2-7.0L1.9 9.65l7.01-1.02L12 2z" />
                        </svg>
                    </button>
                    <span className="text-sm font-medium text-gray-600">
                        {likes} {likes === 1 ? 'like' : 'likes'}
                    </span>
                </div>
            </div>
        </div>
    );
};


export default Post;