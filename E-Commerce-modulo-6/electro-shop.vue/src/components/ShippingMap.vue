<template>
  <div class="map-container shadow-sm rounded border">
    <div id="map" style="height: 450px; width: 100%; cursor: pointer;"></div>
    <div class="bg-dark text-white p-2 text-center" style="font-size: 0.85rem;">
      <i class="fas fa-map-marker-alt text-primary me-2"></i>
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Reparación de iconos
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon, iconRetinaUrl: markerIconRetina, shadowUrl: markerShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const emit = defineEmits(['locationSelected']);
const statusMessage = ref('Haz clic para detectar tu localidad');
let map;
let currentMarker;

onMounted(() => {
  map = L.map('map').setView([-35.6751, -71.543], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  map.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    statusMessage.value = "Detectando localidad...";

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const addr = data.address;

      // Buscamos el nombre de la localidad
      const locationName = addr.city || addr.town || addr.village || addr.suburb || "Nueva Localidad";
      // Guardamos la región para que el calculador sea preciso
      const regionName = addr.state || "";

      statusMessage.value = `Localidad: ${locationName}`;

      if (currentMarker) map.removeLayer(currentMarker);
      currentMarker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>Localidad:</b><br>${locationName}`)
        .openPopup();

      // Enviamos el nombre y la región al padre
      emit('locationSelected', { name: locationName, region: regionName });

    } catch (error) {
      statusMessage.value = "Error al detectar. Intenta de nuevo.";
    }
  });
});
</script>