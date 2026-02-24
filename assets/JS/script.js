// Base de datos de productos (Misma data)
const products = [
    { id: 1, name: 'Arduino UNO R3', price: 15990, category: 'arduino', image: 'https://i.pinimg.com/1200x/d9/44/5c/d9445cda32fcfdbb8c674becf26fcd7c.jpg', description: 'Placa Arduino UNO R3 original...', specs: ['ATmega328P', '5V', '14 pines I/O'] },
    { id: 2, name: 'Sensor Ultrasónico HC-SR04', price: 2990, category: 'sensores', image: 'https://i.pinimg.com/736x/ff/64/26/ff6426ed7697806f85a4cd99724b32de.jpg', description: 'Sensor de distancia...', specs: ['Rango: 2-400cm', '5V DC'] },
    { id: 3, name: 'Resistencia 220Ω (Pack 100)', price: 990, category: 'resistencias', image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F0131794-01', description: 'Pack resistencias...', specs: ['220Ω', '1/4W'] },
    { id: 4, name: 'Potenciómetro 10KΩ', price: 890, category: 'componentes', image: 'https://triacs.cl/3098-superlarge_default_2x/modulo-potenciometro-10k.jpg', description: 'Potenciómetro lineal...', specs: ['10KΩ', 'Lineal'] },
    { id: 5, name: 'Fotoresistor LDR 5mm', price: 490, category: 'sensores', image: 'https://monarcatech.com/cdn/shop/articles/33_1626f6a3-9d5a-4e17-bc0e-5610ce7ed448.jpg?v=1694204031&width=1100', description: 'Sensor de luz...', specs: ['LDR 5mm'] },
    { id: 6, name: 'Sensor DHT11', price: 3490, category: 'sensores', image: 'https://mcielectronics.cl/wp-content/uploads/2024/08/qqq.png', description: 'Temp y Humedad...', specs: ['0-50°C', '20-90%'] },
    { id: 7, name: 'Arduino Nano', price: 8990, category: 'arduino', image: 'https://botland.store/img/art/inne/24792_2.jpg', description: 'Compacto...', specs: ['ATmega328', 'Mini USB'] },
    { id: 8, name: 'Protoboard 830', price: 2490, category: 'componentes', image: 'https://http2.mlstatic.com/D_NQ_NP_692622-MLC31210796996_062019-O-protoboard-830-puntos-modelo-mb102-arduino-pic-max-.webp', description: 'Protoboard...', specs: ['830 puntos'] },
    { id: 9, name: 'Sensor PIR', price: 2790, category: 'sensores', image: 'https://www.mechatronicstore.cl/wp-content/uploads/2015/08/2.jpg', description: 'Movimiento...', specs: ['Infrarrojo'] },
    { id: 10, name: 'Resistencia Var 1K', price: 1290, category: 'resistencias', image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F1542397-01', description: 'Trimpot...', specs: ['1K', 'Multivuelta'] },
    { id: 11, name: 'Kit Arduino Starter', price: 32990, category: 'arduino', image: 'https://arduino.cl/wp-content/uploads/2019/09/Arduino-Starter-Kit-en-Espanol-3.webp', description: 'Kit inicio...', specs: ['UNO R3', 'Cables', 'Sensores'] },
    { id: 12, name: 'Resistencia 10K (Pack 50)', price: 690, category: 'resistencias', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_658424-MLC74613805017_022024-T-10x-pack-resistencia-14-watt-025-watts-10000-ohm-10k.webp', description: 'Pack 10K...', specs: ['10KΩ', '1/4W'] }
];

const PLACEHOLDER_IMG = 'https://dummyimage.com/300x300/cccccc/000000&text=No+Image';
let cart = [];
let currentFilter = 'todos';
let currentProduct = null;
let currentUser = null; // Variable para sesión
let locationHistory = []; // Arreglo para almacenar localizaciones

const toastLiveExample = document.getElementById('liveToast');

document.addEventListener('DOMContentLoaded', function () {
    displayProducts(products);
    checkSession(); // Verificar si hay usuario logueado al inicio

    // Cargar preferencia de modo oscuro
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }

    // Listeners del modal
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});

// --- GESTIÓN DE SESIONES Y LOCALIZACIONES ---

function checkSession() {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) {
        currentUser = savedUser;
        updateUserInterface(true);
        loadLocationHistory();
    } else {
        updateUserInterface(false);
    }
}

function openLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

function login() {
    const usernameInput = document.getElementById('username-input').value.trim();
    if (usernameInput) {
        currentUser = usernameInput;
        localStorage.setItem('activeUser', currentUser);
        
        // Cerrar modal
        const modalEl = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        updateUserInterface(true);
        loadLocationHistory();
        showToast(`Bienvenido, ${currentUser}`);
    } else {
        alert("Por favor ingresa un nombre.");
    }
}

function logout() {
    localStorage.removeItem('activeUser');
    currentUser = null;
    locationHistory = []; // Limpiar arreglo en memoria
    updateUserInterface(false);
    document.getElementById('locations-history').innerHTML = '<li class="list-group-item text-muted">Inicia sesión para ver tu historial</li>';
    showToast("Sesión cerrada");
}

function updateUserInterface(isLoggedIn) {
    const loginBtn = document.getElementById('login-btn-container');
    const sessionDisplay = document.getElementById('user-session-display');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        sessionDisplay.style.display = 'flex';
        document.getElementById('username-display').textContent = `Hola, ${currentUser}`;
        clearHistoryBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        sessionDisplay.style.display = 'none';
        clearHistoryBtn.style.display = 'none';
    }
}

