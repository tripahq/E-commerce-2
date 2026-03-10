<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand" to="/"><i class="fas fa-microchip"></i> Electronic</RouterLink>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          
          <li class="nav-item me-3">
            <select class="form-select form-select-sm bg-dark text-white border-secondary" v-model="currencyMode">
              <option value="CLP">CLP ($)</option>
              <option value="USD">USD (US$)</option>
            </select>
          </li>

          <li class="nav-item me-3 text-white" v-if="currencyMode === 'USD'">
            <small>Dólar: ${{ dollarValue }}</small>
          </li>

          <li class="nav-item me-3 d-flex align-items-center" v-if="currentUser">
            <span class="text-white me-2">Hola, {{ currentUser }}</span>
            <button class="btn btn-outline-danger btn-sm" @click="logout"><i class="fas fa-sign-out-alt"></i></button>
          </li>
          <li class="nav-item me-3" v-else>
            <button class="btn btn-outline-light btn-sm" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
          </li>

          <li class="nav-item">
            <button class="btn btn-outline-light position-relative" data-bs-toggle="modal" data-bs-target="#cartModal">
              <i class="fas fa-shopping-cart"></i>
              <span class="badge rounded-pill bg-danger">{{ cartCount }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue';
import { cartCount, currentUser, logout, currencyMode, dollarValue, fetchDollar } from '../store.js';

onMounted(() => {
  fetchDollar();
});
</script>