import React, { useRef, useState, useEffect } from 'react';
import Camera from 'react-camera';

const style = {
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  },
  container: {
    // Add any other styles you want for the container here
  }
};

export default function App({ cameraRef, imgRef,takePicture}) {

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    setIsCameraOpen(true);
  }, []);


  return (
    <div style={style.container}>

{isCameraOpen ? ( 
      <Camera
        style={style.preview}
        ref={cameraRef}
      >
        <div  onClick={takePicture}>
        </div>
      </Camera>
) : null}
      <img
        style={style.captureImage}
        ref={imgRef}
      />
    </div>
  );
}
