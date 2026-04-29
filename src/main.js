import './style.css';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

// const API_URL = "http://localhost:5985/demo2/_all_docs?include_docs=true"
// 
//
const API_URL = "http://localhost:5985/demo2/_design/uno/_view/vista1?include_docs=true"
async function cargarDatos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error('Error al consumir la API');
    }

    const mijson = await respuesta.json();
    const datos = mijson.rows.map(function(row) {
      return row.doc;
    });

    new DataTable('#tabla-posts', {
      data: datos,
      columns: [
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'lenguaje' }
      ],
      pageLength: 10,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente'
        }
      }
    });
  } catch (error) {
    console.error(error);
    document.querySelector('#app').innerHTML += `
      <p class="error">No se pudieron cargar los datos.</p>
    `;
  }
}

cargarDatos();
