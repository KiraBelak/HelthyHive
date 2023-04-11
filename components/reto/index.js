import { useState } from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-md overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const ProgressBarWithTitle = () => {
  const [progress, setProgress] = useState(0);

  const handleButtonClick = () => {
    if (progress < 100) {
      setProgress(progress + 10);
    } else {
      setProgress(0);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-4">Reto de la semana</h1>
      <h2 className="text-lg font-medium mb-4 text-gray-500">Gym por una semana</h2>
      <ProgressBar progress={progress} />
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none"
          onClick={handleButtonClick}
        >
          Aumentar progreso
        </button>
      </div>
    </div>
  );
};

export default ProgressBarWithTitle;
