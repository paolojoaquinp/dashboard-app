import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { PieChart } from './pie-chart-styles';


let chart1;

const PieChartPAC = ({ data }) => {
  const selectRef = useRef(null);
  const selectYearRef = useRef(null);
  const [opcionesSelect, setOpcionesSelect] = useState([]);
  const [selected, setSelected] = useState('');
  
  const [opcionesYearSelect, setOpcionesYearSelect] = useState([]);
  const [selectedYear, setSelectedYear] = useState(NaN);


  const handleSelectChange = () => {
    setSelected(selectRef.current.value);
    console.log('Valor seleccionado:', selected);
  };
  const handleSelectChangeYear = () => {
    setSelectedYear(selectYearRef.current.value);
    console.log('Valor seleccionado:', selectedYear);
  };

  useEffect(() => {
    // Departamentos

    const opciones = [];
    const deptoUnicos = data.reduce((deptos, item) => {
      const depto = item.departamento;
      if (!deptos.includes(depto)) {
        deptos.push(depto);
      }
      return deptos;
    }, []);
    deptoUnicos.forEach(item => {
      console.log('fecha: ',item);
      opciones.push(
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    setOpcionesSelect(opciones);
  },[data,]);

  useEffect(() => {
    // Years
    const opcionesYears = [];
    let añosUnicos = [];
    if(!selected) {
      añosUnicos = data.reduce((años, item) => {
        const año = item.fecha_ultima_publicacion.getFullYear().toString();
        if (!años.includes(año)) {
          años.push(año);
        }
        return años;
      }, []);
    } else {
      añosUnicos = data.reduce((años, item) => {
        const depto = item.departamento;
        const año = item.fecha_ultima_publicacion.getFullYear().toString();
        if (!años.includes(año) && depto === selected) {
          años.push(año);
        }
        return años;
      }, []);
    }
    añosUnicos.forEach(item => {
      console.log('fecha: ',item);
      opcionesYears.push(
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    setOpcionesYearSelect(opcionesYears);
  },[selected,data]);

  useEffect(() => { 
    const ctx = document.getElementById('detalleItemChart1').getContext('2d');

    const categoryCounts = {};

    data.forEach(item => {
      const depto = item.departamento;
      const year = item.fecha_ultima_publicacion.getFullYear().toString();
    
      // Verificar si 'selectedYear' es un número válido (no es NaN)
      if ((selected) && !isNaN(selectedYear)) {
        if (depto === selected && year === selectedYear) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } 
      if(selected && isNaN(selectedYear)) {
        if (depto === selected) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      }
      if(!selected && !isNaN(selectedYear)) {
        if (year === selectedYear) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      }
      if(!(selected) && isNaN(selectedYear)) {
          const category = item.municipio;
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
            label: 'Nro contrataciones',
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

    const chartOptions = {};
    if (chart1) {
        chart1.destroy();
        chart1 = new Chart(ctx, {
            data: chartData,
            type: 'pie',
            options: chartOptions,
        });
    } else {
        chart1 = new Chart(ctx, {
            data: chartData,
            type: 'pie',
            options: chartOptions,
        });
        
    }

  }, [data,selected,selectedYear]);

  return (
    <PieChart>
        <div className='chart__wrapper'>
          <h2>Pie Chart - Nro de contratos(PROGRAMA ANUAL DE CONTRATACIONES)</h2>
          <canvas id="detalleItemChart1" width="400" height="100"></canvas>
        </div>
        <hr></hr>
        <p>opciones:</p>
        <div className='options__wrapper'>
          <div className='select__wrapper'>
            <h3>Filtrar por Departamento</h3>
            <select className='select__container' ref={selectRef} onChange={handleSelectChange}>
                {opcionesSelect}
            </select>
          </div>
          <div className='select__wrapper'>
            <h3>Filtrar por año</h3>
            <select className='select__container' ref={selectYearRef} onChange={handleSelectChangeYear}>
                {opcionesYearSelect}
            </select>
          </div>
        </div>
    </PieChart>
  );
}

export default PieChartPAC;