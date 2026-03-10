<template>
  <div>
    <Navbar />
    <CartModal />
    <LoginModal /> <ToastNotification />

    <main style="min-height: 70vh;">
      <RouterView />
    </main>

    <footer id="footer">
      <div class="container text-center">
        <p class="mb-0">&copy; 2026 ElectroShop en Vue.js.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import CartModal from './components/CartModal.vue';
import ToastNotification from './components/ToastNotification.vue';
import LoginModal from './components/LoginModal.vue'; // IMPORTAMOS EL ARCHIVO NUEVO
import { checkSession } from './store.js'; // Función para mantener la sesión

// Apenas carga la aplicación, revisa si había alguien conectado
onMounted(() => {
  checkSession();
});
</script>

<style>
@import './assets/main.css';
</style>