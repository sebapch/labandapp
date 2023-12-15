"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { kv, createClient } from "@vercel/kv";
import "react-calendar/dist/Calendar.css";
import Boton from "../_utils/Boton";
import { format } from "date-fns";

export default function Calendario() {
  const [fecha, setFecha] = useState(new Date());
  const [texto, setTexto] = useState("");
  const [data, setData] = useState([]);
  const [lista, setLista] = useState([]);
  const [delKey, setDelKey] = useState("");

  const client = createClient({
    url: "https://subtle-stallion-49535.kv.vercel-storage.com",
    token:
      "AcF_ASQgOTNiZGQ0ZTItYmQ1Yi00NDE1LTk2YjQtMGY2YmM1MzY4NDYyMzQ1YjI0OTgxZGFkNGM3NWFlMTRkYzAyMzI1Y2ZjYTY=",
  });

  /* const SaveUser = async () => {
    // Crea un objeto JSON con los datos del usuario
    const user = {
      userId: 123,
      email: "ex@example.com",
      name: "Example",
    };
    // Guarda el objeto JSON en un hash llamado 'users'
    await client.hset("users", user);
  };

  const GetUser = async () => {
    // Obtiene el objeto JSON con los datos del usuario desde el hash 'users'
    const user = await client.hget("users", "userId");
    // Haz algo con el objeto JSON
    console.log(user);
  }; */

  const parseCustomDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    // Se resta 1 al mes porque en JavaScript los meses van de 0 a 11
    return new Date(2000 + year, month - 1, day);
  };

  const saveTask = async () => {
    console.log(data);
    const key = Date.now();
    await client.set(`tasks:${key}`, data);
    return `tasks:${key}`;
  };

  const getAllTasks = async () => {
    const keys = await client.keys("tasks:*");
    const tasks = await Promise.all(
      keys.map(async (key) => {
        const task = await client.get(key);
        return {
          key: key,
          fecha: parseCustomDate(task.fecha),
          texto: task.texto,
        };
      })
    );

    tasks.sort((a, b) => a.fecha - b.fecha);
    const formattedTasks = tasks.map((task) => ({
      key: task.key,
      fecha: format(task.fecha, "dd-MM-yy"),
      texto: task.texto,
    }));
    console.log(formattedTasks);

    setLista(formattedTasks);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleChangeFecha = (date) => {
    setFecha(date);
  };

  const handleChangeTexto = (e) => {
    setTexto(e.target.value);
  };

  const addTask = async () => {
    const formattedDate = format(fecha, "dd-MM-yy");
    const key = await saveTask();
    setData({
      key: key, // Guarda la clave en el estado data
      fecha: formattedDate,
      texto: texto,
    });
    setTexto("");
    getAllTasks();
  };

  useEffect(() => {
    setData({
      fecha: format(fecha, "dd-MM-yy"),
      texto: texto,
    });
  }, [fecha, texto]);

  const deleteTask = async (key) => {
    console.log(key);
    await client.del("fecha", key);
    getAllTasks();
  };

  return (
    <>
      <div className="text-center mb-8">
        {" "}
        {/* Clase para centrar el contenido */}
        <label>Fecha:</label>
        {/* Use react-calendar component */}
        <div className="flex justify-center">
          <Calendar onChange={handleChangeFecha} value={fecha} locale="es-ES" />
        </div>
        <label className="block mt-4">Recordatorio:</label>{" "}
        {/* Clase para separación vertical */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={texto}
            onChange={handleChangeTexto}
            className="mt-2 p-2 border"
          />
        </div>
        <Boton onClick={() => addTask()} className="mt-2">
          Añadir
        </Boton>{" "}
        {/* Clase para separación horizontal */}
      </div>
      <ul className="pl-8">
        {" "}
        {/* Clase para el padding a la izquierda */}
        {lista &&
          lista.map((task, index) => (
            <li key={index} className="flex items-center">
              <label className="mr-2">{`${task.fecha}:  ${task.texto}`}</label>
              <button
                style={{
                  color: "red",
                  border: "1px solid red",
                  cursor: "pointer",
                }}
                onClick={() => deleteTask(task.key)}
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
