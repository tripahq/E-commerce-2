<template>
  <div>
    <section class="hero-section text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Electronic</h1>
        <p class="lead">Todo lo que necesitas para tus proyectos de electrónica y Arduino</p>
      </div>
    </section>

    <div class="container mb-5">
      <ShippingCalculator />
    </div>

    <div class="container mb-4 text-center">
       <input type="text" v-model="searchQuery" class="form-control mb-3 w-50 mx-auto" placeholder="Buscar componente...">
       <div class="category-filter">
          <button v-for="cat in categories" :key="cat" 
                  @click="currentCategory = cat"
                  :class="['btn btn-outline-primary category-btn', { active: currentCategory === cat }]">
            {{ cat.toUpperCase() }}
          </button>
       </div>
    </div>

    <section class="container pb-5">
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" v-for="item in filteredProducts" :key="item.id">
          <ProductCard :product="item" @add-to-cart="handleAddToCart" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import ShippingCalculator from '../components/ShippingCalculator.vue'; // <-- ¡Lo importamos!
import { productsData } from '../data/products.js';
import { addToCart } from '../store.js';

const searchQuery = ref('');
const currentCategory = ref('todos');
const categories = ['todos', 'sensores', 'resistencias', 'arduino', 'componentes'];

const filteredProducts = computed(() => {
  if (!productsData) return []; 
  let filtered = productsData;
  if (currentCategory.value !== 'todos') {
    filtered = filtered.filter(p => p.category === currentCategory.value);
  }
  if (searchQuery.value) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  return filtered;
});

const handleAddToCart = (itemToCart, qty) => {
  addToCart(itemToCart, qty);
};
</script>