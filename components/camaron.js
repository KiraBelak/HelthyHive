import React, { useState } from 'react';
import Camera from 'react-camera';
import { useRouter } from 'next/router';

const Camara = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const router = useRouter();

  const handleTakePhoto = (dataUri) => {
    // Aquí puedes enviar la foto al servidor o hacer lo que necesites con ella
    console.log('La foto ha sido tomada:', dataUri);

    // Redirige al usuario a la página de inicio después de tomar la foto
    router.push('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full">
        {isCameraOpen ? (
          <div className="relative">
            <Camera
              onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
              idealFacingMode={window && window.innerWidth > 768 ? 'environment' : 'user'}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const canvas = document.querySelector('.camera canvas');
                  if (canvas) {
                    handleTakePhoto(canvas.toDataURL('image/jpeg', 1.0));
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Tomar foto
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCameraOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Abrir cámara
          </button>
        )}
      </div>
    </div>
  );
};

export default Camara;
