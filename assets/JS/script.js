// Base de datos de productos
const productsData = [
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
let dollarValue = null;
let currentUser = null; 
let locationHistory = [];

const toastLiveExample = document.getElementById('liveToast');

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar Dólar (Async)
    await fetchDollarValue();

    // 2. Verificar Sesión
    checkSession();

    // 3. Cargar productos
    displayProducts(productsData);

    // Preferencias de tema
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }

    // Listeners
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});

// --- SESIÓN DE USUARIO (Re-integrado y modernizado a ES6) ---

const checkSession = () => {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) {
        currentUser = savedUser;
        updateUserInterface(true);
        loadLocationHistory();
    } else {
        updateUserInterface(false);
    }
};

const openLoginModal = () => {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
};

const login = () => {
    const usernameInput = document.getElementById('username-input').value.trim();
    if (usernameInput) {
        currentUser = usernameInput;
        localStorage.setItem('activeUser', currentUser);
        
        const modalEl = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        updateUserInterface(true);
        loadLocationHistory();
        showToast(`Bienvenido, ${currentUser}`);
    } else {
        alert("Por favor ingresa un nombre.");
    }
};

const logout = () => {
    localStorage.removeItem('activeUser');
    currentUser = null;
    locationHistory = [];
    updateUserInterface(false);
    document.getElementById('locations-history').innerHTML = '<li class="list-group-item text-muted">Inicia sesión para ver tu historial</li>';
    showToast("Sesión cerrada");
};

const updateUserInterface = (isLoggedIn) => {
    const loginBtn = document.getElementById('login-btn-container');
    const sessionDisplay = document.getElementById('user-session-display');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        sessionDisplay.style.display = 'flex';
        document.getElementById('username-display').textContent = `Hola, ${currentUser}`;
        if(clearHistoryBtn) clearHistoryBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        sessionDisplay.style.display = 'none';
        if(clearHistoryBtn) clearHistoryBtn.style.display = 'none';
    }
};

// --- GESTIÓN DE LOCALIZACIONES (Re-integrado y modernizado) ---

const checkShipping = () => {
    if (!currentUser) {
        alert("Debes iniciar sesión para cotizar y guardar tu historial.");
        openLoginModal();
        return;
    }

    const locationInput = document.getElementById('shipping-location');
    const location = locationInput.value.trim();
    const resultDiv = document.getElementById('shipping-result');

    if (!location) return;

    resultDiv.innerHTML = `<div class="alert alert-success"><i class="fas fa-check"></i> Envíos disponibles a <strong>${location}</strong> desde $3.990.</div>`;

    // ES6: Spread para agregar al inicio [nuevo, ...viejos]
    locationHistory = [location, ...locationHistory];

    // Limitar a 5
    if (locationHistory.length > 5) {
        locationHistory = locationHistory.slice(0, 5);
    }

    saveLocationHistory();
    renderLocationHistory();
    locationInput.value = '';
};

const saveLocationHistory = () => {
    if (currentUser) {
        localStorage.setItem(`history_${currentUser}`, JSON.stringify(locationHistory));
    }
};

const loadLocationHistory = () => {
    if (currentUser) {
        const stored = localStorage.getItem(`history_${currentUser}`);
        locationHistory = stored ? JSON.parse(stored) : [];
        renderLocationHistory();
    }
};

const renderLocationHistory = () => {
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
};

const clearHistory = () => {
    if(confirm('¿Borrar historial de búsquedas?')) {
        locationHistory = [];
        saveLocationHistory();
        renderLocationHistory();
    }
};

// --- API FETCH (ES6) ---

const fetchDollarValue = async () => {
    try {
        const response = await fetch('https://mindicador.cl/api/dolar');
        const data = await response.json();
        
        const { serie } = data;
        if (serie && serie.length > 0) {
            dollarValue = serie[0].valor;
            const dollarEl = document.getElementById('dollar-indicator');
            dollarEl.innerHTML = `<small><i class="fas fa-money-bill-wave"></i> Dólar: $${dollarValue} CLP</small>`;
        }
    } catch (error) {
        console.error("Error fetching API:", error);
        document.getElementById('dollar-indicator').innerText = "Dólar no disponible";
    }
};

// --- VISUALES (ES6) ---

