import React from "react";

const TitleSubtitle = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-lg text-gray-600">{subtitle}</h2>
    </div>
  );
};

export default TitleSubtitle;
