// ===================================
// ADMIN DASHBOARD SPECIFIC JS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Sidebar Navigation =====
    const navLinks = document.querySelectorAll('.admin-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all
            document.querySelectorAll('.admin-nav li').forEach(li => {
                li.classList.remove('active');
            });
            
            // Add active to clicked
            this.parentElement.classList.add('active');
            
            // Update content (in real app, this would load different content)
            console.log('Navigating to:', this.textContent.trim());
        });
    });
    
    // ===== Chart Animation =====
    animateCharts();
    
    // ===== Stats Counter Animation =====
    animateStats();
    
    // ===== Real-time Updates Simulation =====
    startRealtimeUpdates();
    
    // ===== Action Buttons =====
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            const row = this.closest('tr');
            
            if (icon.classList.contains('fa-eye')) {
                viewOrderDetails(row);
            } else if (icon.classList.contains('fa-check')) {
                approveOrder(row);
            } else if (icon.classList.contains('fa-truck')) {
                shipOrder(row);
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                trackOrder(row);
            }
        });
    });
    
    // ===== Quick Action Buttons =====
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            console.log('Quick action:', action);
            
            if (window.ChemTradeApp) {
                window.ChemTradeApp.showNotification(
                    `Đang mở ${action}...`,
                    'success'
                );
            }
        });
    });
    
    // ===== Alert Stock Buttons =====
    const stockButtons = document.querySelectorAll('.alert-item .btn');
    stockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.alert-item').querySelector('h4').textContent;
            
            if (window.ChemTradeApp) {
                window.ChemTradeApp.showNotification(
                    `Tạo đơn nhập hàng cho ${productName}`,
                    'success'
                );
            }
            
            // Visual feedback
            this.textContent = 'Đã tạo đơn';
            this.style.background = '#10b981';
            this.disabled = true;
        });
    });
    
    // ===== Notification Bell =====
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotificationPanel();
        });
    }
    
    // ===== Chart Filter =====
    const chartFilter = document.querySelector('.chart-filter');
    if (chartFilter) {
        chartFilter.addEventListener('change', function() {
            console.log('Filter changed to:', this.value);
            animateCharts();
        });
    }
    
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
    
});

// ===== Helper Functions =====

function animateCharts() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.transition = 'height 0.8s ease';
            bar.style.height = bar.getAttribute('style').match(/height:\s*(\d+%)/)[1];
        }, index * 100);
    });
}

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const text = stat.textContent;
        const numbers = text.match(/[\d,]+/);
        
        if (numbers) {
            const target = parseInt(numbers[0].replace(/,/g, ''));
            animateValue(stat, 0, target, 1000, text);
        }
    });
}

function animateValue(element, start, end, duration, template) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = template;
            clearInterval(timer);
        } else {
            const value = Math.floor(current).toLocaleString('vi-VN');
            element.textContent = template.replace(/[\d,]+/, value);
        }
    }, 16);
}

function startRealtimeUpdates() {
    // Simulate real-time order updates
    setInterval(() => {
        const badge = document.querySelector('.notification-badge');
        if (badge && Math.random() > 0.7) {
            const current = parseInt(badge.textContent) || 0;
            badge.textContent = current + 1;
            
            // Pulse animation
            badge.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                badge.style.animation = '';
            }, 500);
        }
    }, 10000); // Every 10 seconds
}

function viewOrderDetails(row) {
    const orderId = row.querySelector('strong').textContent;
    console.log('Viewing order:', orderId);
    
    if (window.ChemTradeApp) {
        window.ChemTradeApp.showNotification(
            `Đang mở chi tiết đơn hàng ${orderId}`,
            'success'
        );
    }
}

function approveOrder(row) {
    const orderId = row.querySelector('strong').textContent;
    const statusBadge = row.querySelector('.status-badge');
    
    if (statusBadge) {
        statusBadge.classList.remove('pending');
        statusBadge.classList.add('processing');
        statusBadge.textContent = 'Đang xử lý';
    }
    
    if (window.ChemTradeApp) {
        window.ChemTradeApp.showNotification(
            `Đã duyệt đơn hàng ${orderId}`,
            'success'
        );
    }
}

function shipOrder(row) {
    const orderId = row.querySelector('strong').textContent;
    const statusBadge = row.querySelector('.status-badge');
    
    if (statusBadge) {
        statusBadge.classList.remove('processing');
        statusBadge.classList.add('shipping');
        statusBadge.textContent = 'Đang giao';
    }
    
    if (window.ChemTradeApp) {
        window.ChemTradeApp.showNotification(
            `Đơn hàng ${orderId} đã được giao cho đơn vị vận chuyển`,
            'success'
        );
    }
}

function trackOrder(row) {
    const orderId = row.querySelector('strong').textContent;
    console.log('Tracking order:', orderId);
    
    if (window.ChemTradeApp) {
        window.ChemTradeApp.showNotification(
            `Mở theo dõi đơn hàng ${orderId}`,
            'success'
        );
    }
}

function showNotificationPanel() {
    // Create notification panel
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3>Thông báo</h3>
            <button class="close-panel">&times;</button>
        </div>
        <div class="panel-content">
            <div class="notification-item unread">
                <div class="notification-icon blue">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="notification-text">
                    <strong>Đơn hàng mới #ORD-2845</strong>
                    <p>Nguyễn Văn A đã đặt hàng</p>
                    <span>2 phút trước</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon green">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="notification-text">
                    <strong>Khách hàng mới</strong>
                    <p>1 khách hàng vừa đăng ký</p>
                    <span>15 phút trước</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon orange">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="notification-text">
                    <strong>Cảnh báo tồn kho</strong>
                    <p>Acetone 99.5% sắp hết hàng</p>
                    <span>1 giờ trước</span>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <a href="#">Xem tất cả thông báo</a>
        </div>
    `;
    
    panel.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        width: 350px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(panel);
    
    // Close button
    panel.querySelector('.close-panel').addEventListener('click', function() {
        panel.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => panel.remove(), 300);
    });
    
    // Close when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('.notification-btn')) {
                panel.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => panel.remove(), 300);
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

// Add panel styles
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .panel-header {
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .panel-header h3 {
        margin: 0;
        font-size: 18px;
    }
    
    .close-panel {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
    }
    
    .panel-content {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .notification-item {
        padding: 15px 20px;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        gap: 12px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .notification-item:hover {
        background: #f9fafb;
    }
    
    .notification-item.unread {
        background: #eff6ff;
    }
    
    .notification-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
    }
    
    .notification-icon.blue { background: #2563eb; }
    .notification-icon.green { background: #10b981; }
    .notification-icon.orange { background: #f59e0b; }
    
    .notification-text {
        flex: 1;
    }
    
    .notification-text strong {
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
    }
    
    .notification-text p {
        margin: 0 0 3px 0;
        font-size: 13px;
        color: #6b7280;
    }
    
    .notification-text span {
        font-size: 12px;
        color: #9ca3af;
    }
    
    .panel-footer {
        padding: 15px 20px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
    }
    
    .panel-footer a {
        color: #2563eb;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
    }
    
    .panel-footer a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

