import { ref, computed } from 'vue';

// --- SISTEMA DE DIVISAS (API) ---
export const dollarValue = ref(850); 
export const currencyMode = ref('CLP'); 

export const fetchDollar = async () => {
  try {
    const response = await fetch('https://mindicador.cl/api/dolar');
    const data = await response.json();
    if (data.serie && data.serie.length > 0) {
      dollarValue.value = data.serie[0].valor;
    }
  } catch (error) {
    console.error("Error cargando el dólar:", error);
  }
};

export const formatPrice = (priceInCLP) => {
  if (currencyMode.value === 'USD') {
    const converted = priceInCLP / dollarValue.value;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(converted);
  }
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(priceInCLP);
};

// --- SISTEMA DE USUARIO ---
export const currentUser = ref(null);
export const login = (username) => {
  currentUser.value = username;
  localStorage.setItem('activeUser', username);
  triggerToast(`¡Bienvenido, ${username}!`);
};
export const logout = () => {
  currentUser.value = null;
  localStorage.removeItem('activeUser');
  triggerToast('Sesión cerrada.');
};
export const checkSession = () => {
  const savedUser = localStorage.getItem('activeUser');
  if (savedUser) currentUser.value = savedUser;
};

// --- SISTEMA DE ENVÍOS ---
export const locationHistory = ref([]);
export const addLocationToHistory = (location) => {
  if (currentUser.value && !locationHistory.value.includes(location)) {
    locationHistory.value.unshift(location);
    if (locationHistory.value.length > 5) locationHistory.value.pop();
  }
};
export const clearHistory = () => { locationHistory.value = []; };

// --- NOTIFICACIONES ---
export const toastMessage = ref('');
export const showToast = ref(false);
export const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, 3000);
};

// --- CARRITO ---
export const cart = ref([]);
export const cartCount = computed(() => cart.value.length);
export const cartTotal = computed(() => cart.value.reduce((t, p) => t + p.price, 0));
export const groupedCart = computed(() => {
  const map = {};
  cart.value.forEach(p => {
    if (!map[p.id]) map[p.id] = { product: p, qty: 0 };
    map[p.id].qty++;
  });
  return Object.values(map);
});

export const addToCart = (product, quantity = 1) => {
  for (let i = 0; i < quantity; i++) cart.value.push(product);
  triggerToast(quantity > 1 ? `Agregadas ${quantity} unidades` : `Producto agregado`);
};
export const removeOne = (id) => {
  const idx = cart.value.findIndex(p => p.id === id);
  if (idx !== -1) cart.value.splice(idx, 1);
};
export const removeAll = (id) => { cart.value = cart.value.filter(p => p.id !== id); };
export const clearCart = () => { cart.value = []; };