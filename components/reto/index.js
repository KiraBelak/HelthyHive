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
    </div>
  );
};

export default ProgressBarWithTitle;
