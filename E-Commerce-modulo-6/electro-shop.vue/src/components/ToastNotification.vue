<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055;">
    
    <div class="toast align-items-center text-bg-success border-0" 
         :class="{ show: showToast }" 
         role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <i class="fas fa-check-circle me-2"></i> {{ toastMessage }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="showToast = false"></button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
// Traemos el estado desde nuestro cerebro
import { showToast, toastMessage } from '../store.js';
</script>

<style scoped>
/* Transición suave para que no aparezca de golpe */
.toast {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  display: block; /* Mantiene la caja en el DOM pero invisible */
}
.toast.show {
  opacity: 1;
}
</style>