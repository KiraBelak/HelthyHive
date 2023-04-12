import { useState } from "react";
import classnames from "classnames";
import { useEffect } from "react";
import axios from "axios";

const CheckboxList = () => {
    const [items, setItems] = useState([]);
    const [title,setTitle] = useState("");
    const [subtitle,setSubtitle] = useState("");
    const [description,setDescription] = useState("");




    useEffect(() => {
        async function getChallenger() {
            let info;
            const resp = await axios.get(`/api/challenges`).then(response => {
                console.log("encontrado", response);
                info = response.data;
                console.log(info);
                //items = info[2].tasks;
                const setdata = info[6];
                setItems(setdata.tasks);
                setDescription(setdata.description);
                setSubtitle(setdata.subtitle);

                console.log(items);

            }).catch(err => {
                console.log("No a sido registrado este usuario");
            });

        }

     getChallenger();

    }, []);

    /*
     const [items, setItems] = useState([
         { id: 1, title: "Establece metas realistas y específicas para la semana", completed: false },
         { id: 2, title: "Planifica tus entrenamientos con anticipación", completed: false },
         { id: 3, title: "Haz un seguimiento de tu progreso", completed: false },
         { id: 4, title: "Aliméntate saludablemente", completed: false },
         { id: 5, title: "Descansa al menos 6 horas", completed: false },
         { id: 6, title: "Motívate ", completed: false },
     ]);
  */
    

    const [numSelected, setNumSelected] = useState(0);

    const handleToggle = (itemId) => {
        const updatedItems = items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
        setNumSelected(updatedItems.filter((item) => item.completed).length);
    };

    const completionPercentage = Math.round((numSelected / items.length) * 100);



    let progressBarColor;
    if (completionPercentage === 0) {
        progressBarColor = "bg-white";
    } else if (completionPercentage > 0 && completionPercentage < 20) {
        progressBarColor = "bg-red-500";
    } else if (completionPercentage >= 20 && completionPercentage < 70) {
        progressBarColor = "bg-yellow-500";
    } else {
        progressBarColor = "bg-green-500";
    }


    const progressBarClasses = classnames("h-full rounded-full transition-all duration-500 ease-out", {
        "bg-gray-200": completionPercentage === 0,
        "bg-yellow-300": completionPercentage > 0 && completionPercentage < 100,
        "bg-salud-primary": completionPercentage === 100,
    });
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-700">Actividades a realizar</h1>
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2"> {subtitle} </h3>
                <p className="text-gray-500">
                    {description}
                </p>
                <div className="h-4 mt-2 bg-gray-200 rounded-full">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${progressBarColor}`}
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-gray-700">
                    Completado: {numSelected} / {items.length}
                </p>
            </div>
            <ul className="list-disc pl-5 mt-2">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center my-2">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggle(item.id)}
                            className="mr-2 border-gray-400 rounded-sm focus:ring-salud-primary h-4 w-4 text-salud-primary"
                        />
                        <p
                            className={`text-lg font-medium ${item.completed ? "line-through text-gray-500" : "text-gray-700"
                                }`}
                        >
                            {item.title}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default CheckboxList;
