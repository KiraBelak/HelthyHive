import React from 'react';
import Camarita from './Camarita';
import CameraPage from './Camera';

const CameraContainer = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 right-0">
        <Camarita />
      </div>
      <div className="absolute top-0 left-0 w-1/4 h-1/4">
        <CameraPage />
      </div>
    </div>
  );
};

export default CameraContainer;
