// ===================================
// PRODUCT DETAIL PAGE SPECIFIC JS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Product Tabs =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ===== Image Gallery =====
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.main-image i');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Animate main image change
            if (mainImage) {
                mainImage.style.transform = 'scale(0.8)';
                mainImage.style.opacity = '0.5';
                
                setTimeout(() => {
                    // Here you would change the actual image
                    // For demo, we just animate back
                    mainImage.style.transform = 'scale(1)';
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
    
    // ===== Add to Cart with Notification =====
    const addToCartBtn = document.querySelector('.btn-primary.btn-large');
    if (addToCartBtn && addToCartBtn.textContent.includes('Thêm vào giỏ')) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const quantity = document.querySelector('.quantity-input input').value;
            const productName = document.querySelector('.product-header-detail h1').textContent;
            
            // Show notification
            if (window.ChemTradeApp) {
                window.ChemTradeApp.showNotification(
                    `Đã thêm ${quantity} x ${productName} vào giỏ hàng`,
                    'success'
                );
                
                // Update cart badge
                window.ChemTradeApp.updateCartBadge(parseInt(quantity));
            }
            
            // Button animation
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm vào giỏ';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
            }, 2000);
        });
    }
    
    // ===== Buy Now Button =====
    const buyNowBtn = document.querySelector('.btn-secondary.btn-large');
    if (buyNowBtn && buyNowBtn.textContent.includes('Mua ngay')) {
        buyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real app, this would add to cart and redirect to checkout
            if (window.ChemTradeApp) {
                window.ChemTradeApp.showNotification(
                    'Đang chuyển đến trang thanh toán...',
                    'success'
                );
            }
            
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 1000);
        });
    }
    
    // ===== Sticky Add to Cart on Scroll =====
    const productMainInfo = document.querySelector('.product-main-info');
    const purchaseSection = document.querySelector('.product-purchase');
    
    if (productMainInfo && purchaseSection) {
        let stickyBar = null;
        
        window.addEventListener('scroll', function() {
            const rect = purchaseSection.getBoundingClientRect();
            
            if (rect.bottom < 0 && !stickyBar) {
                // Create sticky bar
                stickyBar = document.createElement('div');
                stickyBar.className = 'sticky-purchase-bar';
                stickyBar.innerHTML = `
                    <div class="container" style="display: flex; align-items: center; gap: 20px; padding: 15px 20px;">
                        <div style="flex: 1;">
                            <h4 style="margin: 0; font-size: 16px;">${document.querySelector('.product-header-detail h1').textContent}</h4>
                            <div style="font-size: 20px; color: #ef4444; font-weight: bold; margin-top: 5px;">
                                ${document.querySelector('.price-value').textContent}
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <input type="number" value="1" min="1" style="width: 60px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <button class="btn btn-primary" style="white-space: nowrap;">
                                <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                `;
                stickyBar.style.cssText = `
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                    z-index: 1000;
                    animation: slideUp 0.3s ease;
                `;
                document.body.appendChild(stickyBar);
            } else if (rect.bottom >= 0 && stickyBar) {
                // Remove sticky bar
                stickyBar.style.animation = 'slideDown 0.3s ease';
                setTimeout(() => {
                    if (stickyBar) {
                        stickyBar.remove();
                        stickyBar = null;
                    }
                }, 300);
            }
        });
    }
    
    // ===== Related Products Quick Add =====
    const relatedProducts = document.querySelectorAll('.related-products .btn-add-cart');
    relatedProducts.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification(
                        `Đã thêm ${productName} vào giỏ hàng`,
                        'success'
                    );
                    window.ChemTradeApp.updateCartBadge(1);
                }
            }
        });
    });
    
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
`;
document.head.appendChild(style);

