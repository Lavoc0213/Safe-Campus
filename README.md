# Safe-Campus
Proyecto universitario

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safe Campus - Prototipo</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    html, body { height: 100%; margin: 0; }
    #map { height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    // Crear el mapa centrado en una ubicación inicial
    const map = L.map('map').setView([6.2442, -75.5812], 15); // Medellín como ejemplo

    // Cargar tiles del mapa desde OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      map.setView([lat, lon], 16);

      // Marcar ubicación del usuario
      L.marker([lat, lon]).addTo(map).bindPopup('Tu ubicación').openPopup();

      // Zonas de riesgo de ejemplo (cambia por datos reales después)
      const zonasDeRiesgo = [
        [lat + 0.001, lon + 0.001],
        [lat - 0.0015, lon - 0.001],
        [lat + 0.0005, lon - 0.0015]
      ];

      zonasDeRiesgo.forEach(coord => {
        L.circle(coord, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 100
        }).addTo(map).bindPopup('Zona de riesgo');
      });

    }, () => {
      alert('No se pudo obtener tu ubicación');
    });
  </script>
</body>
</html>
