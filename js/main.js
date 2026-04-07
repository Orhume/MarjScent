// ========================================
// MARJ SCENTS - MAIN JAVASCRIPT (WITH GITHUB FETCH)
// ========================================

let cart = [];
let finderSelections = {};
let PRODUCTS_DATA = null;
const REVIEWS_DATA = [];

// GitHub Raw URL - REPLACE WITH YOUR ACTUAL USERNAME
const CATALOG_URL = 'https://raw.githubusercontent.com/Orhume/MarjScent/main/catalog.json';

// Fallback data if GitHub fails
const FALLBACK_DATA = {
    currency: "₦",
    business: {
        name: "Marj Scents",
        whatsapp: "2347062297460",
        email: "Marisosaigbovo@gmail.com",
        address: "Plot K26 Cooperative Villa Estate, Badore Ajah, Lagos",
        hours: "24 hours"
    },
    products: [
        // COPY YOUR 12 PRODUCTS HERE AS BACKUP
        {
            id: 1,
            name: "Premium Perfume Oils",
            category: "Signature Collection",
            description: "Long-lasting, alcohol-free concentrated fragrance oils",
            price: 8500,
            originalPrice: 10000,
            image: "images/products/product1.jpg",
            badge: "Bestseller",
            variants: ["10ml", "20ml", "50ml"],
            inStock: true
        },
        {
            id: 2,
            name: "Designer Boxed Perfumes",
            category: "Luxury Line",
            description: "Authentic designer fragrances in original packaging",
            price: 25000,
            originalPrice: 35000,
            image: "images/products/product2.jpg",
            badge: "Popular",
            variants: ["30ml", "50ml", "100ml"],
            inStock: true
        },
         {
            id: 3,
            name: "Reed Diffusers",
            category: "Home Fragrance",
            description: "Elegant home fragrance solutions. Lasts 3-6 months",
            price: 12000,
            originalPrice: 15000,
            image: "images/products/product3.jpg",
            badge: "New",
            variants: ["100ml", "200ml"],
            inStock: true
        },
        // ... ADD PRODUaCTS 3-12 HERE (copy from your old file)
    ]
};

// Load from GitHub
async function loadCatalog() {
    try {
        console.log("Fetching from GitHub...");
        const response = await fetch(CATALOG_URL);
        if (!response.ok) throw new Error('Failed');
        
        const catalog = await response.json();
        
        PRODUCTS_DATA = {
            currency: catalog.currency || "₦",
            business: {
                name: catalog.business.name,
                whatsapp: catalog.business.whatsapp,
                email: catalog.business.email,
                address: FALLBACK_DATA.business.address,
                hours: FALLBACK_DATA.business.hours
            },
            products: catalog.products.map(p => ({
                ...p,
                image: `images/products/product${p.id}.jpg`,
                variants: p.variants || ["10ml", "20ml", "50ml"]
            }))
        };
        
        console.log("✅ Loaded:", catalog.lastUpdated);
        
    } catch (error) {
        console.warn("⚠️ Using fallback:", error);
        PRODUCTS_DATA = FALLBACK_DATA;
    }
    
    // Start the app
    initializeApp();
}

