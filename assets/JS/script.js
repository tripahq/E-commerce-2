// Base de datos de productos
        const products = [
            {
                id: 1,
                name: 'Arduino UNO R3',
                price: 15990,
                category: 'arduino',
                image: 'https://i.pinimg.com/1200x/d9/44/5c/d9445cda32fcfdbb8c674becf26fcd7c.jpg',
                description: 'Placa de desarrollo Arduino UNO R3 con microcontrolador ATmega328P. Ideal para proyectos de electrónica y programación.',
                specs: [
                    'Microcontrolador: ATmega328P',
                    'Voltaje de operación: 5V',
                    '14 pines digitales I/O',
                    '6 entradas analógicas',
                    'Memoria Flash: 32KB'
                ]
            },
            {
                id: 2,
                name: 'Sensor Ultrasónico HC-SR04',
                price: 2990,
                category: 'sensores',
                image: 'https://i.pinimg.com/736x/ff/64/26/ff6426ed7697806f85a4cd99724b32de.jpg',
                description: 'Sensor de distancia por ultrasonido con rango de medición de 2cm a 400cm. Perfecto para proyectos de robótica.',
                specs: [
                    'Rango: 2cm - 400cm',
                    'Voltaje: 5V DC',
                    'Ángulo de medición: 15°',
                    'Frecuencia: 40Hz'
                ]
            },
            {
                id: 3,
                name: 'Resistencia 220Ω (Pack 100)',
                price: 990,
                category: 'resistencias',
                image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F0131794-01',
                description: 'Pack de 100 resistencias de 220 ohmios, 1/4W. Ideales para limitar corriente en LEDs y circuitos.',
                specs: [
                    'Resistencia: 220Ω',
                    'Tolerancia: ±5%',
                    'Potencia: 1/4W',
                    'Cantidad: 100 unidades'
                ]
            },
            {
                id: 4,
                name: 'Potenciómetro 10KΩ',
                price: 890,
                category: 'componentes',
                image: 'https://triacs.cl/3098-superlarge_default_2x/modulo-potenciometro-10k.jpg',
                description: 'Potenciómetro lineal de 10K ohm con eje estriado. Excelente para control de volumen y ajustes variables.',
                specs: [
                    'Resistencia: 10KΩ',
                    'Tipo: Lineal',
                    'Potencia: 0.125W',
                    'Eje: 6mm estriado'
                ]
            },
            {
                id: 5,
                name: 'Fotoresistor LDR 5mm',
                price: 490,
                category: 'sensores',
                image: 'https://monarcatech.com/cdn/shop/articles/33_1626f6a3-9d5a-4e17-bc0e-5610ce7ed448.jpg?v=1694204031&width=1100',
                description: 'Fotoresistor dependiente de luz (LDR) para detectar niveles de iluminación. Ideal para proyectos con control automático.',
                specs: [
                    'Resistencia luz: 8-20KΩ',
                    'Resistencia oscuridad: 1MΩ',
                    'Voltaje máximo: 150V',
                    'Diámetro: 5mm'
                ]
            },
            {
                id: 6,
                name: 'Sensor de Temperatura DHT11',
                price: 3490,
                category: 'sensores',
                image: 'https://mcielectronics.cl/wp-content/uploads/2024/08/qqq.png',
                description: 'Sensor digital de temperatura y humedad. Comunicación de un solo cable con salida digital calibrada.',
                specs: [
                    'Rango temperatura: 0-50°C',
                    'Rango humedad: 20-90%',
                    'Voltaje: 3-5.5V',
                    'Precisión: ±2°C, ±5%'
                ]
            },
            {
                id: 7,
                name: 'Arduino Nano',
                price: 8990,
                category: 'arduino',
                image: 'https://botland.store/img/art/inne/24792_2.jpg',
                description: 'Placa Arduino Nano compacta con chip CH340. Perfecta para proyectos con espacio limitado.',
                specs: [
                    'Microcontrolador: ATmega328',
                    'Voltaje: 5V',
                    'Pines digitales: 14',
                    'Pines analógicos: 8',
                    'Memoria: 32KB'
                ]
            },
            {
                id: 8,
                name: 'Protoboard 830 puntos',
                price: 2490,
                category: 'componentes',
                image: 'https://http2.mlstatic.com/D_NQ_NP_692622-MLC31210796996_062019-O-protoboard-830-puntos-modelo-mb102-arduino-pic-max-.webp',
                description: 'Protoboard de 830 puntos de contacto para prototipos sin soldadura. Incluye líneas de alimentación.',
                specs: [
                    'Puntos: 830',
                    'Dimensiones: 165x55mm',
                    'Material: ABS',
                    'Color: Blanco'
                ]
            },
            {
                id: 9,
                name: 'Sensor de Movimiento PIR',
                price: 2790,
                category: 'sensores',
                image: 'https://www.mechatronicstore.cl/wp-content/uploads/2015/08/2.jpg',
                description: 'Sensor infrarrojo pasivo para detección de movimiento. Ajuste de sensibilidad y tiempo de retardo.',
                specs: [
                    'Rango: 3-7 metros',
                    'Ángulo: 120°',
                    'Voltaje: 5-20V DC',
                    'Salida: Digital'
                ]
            },
            {
                id: 10,
                name: 'Resistencia Variable 1KΩ',
                price: 1290,
                category: 'resistencias',
                image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F1542397-01',
                description: 'Potenciómetro de precisión de 1K ohm con ajuste multivuelta. Ideal para calibraciones finas.',
                specs: [
                    'Resistencia: 1KΩ',
                    'Vueltas: 10',
                    'Potencia: 0.5W',
                    'Tolerancia: ±5%'
                ]
            },
            {
                id: 11,
                name: 'Kit Arduino Starter',
                price: 32990,
                category: 'arduino',
                image: 'https://arduino.cl/wp-content/uploads/2019/09/Arduino-Starter-Kit-en-Espanol-3.webp',
                description: 'Kit completo para comenzar con Arduino. Incluye UNO, sensores, LEDs, resistencias y más de 200 componentes.',
                specs: [
                    'Arduino UNO R3',
                    '+ de 200 componentes',
                    'Cable USB incluido',
                    'Manual en español'
                ]
            },
            {
                id: 12,
                name: 'Resistencia 10KΩ (Pack 50)',
                price: 690,
                category: 'resistencias',
                image: 'https://http2.mlstatic.com/D_NQ_NP_2X_658424-MLC74613805017_022024-T-10x-pack-resistencia-14-watt-025-watts-10000-ohm-10k.webp',
                description: 'Pack de 50 resistencias de 10K ohm, ideal para pull-up/pull-down en circuitos digitales.',
                specs: [
                    'Resistencia: 10KΩ',
                    'Tolerancia: ±5%',
                    'Potencia: 1/4W',
                    'Cantidad: 50 unidades'
                ]
            }
        ];

        const PLACEHOLDER_IMG = 'images/placeholder.png';

        let cart = [];
        let currentFilter = 'todos';
        let currentProduct = null;

        // Cargar productos al iniciar
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
        });

        // Mostrar productos
        function displayProducts(productsToShow) {
            const container = document.getElementById('products-container');
            container.innerHTML = '';

            productsToShow.forEach(product => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-lg-3';
                const imgSrc = product.image || PLACEHOLDER_IMG;

                col.innerHTML = `
                    <div class="card product-card">
                        <div class="product-img">
                            <img src="${imgSrc}" alt="${product.name}" class="product-card-img">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="product-price">$${product.price.toLocaleString('es-CL')}</p>
                            <button class="btn btn-primary btn-sm w-100 mb-2" onclick="showProductDetail(${product.id})">
                                Ver Detalles
                            </button>
                            <button class="btn btn-add-cart btn-sm w-100" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        }

        // Filtrar por categoría
        function filterCategory(category) {
            currentFilter = category;
            if (category === 'todos') {
                displayProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                displayProducts(filtered);
            }
        }

        // Agregar al carrito
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCartCount();
            showNotification('Producto agregado al carrito');
        }

        // Actualizar contador del carrito
        function updateCartCount() {
            document.getElementById('cart-count').textContent = cart.length;
        }

        // Mostrar notificación
        function showNotification(message) {
            alert(message);
        }

        // Mostrar detalle del producto
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
                li.textContent = spec;
                specsList.appendChild(li);
            });

            document.getElementById('page-home').style.display = 'none';
            document.getElementById('page-product-detail').style.display = 'block';
            window.scrollTo(0, 0);
        }

        // Volver a inicio
        function showHome() {
            document.getElementById('page-home').style.display = 'block';
            document.getElementById('page-product-detail').style.display = 'none';
            window.scrollTo(0, 0);
        }

        // Agregar al carrito desde detalle
        function addToCartFromDetail() {
            const quantity = parseInt(document.getElementById('detail-quantity').value);
            for (let i = 0; i < quantity; i++) {
                cart.push(currentProduct);
            }
            updateCartCount();
            showNotification(`${quantity} producto(s) agregado(s) al carrito`);
        }

        // Mostrar modal y renderizar carrito
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

    // Agrupar por producto para mostrar cantidad
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
        itemEl.className = 'list-group-item d-flex align-items-center';

        itemEl.innerHTML = `
            <img src="${p.image || PLACEHOLDER_IMG}" alt="${p.name}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;margin-right:12px;">
            <div class="flex-grow-1">
                <div class="fw-bold">${p.name}</div>
                <div class="text-muted">$${p.price.toLocaleString('es-CL')} x ${qty} = <strong>$${(p.price*qty).toLocaleString('es-CL')}</strong></div>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="removeOne(${p.id})">-1</button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeAll(${p.id})">Eliminar</button>
            </div>
        `;
        itemsContainer.appendChild(itemEl);
    });

    totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
}

// Elimina una unidad del producto del carrito
function removeOne(productId) {
    const idx = cart.findIndex(p => p.id === productId);
    if (idx !== -1) {
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
    }
}

// Elimina todas las unidades del producto del carrito
function removeAll(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCartCount();
    renderCart();
}

// Vaciar carrito
function clearCart() {
    if (cart.length === 0) return;
    if (!confirm('¿Vaciar todo el carrito?')) return;
    cart = [];
    updateCartCount();
    renderCart();
}

// Finalizar compra (simulación)
function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    if (!confirm('Proceder con la compra de los productos en el carrito?')) return;
    // Aquí iría la lógica real de pago / envío.
    cart = [];
    updateCartCount();
    renderCart();
    alert('Compra realizada. Gracias.');
}

// enlazar botones del modal después de cargar DOM
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);

    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});