import { useState } from "react";

const CheckboxList = () => {
    const [items, setItems] = useState([
        { id: 1, title: "Establece metas realistas y específicas para la semana", completed: false },
        { id: 2, title: "Planifica tus entrenamientos con anticipación", completed: true },
        { id: 3, title: "Haz un seguimiento de tu progreso", completed: false },
        { id: 4, title: "Aliméntate saludablemente", completed: true },
        { id: 5, title: "Descansa al menos 6 horas", completed: false },
        { id: 5, title: "Motívate ", completed: false },
    ]);

    const handleToggle = (itemId) => {
        setItems(
            items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-700">Actividades a realizar</h1>
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
            <div>
        <h3 className="text-lg font-bold mb-2">Gym por una semana</h3>
        <p className="text-gray-500">
          Realiza estas tareas para cumplir con tu objetivo de hacer ejercicio
          en el gimnasio por una semana.
        </p>
      </div>
        </div>
    );
};

export default CheckboxList;
