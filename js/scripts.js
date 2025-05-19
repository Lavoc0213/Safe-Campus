// js/scripts.js

function abrirFormulario() {
    alert("Aquí se abrirá un formulario para reportar una zona de riesgo.");
  }
  document.addEventListener('DOMContentLoaded', function () {
    // Simulación de datos de incidentes
    const incidentes = [
        { lugar: "San Fernando", direccion: "Calle 5 #23-45", descripcion: "Robo a mano armada", estado: "Pendiente", fecha: "2025-05-10 14:30" },
        { lugar: "Centro", direccion: "Carrera 7 #10-30", descripcion: "Accidente de tránsito", estado: "Resuelto", fecha: "2025-05-09 16:45" },
        { lugar: "Zona Industrial", direccion: "Calle 9 #15-80", descripcion: "Incendio en fábrica", estado: "En proceso", fecha: "2025-05-08 10:20" }
    ];

    const listaIncidentes = document.getElementById("incidentes-list");

    // Función para cargar incidentes
    function cargarIncidentes() {
        listaIncidentes.innerHTML = '';  // Limpiar lista antes de recargar
        incidentes.forEach(incidente => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `
                <strong>${incidente.lugar}</strong> - ${incidente.direccion} <br>
                <small>${incidente.fecha}</small> <br>
                <p>${incidente.descripcion}</p>
                <span class="badge bg-${getEstadoBadge(incidente.estado)}">${incidente.estado}</span>
            `;
            listaIncidentes.appendChild(listItem);
        });
    }

    // Función para obtener el badge de estado según el estado del incidente
    function getEstadoBadge(estado) {
        switch (estado) {
            case 'Pendiente':
                return 'warning';
            case 'Resuelto':
                return 'success';
            case 'En proceso':
                return 'info';
            default:
                return 'secondary';
        }
    }

    // Filtros
    const filtroFecha = document.getElementById("filtroFecha");
    const filtroEstado = document.getElementById("filtroEstado");
    const btnFiltrar = document.getElementById("btnFiltrar");

    // Función para aplicar los filtros
    btnFiltrar.addEventListener('click', function () {
        const fechaSeleccionada = filtroFecha.value;
        const estadoSeleccionado = filtroEstado.value;

        // Filtrar incidentes por fecha y estado
        const incidentesFiltrados = incidentes.filter(incidente => {
            const fechaIncidente = new Date(incidente.fecha);
            const fechaFiltro = new Date(fechaSeleccionada);

            return (estadoSeleccionado === 'todos' || incidente.estado === estadoSeleccionado) &&
                (fechaSeleccionada === '' || fechaIncidente.toLocaleDateString() === fechaFiltro.toLocaleDateString());
        });

        // Actualizar la lista con los incidentes filtrados
        listaIncidentes.innerHTML = '';  // Limpiar lista antes de actualizar
        incidentesFiltrados.forEach(incidente => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `
                <strong>${incidente.lugar}</strong> - ${incidente.direccion} <br>
                <small>${incidente.fecha}</small> <br>
                <p>${incidente.descripcion}</p>
                <span class="badge bg-${getEstadoBadge(incidente.estado)}">${incidente.estado}</span>
            `;
            listaIncidentes.appendChild(listItem);
        });
    });

    // Inicialmente cargar todos los incidentes
    cargarIncidentes();
});
