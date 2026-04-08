
// MARJ SCENTS - MAIN JAVASCRIPT
// WITH IMAGE SUPPORT FOR CATEGORY AND PRODUCT DISPLAYS
// ========================================

let cart = [];
let currentCategory = null;
let currentProduct = null;
let currentVariant = null;

// ========================================
// PRODUCT DATA STRUCTURE (WITH IMAGES)
// ========================================

const PRODUCTS_DATA = {
    currency: "₦",
    business: {
        name: "Marj Scents",
        whatsapp: "2347062297460",
        email: "Marisosaigbovo@gmail.com",
        address: "Plot K26 Cooperative Villa Estate, Badore Ajah, Lagos",
        hours: "24 hours"
    },
    categories: [
        {
            id: "body-sprays",
            name: "Body Sprays",
            description: "Light, refreshing daily fragrances for adults and kids",
            badge: null,
            image: "images/categories/body-sprays.jpg",
            products: [
                { name: "Body Sprays", price: 5000, stock: 10, image: "images/products/body-spray.jpg" },
                { name: "Kids Body Sprays", price: 3500, stock: 10, image: "images/products/kids-body-spray.jpg" }
            ]
        },
        {
            id: "scented-candles",
            name: "Scented Candles",
            description: "Hand-poured luxury candles for ambiance",
            badge: null,
            image: "images/categories/scented-candles.jpg",
            products: [
                { name: "Scented Candles", price: 9000, stock: 10, image: "images/products/candle.jpg" }
            ]
        },
        {
            id: "diffusers",
            name: "Diffusers",
            description: "Elegant home and car fragrance solutions",
            badge: "Home",
            image: "images/categories/diffusers.jpg",
            products: [
                { name: "Via Pinky Diffusers", price: 10000, stock: 10, image: "images/products/via-pinky-diffuser.jpg" },
                { name: "Diffuser Refill", price: 13500, stock: 10, image: "images/products/diffuser-refill.jpg" },
                { name: "Car Diffusers", price: 3500, stock: 15, image: "images/products/car-diffuser.jpg" }
            ]
        },
        {
            id: "designer-perfumes",
            name: "Designer Perfumes",
            description: "Authentic designer fragrances",
            badge: "Luxury",
            image: "images/categories/designer-perfumes.jpg",
            products: [
                { name: "Breed Floral Satin", price: 35000, stock: 5, image: "images/products/breed-floral-satin.jpg" },
                { name: "Oud Al Paul", price: 25000, stock: 5, image: "images/products/oud-al-paul.jpg" },
                { name: "9pm/9am", price: 15000, stock: 5, image: "images/products/9pm-9am.jpg" },
                { name: "Mousuf", price: 10000, stock: 5, image: "images/products/mousuf.jpg" },
                { name: "Club de Nuit Sillage", price: 75000, stock: 3, badge: "Premium", image: "images/products/club-de-nuit-sillage.jpg" },
                { name: "Club de Nuit Intense Man", price: 75000, stock: 3, badge: "Premium", image: "images/products/club-de-nuit-intense-man.jpg" }
            ]
        },
        {
            id: "accessories",
            name: "Accessories",
            description: "Perfume accessories and tools",
            badge: null,
            image: "images/categories/accessories.jpg",
            products: [
                { name: "Atomizers", price: 3500, stock: 20, image: "images/products/atomizers.jpg" }
            ]
        },
        {
            id: "perfume-oils",
            name: "Perfume Oils",
            description: "Long-lasting, alcohol-free concentrated fragrance oils",
            badge: "Bestseller",
            image: "images/categories/perfume-oils.jpg",
            products: [
                { name: "Bacarat Rouge", variants: [{ size: "30ml", price: 16000 }], image: "images/products/bacarat-rouge.jpg" },
                { name: "Amouage Interlude", variants: [{ size: "20ml", price: 12000 }], image: "images/products/amouage-interlude.jpg" },
                { name: "Oud Maracuja", variants: [{ size: "20ml", price: 12000 }], image: "images/products/oud-maracuja.jpg" },
                { name: "Bianco Latte", variants: [{ size: "10ml", price: 6000 }, { size: "6ml", price: 3500 }], image: "images/products/bianco-latte.jpg" },
            ]
        }
    ]
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("Marj Scents loaded");
    renderProducts();
    updateCartUI();
    setupEventListeners();
    setupScrollEffects();
    setupAnimations();
});

