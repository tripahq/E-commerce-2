<template>
  <div>
    <section class="hero-section text-center py-5 bg-dark text-white">
      <div class="container">
        <h1 v-if="currentUser" class="display-4 fw-bold animate__animated animate__fadeIn">
          ¡Hola, {{ currentUser }}!
        </h1>
        <h1 v-else class="display-4 fw-bold">Electronic Shop</h1>
        
        <p v-if="lastVisitCity" class="lead">
          <i class="fas fa-map-marker-alt text-danger"></i> 
          Viendo ofertas para el despacho a: <strong>{{ lastVisitCity }}</strong>
        </p>
        <p v-else class="lead">Los mejores componentes para tus proyectos de Arduino</p>
      </div>
    </section>

    <div class="container mt-4">
      <ShippingCalculator />
    </div>

    <section class="container py-5">
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" v-for="item in productsData" :key="item.id">
          <ProductCard :product="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { currentUser, lastVisitCity } from '../store.js';
import { productsData } from '../data/products.js';
import ProductCard from '../components/ProductCard.vue';
import ShippingCalculator from '../components/ShippingCalculator.vue';
</script>