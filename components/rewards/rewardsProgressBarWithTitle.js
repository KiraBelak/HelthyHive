import { useState } from "react";

const RewardsProgressBarWithTitleForProfile = () => {
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
        <h1 className="text-2xl font-bold text-center mb-4">Recompensas</h1>
      </div>
    );
  };
  
  export default RewardsProgressBarWithTitleForProfile;