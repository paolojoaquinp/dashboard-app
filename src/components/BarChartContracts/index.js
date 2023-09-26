import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { BarChart } from './bar-chart-styles';


let chart;

const BarChartContracts = ({ data }) => {
  const selectRef = useRef(null);
  const [opcionesSelect, setOpcionesSelect] = useState([]);
  const [selected, setSelected] = useState('');


  const handleSelectChange = () => {
    setSelected(selectRef.current.value);
    console.log('Valor seleccionado:', selected);
  };

  useEffect(() => {
    const opciones = [];
    const añosUnicos = data.reduce((años, item) => {
      /* const año = item.fecha_resolucion.getFullYear(); */
      const año = item.causante_entidad;
      if (!años.includes(año)) {
        años.push(año);
      }
      return años;
    }, []);
    añosUnicos.forEach(item => {
      console.log('fecha: ',item);
      opciones.push(
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    setOpcionesSelect(opciones);
  },[data]);

  useEffect(() => { 
    const ctx = document.getElementById('detalleItemChart').getContext('2d');

    const categoryCounts = {};

    data.forEach(item => {
      /* const year = item.fecha_resolucion.getFullYear().toString(); */
      const year = item.causante_entidad;
    
      if (selected) {
        if (year === selected.toString()) {
          const category = item.entidad_contratante;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else {
        const category = item.entidad_contratante;
        if (categoryCounts[category]) {
          categoryCounts[category] += 1;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });


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
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
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

  }, [data,selected]);

  return (
    <BarChart>
        <div className='chart__wrapper'>
          <h2>Gráfico de Barras - Causa de Resolucion de contratos</h2>
          <canvas id="detalleItemChart" width="400" height="300"></canvas>
        </div>
        <hr></hr>
        <p>opciones:</p>
        <div className='select__wrapper'>
          <h3>Filtrar por Causal de resolucion</h3>
          <select className='select__container' ref={selectRef} onChange={handleSelectChange}>
              {opcionesSelect}
          </select>
        </div>
    </BarChart>
  );
}

export default BarChartContracts;