// En Historial.jsx

import React, { useState, useEffect } from 'react';

export default function Historial() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/history')
      .then(response => response.json())
      .then(data => setHistorial(data))
      .catch(error => console.error('Error al obtener historial:', error));
  }, []);

  return (
    <div>
      <h2>Historial de Búsqueda</h2>
      <ul>
        {historial.map((item, index) => (
          <li key={index}>
            <p>Ciudad: {item.city}</p>
            <p>País: {item.country}</p>
            <p>Temperatura: {item.temperature}°C</p>
            <p>Fecha: {new Date(item.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
