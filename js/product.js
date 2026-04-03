// ========================================
// MARJ SCENTS - PRODUCT DATA
// ========================================

const PRODUCTS_DATA = {
    currency: "₦",
    business: {
        name: "Marj Scents",
        whatsapp: "2347062297760",
        email: "Marisosaigboyo@gmail.com",
        address: "Plot K26 Cooperative Villa Estate, Badore Ajah, Lagos",
        hours: "24 hours"
    },
    
    products: [
        {
            id: 1,
            name: "Premium Perfume Oils",
            category: "Signature Collection",
            description: "Long-lasting, alcohol-free concentrated fragrance oils",
            price: 8500,
            originalPrice: 10000,
            image: "images/products/perfume-oil.jpg",
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
            image: "images/products/designer-perfume.jpg",
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
            image: "images/products/diffuser.jpg",
            badge: "New",
            variants: ["100ml", "200ml"],
            inStock: true
        },
        {
            id: 4,
            name: "Scented Candles",
            category: "Ambiance",
            description: "Hand-poured soy wax candles. 40+ hours burn time",
            price: 8000,
            originalPrice: 10000,
            image: "images/products/candle.jpg",
            badge: null,
            variants: ["Small", "Medium", "Large"],
            inStock: true
        },
        {
            id: 5,
            name: "Body Spray & Mist",
            category: "Daily Wear",
            description: "Light, refreshing fragrances for everyday use",
            price: 3500,
            originalPrice: 5000,
            image: "images/products/body-spray.jpg",
            badge: "Sale",
            variants: ["100ml", "200ml"],
            inStock: true
        },
        {
            id: 6,
            name: "Atomisers & Travel Sets",
            category: "Accessories",
            description: "Refillable travel perfume bottles for on-the-go",
            price: 2500,
            originalPrice: 4000,
            image: "images/products/atomiser.jpg",
            badge: null,
            variants: ["5ml", "10ml"],
            inStock: true
        },
        {
            id: 7,
            name: "Air Fresheners",
            category: "Home & Car",
            description: "Premium air fresheners for home, office, and car",
            price: 2000,
            originalPrice: 3000,
            image: "images/products/air-freshener.jpg",
            badge: null,
            variants: ["Standard", "Premium"],
            inStock: true
        },
        {
            id: 8,
            name: "Room Sprays",
            category: "Home Fragrance",
            description: "Instantly refresh any space with luxury scents",
            price: 4500,
            originalPrice: 6000,
            image: "images/products/room-spray.jpg",
            badge: null,
            variants: ["100ml", "250ml"],
            inStock: true
        },
        {
            id: 9,
            name: "Black Opium (Inspired)",
            category: "Premium Oils",
            description: "Rich coffee and vanilla scent. Extremely long-lasting",
            price: 10000,
            originalPrice: 12000,
            image: "images/products/black-opium.jpg",
            badge: "Customer Favorite",
            variants: ["10ml", "20ml", "50ml"],
            inStock: true
        },
        {
            id: 10,
            name: "Hibiscus Maharaja",
            category: "Premium Oils",
            description: "Exotic floral with oriental spices. Faith's favorite!",
            price: 9500,
            originalPrice: 11000,
            image: "images/products/hibiscus.jpg",
            badge: "Trending",
            variants: ["10ml", "20ml", "50ml"],
            inStock: true
        },
        {
            id: 11,
            name: "Oud Maracuja",
            category: "Premium Oils",
            description: "Passion fruit and oud fusion. Unique and captivating",
            price: 11000,
            originalPrice: 13000,
            image: "images/products/oud-maracuja.jpg",
            badge: "Exclusive",
            variants: ["10ml", "20ml", "50ml"],
            inStock: true
        },
        {
            id: 12,
            name: "Baccarat Rouge (Inspired)",
            category: "Premium Oils",
            description: "Amber woody floral. Sophisticated and long-lasting",
            price: 10500,
            originalPrice: 12500,
            image: "images/products/baccarat.jpg",
            badge: "Best Value",
            variants: ["10ml", "20ml", "50ml"],
            inStock: true
        }
    ]
};

// ========================================
// REVIEW IMAGES DATA (Your WhatsApp Screenshots)
// ========================================

const REVIEWS_DATA = [
    {
        id: 1,
        image: "images/reviews/review-1.jpg",
        customer: "Anonymous",
        product: "Perfume Oils",
        caption: "They are beautiful. I love it. So good!"
    },
    {
        id: 2,
        image: "images/reviews/review-2.jpg",
        customer: "Faith Estate",
        product: "Hibiscus 20ml",
        caption: "Yes sis! It's the bomb!"
    },
    {
        id: 3,
        image: "images/reviews/review-3.jpg",
        customer: "Anonymous",
        product: "Amorous Blue Replica",
        caption: "Smells exactly like Amorous blue, long lasting!"
    },
    {
        id: 4,
        image: "images/reviews/review-4.jpg",
        customer: "Anita Sky Mall",
        product: "Multiple Products",
        caption: "Those perfume are so so nice o!"
    },
    {
        id: 5,
        image: "images/reviews/review-5.jpg",
        customer: "JB",
        product: "Perfume Oils",
        caption: "This your oil Perfume is so nice. Want a bigger one!"
    },
    {
        id: 6,
        image: "images/reviews/review-6.jpg",
        customer: "Jesam Marvelous",
        product: "Black Opium",
        caption: "Very very strong! Slept and woke up, still perceived it!"
    },
    {
        id: 7,
        image: "images/reviews/review-7.jpg",
        customer: "Flous Luxury Hair",
        product: "Reed Diffusers",
        caption: "Even the diffusers are nice!"
    },
    {
        id: 8,
        image: "images/reviews/review-8.jpg",
        customer: "Faith Estate",
        product: "Premium Oils Collection",
        caption: "Don't run out of hibiscus, oud maracuja, baccarat rouge. My absolute favs!"
    },
    {
        id: 9,
        image: "images/reviews/review-9.jpg",
        customer: "Anonymous",
        product: "Perfume Oils",
        caption: "The perfume oil too good. All of them. I smell very sweet!"
    }
];