import React from "react";

const SubtitleAndButtons = () => {
  return (
    <div className="flex flex-col  mt-4 subtitle-and-buttons-container">
      <div className="text-center">
        <h4 className="text-4xl font-bold text-gray-800 ml-4 p-4" style={{ textAlign: "left" }}>
          Insignias
        </h4>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <button className="relative w-10 h-10 rounded-full  mr-4 overflow-hidden" style={{ background: 'none' }}>
          <div className="center-image">
            <img src="/insignias/Insignia_01.png" className="absolute inset-0 w-full h-full object-cover" alt="Insignia 1" />
          </div>
        </button>
        <button className="relative w-10 h-10 rounded-full  mr-4 overflow-hidden" style={{ background: 'none' }}>
          <div className="center-image">
            <img src="/insignias/Insignia_02.png" className="absolute inset-0 w-full h-full object-cover" alt="Insignia 1" />
          </div>
        </button>
        <button className="relative w-10 h-10 rounded-full  mr-4 overflow-hidden" style={{ background: 'none' }}>
          <div className="center-image">
            <img src="/insignias/Insignia_03.png" className="absolute inset-0 w-full h-full object-cover" alt="Insignia 1" />
          </div>
        </button>
        <button className="relative w-10 h-10 rounded-full  mr-4 overflow-hidden" style={{ background: 'none' }}>
          <div className="center-image">
            <img src="/insignias/Insignia_01.png" className="absolute inset-0 w-full h-full object-cover" alt="Insignia 1" />
          </div>
        </button> <button className="relative w-10 h-10 rounded-full  mr-4 overflow-hidden" style={{ background: 'none' }}>
          <div className="center-image">
            <img src="/insignias/Insignia_01.png" className="absolute inset-0 w-full h-full object-cover" alt="Insignia 1" />
          </div>
        </button> <button className="relative w-10 h-10 rounded-full  mr-4 overflow-hidden" style={{ background: 'none' }}>
          <div className="center-image">
            <img src="/insignias/Insignia_01.png" className="absolute inset-0 w-full h-full object-cover" alt="Insignia 1" />
          </div>
        </button>
      </div>
      <br />
    </div>
  );
};

export default SubtitleAndButtons;
