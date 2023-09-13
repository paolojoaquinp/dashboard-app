/* sudo chown -R abhinav-kumar my-app */

// Importar Axios o usar la función fetch
import axios from 'axios';

// Realizar una solicitud GET para obtener datos de la tabla "licitacion"
axios.get('http://localhost/tu-api-php/leer.php')
  .then(response => {
    const data = response.data;
    // Aquí puedes manejar los datos como desees
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
