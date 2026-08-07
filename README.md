# 💈 1997 BARBER - MEN'S GROOMING STUDIO (LANDING PAGE) 💈

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://barber-eight-omega.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nguyenhuunghia127/barber)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://github.com/nguyenhuunghia127/barber)

[Tiếng Việt](#-tiếng-việt) | [English](#-english)

---

## 🇻🇳 Tiếng Việt

**1997 Barber** là một trang đích (landing page) hiện đại, hiệu năng vượt trội, được thiết kế chuyên biệt cho tiệm cắt tóc nam và barbershop cao cấp. Trang web tập trung vào giao diện mạnh mẽ, trải nghiệm thị giác ấn tượng và tối ưu hóa tối đa tỷ lệ chuyển đổi khách truy cập thành lịch hẹn đặt trước.

---

### 🎯 Các Tính Năng Nổi Bật

1. 🌍 **Hỗ Trợ Song Ngữ (Bilingual EN / VI)**:
   - Chuyển đổi ngôn ngữ tức thời giữa Tiếng Anh và Tiếng Việt bằng JavaScript thuần (Zero reload).
   - Tự động lưu ngôn ngữ đã chọn vào `localStorage`.

2. 🎟️ **Popup Vé Xác Nhận Đặt Lịch & Pháo Hoa (Success Ticket Modal & Canvas Confetti)**:
   - Ngay sau khi gửi form thành công, kích hoạt hiệu ứng pháo hoa ăn mừng (`canvas-confetti`).
   - Tự động mở Modal vé điện tử cao cấp với đầy đủ thông tin: *Tên khách hàng, Số điện thoại, Dịch vụ cắt tóc, Khung giờ hẹn, Chi nhánh*.
   - Hộp thông báo cam kết gọi điện xác nhận trong vòng 5 phút kèm nút Hotline và nút Hoàn tất.

3. 🔔 **Thông Báo Khách Đặt Lịch Trực Tiếp (Live Social Proof Toast)**:
   - Tự động luân phiên hiển thị danh sách khách hàng thực tế vừa đặt lịch (VD: *Anh Tuấn vừa đặt lịch Combo Cắt Gội VIP - 3 phút trước*).
   - Khi có khách gửi form mới, thông tin lập tức được đẩy lên đầu feed và lưu trữ vào `localStorage` (`barber_recent_bookings`).

4. 📅 **Hệ Thống Đặt Lịch Thông Minh & Web3Forms AJAX JSON**:
   - Chọn dịch vụ, chọn thợ barber, chọn ngày giờ trực quan.
   - Gửi dữ liệu qua Web3Forms bằng phương thức `application/json` UTF-8, đảm bảo 100% không bao giờ bị lỗi font chữ tiếng Việt trong email.

5. ⭐ **Tích Hợp Đánh Giá Google Maps & Video TikTok**:
   - Widget đánh giá Google 5 sao từ khách hàng thực tế (hỗ trợ [Trustindex](https://www.trustindex.io/)).
   - Tự động nhúng video TikTok mới nhất qua [SociableKIT](https://www.sociablekit.com/) hoặc [Elfsight](https://elfsight.com/).

6. 📱 **Tối Ưu Hoá Mobile & Chuẩn Safe-Area**:
   - Tương thích hoàn hảo mọi thiết bị di động (từ iPhone SE đến Pro Max).
   - Hỗ trợ `viewport-fit=cover` và `safe-area-inset-bottom` cho thanh dính đáy (**Sticky Book Bar**).
   - Chống lỗi tự động zoom màn hình trên iOS Safari (`font-size: 16px !important;` cho input).
   - Popup vé đặt lịch hỗ trợ cuộn mượt mà trên màn hình nhỏ (`max-h-[92vh] overflow-y-auto`).

7. 🔍 **Tối Ưu SEO & Tốc Độ Tải Trang**:
   - Schema JSON-LD `BarberShop` / `LocalBusiness`.
   - Đầy đủ thẻ OpenGraph, Canonical URL, Favicon và `manifest.json`.

---

### 📂 Cấu Trúc Thư Mục

```text
barber_house/
├── index.html            # Trang đích chính (HTML5 + Tailwind CSS CDN + Song ngữ EN/VI)
├── manifest.json         # Cấu hình PWA (Web App)
├── README.md             # Tài liệu dự án
├── .gitignore            # Cấu hình bỏ qua tệp của Git
├── img/                  # Thư mục chứa hình ảnh cục bộ (Logo, Icon)
└── assets/
    ├── css/
    │   └── style.css     # CSS tùy biến: Toast, Modal, Confetti, Animations, Safe-Area
    └── js/
        └── main.js       # JS xử lý: Song ngữ, Form JSON, Modal Ticket, Live Toast, Flatpickr
```

---

### ⚙️ Hướng Dẫn Cấu Hình Hệ Thống

#### 1. Nhận thông báo đặt lịch về Email (Web3Forms)
Mở file `index.html`, tìm đến form `#booking-form`:
```html
<input type="hidden" name="access_key" value="f8bf4d76-ad3a-4a89-8343-b1fdbd2328a9">
```
> Thay thế `value` bằng Access Key miễn phí lấy từ [Web3Forms](https://web3forms.com).

#### 2. Cập nhật Số điện thoại & Kênh Liên Hệ
* **Hotline / SMS**: `510-501-0274`
* **Instagram**: `https://ig.me/m/justin.nguyen1997`
* **Email**: `tuaudi@gmail.com`
* **Địa chỉ Studio**: `24654 Joyce street, Hayward 94544`

#### 3. Đồng bộ Đánh Giá Google Maps (Trustindex)
1. Đăng ký tài khoản miễn phí tại [Trustindex.io](https://www.trustindex.io/).
2. Kết nối trang Google Business của bạn và sao chép đoạn mã widget `<script>`.
3. Mở file `index.html`, tìm phần `Customer Reviews` và thay thế đoạn script có sẵn.

#### 4. Bảng Tin Video TikTok (SociableKIT / Elfsight)
1. Tạo widget TikTok Feed tại [SociableKIT](https://www.sociablekit.com/) hoặc [Elfsight](https://elfsight.com/).
2. Sao chép mã nhúng và dán vào phần `Follow us on TikTok` trong file `index.html`.

---

## 🇺🇸 English

**1997 Barber** is a high-performance, modern landing page crafted specifically for barbershops and premium men's grooming salons. The website focuses on strong visual impact, seamless user experience, and maximizing visitor-to-appointment conversion rates.

---

### 🎯 Key Features

1. 🌍 **Instant Bilingual Toggle (EN / VI)**:
   - Native JavaScript translation without page reloads.
   - Automatically saves user language preference in `localStorage`.

2. 🎟️ **Luxury Success Ticket Modal & Canvas Confetti**:
   - Triggers celebratory confetti animations upon form submission.
   - Displays a sleek electronic booking ticket modal with full client details (*Name, Phone, Service, Time, Branch*).
   - Includes a 5-minute confirmation notice and fast action buttons (Hotline & Dismiss).

3. 🔔 **Live Social Proof Booking Toast**:
   - Displays real-time rolling notifications of recent bookings.
   - Dynamically pushes new user submissions into the feed with `localStorage` persistence.

4. 📅 **Smart Booking System & Web3Forms AJAX JSON**:
   - Modern service & barber selection flow.
   - Standardized `application/json` UTF-8 submission preventing email character corruption.

5. ⭐ **Live Google Reviews & TikTok Feed Integration**:
   - Google Maps 5-star customer review widget ([Trustindex](https://www.trustindex.io/)).
   - Embedded TikTok video stream via [SociableKIT](https://www.sociablekit.com/) or [Elfsight](https://elfsight.com/).

6. 📱 **Mobile-First & Safe-Area UX**:
   - Optimized for all viewport sizes (iPhone SE to Pro Max).
   - Safe-area support (`viewport-fit=cover`, `env(safe-area-inset-bottom)`) for the Sticky Booking Bar.
   - iOS Safari input zoom prevention (`font-size: 16px !important;`).
   - Scrollable modal container (`max-h-[92vh] overflow-y-auto`).

7. 🔍 **SEO & Performance Optimization**:
   - Schema.org `BarberShop` / `LocalBusiness` JSON-LD markup.
   - Full OpenGraph metadata, Canonical URL, Favicon, and PWA `manifest.json`.

---

### 🚀 Deployment Guide (Vercel)

1. Commit and push your code to GitHub (`nguyenhuunghia127/barber`).
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: `Other`) and click **Deploy**.

---

### 📞 Contact & Studio Information

* **Brand**: 1997 Barber - Men's Grooming Studio
* **Address**: 24654 Joyce Street, Hayward, CA 94544
* **Phone**: 510-501-0274
* **Email**: tuaudi@gmail.com
* **Instagram**: [@justin.nguyen1997](https://instagram.com/justin.nguyen1997)

---
© 2026 **1997 Barber**. All Rights Reserved.
