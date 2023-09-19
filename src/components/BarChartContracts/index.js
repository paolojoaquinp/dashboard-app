import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';


let chart;

function BarChartContracts({ data }) {
  useEffect(() => { 
    const ctx = document.getElementById('detalleItemChart').getContext('2d');

    const categoryCounts = {};
    data.forEach(item => {
        const category = item.causante_entidad;
        if (categoryCounts[category]) {
            categoryCounts[category] += 1;
        } else {
            categoryCounts[category] = 1;
        }
    });

    // Tomar las 10 categorías más frecuentes
    const arrayDataValor = Object.keys(categoryCounts).map(key => ({
    key: key,
    value: categoryCounts[key]
    }));
      console.log(arrayDataValor);
    const chartData = {
        labels: arrayDataValor.map(item => item.key),
        datasets: [
          {
            label: 'Nro contratos resueltos',
            data: arrayDataValor.map(category => category.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
            borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
            borderWidth: 1,
          },
        ],
    };

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
    if (chart) {
        chart.destroy();
        chart = new Chart(ctx, {
            data: chartData,
            type: 'bar',
            options: chartOptions,
        });
    } else {
        chart = new Chart(ctx, {
            data: chartData,
            type: 'bar',
            options: chartOptions,
        });
        
    }

  }, [data]);

  return (
    <div>
        <h2>Gráfico de Barras - Causa de Resolucion de contratos</h2>
        <canvas id="detalleItemChart" width="400" height="200"></canvas>
    </div>
  );
}

export default BarChartContracts;