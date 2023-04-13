import DefAvatar from "@/components/users/avatar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import RetoSlider from "@/components/RetoSlider"

const Objetive = () => {



    return (
        <>
            <div className="flex flex-col items-center justify-center mt-4">
                <div className="mt-4">
                    Nombre de usuario
                </div>
                <div className="mt-4" >
                    <DefAvatar></DefAvatar>
                </div>

                <table className="table-auto mt-6">
                    <tbody>
                        <tr>
                            <td className="border px-4  text-center">0000</td>
                            <td className="border px-4  text-center">0000</td>
                        </tr>
                        <tr>
                            <td className="border px-4  text-center">Nivel</td>
                            <td className="border px-4  text-center">Estrellas</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="flex flex-col items-center justify-center mt-4 " style={{ margin: '10px', }}>
            <div className="">

                <h3 className="text-2xl font-bold text-gray-700 ">
                    <span className="text-black">Mi avance</span>
                </h3>
            </div>

            <div>
                Progreso

            </div>

            <div>
                
               
                <h3 className="text-2xl font-bold text-gray-700 ">
                    <span className="text-black"> 0,00%</span>
                </h3>
            </div>

            <div>
                BARRA DE PROGRESO
            </div>
            </div>
            <div className="flex items-center justify-center mt-4 " style={{ margin: '10px', }} >
                <RetoSlider></RetoSlider>
            </div>
        </>
    )


};

export default Objetive 