// ========================================
// PRODUCT RENDERING - CATEGORY CARDS WITH IMAGES
// ========================================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const html = PRODUCTS_DATA.categories.map(category => renderCategoryCard(category)).join('');
    grid.innerHTML = html;
}

function renderCategoryCard(category) {
    const pricedProducts = category.products.filter(p => p.price !== null || p.variants);
    const totalProducts = category.products.length;
    const minPrice = getMinPrice(category);
    const maxPrice = getMaxPrice(category);
    
    // Preview first 5 products
    const previewProducts = category.products.slice(0, 5);

    return `
        <div class="product-card fade-in category-card" data-category="${category.id}">
            <div class="product-image">
                ${category.badge ? `<span class="product-badge">${category.badge}</span>` : ''}
                <span class="stock-badge in">${pricedProducts.length}/${totalProducts} Available</span>
                <img src="${category.image}" alt="${category.name}" class="category-image" onerror="this.style.display='none'; this.parentElement.innerHTML += '<span class=\\'category-fallback\\'>${category.name.charAt(0)}</span>';">
            </div>
            <div class="product-info">
                <h3 class="product-name">${category.name}</h3>
                <p class="product-description">${category.description}</p>
                
                <div class="product-preview">
                    ${previewProducts.map(p => `
                        <span class="preview-tag ${p.price === null && !p.variants ? 'inquiry' : ''}">
                            ${p.name}
                        </span>
                    `).join('')}
                    ${category.products.length > 5 ? `<span class="preview-tag more">+${category.products.length - 5}</span>` : ''}
                </div>
                
                <div class="product-footer">
                    <div class="product-price">
                        <span class="currency">₦</span>${minPrice} — ₦${maxPrice}
                    </div>
                    <button class="add-to-cart select-btn" onclick="openProductSelector('${category.id}')">
                        <span>Select</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// PRODUCT SELECTOR MODAL WITH IMAGES
// ========================================

function openProductSelector(categoryId) {
    const category = PRODUCTS_DATA.categories.find(c => c.id === categoryId);
    
    currentCategory = category;
    currentProduct = null;
    currentVariant = null;

    const modal = document.createElement('div');
    modal.id = 'productSelectorModal';
    modal.className = 'modal-overlay active';
    
    modal.innerHTML = `
        <div class="selector-modal">
            <button class="close-modal" onclick="closeProductSelector()">
                <i class="fas fa-times"></i>
            </button>

            <div class="selector-header">
                <div class="selector-image">
                    <img src="${category.image}" alt="${category.name}" onerror="this.style.display='none'; this.parentElement.innerHTML = '<div class=\\'selector-fallback\\'>${category.name.charAt(0)}</div>';">
                </div>
                <h2>${category.name}</h2>
                <p>${category.description}</p>
            </div>

            <div class="selector-content">
                <div class="product-dropdown-section">
                    <label>Select Product:</label>
                    <select id="productSelect" class="product-select" onchange="onProductSelect(this.value)">
                        <option value="">-- Choose ${category.name} --</option>
                        ${category.products.map(product => {
                            const hasPrice = product.price !== null || product.variants;
                            const priceText = product.variants 
                                ? '(₦' + Math.min(...product.variants.map(v => v.price)).toLocaleString() + '+)'
                                : product.price 
                                    ? '(₦' + product.price.toLocaleString() + ')'
                                    : '(Inquiry)';
                            return `
                                <option value="${product.name}" data-has-price="${hasPrice}" data-image="${product.image || ''}">
                                    ${product.name} ${hasPrice ? priceText : '(Price on request)'}
                                </option>
                            `;
                        }).join('')}
                    </select>
                </div>

                <div id="productImageSection" class="product-image-section hidden">
                    <img id="selectedProductImage" src="" alt="Product" onerror="this.style.display='none';">
                </div>

                <div id="variantSection" class="variant-section hidden">
                    <label>Select Size/Variant:</label>
                    <div id="variantOptions" class="variant-options"></div>
                </div>

                <div id="productSummary" class="product-summary hidden">
                    <div class="summary-card">
                        <div class="summary-row">
                            <span>Category:</span>
                            <strong>${category.name}</strong>
                        </div>
                        <div class="summary-row">
                            <span>Product:</span>
                            <strong id="summaryProductName"></strong>
                        </div>
                        <div class="summary-row" id="variantRow">
                            <span>Variant:</span>
                            <strong id="summaryVariant"></strong>
                        </div>
                        <div class="summary-divider"></div>
                        <div class="summary-row total">
                            <span>Price:</span>
                            <strong class="price" id="summaryPrice"></strong>
                        </div>
                    </div>
                    <button class="add-to-cart-btn" onclick="addSelectedToCart()">
                        <i class="fas fa-shopping-bag"></i>
                        Add to Cart
                    </button>
                </div>

                <div id="inquirySection" class="inquiry-section hidden">
                    <div class="inquiry-card">
                        <i class="fab fa-whatsapp"></i>
                        <h4>Price on Request</h4>
                        <p>This item is available by inquiry. Contact us on WhatsApp for pricing.</p>
                        <a href="https://wa.me/${PRODUCTS_DATA.business.whatsapp}?text=Hello! I'm interested in ${currentProduct ? currentProduct.name : 'a product'} from ${category.name}. Please send me the price." 
                           class="whatsapp-inquiry-btn" target="_blank">
                            <i class="fab fa-whatsapp"></i>
                            Inquire on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function onProductSelect(productName) {
    const product = currentCategory.products.find(p => p.name === productName);
    
    currentProduct = product;
    currentVariant = null;

    const productImageSection = document.getElementById('productImageSection');
    const selectedProductImage = document.getElementById('selectedProductImage');
    const variantSection = document.getElementById('variantSection');
    const productSummary = document.getElementById('productSummary');
    const inquirySection = document.getElementById('inquirySection');
    const variantRow = document.getElementById('variantRow');

    // Show product image if available
    if (product && product.image) {
        selectedProductImage.src = product.image;
        selectedProductImage.style.display = 'block';
        productImageSection.classList.remove('hidden');
    } else {
        productImageSection.classList.add('hidden');
    }

    if (!product) {
        variantSection.classList.add('hidden');
        productSummary.classList.add('hidden');
        inquirySection.classList.add('hidden');
        return;
    }

    // Check if product has variants (like perfume oils with sizes)
    if (product.variants && product.variants.length > 0) {
        inquirySection.classList.add('hidden');
        variantSection.classList.remove('hidden');
        
        const variantOptions = document.getElementById('variantOptions');
        variantOptions.innerHTML = product.variants.map((variant, index) => `
            <div class="variant-card" onclick="selectVariant(${index})">
                <span class="variant-size">${variant.size}</span>
                <span class="variant-price">₦${variant.price.toLocaleString()}</span>
            </div>
        `).join('');
        
        // Hide summary until variant selected
        productSummary.classList.add('hidden');
        
    } else if (product.price !== null) {
        // Simple product with single price
        variantSection.classList.add('hidden');
        inquirySection.classList.add('hidden');
        productSummary.classList.remove('hidden');
        variantRow.style.display = 'none';
        
        document.getElementById('summaryProductName').textContent = product.name;
        document.getElementById('summaryPrice').textContent = '₦' + product.price.toLocaleString();
        
    } else {
        // Price on request
        variantSection.classList.add('hidden');
        productSummary.classList.add('hidden');
        inquirySection.classList.remove('hidden');
        
        // Update inquiry message
        const inquiryBtn = inquirySection.querySelector('.whatsapp-inquiry-btn');
        inquiryBtn.href = `https://wa.me/${PRODUCTS_DATA.business.whatsapp}?text=Hello! I'm interested in ${product.name} from ${currentCategory.name}. Please send me the price.`;
    }
}

function selectVariant(variantIndex) {
    const variant = currentProduct.variants[variantIndex];
    currentVariant = variant;

    // Update UI
    const cards = document.querySelectorAll('.variant-card');
    cards.forEach((card, index) => {
        card.classList.toggle('selected', index === variantIndex);
    });

    // Show summary
    const productSummary = document.getElementById('productSummary');
    const variantRow = document.getElementById('variantRow');
    
    productSummary.classList.remove('hidden');
    variantRow.style.display = 'flex';
    
    document.getElementById('summaryProductName').textContent = currentProduct.name;
    document.getElementById('summaryVariant').textContent = variant.size;
    document.getElementById('summaryPrice').textContent = '₦' + variant.price.toLocaleString();
}

function addSelectedToCart() {
    if (!currentProduct) return;
    
    let cartItem;
    
    if (currentVariant) {
        // Product with variant (e.g., perfume oil with size)
        cartItem = {
            id: `${currentCategory.id}-${currentProduct.name}-${currentVariant.size}`,
            name: `${currentProduct.name}`,
            category: currentCategory.name,
            variant: currentVariant.size,
            price: currentVariant.price,
            quantity: 1,
            image: currentProduct.image || currentCategory.image
        };
    } else {
        // Simple product
        cartItem = {
            id: `${currentCategory.id}-${currentProduct.name}`,
            name: currentProduct.name,
            category: currentCategory.name,
            variant: 'Standard',
            price: currentProduct.price,
            quantity: 1,
            image: currentProduct.image || currentCategory.image
        };
    }

    addItemToCart(cartItem);
    closeProductSelector();
}

function closeProductSelector() {
    const modal = document.getElementById('productSelectorModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
    currentCategory = null;
    currentProduct = null;
    currentVariant = null;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function getMinPrice(category) {
    let min = Infinity;
    
    category.products.forEach(product => {
        if (product.price !== null && product.price < min) {
            min = product.price;
        }
        if (product.variants) {
            product.variants.forEach(v => {
                if (v.price < min) min = v.price;
            });
        }
    });
    
    return min === Infinity ? 0 : min.toLocaleString();
}

function getMaxPrice(category) {
    let max = 0;
    
    category.products.forEach(product => {
        if (product.price !== null && product.price > max) {
            max = product.price;
        }
        if (product.variants) {
            product.variants.forEach(v => {
                if (v.price > max) max = v.price;
            });
        }
    });
    
    return max.toLocaleString();
}

// ========================================
// CART FUNCTIONS
// ========================================

function addItemToCart(item) {
    const existing = cart.find(c => c.id === item.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push(item);
    }

    updateCartUI();
    toggleCart();
    showNotification(`${item.name} added to cart`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartCount || !cartItems) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your experience is waiting</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add items to begin your fragrance journey</p>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.textContent='${item.name.charAt(0)}'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.background='var(--color-stone)'; this.style.fontSize='1.5rem'; this.style.color='var(--color-charcoal)';">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-variant">${item.variant}</div>
                    <div class="cart-item-price">₦${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <span class="remove-item" onclick="removeFromCart(${index})">Remove</span>
                    </div>
                </div>
            </div>
        `).join('');
        if (cartFooter) {
            cartFooter.style.display = 'block';
            cartTotal.textContent = '₦' + subtotal.toLocaleString();
        }
    }
}

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');

    if (!overlay || !drawer) return;

    overlay.classList.toggle('active');
    drawer.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

// ========================================
// CHECKOUT FUNCTIONS
// ========================================

function openCheckout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
    }

    const modal = document.getElementById('checkoutModal');
    const itemsContainer = document.getElementById('checkoutItems');
    const totalElement = document.getElementById('checkoutTotal');

    itemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (${item.variant}) x${item.quantity}</span>
            <span>₦${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = '₦' + subtotal.toLocaleString();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartDrawer && cartDrawer.classList.contains('active')) {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const address = document.getElementById('deliveryAddress').value.trim();

    if (!name || !phone || !address) {
        showNotification("Please fill in all required fields!");
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let message = `*New Order from Marj Scents Website*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${name}%0A`;
    message += `Phone: ${phone}%0A`;
    if (email) message += `Email: ${email}%0A`;
    message += `Address: ${address}%0A%0A`;
    message += `*Order Items:*%0A`;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.variant}) x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
    });

    message += `%0A*Subtotal: ₦${subtotal.toLocaleString()}*%0A`;
    message += `*Delivery: To be confirmed*%0A`;
    message += `*Total: ₦${subtotal.toLocaleString()} + Delivery*%0A%0A`;
    message += `Please confirm availability and send payment details.`;

    window.open(`https://wa.me/${PRODUCTS_DATA.business.whatsapp}?text=${message}`, '_blank');

    cart = [];
    updateCartUI();
    closeCheckout();
    showNotification("Order sent! Check your WhatsApp.");
    document.getElementById('checkoutForm').reset();
}

// ========================================
// SCENT FINDER & UTILITIES
// ========================================

function openScentFinder() {
    const modal = document.getElementById('scentFinderModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeScentFinder() {
    const modal = document.getElementById('scentFinderModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeScentFinder();
            closeCheckout();
            closeProductSelector();
            const cartDrawer = document.getElementById('cartDrawer');
            if (cartDrawer && cartDrawer.classList.contains('active')) toggleCart();
        }
    });

    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) closeCheckout();
        });
    }
}

function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}
