import React, { useState } from 'react';
import axios from "axios";

function Formulario() {
    const [tareas, setTareas] = useState([{ titulo: '', estado: '' }]);
    const [title, setTitle] = useState("");
    const [subTitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState();


    const agregarTarea = () => {
        setTareas([...tareas, { titulo: '', estado: '' }]);
    };

    const eliminarTarea = (index) => {
        const nuevasTareas = [...tareas];
        nuevasTareas.splice(index, 1);
        setTareas(nuevasTareas);
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const nuevasTareas = [...tareas];
        nuevasTareas[index][name] = value;
        setTareas(nuevasTareas);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const tasks = tareas;
        // Aquí puedes hacer lo que necesites con el array de tareas
        const challengerData = {
            title,
            subTitle,
            description,
            status,
            tasks
        }
        console.log(challengerData);
        postChallenge(challengerData);

    };

    async function postChallenge(data) {
        
    
        const resp = await axios.post("/api/challenges", data).then(response => {
            console.log("EXITO!", response);

        }).catch(error => {

            console.error(error);
        })

        console.log(resp);

    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6">

            <div>
                <label
                    className="block text-gray-700 font-bold mb-2"
                >
                    Titulo del desafio
                </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label
                    className="block text-gray-700 font-bold mb-2"
                >
                    Subitulo del desafio
                </label>
                <input type="text" required  value={subTitle} onChange={(e) => setSubtitle(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label
                    className="block text-gray-700 font-bold mb-2"
                >
                    Descripción
                </label>
                <input type="text" required  value={description} onChange={(e) => setDescription(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            

            <div>
                <label
                    className="block text-gray-700 font-bold mb-2"
                >
                    Estado
                </label>
                <input type="text" required  value={status} onChange={(e) => setStatus(e.target.value)}

                />
            </div>
            {tareas.map((tarea, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Título:
                        <input
                            type="text"
                            name="titulo"
                            value={tarea.titulo}
                            onChange={(event) => handleInputChange(event, index)}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block text-gray-700 font-bold mb-2">
                        Estado:
                        <input
                            type="text"
                            name="estado"
                            value={tarea.estado}
                            onChange={(event) => handleInputChange(event, index)}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    {tareas.length !== 1 && (
                        <button type="button" onClick={() => eliminarTarea(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Eliminar tarea
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={agregarTarea} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                Añadir tarea
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Guardar
            </button>





        </form>
    );
}

export default Formulario;