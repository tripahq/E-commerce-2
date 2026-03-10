<template>
  <div class="card p-4 shadow-sm text-dark">
    <h4><i class="fas fa-truck text-primary"></i> Cotizar Despacho</h4>
    <p class="text-muted">Consulta la disponibilidad y costo en tu zona.</p>
    
    <div class="row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="locationInput" 
                 placeholder="Ingresa tu Comuna (ej: Santiago, Viña del Mar)"
                 @keyup.enter="checkShipping">
          <button class="btn btn-primary" type="button" @click="checkShipping" :disabled="isLoading">
            <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i></span>
            <span v-else>Consultar</span>
          </button>
        </div>
        
        <div v-if="shippingResult !== null" class="alert alert-success mt-2 animate__animated animate__fadeIn">
          <i class="fas fa-check-circle"></i> Envíos disponibles a <strong>{{ lastSearchedLocation }}</strong>. 
          Costo aproximado: <strong>${{ shippingResult.toLocaleString('es-CL') }} CLP</strong>
        </div>
        
        <div v-if="loginWarning" class="alert alert-warning mt-2">
          <i class="fas fa-exclamation-triangle"></i> Debes <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">iniciar sesión</a> para cotizar envíos.
        </div>
      </div>

      <div class="col-md-4">
        <h6>Últimas ubicaciones:</h6>
        <ul class="list-group list-group-flush small">
          <li v-if="!currentUser" class="list-group-item text-muted">
            Inicia sesión para ver tu historial
          </li>
          <li v-else-if="locationHistory.length === 0" class="list-group-item text-muted">
            Sin historial reciente.
          </li>
          <li v-else v-for="(loc, index) in locationHistory" :key="index" class="list-group-item">
            <i class="fas fa-map-marker-alt text-danger me-2"></i> {{ loc }}
          </li>
        </ul>
        <button v-if="currentUser && locationHistory.length > 0" 
                class="btn btn-sm btn-outline-secondary mt-2 w-100" 
                @click="clearHistory">
          Limpiar Historial
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { currentUser, locationHistory, addLocationToHistory, clearHistory } from '../store.js';

const locationInput = ref('');
const lastSearchedLocation = ref('');
const shippingResult = ref(null);
const isLoading = ref(false);
const loginWarning = ref(false);

// --- NUESTRA "API" SIMULADA ---
const fetchShippingCostAPI = async (comuna) => {
  // Retornamos una Promesa para simular el comportamiento de una API real (fetch)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generamos un costo de envío dinámico entre $2.500 y $6.500
      const mockCost = Math.floor(Math.random() * 4000) + 2500;
      resolve(mockCost);
    }, 1200); // Simulamos 1.2 segundos de carga en la red
  });
};

// --- FUNCIÓN DEL BOTÓN ---
const checkShipping = async () => {
  loginWarning.value = false;
  shippingResult.value = null;

  if (!currentUser.value) {
    loginWarning.value = true;
    return;
  }

  if (locationInput.value.trim() === '') return;

  isLoading.value = true;
  lastSearchedLocation.value = locationInput.value;

  try {
    // 1. Llamamos a nuestra API
    const cost = await fetchShippingCostAPI(locationInput.value);
    
    // 2. Mostramos el resultado
    shippingResult.value = cost;
    
    // 3. Guardamos en el historial global
    addLocationToHistory(locationInput.value);
    
    // 4. Limpiamos el input
    locationInput.value = '';
  } catch (error) {
    console.error("Error al consultar envío:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>