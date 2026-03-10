<template>
  <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h5 class="modal-title">Iniciar Sesión</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" id="close-login-btn"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="username-input" class="form-label">Nombre de Usuario</label>
            <input type="text" class="form-control" id="username-input" v-model="usernameInput" placeholder="Ingresa tu nombre" @keyup.enter="handleLogin">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="handleLogin">Ingresar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../store.js';

const usernameInput = ref('');

const handleLogin = () => {
  if (usernameInput.value.trim() !== '') {
    login(usernameInput.value.trim()); // Enviamos el nombre al store
    usernameInput.value = ''; // Limpiamos el input
    document.getElementById('close-login-btn').click(); // Cerramos el modal
  } else {
    alert("Por favor ingresa un nombre.");
  }
};
</script>