// Lógica de "Localizaciones" (Envío)
function checkShipping() {
    if (!currentUser) {
        alert("Debes iniciar sesión para cotizar y guardar tu historial.");
        openLoginModal();
        return;
    }

    const locationInput = document.getElementById('shipping-location');
    const location = locationInput.value.trim();
    const resultDiv = document.getElementById('shipping-result');

    if (!location) return;

    // Simulación de respuesta
    resultDiv.innerHTML = `<div class="alert alert-success"><i class="fas fa-check"></i> Envíos disponibles a <strong>${location}</strong> desde $3.990.</div>`;

    // Uso de Arreglos: Agregar al inicio (unshift)
    // Evitar duplicados consecutivos opcionalmente, pero aquí guardaremos todo el historial
    locationHistory.unshift(location);

    // Limitar historial a las últimas 5
    if (locationHistory.length > 5) {
        locationHistory.pop();
    }

    saveLocationHistory();
    renderLocationHistory();
    locationInput.value = ''; // Limpiar input
}

function saveLocationHistory() {
    if (currentUser) {
        // Clave única por usuario para distinguir sesiones
        localStorage.setItem(`history_${currentUser}`, JSON.stringify(locationHistory));
    }
}

function loadLocationHistory() {
    if (currentUser) {
        const stored = localStorage.getItem(`history_${currentUser}`);
        if (stored) {
            locationHistory = JSON.parse(stored);
            renderLocationHistory();
        } else {
            locationHistory = [];
            renderLocationHistory();
        }
    }
}

