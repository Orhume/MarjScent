// ========================================
// MARJ SCENTS - PRODUCT DATA
// ========================================

const PRODUCTS_DATA = {
    currency: "₦",
    business: {
        name: "Marj Scents",
        whatsapp: "2347062297460",
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
            image: "images/products/product1.jpg",  // ✅ Updated path
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
            image: "images/products/product2.jpg",  // ✅ Updated path
            badge: "Popular",
            variants: ["30ml", "50ml", "100ml"],
            inStock: true
        },
        // ... update the rest to use product3.jpg, product4.jpg, etc.
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
