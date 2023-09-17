import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

let chart;

const itemsAux = [
  {
    precioReferencialUnitario: 30,
    precioReferencialTotal: 31122,
  },
  {
    precioReferencialUnitario: 121,
    precioReferencialTotal: 11120,
  },
  {
    precioReferencialUnitario: 73,
    precioReferencialTotal: 15001,
  },
  {
    precioReferencialUnitario: 54,
    precioReferencialTotal: 21000,
  },
  {
    precioReferencialUnitario: 200,
    precioReferencialTotal: 40122,
  },
  {
    precioReferencialUnitario: 12,
    precioReferencialTotal: 10500,
  },
];

const ScatterChart = (props) => {
  const chartRef = useRef(null);
  const [items,setItems] = useState([]);
  useEffect(() => {
    // Realizar una solicitud GET para obtener datos de la tabla "licitacion"
    axios.get('http://localhost/proyecto_dashboard/read-detalle.php')
      .then(response => {
        const data = response.data;
        setItems(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);


  useEffect(() => {
    const data = {
      datasets: [{
        label: 'Precio Referencial Total vs. Precio Referecial Unitario',
        data: itemsAux.map(item => ({
          x: item.precioReferencialTotal,
          y: item.precioReferencialUnitario,
          // Puedes personalizar los puntos con otros atributos, si lo deseas
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color del fondo
        borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
      }],
    };

    const options = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Precio Referencial Total',
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Precio Referencial Unitario',
          },
        },
      },
    };
    const ctx = chartRef.current.getContext('2d');

    if (chart) {
    chart.destroy();
      chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: options,
      });
    } else {
        chart = new Chart(ctx, {
          type: 'scatter',
          data: data,
          options: options,
        });
    }
  }, [items]);

  return <div>
    <h2>Gráfico de Dispersion - Precio unitario vs total</h2>
    <canvas ref={chartRef} width="400" height="200" />
  </div>
};

export default ScatterChart;