function initializeApp() {
    console.log("Starting...");
    try {
        renderProducts();
        renderReviews();
        updateCartUI();
        setupEventListeners();
        setupScrollEffects();
        setupAnimations();
        console.log("✅ Ready!");
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// START
document.addEventListener('DOMContentLoaded', loadCatalog);

// ========================================
// KEEP ALL FUNCTIONS BELOW (unchanged)
// ========================================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    
    if (!grid) {
        console.error("ERROR: productsGrid element not found in HTML!");
        return;
    }
    
    if (!PRODUCTS_DATA || !PRODUCTS_DATA.products || PRODUCTS_DATA.products.length === 0) {
        console.error("ERROR: No products data available");
        grid.innerHTML = '<p style="text-align:center;padding:2rem;">No products available.</p>';
        return;
    }
    
    const products = PRODUCTS_DATA.products;
    console.log("Rendering", products.length, "products...");
    
    grid.innerHTML = products.map(product => {
        // Handle image - use product.image or fallback to numbered images
        let imageHtml;
        if (product.image) {
            // Add error handler to fallback to emoji if image fails to load
            imageHtml = `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\\'font-size: 4rem;\\'>${getProductEmoji(product.category)}</span>';">`;
        } else {
            imageHtml = `<span style="font-size: 4rem;">${getProductEmoji(product.category)}</span>`;
        }
        
        const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
        const originalPriceHtml = product.originalPrice ? `<span class="original">₦${product.originalPrice.toLocaleString()}</span>` : '';
        
        return `
            <div class="product-card fade-in" onclick="showProductDetails(${product.id})">
                <div class="product-image">
                    ${badgeHtml}
                    ${imageHtml}
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="currency">₦</span>${product.price.toLocaleString()}
                            ${originalPriceHtml}
                        </div>
                        <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    console.log("Products rendered successfully!");
}

function getProductEmoji(category) {
    const emojis = {
        "Signature Collection": "🧴",
        "Luxury Line": "🎁",
        "Home Fragrance": "🌸",
        "Ambiance": "🕯️",
        "Daily Wear": "💨",
        "Accessories": "✨",
        "Home & Car": "🏠",
        "Premium Oils": "💎"
    };
    return emojis[category] || "🧴";
}

// ========================================
// REVIEWS RENDERING (FIXED - only one definition)
// ========================================

function renderReviews() {
    // Check if we're using the old reviews section or new one
    const grid = document.getElementById('reviewsGrid');
    
    // If reviewsGrid doesn't exist, the HTML uses static reviews (new version)
    if (!grid) {
        console.log("reviewsGrid not found - using static HTML reviews");
        return;
    }
    
    // Old dynamic reviews rendering (if needed)
    if (typeof REVIEWS_DATA === 'undefined') {
        console.error("REVIEWS_DATA not loaded");
        return;
    }
    
    grid.innerHTML = REVIEWS_DATA.map(review => `
        <div class="review-card fade-in" onclick="openReviewModal(${review.id})">
            <div class="review-image-container">
                <img src="${review.image}" alt="Review from ${review.customer}" class="review-image">
                <div class="review-overlay">
                    <i class="fas fa-search-plus"></i>
                    <span>Click to view</span>
                </div>
            </div>
            <div class="review-info">
                <div class="review-header">
                    <span class="reviewer-name">${review.customer}</span>
                    <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
                </div>
                <p class="review-product">${review.product}</p>
                <p class="review-caption">"${review.caption}"</p>
            </div>
        </div>
    `).join('');
}

function openReviewModal(reviewId) {
    if (typeof REVIEWS_DATA === 'undefined') return;
    
    const review = REVIEWS_DATA.find(r => r.id === reviewId);
    if (!review) return;
    
    const modal = document.createElement('div');
    modal.className = 'review-modal';
    modal.innerHTML = `
        <div class="review-modal-overlay" onclick="closeReviewModal()"></div>
        <div class="review-modal-content">
            <button class="review-modal-close" onclick="closeReviewModal()">
                <i class="fas fa-times"></i>
            </button>
            <img src="${review.image}" alt="Review from ${review.customer}" class="review-modal-image">
            <div class="review-modal-info">
                <h3>${review.customer}</h3>
                <p class="review-modal-product">${review.product}</p>
                <p class="review-modal-caption">"${review.caption}"</p>
                <span class="verified-badge large"><i class="fas fa-check-circle"></i> Verified Purchase</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeReviewModal() {
    const modal = document.querySelector('.review-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ========================================
// CART FUNCTIONS
// ========================================

function addToCart(productId) {
    if (typeof PRODUCTS_DATA === 'undefined') return;
    
    const product = PRODUCTS_DATA.products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1,
            selectedVariant: product.variants ? product.variants[0] : 'Default'
        });
    }
    
    updateCartUI();
    toggleCart();
    showNotification(`${product.name} added to cart`);
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
    
    if (!cartCount || !cartItems) {
        console.error("Cart elements not found");
        return;
    }
    
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
                <div class="cart-item-image">${getProductEmoji(item.category)}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-variant">${item.selectedVariant}</div>
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
    
    if (!overlay || !drawer) {
        console.error("Cart elements not found");
        return;
    }
    
    overlay.classList.toggle('active');
    drawer.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

// ========================================
// WHATSAPP CHECKOUT
// ========================================

// ========================================
// CHECKOUT FUNCTIONS (NEW)
// ========================================

function openCheckout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    const itemsContainer = document.getElementById('checkoutItems');
    const totalElement = document.getElementById('checkoutTotal');
    
    // Populate order summary
    itemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (${item.selectedVariant}) x${item.quantity}</span>
            <span>₦${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = '₦' + subtotal.toLocaleString();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close cart drawer if open
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
    
    // Get form values
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const address = document.getElementById('deliveryAddress').value.trim();
    
    // Validate
    if (!name || !phone || !address) {
        showNotification("Please fill in all required fields!");
        return;
    }
    
    // Build WhatsApp message
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const business = PRODUCTS_DATA.business;
    
    let message = `*New Order from ${business.name} Website*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${name}%0A`;
    message += `Phone: ${phone}%0A`;
    if (email) message += `Email: ${email}%0A`;
    message += `Address: ${address}%0A%0A`;
    message += `*Order Items:*%0A`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.selectedVariant}) x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
    });
    
    message += `%0A*Subtotal: ₦${subtotal.toLocaleString()}*%0A`;
    message += `*Delivery: To be confirmed*%0A`;
    message += `*Total: ₦${subtotal.toLocaleString()} + Delivery*%0A%0A`;
    message += `Please confirm availability and send payment details.`;
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/${business.whatsapp}?text=${message}`;
    window.open(whatsappURL, '_blank');
    
    // Clear cart and close modal
    cart = [];
    updateCartUI();
    closeCheckout();
    showNotification("Order sent! Check your WhatsApp.");
    
    // Reset form
    document.getElementById('checkoutForm').reset();
}

// ========================================
// UPDATED CART FUNCTIONS
// ========================================

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartCount || !cartItems) {
        console.error("Cart elements not found");
        return;
    }
    
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
                <div class="cart-item-image">${getProductEmoji(item.category)}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-variant">${item.selectedVariant}</div>
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

// ========================================
// UPDATED EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeScentFinder();
            closeCheckout(); // Add this
            const cartDrawer = document.getElementById('cartDrawer');
            if (cartDrawer && cartDrawer.classList.contains('active')) {
                toggleCart();
            }
            closeReviewModal();
        }
    });
    
    // Close checkout when clicking overlay
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                closeCheckout();
            }
        });
    }
}
// ========================================
// SCENT FINDER QUIZ
// ========================================

function openScentFinder() {
    const modal = document.getElementById('scentFinderModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        resetFinder();
    }
}

function closeScentFinder() {
    const modal = document.getElementById('scentFinderModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function selectOption(category, value) {
    finderSelections[category] = value;
    
    // Visual feedback
    if (event && event.currentTarget) {
        const options = event.currentTarget.parentElement.querySelectorAll('.finder-option');
        options.forEach(opt => opt.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
    }
    
    // Enable next button
    const step1Btn = document.getElementById('step1Btn');
    const step2Btn = document.getElementById('step2Btn');
    
    if (category === 'mood' && step1Btn) {
        step1Btn.disabled = false;
    } else if (category === 'occasion' && step2Btn) {
        step2Btn.disabled = false;
    }
}

function nextStep() {
    const step1 = document.getElementById('finderStep1');
    const step2 = document.getElementById('finderStep2');
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
}

function prevStep() {
    const step1 = document.getElementById('finderStep1');
    const step2 = document.getElementById('finderStep2');
    if (step2) step2.style.display = 'none';
    if (step1) step1.style.display = 'block';
}

function showResults() {
    if (typeof PRODUCTS_DATA === 'undefined') return;
    
    const recommendations = {
        'romantic': ['Premium Perfume Oils', 'Black Opium (Inspired)', 'Baccarat Rouge (Inspired)'],
        'fresh': ['Body Spray & Mist', 'Room Sprays', 'Air Fresheners'],
        'bold': ['Black Opium (Inspired)', 'Premium Perfume Oils', 'Oud Maracuja'],
        'calm': ['Reed Diffusers', 'Scented Candles', 'Hibiscus Maharaja'],
        'day': ['Body Spray & Mist', 'Atomisers & Travel Sets', 'Air Fresheners'],
        'night': ['Premium Perfume Oils', 'Black Opium (Inspired)', 'Baccarat Rouge (Inspired)'],
        'daily': ['Premium Perfume Oils', 'Body Spray & Mist', 'Hibiscus Maharaja'],
        'gifting': ['Designer Boxed Perfumes', 'Reed Diffusers', 'Scented Candles']
    };
    
    const moodRecs = recommendations[finderSelections.mood] || [];
    const occasionRecs = recommendations[finderSelections.occasion] || [];
    const allRecs = [...new Set([...moodRecs, ...occasionRecs])];
    
    const recProducts = PRODUCTS_DATA.products.filter(p => allRecs.includes(p.name)).slice(0, 2);
    
    const step2 = document.getElementById('finderStep2');
    const results = document.getElementById('finderResults');
    
    if (step2) step2.style.display = 'none';
    if (results) results.style.display = 'block';
    
    const contentDiv = document.getElementById('recommendationContent');
    if (!contentDiv) return;
    
    if (recProducts.length > 0) {
        contentDiv.innerHTML = `
            <p style="margin-bottom: 2rem; color: #666;">Based on your preferences for a <strong>${finderSelections.mood}</strong> scent for <strong>${finderSelections.occasion}</strong>:</p>
            <div style="display: grid; gap: 1rem;">
                ${recProducts.map(p => `
                    <div style="display: flex; gap: 1rem; padding: 1rem; background: white; border-radius: 4px; cursor: pointer; border: 2px solid transparent; transition: all 0.3s ease;" 
                         onmouseover="this.style.borderColor='var(--color-gold)'" 
                         onmouseout="this.style.borderColor='transparent'"
                         onclick="addToCart(${p.id}); closeScentFinder();">
                        <div style="font-size: 3rem;">${getProductEmoji(p.category)}</div>
                        <div style="text-align: left;">
                            <h4 style="font-family: var(--font-serif); margin-bottom: 0.3rem;">${p.name}</h4>
                            <p style="font-size: 0.9rem; color: #666;">${p.description}</p>
                            <p style="color: var(--color-gold); font-weight: 600; margin-top: 0.5rem;">₦${p.price.toLocaleString()}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #666;">Click any product to add to cart!</p>
        `;
    } else {
        contentDiv.innerHTML = `
            <p style="color: #666;">We recommend browsing our full collection to find your perfect match!</p>
            <button class="finder-btn" onclick="closeScentFinder(); document.getElementById('products').scrollIntoView({behavior: 'smooth'})" style="margin-top: 1rem;">
                View All Products
            </button>
        `;
    }
}

function resetFinder() {
    finderSelections = {};
    document.querySelectorAll('.finder-option').forEach(opt => opt.classList.remove('selected'));
    
    const step1Btn = document.getElementById('step1Btn');
    const step2Btn = document.getElementById('step2Btn');
    const step1 = document.getElementById('finderStep1');
    const step2 = document.getElementById('finderStep2');
    const results = document.getElementById('finderResults');
    
    if (step1Btn) step1Btn.disabled = true;
    if (step2Btn) step2Btn.disabled = true;
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    if (results) results.style.display = 'none';
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showProductDetails(productId) {
    if (typeof PRODUCTS_DATA === 'undefined') return;
    
    const product = PRODUCTS_DATA.products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `${product.name}\n${product.description}\nPrice: ₦${product.price.toLocaleString()}\nSizes: ${product.variants ? product.variants.join(', ') : 'N/A'}\n\nClick OK to add to cart!`;
    
    if (confirm(message)) {
        addToCart(productId);
    }
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--color-charcoal);
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 9999;
        font-family: var(--font-sans);
        font-size: 0.9rem;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function setupEventListeners() {
    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeScentFinder();
            const cartDrawer = document.getElementById('cartDrawer');
            if (cartDrawer && cartDrawer.classList.contains('active')) {
                toggleCart();
            }
            closeReviewModal();
        }
    });
}

function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
