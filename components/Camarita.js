import { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
//funciona con el componente camaron con camara trasera


const Camarita = ({toma}) => {
  const [imageData, setImageData] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState(FACING_MODES.ENVIRONMENT);

  const takePhoto = (dataUri) => {
    toma(dataUri,"camara2");
  };

  const handleCameraFacingModeChange = () => {
    setCameraFacingMode(
      cameraFacingMode === FACING_MODES.USER
        ? FACING_MODES.ENVIRONMENT
        : FACING_MODES.USER
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-full h-full">
        <Camera
          onTakePhoto={(dataUri) => {
            takePhoto(dataUri);
          }}
          idealFacingMode={cameraFacingMode}
          isFullscreen={true}
          isMaxResolution={true}
        />
        {imageData && (
          <img
            className="absolute inset-0 object-cover"
            src={imageData}
            alt="Captured"
          />
        )}
      </div>
      {/* <div className="mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={takePhoto}
        >
          Tomar foto
        </button>
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded"
          onClick={handleCameraFacingModeChange}
        >
          Cambiar cámara
        </button>
      </div> */}
    </div>
  );
};

export default Camarita;


