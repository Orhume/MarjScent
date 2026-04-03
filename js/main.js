// ========================================
// MARJ SCENTS - MAIN JAVASCRIPT
// ========================================

// Global state
let cart = [];
// Add this RIGHT AFTER the first line of main.js
console.log("Reviews data:", REVIEWS_DATA);
console.log("Number of reviews:", REVIEWS_DATA.length);
let finderSelections = {};


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
   function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    
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
    updateCartUI();
    setupEventListeners();
    setupScrollEffects();
    setupAnimations();
});

// ========================================
// PRODUCT RENDERING
// ========================================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const products = PRODUCTS_DATA.products;
    
    grid.innerHTML = products.map(product => {
        // Use emoji as placeholder if no image
        const displayContent = product.image ? 
            `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
            `<span style="font-size: 4rem;">${getProductEmoji(product.category)}</span>`;
        
        const badgeHtml = product.badge ? 
            `<span class="product-badge">${product.badge}</span>` : '';
        
        const originalPriceHtml = product.originalPrice ? 
            `<span class="original">₦${product.originalPrice.toLocaleString()}</span>` : '';
        
        return `
            <div class="product-card fade-in" onclick="showProductDetails(${product.id})">
                <div class="product-image">
                    ${badgeHtml}
                    ${displayContent}
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
// REVIEWS RENDERING
// ========================================

function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    
    grid.innerHTML = REVIEWS_DATA.map(review => `
        <div class="review-card fade-in">
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-stars">${'★'.repeat(review.rating)}</span>
            </div>
            <p class="review-text">"${review.text}"</p>
            <p class="review-product">${review.product}</p>
        </div>
    `).join('');
}

// ========================================
// CART FUNCTIONS
// ========================================

function addToCart(productId) {
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
            selectedVariant: product.variants[0]
        });
    }
    
    updateCartUI();
    toggleCart();
    
    // Show success feedback
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
        cartFooter.style.display = 'none';
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
        cartFooter.style.display = 'block';
        cartTotal.textContent = '₦' + subtotal.toLocaleString();
    }
}

function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('active');
    document.getElementById('cartDrawer').classList.toggle('active');
    document.body.style.overflow = document.getElementById('cartDrawer').classList.contains('active') ? 'hidden' : '';
}

// ========================================
// WHATSAPP CHECKOUT
// ========================================

function checkoutWhatsApp() {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const business = PRODUCTS_DATA.business;
    
    let message = `*New Order from ${business.name} Website*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: [Please enter your name]%0A`;
    message += `Phone: [Please enter your phone]%0A`;
    message += `Address: [Please enter delivery address]%0A%0A`;
    message += `*Order Items:*%0A`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.selectedVariant}) x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
    });
    
    message += `%0A*Subtotal: ₦${subtotal.toLocaleString()}*%0A`;
    message += `*Delivery: To be confirmed*%0A`;
    message += `*Total: ₦${subtotal.toLocaleString()} + Delivery*%0A%0A`;
    message += `Please confirm availability and send payment details.`;
    
    const whatsappURL = `https://wa.me/${business.whatsapp}?text=${message}`;
    window.open(whatsappURL, '_blank');
    
    // Optional: Clear cart after checkout
    // cart = [];
    // updateCartUI();
    // toggleCart();
}

// ========================================
// SCENT FINDER QUIZ
// ========================================

function openScentFinder() {
    document.getElementById('scentFinderModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    resetFinder();
}

function closeScentFinder() {
    document.getElementById('scentFinderModal').classList.remove('active');
    document.body.style.overflow = '';
}

function selectOption(category, value) {
    finderSelections[category] = value;
    
    // Visual feedback
    const options = event.currentTarget.parentElement.querySelectorAll('.finder-option');
    options.forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Enable next button
    if (category === 'mood') {
        document.getElementById('step1Btn').disabled = false;
    } else if (category === 'occasion') {
        document.getElementById('step2Btn').disabled = false;
    }
}

function nextStep() {
    document.getElementById('finderStep1').style.display = 'none';
    document.getElementById('finderStep2').style.display = 'block';
}

function prevStep() {
    document.getElementById('finderStep2').style.display = 'none';
    document.getElementById('finderStep1').style.display = 'block';
}

function showResults() {
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
    
    document.getElementById('finderStep2').style.display = 'none';
    document.getElementById('finderResults').style.display = 'block';
    
    const contentDiv = document.getElementById('recommendationContent');
    
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
    document.getElementById('step1Btn').disabled = true;
    document.getElementById('step2Btn').disabled = true;
    document.getElementById('finderStep1').style.display = 'block';
    document.getElementById('finderStep2').style.display = 'none';
    document.getElementById('finderResults').style.display = 'none';
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showProductDetails(productId) {
    const product = PRODUCTS_DATA.products.find(p => p.id === productId);
    if (!product) return;
    
    // Simple alert for now - can be expanded to modal
    const message = `
${product.name}
${product.description}
Price: ₦${product.price.toLocaleString()}
Sizes: ${product.variants.join(', ')}

Click OK to add to cart!`;
    
    if (confirm(message)) {
        addToCart(productId);
    }
}

function showNotification(message) {
    // Create notification element
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
            if (document.getElementById('cartDrawer').classList.contains('active')) {
                toggleCart();
            }
        }
    });
}

function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    
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
    // Simple toggle for mobile menu
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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