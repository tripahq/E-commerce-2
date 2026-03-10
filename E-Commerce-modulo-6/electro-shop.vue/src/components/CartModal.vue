<template>
  <div class="modal fade" id="cartModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h5 class="modal-title">Tu Carrito</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" id="close-modal-btn"></button>
        </div>
        <div class="modal-body">
          <div v-for="item in groupedCart" :key="item.product.id" class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <div>
              <h6 class="mb-0">{{ item.product.name }}</h6>
              <small class="text-muted">{{ formatPrice(item.product.price) }} c/u</small>
            </div>
            <div class="d-flex align-items-center">
              <span class="me-3 fw-bold">{{ formatPrice(item.product.price * item.qty) }}</span>
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-secondary" @click="removeOne(item.product.id)">-</button>
                <span class="px-3 border d-flex align-items-center">{{ item.qty }}</span>
                <button class="btn btn-outline-secondary" @click="addToCart(item.product, 1)">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="me-auto">Total: <span class="fw-bold fs-4">{{ formatPrice(cartTotal) }}</span></div>
          <button class="btn btn-primary" @click="checkout">Pagar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { groupedCart, cartTotal, formatPrice, removeOne, addToCart, clearCart, triggerToast } from '../store.js';

const checkout = () => {
  alert("Gracias por tu compra simulada");
  clearCart();
  document.getElementById('close-modal-btn').click();
};
</script>