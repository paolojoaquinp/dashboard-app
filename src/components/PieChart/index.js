import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { PieChart } from './pie-chart-styles';


let chart1;

const PieChartPAC = ({ data }) => {
  const selectRef = useRef(null);
  const selectEntityRef = useRef(null);
  const selectYearRef = useRef(null);

  const [currentContracts,setCurrentContracts] = useState([]);
  
  const [opcionesSelect, setOpcionesSelect] = useState([]);
  const [selected, setSelected] = useState('');
  
  const [opcionesEntitySelect, setOpcionesEntitySelect] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');

  const [opcionesYearSelect, setOpcionesYearSelect] = useState([]);
  const [selectedYear, setSelectedYear] = useState(NaN);


  const handleSelectChange = () => {
    setSelected(selectRef.current.value);
  };
  const handleSelectChangeEntity = () => {
    setSelectedEntity(selectEntityRef.current.value);
  };
  const handleSelectChangeYear = () => {
    setSelectedYear(selectYearRef.current.value);
  };

  useEffect(() => {
    // Departamentos

    const opciones = [
      <option key={''} value={''}>
          {'Elige un departamento'}
      </option>
    ];
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
    // Entidad
    const opcionesEntity = [
      <option key={''} value={''}>
          {'Elige una entidad'}
      </option>
    ];
    let añosUnicos = [];
    if(!selected) {
      añosUnicos = data.reduce((años, item) => {
        const año = item.entidad;
        if (!años.includes(año)) {
          años.push(año);
        }
        return años;
      }, []);
    } else {
      añosUnicos = data.reduce((años, item) => {
        const depto = item.departamento;
        const año = item.entidad;
        if (!años.includes(año) && depto === selected) {
          años.push(año);
        }
        return años;
      }, []);
    }
    añosUnicos.forEach(item => {
      console.log('fecha: ',item);
      opcionesEntity.push(
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    setOpcionesEntitySelect(opcionesEntity);

    // Years
    const opcionesYears = [
      <option key={''} value={''}>
          {'Elige un Año'}
      </option>
    ];
    let uniqueYears = [];
    if(!selected && !selectedEntity) {
      uniqueYears = data.reduce((años, item) => {
        const año = item.fecha_ultima_publicacion.getFullYear().toString();
        if (!años.includes(año)) {
          años.push(año);
        }
        return años;
      }, []);
    } else {
      uniqueYears = data.reduce((años, item) => {
        const depto = item.departamento;
        const entity = item.entidad;
        const año = item.fecha_ultima_publicacion.getFullYear().toString();
        if (!años.includes(año) && depto === selected && entity === selectedEntity) {
          años.push(año);
        }
        return años;
      }, []);
    }
    uniqueYears.forEach(item => {
      opcionesYears.push(
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    setOpcionesYearSelect(opcionesYears);
  },[selected,selectedEntity,data]);

  useEffect(() => { 
    const ctx = document.getElementById('detalleItemChart1').getContext('2d');

    const categoryCounts = {};

    data.forEach(item => {
      const depto = item.departamento;
      const year = item.fecha_ultima_publicacion.getFullYear().toString();
      const entidad = item.entidad;

      if (selected && selectedEntity && !isNaN(selectedYear)) {
        if(selected === 'default' || selectedEntity === 'default') {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
        if (depto === selected && entidad === selectedEntity && year === selectedYear) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else if (selected && selectedEntity) {
        if (depto === selected && entidad === selectedEntity) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else if (selected && selectedYear) {
        if (depto === selected && year === selectedYear) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else if (selectedEntity && selectedYear) {
        if (entidad === selectedEntity && year === selectedYear) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else if (selected) {
        if (depto === selected) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else if (selectedEntity) {
        if (entidad === selectedEntity) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else if (selectedYear) {
        if (year === selectedYear) {
          const category = item.municipio;
          if (categoryCounts[category]) {
            categoryCounts[category] += 1;
          } else {
            categoryCounts[category] = 1;
          }
        }
      } else {
        // Ninguno de los props está definido
        // Hacer algo cuando ninguno está definido
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
    
    const res = arrayDataValor.reduce((accum,current) => accum + current.value,0);
    setCurrentContracts(res);
    

    const chartOptions = {
    };


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

  }, [data,selected,selectedEntity,selectedYear]);

  return (
    <PieChart>
        <div className='chart__wrapper'>
          <div className='info__wrapper'>
            <h2>PROGRAMA ANUAL DE CONTRATACIONES</h2>
            <div className='quantity__info-wrapper'>
              <p>Total:</p>
              <p>{selected === '' ? data.length : currentContracts}</p>
              <p>Contrataciones</p>
            </div>
          </div>
          <canvas id="detalleItemChart1" width="100" height="100"></canvas>
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
            <h3>Filtrar por Entidad</h3>
            <select className='select__container' ref={selectEntityRef} onChange={handleSelectChangeEntity}>
                {opcionesEntitySelect}
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