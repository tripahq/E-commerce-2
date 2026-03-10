<template>
  <div class="container mt-5 mb-5">
    <div v-if="product">
      <RouterLink to="/" class="btn btn-outline-secondary mb-4">
        <i class="fas fa-arrow-left"></i> Volver a productos
      </RouterLink>

      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="product-detail-img shadow-sm text-center">
            <img :src="product.image || placeholder" :alt="product.name" class="img-fluid detail-img-el">
          </div>
        </div>
        
        <div class="col-md-6 text-section text-dark">
          <span class="badge bg-success mb-3 px-3 py-2">En Stock</span>
          <h1 class="fw-bold">{{ product.name }}</h1>
          
          <div class="mb-4">
            <span class="fs-2 fw-bold text-primary">${{ product.price.toLocaleString('es-CL') }}</span>
          </div>
          
          <p class="lead text-muted">{{ product.description }}</p>

          <div class="mb-4 mt-4">
            <label class="form-label fw-bold">Cantidad:</label>
            <div class="input-group w-50">
              <button class="btn btn-outline-secondary" @click="decreaseQuantity">-</button>
              <input type="number" class="form-control text-center" v-model.number="quantity" min="1">
              <button class="btn btn-outline-secondary" @click="increaseQuantity">+</button>
            </div>
          </div>

          <button class="btn btn-primary btn-lg w-100 mb-4 shadow-sm" @click="handleAdd">
            <i class="fas fa-cart-plus"></i> Agregar al Carrito
          </button>

          <div class="specifications mt-5">
            <h4 class="border-bottom pb-2">Especificaciones Técnicas</h4>
            <ul class="list-group list-group-flush mt-3">
              <li v-for="(spec, index) in product.specs" :key="index" class="list-group-item bg-transparent">
                <i class="fas fa-check text-success me-2"></i> {{ spec }}
              </li>
            </ul>
          </div>
        </div> </div> </div> <div v-else class="text-center py-5">
      <h2 class="text-danger">Producto no encontrado</h2>
      <RouterLink to="/" class="btn btn-primary mt-3">Volver a la tienda</RouterLink>
    </div>
  </div> </template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { productsData } from '../data/products.js';
import { addToCart } from '../store.js';

const route = useRoute();
const quantity = ref(1);
const placeholder = 'https://dummyimage.com/300x300/cccccc/000000&text=No+Image';

const product = computed(() => {
  const productId = parseInt(route.params.id);
  return productsData.find(p => p.id === productId);
});

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const handleAdd = () => {
  if (product.value) {
    addToCart(product.value, quantity.value);
    quantity.value = 1;
  }
};
</script>

<style scoped>
.product-detail-img {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #dee2e6;
}
.detail-img-el {
  max-height: 450px;
  object-fit: contain;
}
</style>