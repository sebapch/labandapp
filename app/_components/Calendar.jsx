"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendario = () => {
  const [fecha, setFecha] = useState(new Date());
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  const handleChangeFecha = (date) => {
    setFecha(date);
  };

  const handleChangeTexto = (e) => {
    setTexto(e.target.value);
  };

  useEffect(() => {
    const data = {
      fecha: fecha,
      texto: texto,
    };
    // Here you can save the data to vercel/kv
    // For example, using an asynchronous function and the fetch API
    // fetch('url_of_your_endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
  }, [fecha, texto]);

  // Renderiza el calendario y la fecha seleccionada
  return (
    <div>
      <form>
        <label>Fecha:</label>
        {/* Use react-calendar component */}
        <Calendar onChange={handleChangeFecha} value={fecha} />
        <label>Texto:</label>
        <input type="text" value={texto} onChange={handleChangeTexto} />
      </form>
      
    </div>
  );
};

export default Calendario;
