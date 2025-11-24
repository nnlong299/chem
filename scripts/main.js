// ===================================
// CHEMICAL TRADING PLATFORM - MAIN JS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('active');
        });
    }

    // ===== Search Functionality =====
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // ===== Add to Cart Animation =====
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default if it's a link
            if (this.tagName === 'A') return;
            
            e.preventDefault();
            
            // Add animation class
            this.classList.add('added');
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm';
            
            // Update cart badge
            updateCartBadge(1);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('added');
            }, 2000);
        });
    });

    // ===== Quantity Controls =====
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(container => {
        const minusBtn = container.querySelector('.qty-btn.minus');
        const plusBtn = container.querySelector('.qty-btn.plus');
        const input = container.querySelector('input[type="number"]');
        
        if (minusBtn && input) {
            minusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 1;
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    updateItemTotal(container);
                }
            });
        }
        
        if (plusBtn && input) {
            plusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 1;
                input.value = currentValue + 1;
                updateItemTotal(container);
            });
        }
        
        if (input) {
            input.addEventListener('change', function() {
                if (this.value < 1) this.value = 1;
                updateItemTotal(container);
            });
        }
    });

    // ===== Remove Cart Item =====
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            if (cartItem && confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    cartItem.remove();
                    updateCartSummary();
                    updateCartBadge(-1);
                }, 300);
            }
        });
    });

    // ===== Filter Checkboxes =====
    const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
        });
    });

    // ===== Sort Dropdown =====
    const sortSelect = document.querySelector('.sort-options select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }

    // ===== View Toggle =====
    const viewToggleBtns = document.querySelectorAll('.view-toggle button');
    viewToggleBtns.forEach(button => {
        button.addEventListener('click', function() {
            viewToggleBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            toggleView(this);
        });
    });

    // ===== Wishlist/Favorite Toggle =====
    const favoriteButtons = document.querySelectorAll('.btn-icon-only');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon && icon.classList.contains('fa-heart')) {
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.style.color = '#ef4444';
                    this.style.borderColor = '#ef4444';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.style.color = '';
                    this.style.borderColor = '';
                }
            }
        });
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== Initialize =====
    initializeImageGallery();
    initializeCounters();
    
});

// ===== Helper Functions =====

function performSearch(query) {
    if (query.trim()) {
        console.log('Searching for:', query);
        // In a real application, this would redirect to search results
        // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

function updateCartBadge(change) {
    const badge = document.querySelector('.header-link.cart .badge');
    if (badge) {
        const currentCount = parseInt(badge.textContent) || 0;
        const newCount = Math.max(0, currentCount + change);
        badge.textContent = newCount;
        
        // Animation
        badge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateItemTotal(container) {
    const cartItem = container.closest('.cart-item');
    if (!cartItem) return;
    
    const quantity = parseInt(container.querySelector('input').value) || 1;
    const priceElement = cartItem.querySelector('.item-price .price');
    const totalElement = cartItem.querySelector('.total-price');
    
    if (priceElement && totalElement) {
        const priceText = priceElement.textContent.replace(/[^\d]/g, '');
        const price = parseInt(priceText);
        const total = price * quantity;
        totalElement.textContent = total.toLocaleString('vi-VN') + ' ₫';
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    let itemCount = 0;
    
    cartItems.forEach(item => {
        const totalElement = item.querySelector('.total-price');
        if (totalElement) {
            const total = parseInt(totalElement.textContent.replace(/[^\d]/g, ''));
            subtotal += total;
            itemCount++;
        }
    });
    
    // Update summary
    const subtotalElement = document.querySelector('.summary-row .amount');
    const totalElement = document.querySelector('.summary-row.total .amount');
    const itemCountElement = document.querySelector('.cart-header h2');
    
    if (subtotalElement) {
        subtotalElement.textContent = subtotal.toLocaleString('vi-VN') + ' ₫';
    }
    
    if (totalElement) {
        totalElement.textContent = subtotal.toLocaleString('vi-VN') + ' ₫';
    }
    
    if (itemCountElement) {
        itemCountElement.textContent = `Sản phẩm (${itemCount} items)`;
    }
}

function applyFilters() {
    console.log('Applying filters...');
    // In a real application, this would filter the product list
    // For now, just log the selected filters
    const selectedFilters = [];
    document.querySelectorAll('.filter-list input[type="checkbox"]:checked').forEach(checkbox => {
        selectedFilters.push(checkbox.parentElement.textContent.trim());
    });
    console.log('Selected filters:', selectedFilters);
}

function sortProducts(sortBy) {
    console.log('Sorting by:', sortBy);
    // In a real application, this would re-order the products
}

function toggleView(button) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    if (button.querySelector('.fa-list')) {
        productGrid.style.gridTemplateColumns = '1fr';
    } else {
        productGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    }
}

function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.main-image');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // In a real application, this would change the main image
            if (mainImage) {
                mainImage.style.opacity = '0.5';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
}

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent.replace(/[^\d]/g, '');
        if (target && !isNaN(target)) {
            animateCounter(counter, parseInt(target));
        }
    });
}

function animateCounter(element, target) {
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('vi-VN');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('vi-VN');
        }
    }, 16);
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Add CSS Animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .btn-add-cart.added {
        background: #10b981 !important;
    }
    
    .admin-sidebar.active {
        transform: translateX(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Export for use in other scripts =====
window.ChemTradeApp = {
    showNotification,
    updateCartBadge,
    updateCartSummary
};