function renderLocationHistory() {
    const list = document.getElementById('locations-history');
    list.innerHTML = '';

    if (locationHistory.length === 0) {
        list.innerHTML = '<li class="list-group-item text-muted">Sin historial reciente.</li>';
        return;
    }

    locationHistory.forEach(loc => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<i class="fas fa-map-marker-alt text-danger me-2"></i> ${loc}`;
        list.appendChild(li);
    });
}

function clearHistory() {
    if(confirm('¿Borrar historial de búsquedas?')) {
        locationHistory = [];
        saveLocationHistory();
        renderLocationHistory();
    }
}

// --- FUNCIONES VISUALES EXISTENTES ---

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function showToast(message) {
    const toastBody = document.getElementById('toast-message');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

// --- LÓGICA DE PRODUCTOS EXISTENTE ---

function displayProducts(productsToShow) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (productsToShow.length === 0) {
        container.innerHTML = '<div class="col-12 text-center mt-5"><h3>No se encontraron productos :(</h3></div>';
        return;
    }

    productsToShow.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3';
        const imgSrc = product.image || PLACEHOLDER_IMG;

        col.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-img">
                    <img src="${imgSrc}" alt="${product.name}" class="product-card-img">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="product-price mt-auto">$${product.price.toLocaleString('es-CL')}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary btn-sm" onclick="showProductDetail(${product.id})">
                            Ver Detalles
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
}

function filterCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'todos') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
    document.getElementById('search-input').value = '';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    showToast(`${product.name} agregado al carrito`);
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    countEl.textContent = cart.length;
    countEl.classList.add('animate__bounceIn');
}

function showProductDetail(productId) {
    currentProduct = products.find(p => p.id === productId);
    const imgSrc = currentProduct.image || PLACEHOLDER_IMG;

    document.getElementById('detail-img').innerHTML = `<img src="${imgSrc}" alt="${currentProduct.name}" class="img-fluid detail-img-el">`;
    document.getElementById('detail-title').textContent = currentProduct.name;
    document.getElementById('detail-price').textContent = `$${currentProduct.price.toLocaleString('es-CL')}`;
    document.getElementById('detail-description').textContent = currentProduct.description;

    const specsList = document.getElementById('detail-specs');
    specsList.innerHTML = '';
    currentProduct.specs.forEach(spec => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<i class="fas fa-check text-success me-2"></i> ${spec}`;
        specsList.appendChild(li);
    });

    document.getElementById('page-home').style.display = 'none';
    document.getElementById('page-product-detail').style.display = 'block';
    window.scrollTo(0, 0);
}

function showHome() {
    document.getElementById('page-home').style.display = 'block';
    document.getElementById('page-product-detail').style.display = 'none';
    window.scrollTo(0, 0);
}

function addToCartFromDetail() {
    const quantity = parseInt(document.getElementById('detail-quantity').value);
    if (quantity > 0) {
        for (let i = 0; i < quantity; i++) {
            cart.push(currentProduct);
        }
        updateCartCount();
        showToast(`${quantity} unidades agregadas al carrito`);
    }
}

function openCartModal() {
    const modalEl = document.getElementById('cartModal');
    renderCart();
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

function renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const totalEl = document.getElementById('cart-total');

    itemsContainer.innerHTML = '';

    if (!cart || cart.length === 0) {
        emptyEl.style.display = 'block';
        totalEl.textContent = `$0`;
        return;
    }

    emptyEl.style.display = 'none';

    const map = {};
    cart.forEach(p => {
        if (!map[p.id]) map[p.id] = { product: p, qty: 0 };
        map[p.id].qty++;
    });

    let total = 0;
    Object.values(map).forEach(entry => {
        const p = entry.product;
        const qty = entry.qty;
        total += p.price * qty;

        const itemEl = document.createElement('div');
        itemEl.className = 'list-group-item d-flex align-items-center justify-content-between';

        itemEl.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${p.image || PLACEHOLDER_IMG}" style="width:50px;height:50px;object-fit:contain;margin-right:10px;">
                <div>
                    <div class="fw-bold">${p.name}</div>
                    <small class="text-muted">$${p.price.toLocaleString('es-CL')} x ${qty}</small>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <span class="fw-bold me-3">$${(p.price * qty).toLocaleString('es-CL')}</span>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" onclick="removeOne(${p.id})">-</button>
                    <button class="btn btn-outline-danger" onclick="removeAll(${p.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemEl);
    });

    totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
}

function removeOne(productId) {
    const idx = cart.findIndex(p => p.id === productId);
    if (idx !== -1) {
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
    }
}

function removeAll(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCartCount();
    renderCart();
}

function clearCart() {
    if (cart.length === 0) return;
    if (!confirm('¿Vaciar todo el carrito?')) return;
    cart = [];
    updateCartCount();
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        showToast('El carrito está vacío.');
        return;
    }
    if (!confirm('¿Proceder con la compra?')) return;
    cart = [];
    updateCartCount();
    renderCart();
    const modalEl = document.getElementById('cartModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    showToast('¡Compra realizada con éxito!');
}