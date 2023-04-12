import { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const CameraPage = () => {
  const [imageData, setImageData] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState(FACING_MODES.ENVIRONMENT);
  const [isImageMirror, setIsImageMirror] = useState(false);

  const handleTakePhoto = (dataUri) => {
    setImageData(dataUri);
  };

  const handleCameraFacingModeChange = () => {
    setCameraFacingMode(
      cameraFacingMode === FACING_MODES.USER
        ? FACING_MODES.ENVIRONMENT
        : FACING_MODES.USER
    );

    setIsImageMirror((prevIsImageMirror) => !prevIsImageMirror);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-full h-full">
        <Camera
          onTakePhoto={handleTakePhoto}
          idealFacingMode={cameraFacingMode}
          isFullscreen={true}
          isMaxResolution={true}
          isImageMirror={isImageMirror}
        />
        {imageData && (
          <img
            className="absolute inset-0 object-cover"
            src={imageData}
            alt="Captured"
          />
        )}
      </div>
      <div className="mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleTakePhoto}
        >
          Tomar foto
        </button>
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded"
          onClick={handleCameraFacingModeChange}
        >
          Cambiar cámara
        </button>
      </div>
    </div>
  );
};

export default CameraPage;
