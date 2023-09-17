"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LicitacionContainer } from './licitacion-styles';

import ScatterChart from '@/components/ScatterChart';
import BarChart from '@/components/BarChart';

function Licitacion() {
  const [licitaciones, setLicitaciones] = useState([]);
  
  useEffect(() => {
    // Realizar una solicitud GET para obtener datos de la tabla "licitacion"
    axios.get('http://localhost/proyecto_dashboard/index.php')
      .then(response => {
        const data = response.data;
        setLicitaciones(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <LicitacionContainer>
      <div className='charts__container'>
        <ScatterChart />
        <BarChart />
      </div>
      <h1 className='title'>Listado de Licitaciones</h1>
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
    </LicitacionContainer>
  );
}

export default Licitacion;
