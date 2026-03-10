<template>
  <div class="card p-4 shadow-sm text-dark border-0 bg-light">
    <div class="row">
      <div class="col-lg-6">
        <h4><i class="fas fa-truck text-primary"></i> Cotizador Regional</h4>
        <p class="small text-muted mb-3">Calcula el costo por zona o haz clic en el mapa.</p>
        
        <div class="input-group mb-3">
          <input 
            type="text" 
            class="form-control" 
            v-model="city" 
            placeholder="Ej: Arica, Santiago, Castro..." 
            @keyup.enter="handleSearch"
            :disabled="isLoading"
          >
          <button class="btn btn-primary" @click="handleSearch" :disabled="isLoading">
            <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i></span>
            <span v-else>Calcular</span>
          </button>
        </div>

        <div v-if="shippingCost !== null" class="alert alert-success animate__animated animate__fadeIn">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <i class="fas fa-map-marked-alt"></i> Envío a <strong>{{ lastCityName }}</strong>: 
              <span class="fw-bold d-block fs-4">{{ formatPrice(shippingCost) }}</span>
            </div>
            <div v-if="shippingCost > 5000" class="text-end">
              <span class="badge bg-warning text-dark">Tarifa Regional</span>
            </div>
          </div>
        </div>

        <h6 class="text-muted mt-3"><i class="fas fa-history"></i> Historial reciente:</h6>
        <div v-if="!currentUser">
          <small class="text-secondary">Inicia sesión para guardar tus rutas.</small>
        </div>
        <div v-else class="d-flex flex-wrap">
          <span v-for="loc in locationHistory" :key="loc" 
                class="badge bg-white text-primary border border-primary m-1 p-2" 
                style="cursor:pointer"
                @click="city = loc; handleSearch()">
            {{ loc }}
          </span>
        </div>
      </div>

      <div class="col-lg-6 mt-4 mt-lg-0">
        <ShippingMap @locationSelected="handleMapSelection" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { currentUser, locationHistory, addLocationToHistory, triggerToast, formatPrice } from '../store.js';
import ShippingMap from './ShippingMap.vue';

const city = ref('');
const lastCityName = ref('');
const shippingCost = ref(null);
const isLoading = ref(false);

// Función que recibe la data del mapa { name, region }
const handleMapSelection = (data) => {
  // Evitamos el [object Object] poniendo solo el nombre en el input
  city.value = data.name; 
  // Calculamos usando la región detectada por la API
  calculateByRegion(data.name, data.region);
};

// Función principal de cálculo
const calculateByRegion = async (nombre, region = "") => {
  isLoading.value = true;
  shippingCost.value = null;

  // Lógica de Precios Profesional
  let factor = 1.0;
  const reg = region ? region.toLowerCase() : nombre.toLowerCase();
  const nom = nombre.toLowerCase();

  // 1. Región Metropolitana (Costo Base)
  if (reg.includes('metropolitana') || nom.includes('santiago') || nom.includes('melipilla')) {
    factor = 1.0; 
  } 
  // 2. Regiones Vecinas
  else if (reg.includes('valparaíso') || reg.includes('o\'higgins') || reg.includes('valparaiso')) {
    factor = 1.3;
  } 
  // 3. Zona Centro Norte / Sur
  else if (reg.includes('coquimbo') || reg.includes('maule') || reg.includes('biobío') || reg.includes('biobio') || reg.includes('nuble')) {
    factor = 1.8;
  } 
  // 4. Zona Norte / Sur (Larga distancia)
  else if (reg.includes('antofagasta') || reg.includes('atacama') || reg.includes('los lagos') || reg.includes('araucanía')) {
    factor = 2.5;
  } 
  // 5. Extremos
  else if (reg.includes('arica') || reg.includes('magallanes') || reg.includes('aysén') || reg.includes('punta arenas')) {
    factor = 3.5;
  } 
  else {
    factor = 1.5; // Valor por defecto para zonas no identificadas
  }

  // Simulación de delay de API
  setTimeout(() => {
    shippingCost.value = 3500 * factor;
    lastCityName.value = nombre;
    addLocationToHistory(nombre);
    isLoading.value = false;
  }, 600);
};

const handleSearch = () => {
  if (!city.value.trim()) return;
  if (!currentUser.value) {
    triggerToast("Inicia sesión para cotizar");
    return;
  }
  // Si busca por texto, usamos el texto para intentar adivinar la región
  calculateByRegion(city.value, city.value);
};
</script>

<style scoped>
.badge:hover {
  background-color: #0d6efd !important;
  color: white !important;
  transition: 0.3s;
}
</style>