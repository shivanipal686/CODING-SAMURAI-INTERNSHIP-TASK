document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const featuredProducts = [
        {
            id: 1,
            title: "Modern Velvet Sofa",
            price: 1299.99,
            image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2dd6e0e5-d879-481f-8fc6-d9ae4efa2c8b.png",
            alt: "Contemporary velvet sofa in emerald green with brass legs"
        },
        {
            id: 2,
            title: "Rose Gold Pendant Light",
            price: 199.99,
            image: "https://images.meesho.com/images/products/201344318/76ljw_512.jpg", 
            alt: "Elegant rose gold pendant light with geometric design"
        },
        {
            id: 3,
            title: "Marble Coffee Table",
            price: 599.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtTizC_kXyEJOHl0Ph28jyltE94CbT-hzszA&s", 
            alt: "Round marble coffee table with gold base"
        },
        {
            id: 4,
            title: "Wool Area Rug",
            price: 349.99,
            image: "https://m.media-amazon.com/images/I/81MgAwjHiXL.jpg", 
            alt: "Handwoven wool rug with abstract pattern in neutral tones"
        },
        {
            id: 5,
            title: "Leather Lounge Chair",
            price: 899.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdxj3eyoNLLvfZ-STuwfvBGtgrG9SiV_w2Q&s", 
            alt: "Mid-century inspired leather lounge chair with walnut legs"
        },
        {
            id: 6,
            title: "Ceramic Table Lamp",
            price: 149.99,
            image: "https://m.media-amazon.com/images/I/81tLWKhJMLL.jpg", 
            alt: "Contemporary ceramic table lamp with linen shade"
        },
        {
            id: 7,
            title: "Accent Mirror",
            price: 249.99,
            image: "https://m.media-amazon.com/images/I/41CcI9u8YhL._UF894,1000_QL80_.jpg", 
            alt: "Round gold-framed decorative mirror"
        },
        {
            id: 8,
            title: "Console Table",
            price: 499.99,
            image: "https://m.media-amazon.com/images/I/51arKWnc1PL._UF1000,1000_QL80_.jpg", 
            alt: "Slim modern console table with black metal frame"
        }
    ];

    // Display featured products
    const featuredProductsContainer = document.getElementById('featured-products');
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.alt}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
            </div>
        `;
        
        featuredProductsContainer.appendChild(productCard);
    });
    
    // Add product click handlers after products are loaded
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            alert(`Viewing ${category} category`);
        });
    });
});

// Global cart functions
function formatPrice(price) {
    return '$' + price.toFixed(2);
}
