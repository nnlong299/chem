# ChemTrade - Nền Tảng Buôn Bán Hóa Chất

## Tổng quan dự án

ChemTrade là một nền tảng thương mại điện tử chuyên nghiệp dành cho ngành hóa chất công nghiệp. Giao diện được thiết kế nghiêm túc và chuyên nghiệp, phù hợp với tính chất kinh doanh hóa chất, hóa học.

## Cấu trúc dự án

```
chemical/
├── index.html              # Trang chủ
├── products.html           # Trang danh sách sản phẩm
├── product-detail.html     # Trang chi tiết sản phẩm
├── cart.html              # Trang giỏ hàng
├── admin.html             # Trang quản trị
├── styles/
│   └── main.css           # CSS chính cho toàn bộ website
├── scripts/
│   ├── main.js            # JavaScript chính
│   ├── product-detail.js  # JS cho trang chi tiết
│   ├── cart.js            # JS cho giỏ hàng
│   └── admin.js           # JS cho trang admin
└── README.md              # File này
```

## Tính năng chính

### 1. Trang chủ (index.html)
- Hero banner với thông điệp chuyên nghiệp
- Danh mục sản phẩm chính
- Sản phẩm nổi bật
- Các chỉ số tin cậy (trust indicators)
- Footer đầy đủ thông tin

### 2. Danh sách sản phẩm (products.html)
- Bộ lọc sản phẩm đa tiêu chí:
  - Danh mục
  - Độ tinh khiết
  - Quy cách đóng gói
  - Khoảng giá
  - Tình trạng kho
- Sắp xếp sản phẩm
- Phân trang
- Responsive grid layout

### 3. Chi tiết sản phẩm (product-detail.html)
- Thông tin sản phẩm chi tiết
- Tab navigation:
  - Mô tả sản phẩm
  - Thông số kỹ thuật
  - Tài liệu & Chứng nhận (COA, MSDS, ISO)
  - An toàn & Bảo quản
  - Đánh giá khách hàng
- Thư viện ảnh
- Thông tin giá và tồn kho
- Sản phẩm liên quan

### 4. Giỏ hàng (cart.html)
- Quản lý sản phẩm trong giỏ
- Điều chỉnh số lượng
- Áp dụng mã giảm giá
- Tổng kết đơn hàng
- Sản phẩm gợi ý
- Lưu ý an toàn hóa chất

### 5. Trang quản trị (admin.html)
- Dashboard tổng quan
- Thống kê doanh thu
- Quản lý đơn hàng
- Cảnh báo tồn kho
- Biểu đồ và báo cáo
- Hoạt động gần đây
- Thao tác nhanh

## Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: 
  - CSS Variables
  - Flexbox & Grid
  - Animations & Transitions
  - Responsive Design
- **JavaScript (Vanilla)**:
  - DOM Manipulation
  - Event Handling
  - Dynamic Content
  - Animations
- **Font Awesome 6.4.0**: Icons
- **Google Fonts**: Typography (Segoe UI)

## Màu sắc chính

```css
--primary-color: #2563eb    /* Xanh chuyên nghiệp */
--secondary-color: #1e40af  /* Xanh đậm */
--success-color: #10b981    /* Xanh lá */
--warning-color: #f59e0b    /* Vàng cảnh báo */
--danger-color: #ef4444     /* Đỏ nguy hiểm */
--dark-color: #1f2937       /* Xám đen */
--light-color: #f9fafb      /* Xám sáng */
```

## Cách sử dụng

### 1. Mở trực tiếp trong trình duyệt
```bash
# Mở file index.html bằng trình duyệt
# Hoặc double-click vào file index.html
```

### 2. Sử dụng Local Server (khuyến nghị)
```bash
# Sử dụng Python
python -m http.server 8000

# Hoặc Node.js với http-server
npx http-server -p 8000

# Sau đó mở: http://localhost:8000
```

## Tính năng JavaScript tương tác

### Trang chủ & Danh sách sản phẩm
- Thêm vào giỏ hàng với animation
- Cập nhật badge giỏ hàng real-time
- Bộ lọc sản phẩm động
- Sắp xếp sản phẩm
- Toggle view (grid/list)

### Trang chi tiết
- Tab switching
- Image gallery
- Quantity adjustment
- Sticky add-to-cart bar khi scroll
- Notification system

### Giỏ hàng
- Cập nhật số lượng real-time
- Xóa sản phẩm với animation
- Áp dụng coupon (CHEM10, CHEM20, WELCOME)
- Tính toán tổng tiền tự động
- Save for later

### Admin Dashboard
- Animated charts
- Real-time notifications
- Order management
- Stock alerts
- Quick actions
- Activity feed

## Mã giảm giá Demo

- `CHEM10`: Giảm 10%
- `CHEM20`: Giảm 20%
- `WELCOME`: Giảm 15%

## Responsive Design

Website được tối ưu cho:
- Desktop: ≥1024px
- Tablet: 768px - 1023px
- Mobile: <768px

## Điểm nổi bật về UX/UI

1. **Chuyên nghiệp**: Thiết kế nghiêm túc phù hợp ngành hóa chất
2. **An toàn**: Cảnh báo và hướng dẫn an toàn rõ ràng
3. **Minh bạch**: Thông tin sản phẩm đầy đủ (COA, MSDS, ISO)
4. **Tin cậy**: Trust badges, chứng nhận, đánh giá
5. **Dễ dùng**: Navigation rõ ràng, search mạnh mẽ
6. **Responsive**: Hoạt động tốt trên mọi thiết bị

## Tối ưu hóa

- Semantic HTML cho SEO
- CSS được tổ chức theo component
- JavaScript modular
- Lazy loading animations
- Optimized event listeners
- Accessible (ARIA-friendly)

## Mở rộng trong tương lai

- [ ] Backend API integration
- [ ] Database cho sản phẩm
- [ ] User authentication
- [ ] Payment gateway
- [ ] Email notifications
- [ ] Search functionality
- [ ] Product reviews system
- [ ] Wishlist persistence
- [ ] Order tracking
- [ ] Analytics dashboard

## Liên hệ & Hỗ trợ

Dự án demo cho mục đích học tập và giới thiệu về thương mại điện tử hóa chất.

---

**Phát triển bởi**: ChemTrade Team  
**Ngày tạo**: November 2024  
**Phiên bản**: 1.0.0  
**License**: Demo/Educational Purpose

