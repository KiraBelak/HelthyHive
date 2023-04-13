import { useState } from "react";
import classnames from "classnames";

const CheckboxListForProfile = () => {
    const [items, setItems] = useState([
        { id: 1, title: "Reto Gym", completed: false },

    ]);

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
        <div className="p-2">
            <h1 className="text-2xl font-bold text-gray-700">Nivel de actividad</h1>
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Gym por una semana</h3>
  
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

export default CheckboxListForProfile;
