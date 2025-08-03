document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.querySelector('.cart-count');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Buttons
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartBtn = document.querySelector('.close-cart');
    
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
    
    // Toggle cart visibility
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Add event delegation for dynamic elements
    document.addEventListener('click', function(e) {
        // Add to cart buttons
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            const product = {
                id: e.target.dataset.id,
                title: e.target.dataset.title,
                price: parseFloat(e.target.dataset.price),
                image: e.target.dataset.image,
                quantity: 1
            };
            addToCart(product);
        }
        
        // Remove item buttons in cart
        if (e.target.classList.contains('remove-item')) {
            e.preventDefault();
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        }
        
        // Quantity increase buttons
        if (e.target.classList.contains('increase-quantity')) {
            e.preventDefault();
            const productId = e.target.dataset.id;
            updateQuantity(productId, 1);
        }
        
        // Quantity decrease buttons
        if (e.target.classList.contains('decrease-quantity')) {
            e.preventDefault();
            const productId = e.target.dataset.id;
            updateQuantity(productId, -1);
        }
    });
    
    // Cart functions
    function toggleCart() {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
    
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        updateCart();
        
        // Animation feedback
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${product.title} added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 10);
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
    
    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            
            // Ensure quantity doesn't go below 1
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            
            updateCart();
        }
    }
    
    function updateCart() {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart items display
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotalPrice.textContent = '$0.00';
        } else {
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-id="${item.id}">+</button>
                        </div>
                        <a class="remove-item" data-id="${item.id}">Remove</a>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            cartTotalPrice.textContent = formatPrice(total);
        }
    }
});

// Cart notification styling
const style = document.createElement('style');
style.textContent = `
.cart-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--secondary-color);
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cart-notification.show {
    opacity: 1;
    bottom: 30px;
}
`;
document.head.appendChild(style);
