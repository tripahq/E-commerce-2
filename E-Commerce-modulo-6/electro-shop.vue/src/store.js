import { ref, computed } from 'vue';

// --- SISTEMA DE DIVISAS ---
export const dollarValue = ref(850); 
export const currencyMode = ref('CLP'); 

export const fetchDollar = async () => {
  try {
    const response = await fetch('https://mindicador.cl/api/dolar');
    const data = await response.json();
    if (data.serie && data.serie.length > 0) dollarValue.value = data.serie[0].valor;
  } catch (error) { console.error("Error dólar:", error); }
};

export const formatPrice = (priceInCLP) => {
  if (currencyMode.value === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceInCLP / dollarValue.value);
  }
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(priceInCLP);
};

// --- USUARIO Y PERSONALIZACIÓN DE VISITA ---
export const currentUser = ref(null);
export const lastVisitCity = ref(localStorage.getItem('lastCity') || null);

export const login = (username) => {
  currentUser.value = username;
  localStorage.setItem('activeUser', username);
  triggerToast(`¡Bienvenido de nuevo, ${username}!`);
};

export const logout = () => {
  currentUser.value = null;
  lastVisitCity.value = null;
  localStorage.removeItem('activeUser');
  localStorage.removeItem('lastCity');
};

export const checkSession = () => {
  const savedUser = localStorage.getItem('activeUser');
  if (savedUser) currentUser.value = savedUser;
};

// --- ENVÍOS E HISTORIAL PERSONALIZADO ---
export const locationHistory = ref(JSON.parse(localStorage.getItem('history')) || []);

export const addLocationToHistory = (location) => {
  if (currentUser.value) {
    lastVisitCity.value = location;
    localStorage.setItem('lastCity', location); // Guardamos su preferencia
    
    if (!locationHistory.value.includes(location)) {
      locationHistory.value.unshift(location);
      if (locationHistory.value.length > 5) locationHistory.value.pop();
      localStorage.setItem('history', JSON.stringify(locationHistory.value));
    }
  }
};

// --- RESTO DEL STORE (CARRITO Y NOTIFICACIONES) ---
export const toastMessage = ref('');
export const showToast = ref(false);
export const triggerToast = (m) => { toastMessage.value = m; showToast.value = true; setTimeout(() => showToast.value = false, 3000); };

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

export const addToCart = (p, q = 1) => { for (let i = 0; i < q; i++) cart.value.push(p); };
export const removeOne = (id) => { const idx = cart.value.findIndex(p => p.id === id); if (idx !== -1) cart.value.splice(idx, 1); };
export const clearCart = () => { cart.value = []; };