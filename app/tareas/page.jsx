'use client'
import React, { useState, useEffect } from "react";
import Boton from "../_utils/Boton";

const Tareas = () => {
  // Estado para manejar la lista de tareas
  const [tareas, setTareas] = useState([]);
  // Estado para manejar el texto de la nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    // Al cargar el componente, intenta obtener la lista de tareas desde localStorage
    const storedTareas = localStorage.getItem("tareas");
    if (storedTareas) {
      setTareas(JSON.parse(storedTareas));
    }
  }, []);

  useEffect(() => {
    // Al actualizar el estado de tareas, guarda la lista en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Función para manejar la adición de una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      setTareas([...tareas, nuevaTarea]);
      setNuevaTarea("");
    }
  };

  // Función para manejar la eliminación de una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  return (
    <div>
    <h1>Tareas</h1>
    {/* Formulario para agregar nuevas tareas */}
    <div>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
      />
      {/* Utiliza el componente de Boton en lugar del botón estándar */}
      <Boton onClick={agregarTarea}>Agregar Tarea</Boton>
    </div>
    {/* Lista de tareas */}
    <ul>
      {tareas.map((tarea, index) => (
        <li key={index}>
          {tarea}
          {/* Utiliza el componente de Boton para el botón de eliminar */}
          <Boton onClick={() => eliminarTarea(index)} className="bg-red-500">
            Eliminar
          </Boton>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Tareas;