// ===================================
// SHOPPING CART PAGE SPECIFIC JS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Initialize Cart Summary =====
    updateCartSummary();
    
    // ===== Coupon Code =====
    const couponInput = document.querySelector('.coupon-input input');
    const couponButton = document.querySelector('.coupon-input .btn');
    
    if (couponButton) {
        couponButton.addEventListener('click', function() {
            const code = couponInput.value.trim().toUpperCase();
            
            if (!code) {
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification('Vui lòng nhập mã giảm giá', 'error');
                }
                return;
            }
            
            // Simulate coupon validation
            const validCoupons = {
                'CHEM10': 10,
                'CHEM20': 20,
                'WELCOME': 15
            };
            
            if (validCoupons[code]) {
                const discount = validCoupons[code];
                applyCoupon(discount);
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification(
                        `Đã áp dụng mã giảm giá ${discount}%`,
                        'success'
                    );
                }
                couponInput.disabled = true;
                couponButton.textContent = 'Đã áp dụng';
                couponButton.style.background = '#10b981';
            } else {
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification(
                        'Mã giảm giá không hợp lệ',
                        'error'
                    );
                }
            }
        });
    }
    
    // ===== Quantity Changes =====
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    quantityInputs.forEach(container => {
        const input = container.querySelector('input');
        const minusBtn = container.querySelector('.qty-btn.minus');
        const plusBtn = container.querySelector('.qty-btn.plus');
        
        function updateQuantity() {
            updateItemTotal(container);
            updateCartSummary();
        }
        
        if (input) {
            input.addEventListener('change', updateQuantity);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', updateQuantity);
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', updateQuantity);
        }
    });
    
    // ===== Checkout Button =====
    const checkoutBtn = document.querySelector('.btn-primary.btn-large.btn-block');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const itemCount = document.querySelectorAll('.cart-item').length;
            
            if (itemCount === 0) {
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification(
                        'Giỏ hàng trống',
                        'error'
                    );
                }
                return;
            }
            
            // Show loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
            this.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification(
                        'Đang chuyển đến trang thanh toán...',
                        'success'
                    );
                }
                
                setTimeout(() => {
                    // In real app, redirect to checkout
                    console.log('Redirecting to checkout...');
                    // window.location.href = 'checkout.html';
                    this.innerHTML = originalHTML;
                    this.disabled = false;
                }, 1000);
            }, 1000);
        });
    }
    
    // ===== Save for Later =====
    const saveButtons = document.querySelectorAll('.item-actions .btn-text:not(.remove-item)');
    saveButtons.forEach(button => {
        if (button.textContent.includes('Lưu')) {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const productName = cartItem.querySelector('h3').textContent;
                
                if (window.ChemTradeApp) {
                    window.ChemTradeApp.showNotification(
                        `Đã lưu ${productName} để mua sau`,
                        'success'
                    );
                }
                
                // Visual feedback
                this.innerHTML = '<i class="fas fa-check"></i> Đã lưu';
                this.style.color = '#10b981';
            });
        }
    });
    
    // ===== Suggestion Products =====
    const suggestionCards = document.querySelectorAll('.suggestions .btn-add-cart');
    suggestionCards.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            if (window.ChemTradeApp) {
                window.ChemTradeApp.showNotification(
                    `Đã thêm ${productName} vào giỏ hàng`,
                    'success'
                );
            }
            
            // Button animation
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
            }, 2000);
        });
    });
    
});

// ===== Helper Functions =====

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
        
        // Animate the change
        totalElement.style.transform = 'scale(1.1)';
        totalElement.style.color = '#2563eb';
        
        totalElement.textContent = total.toLocaleString('vi-VN') + ' ₫';
        
        setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
            totalElement.style.color = '';
        }, 300);
    }
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
    
    // Update summary values
    const summaryRows = document.querySelectorAll('.summary-row');
    summaryRows.forEach(row => {
        const label = row.querySelector('span:first-child').textContent;
        const amountElement = row.querySelector('.amount');
        
        if (label.includes('Tạm tính')) {
            amountElement.textContent = subtotal.toLocaleString('vi-VN') + ' ₫';
        } else if (label.includes('Tổng cộng')) {
            const discount = getCurrentDiscount();
            const total = subtotal - (subtotal * discount / 100);
            amountElement.textContent = total.toLocaleString('vi-VN') + ' ₫';
        }
    });
    
    // Update item count in header
    const cartHeader = document.querySelector('.cart-header h2');
    if (cartHeader) {
        cartHeader.textContent = `Sản phẩm (${itemCount} items)`;
    }
    
    const resultsInfo = document.querySelector('.results-info p');
    if (resultsInfo) {
        resultsInfo.textContent = `Hiển thị 1-${itemCount} của ${itemCount} sản phẩm`;
    }
}

function getCurrentDiscount() {
    const discountElement = document.querySelector('.summary-row .discount');
    if (discountElement) {
        const discountText = discountElement.textContent.replace(/[^\d]/g, '');
        return parseInt(discountText) || 0;
    }
    return 0;
}

function applyCoupon(discountPercent) {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const totalElement = item.querySelector('.total-price');
        if (totalElement) {
            const total = parseInt(totalElement.textContent.replace(/[^\d]/g, ''));
            subtotal += total;
        }
    });
    
    const discountAmount = Math.floor(subtotal * discountPercent / 100);
    const total = subtotal - discountAmount;
    
    // Update discount row
    const discountRow = document.querySelector('.summary-row:nth-child(2)');
    if (discountRow) {
        const discountAmountElement = discountRow.querySelector('.discount');
        if (discountAmountElement) {
            discountAmountElement.textContent = '-' + discountAmount.toLocaleString('vi-VN') + ' ₫';
            
            // Animate
            discountAmountElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                discountAmountElement.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Update total
    const totalRow = document.querySelector('.summary-row.total');
    if (totalRow) {
        const totalAmountElement = totalRow.querySelector('.amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = total.toLocaleString('vi-VN') + ' ₫';
            
            // Animate
            totalAmountElement.style.transform = 'scale(1.2)';
            totalAmountElement.style.color = '#10b981';
            setTimeout(() => {
                totalAmountElement.style.transform = 'scale(1)';
                totalAmountElement.style.color = '';
            }, 300);
        }
    }
}

