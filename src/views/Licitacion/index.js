"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Licitacion() {
  const [licitaciones, setLicitaciones] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener datos de la tabla "licitacion"
    axios.get('http://192.168.1.2/proyecto_dashboard/index.php')
      .then(response => {
        const data = response.data;
        setLicitaciones(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez al montar el componente.

  return (
    <div>
      <h1>Listado de Licitaciones</h1>
      <table>
        <thead>
          <tr>
            <th>CUCE</th>
            <th>Entidad</th>
            <th>Tipo de Contratación</th>
            <th>Modalidad</th>
            <th>Objeto de Contratación</th>
            <th>Estado</th>
            <th>Subasta</th>
            <th>Fecha de Presentación</th>
            <th>Fecha de Publicación</th>
          </tr>
        </thead>
        <tbody>
          {licitaciones.map(licitacion => (
            <tr key={licitacion.CUCE}>
              <td>{licitacion.CUCE}</td>
              <td>{licitacion.Entidad}</td>
              <td>{licitacion.TipoContratacion}</td>
              <td>{licitacion.Modalidad}</td>
              <td>{licitacion.ObjetoDeContratacion}</td>
              <td>{licitacion.Estado}</td>
              <td>{licitacion.Subasta ? 'Sí' : 'No'}</td>
              <td>{licitacion.FechaPresentacion}</td>
              <td>{licitacion.FechaPublicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Licitacion;
