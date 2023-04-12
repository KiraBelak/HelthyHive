
import axios from "axios";
import { useEffect } from "react";
import { Container } from "@mui/material";
import React, { useState } from 'react';
import Select from "react-select";


export default function Demo() {

    const [diseases, setDiseases] = useState([]);
    const [email, setEmail] = useState(""); // AQUI HAY QUE ASIGNAR EL EMAIL CUANDO YA TOCA EL LINK DE VERIFICACION
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [imc, setImc] = useState("");
    const [regimen, setRegimen] = useState("");
    const [sedentary, setSedentary] = useState(true);

    const handleDiseasesChange = (selectedOptions) => {
        const selectedDiseases = selectedOptions.map((option) => option.value);
        setDiseases(selectedDiseases);
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const imcValue = (weight / (height * height)).toFixed(2);

        imc = imcValue;

        sedentary = Boolean(sedentary);
       
        console.log({
            diseases,
            email,
            age,
            weight,
            height,
            imc,
            regimen,
            sedentary,
        });

        const data = {
            diseases,
            email,
            age,
            weight,
            height,
            imc,
            regimen,
            sedentary
        }

        postProfile(data);
        
    };

    //no tocar es parte del funcionamiento del campo Enfermedades
    const options = [
        { value: "Diabetes", label: "Diabetes" },
        { value: "Hipertensión", label: "Hipertensión" },
        { value: "Cardiovascular", label: "Enfermedad cardiovascular" },
        { value: "Anemia", label: "Anemia" },
        { value: "Osteoporosis", label: "Osteoporosis" },
    ];


    //Funcionando 
    async function postProfile(data) {
        
    
        const resp = await axios.post("/api/profile", data).then(response => {
            console.log("EXITO!", response);

        }).catch(error => {

            console.error(error);
        })

        console.log(resp);

    }

    //PRUEBA
    async function getProfiles() {
        const email = "linux39@live.com";
        let info;
        const resp = await axios.get(`/api/profile?email=${email}`).then(response => {
            console.log("encontrado", response);
            info = response.data;
        }).catch(err => {
            console.log("No a sido registrado este usuario");
        });

        /* aqui se tiene que mostrar los datos del perfil en la pagina o seccion que se 
         desee mostrar los datos del usuario */
        console.log(info);
    }

    //PRUEBA
    async function editProfiles() {
        const email = "linux34@live.com";
        const data2 = {
            email: email,
            age: 8888888,
            weight: 70,
            height: 77,
            imc: 77,
            disease: ["none", "alterado"],
            regimen: "balanced",
            sedentary: false
        };

        const resp = await axios.put(`/api/profile?email=${email}`, data2).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });

        console.log(resp);

    }

    
    useEffect(() => {

        //postProfile();

        //editProfiles();
        //getProfiles();
    }, []);

    return (
        <div className="min-h-screen w-screen box-border bg-gradient-to-br from-[#5D9F6B] via-[#3B7DE5] to-[#F097D1]">

            <div className="min-h-full min-w-screen flex justify-center items-center">
                <div className=" flex flex-col w-full box-border justify-center items-center py-12 lg:flex-none">
                    <div className="relative text-white mb-2">

                        <h1 className="text-5xl" style={{ fontFamily: 'Righteous' }}> Healty Hive</h1>
                        <h2 className="absolute right-0 text-m" style={{ fontFamily: 'Roboto' }}>Crea la mejor versión de ti</h2>
                        <br></br>

                        <br></br>
                    </div>
                    <div className="box-border  min-w-screen w-screen h-screen rounded-3xl px-4 bg-[#F0F0F0]">
                        <div className="text-center">

                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Ingresa tus datos
                            </h2>

                        </div>


                        <Container component="section">
                            <div className="mt-6">
                                <form
                                    method="post"
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                //name="csrfToken"
                                                type="hidden"
                                                required

                                            />
                                            <input type="email" disabled value={email} onChange={(e) => setEmail(e.target.value)}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />

                                        </div>
                                    </div>

                                    <div id="Age">
                                        <label
                                            htmlFor="age"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Edad
                                        </label>


                                        <input type="number"
                                            required value={age} onChange={(e) => setAge(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="diseases" className="block font-medium text-gray-700">
                                            Enfermedades
                                        </label>
                                        <Select required id="diseases" name="diseases" options={options} isMulti onChange={handleDiseasesChange}
                                            value={diseases.map((disease) => ({
                                                value: disease,
                                                label: disease,
                                            }))}

                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                                Peso (kg)
                                            </label>
                                            <input
                                                type="number"
                                                name="weight"
                                                id="weight"
                                                autoComplete="weight"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                required
                                                className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                                                Altura (cm)
                                            </label>
                                            <input
                                                type="number"
                                                name="height"
                                                id="height"
                                                autoComplete="height"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                required
                                                className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    

                                    <div id="regimen">
                                        <label
                                            htmlFor="regimen"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Régimen alimenticio
                                        </label>


                                        <input
                                            type="text"
                                            value={regimen}
                                            required
                                            onChange={(e) => setRegimen(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                    </div>
                                    <div id="sedentary">
                                        <label
                                            htmlFor="sedentary"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Sedentarismo
                                        </label>

                                        <input
                                            type="checkbox"
                                            value={sedentary}
                                            required
                                            onChange={(e) => setSedentary(e.target.value)}
                                        />

                                    </div>
                                   
                                    <h2 className="text-gray-500">Nosotros valoramos tu privacidad y nunca compartiremos tus datos con terceros</h2>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div>

    )
}