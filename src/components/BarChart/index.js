import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';


let chart;
const BarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
          { estado: 'Pendiente', cantidad: 10 },
          { estado: 'Aprobado', cantidad: 20 },
          { estado: 'Rechazado', cantidad: 5 },
        ]);
    }, []);

    useEffect(() => {    
        // Obtén una referencia al elemento canvas donde se dibujará el gráfico.
        const ctx = document.getElementById('detalleItemChart').getContext('2d');
    
        // Configura los datos para el gráfico de barras.
        const chartData = {
          labels: data.map(item => item.estado),
          datasets: [
            {
              label: 'Cantidad de Elementos',
              data: data.map(item => item.cantidad),
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
              borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
              borderWidth: 1,
            },
          ],
        };
        // Configura las opciones del gráfico.
        const chartOptions = {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad',
              },
            },
          },
        };
        // Crea el gráfico de barras.
        if (chart) {
          chart.destroy();
          chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
          });
        } else {
          chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
          });
        }        
    }, [data]);

    return (
        <div>
            <h2>Gráfico de Barras - Cantidad de Elementos por Estado</h2>
            <canvas id="detalleItemChart" width="400" height="200"></canvas>
        </div>
    );
};

export default BarChart;