const toggleTheme = () => {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const showToast = (message) => {
    const toastBody = document.getElementById('toast-message');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
};

// --- PRODUCTOS (ES6) ---

const displayProducts = (productsToShow = []) => {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (productsToShow.length === 0) {
        container.innerHTML = '<div class="col-12 text-center mt-5"><h3>No se encontraron productos :(</h3></div>';
        return;
    }

    productsToShow.forEach(({ id, name, price, image }) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3';
        const imgSrc = image || PLACEHOLDER_IMG;

        col.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-img">
                    <img src="${imgSrc}" alt="${name}" class="product-card-img">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${name}</h5>
                    <p class="product-price mt-auto">$${price.toLocaleString('es-CL')}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary btn-sm" onclick="showProductDetail(${id})">
                            Ver Detalles
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${id})">
                            <i class="fas fa-cart-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
};

const searchProducts = () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = productsData.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
};

const filterCategory = (category) => {
    currentFilter = category;
    [...document.querySelectorAll('.category-btn')].forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = category === 'todos' 
        ? productsData 
        : productsData.filter(p => p.category === category);
        
    displayProducts(filtered);
    document.getElementById('search-input').value = '';
};

// --- DETALLE Y CARRITO (ES6) ---

const addToCart = (productId) => {
    const product = productsData.find(p => p.id === productId);
    cart = [...cart, product];
    updateCartCount();
    showToast(`${product.name} agregado al carrito`);
};

const updateCartCount = () => {
    const countEl = document.getElementById('cart-count');
    countEl.textContent = cart.length;
    countEl.classList.add('animate__bounceIn');
};

const showProductDetail = (productId) => {
    currentProduct = productsData.find(p => p.id === productId);
    const { name, price, description, specs, image } = currentProduct;
    const imgSrc = image || PLACEHOLDER_IMG;

    document.getElementById('detail-img').innerHTML = `<img src="${imgSrc}" alt="${name}" class="img-fluid detail-img-el">`;
    document.getElementById('detail-title').textContent = name;
    document.getElementById('detail-price').textContent = `$${price.toLocaleString('es-CL')}`;
    
    // Mostrar conversión si hay valor de dólar
    if (dollarValue) {
        const usdPrice = (price / dollarValue).toFixed(2);
        document.getElementById('detail-price-usd').textContent = `(Aprox $${usdPrice} USD)`;
    } else {
        document.getElementById('detail-price-usd').textContent = '';
    }

    document.getElementById('detail-description').textContent = description;

    const specsList = document.getElementById('detail-specs');
    specsList.innerHTML = '';
    specs.forEach(spec => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<i class="fas fa-check text-success me-2"></i> ${spec}`;
        specsList.appendChild(li);
    });

    document.getElementById('page-home').style.display = 'none';
    document.getElementById('page-product-detail').style.display = 'block';
    window.scrollTo(0, 0);
};

const showHome = () => {
    document.getElementById('page-home').style.display = 'block';
    document.getElementById('page-product-detail').style.display = 'none';
    window.scrollTo(0, 0);
};

const addToCartFromDetail = () => {
    const quantity = parseInt(document.getElementById('detail-quantity').value);
    if (quantity > 0) {
        const newItems = Array(quantity).fill(currentProduct);
        cart = [...cart, ...newItems];
        updateCartCount();
        showToast(`${quantity} unidades agregadas al carrito`);
    }
};

const openCartModal = () => {
    const modalEl = document.getElementById('cartModal');
    renderCart();
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
};

const renderCart = () => {
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
    Object.values(map).forEach(({ product, qty }) => {
        const { id, name, price, image } = product;
        total += price * qty;

        const itemEl = document.createElement('div');
        itemEl.className = 'list-group-item d-flex align-items-center justify-content-between';

        itemEl.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${image || PLACEHOLDER_IMG}" style="width:50px;height:50px;object-fit:contain;margin-right:10px;">
                <div>
                    <div class="fw-bold">${name}</div>
                    <small class="text-muted">$${price.toLocaleString('es-CL')} x ${qty}</small>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <span class="fw-bold me-3">$${(price * qty).toLocaleString('es-CL')}</span>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" onclick="removeOne(${id})">-</button>
                    <button class="btn btn-outline-danger" onclick="removeAll(${id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemEl);
    });

    totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
};

const removeOne = (productId) => {
    const idx = cart.findIndex(p => p.id === productId);
    if (idx !== -1) {
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
    }
};

const removeAll = (productId) => {
    cart = cart.filter(p => p.id !== productId);
    updateCartCount();
    renderCart();
};

const clearCart = () => {
    if (cart.length === 0) return;
    if (!confirm('¿Vaciar todo el carrito?')) return;
    cart = [];
    updateCartCount();
    renderCart();
};

const checkout = () => {
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
};