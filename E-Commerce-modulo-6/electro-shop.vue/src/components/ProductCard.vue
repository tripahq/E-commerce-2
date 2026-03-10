<template>
  <div class="card product-card h-100">
    <div class="product-img">
      <img :src="product.image" class="product-card-img">
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-dark">{{ product.name }}</h5>
      <p class="product-price mt-auto text-primary fw-bold">{{ formatPrice(product.price) }}</p>
      
      <div class="d-flex justify-content-center mb-2">
        <div class="input-group input-group-sm w-75">
          <button class="btn btn-outline-secondary" @click="decreaseQuantity">-</button>
          <input type="number" class="form-control text-center" v-model.number="quantity">
          <button class="btn btn-outline-secondary" @click="increaseQuantity">+</button>
        </div>
      </div>

      <div class="d-grid gap-2">
        <RouterLink :to="`/producto/${product.id}`" class="btn btn-outline-primary btn-sm">Detalles</RouterLink>
        <button class="btn btn-primary btn-sm" @click="handleAdd">Agregar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { formatPrice, addToCart } from '../store.js';

const props = defineProps({ product: Object });
const quantity = ref(1);

const decreaseQuantity = () => { if (quantity.value > 1) quantity.value--; };
const increaseQuantity = () => { quantity.value++; };
const handleAdd = () => { addToCart(props.product, quantity.value); quantity.value = 1; };
</script>