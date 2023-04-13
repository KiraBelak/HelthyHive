import React from "react";

const DownloadButton = () => {
  const handleClick = () => {
    // Aquí se debería escribir el código para descargar el PDF
    console.log("Descargando PDF...");
  };

  return (
<div className="max-w-md mx-auto flex justify-center">
  <div className="text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-2 ">
      Ultima consulta nutricional
    </h1>
    <a
      href="/pdf/saludDigna.pdf"
      download
      className="px-4 py-2 bg-salud-primary hover:bg-salud-primary-light text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out inline-block mt-4"
    >
      Descargar PDF
    </a>

   

    <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-3">
      Dieta asignada
    </h1>
    <a
      href="/pdf/saludDigna.pdf"
      download
      className="px-4 py-2 bg-salud-primary hover:bg-salud-primary-light text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out inline-block mt-4"
    >
      Descargar PDF
    </a>
  </div>
</div>
























  );
};

export default DownloadButton;
