# 💈 1997 Barber - Men's Grooming Studio 💈

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## Tiếng Việt

**1997 Barber** là một trang đích (landing page) hiện đại, hiệu năng cao, được thiết kế chuyên biệt cho các tiệm cắt tóc và salon chăm sóc nam giới. Trang web tập trung vào giao diện ấn tượng, trải nghiệm mượt mà và tối ưu hóa chuyển đổi khách truy cập thành lịch hẹn đặt trước.

Đây là trang web tĩnh hoàn toàn (Static Web), không cần máy chủ riêng (serverless), sử dụng các dịch vụ bên thứ ba để xử lý dữ liệu động như đánh giá của khách hàng, bảng tin mạng xã hội và thông báo đặt lịch qua email.

### 🎯 Các tính năng nổi bật
* 📱 **Giao diện Responsive (Mobile-First):** Hiển thị hoàn hảo trên mọi thiết bị di động, máy tính bảng và máy tính để bàn bằng Tailwind CSS.
* 🌍 **Hỗ trợ song ngữ (Bilingual):** Chuyển đổi ngôn ngữ tức thời giữa tiếng Anh và tiếng Việt bằng JavaScript (không cần tải lại trang).
* ⭐ **Đánh giá Google Maps trực tiếp:** Tích hợp widget [Trustindex](https://www.trustindex.io/) để lấy các đánh giá 5 sao thực tế từ Google Business.
* 🎵 **Bảng tin TikTok tự động:** Tự động đồng bộ các video TikTok mới nhất qua widget [SociableKIT](https://www.sociablekit.com/) (hoặc [Elfsight](https://elfsight.com/)), hỗ trợ lên đến 2000 lượt xem/tháng miễn phí.
* 📅 **Form đặt lịch thông minh:** Tích hợp bộ chọn ngày/giờ ([Flatpickr](https://flatpickr.js.org/)) và gửi thông báo đặt lịch thẳng về email của bạn qua dịch vụ [Web3Forms](https://web3forms.com/).
* 🚀 **Tối ưu tốc độ:** Kiến trúc thuần HTML/JS/CSS với cơ chế tải chậm (lazy-loading) hình ảnh giúp trang web đạt điểm hiệu năng gần như tuyệt đối.
* 🔍 **Tối ưu SEO:** Cấu hình đầy đủ thẻ meta Open Graph cho mạng xã hội, Canonical link, và định dạng dữ liệu có cấu trúc `LocalBusiness` (JSON-LD Schema) giúp tối ưu thứ hạng tìm kiếm địa phương trên Google.

---

### 📂 Cấu trúc thư mục dự án
```text
barber_house/
├── index.html            # File HTML chính (Gồm toàn bộ UI & Logic dịch ngôn ngữ)
├── README.md             # Tài liệu hướng dẫn dự án
├── .gitignore            # Cấu hình bỏ qua tệp của Git
├── img/                  # Thư mục chứa hình ảnh cục bộ (Logo, Favicon)
└── assets/
    ├── css/
    │   └── style.css     # CSS tùy biến bổ sung ngoài Tailwind
    └── js/
        └── main.js       # File JS xử lý hiệu ứng, chuyển đổi ngôn ngữ
```

---

### 🚀 Hướng dẫn cấu hình hệ thống
Để trang web hoạt động hoàn chỉnh với thông tin cá nhân của bạn, hãy cập nhật các dịch vụ sau:

#### 1. Nhận thông báo đặt lịch về Email (Web3Forms)
Mặc định, khi khách hàng điền form đặt lịch, dữ liệu sẽ được gửi qua API của Web3Forms. Để nhận thông tin về email của bạn:
1. Truy cập [Web3Forms](https://web3forms.com/), nhập địa chỉ email của bạn để lấy một mã **Access Key** miễn phí.
2. Mở file `index.html`, tìm tới dòng `<form id="booking-form">`.
3. Tìm thẻ input ẩn: `<input type="hidden" name="access_key" value="...">`.
4. Thay thế giá trị `value` bằng mã Access Key bạn vừa nhận được.

#### 2. Đồng bộ đánh giá Google Maps (Trustindex)
1. Đăng ký tài khoản miễn phí tại [Trustindex.io](https://www.trustindex.io/).
2. Kết nối trang doanh nghiệp Google của bạn (Google Business Profile).
3. Chọn và tùy chỉnh giao diện widget đánh giá, sau đó sao chép đoạn mã `<script>` được cung cấp.
4. Mở file `index.html`, tìm phần `Customer Reviews` và thay thế đoạn script có sẵn bằng mã của bạn.

#### 3. Bảng tin TikTok (SociableKIT / Elfsight)
1. Đăng ký tài khoản miễn phí tại [SociableKIT](https://www.sociablekit.com/) (khuyên dùng vì hỗ trợ 2.000 lượt xem/tháng) hoặc [Elfsight](https://elfsight.com/).
2. Tạo widget **TikTok Feed**, liên kết tài khoản TikTok của bạn (`@justin.realbarber1`).
3. Sao chép mã nhúng (gồm thẻ `div` và thẻ `script`).
4. Mở file `index.html`, tìm phần `Follow us on TikTok` và dán mã nhúng mới vào.

---

## English

**1997 Barber** is a custom-built, modern landing page designed specifically for barbershops and men's grooming salons. The primary goal of this project is to create an immediate visual impact, build trust with potential clients, and seamlessly convert visitors into booked appointments.

This static web application requires zero server-side maintenance, leveraging third-party APIs and widgets to handle dynamic content like customer reviews, social media feeds, and email booking notifications.

### 🎯 Key Features
* 📱 **Mobile-First & Fully Responsive:** Designed to look flawless on smartphones, tablets, and desktops using Tailwind CSS.
* 🌍 **Bilingual Support (I18n):** Users can instantly toggle between English and Vietnamese. The translation is handled natively via JavaScript without page reloads.
* ⭐ **Live Google Maps Reviews:** Integrates the [Trustindex](https://www.trustindex.io/) widget to dynamically pull and display authentic 5-star reviews directly from your Google Business Profile.
* 🎵 **TikTok Social Feed:** Keeps the website fresh and engaging by embedding your latest TikTok videos automatically via [SociableKIT](https://www.sociablekit.com/) (recommended for 2,000 free monthly views) or [Elfsight](https://elfsight.com/).
* 📅 **Smart Booking Form:** A fully functional booking system equipped with a date/time picker ([Flatpickr](https://flatpickr.js.org/)) that sends booking requests straight to your email using [Web3Forms](https://web3forms.com/).
* 🚀 **Insanely Fast:** Pure HTML/JS/CSS architecture with lazy-loading images ensures near-instant page load speeds.
* 🔍 **Advanced Local SEO:** Pre-configured with Open Graph tags for social media sharing, Canonical links, and `LocalBusiness` JSON-LD Schema markup to dominate local Google search results.

---

### 📂 Project Structure
```text
barber_house/
├── index.html            # The main landing page file (All UI & Logic included)
├── README.md             # Project documentation
├── .gitignore            # Git configuration
├── img/                  # Local image assets (Logo, Favicon)
└── assets/
    ├── css/
    │   └── style.css     # Custom CSS overrides and Tailwind directives
    └── js/
        └── main.js       # Core JavaScript (Animations, Language Toggle, etc.)
```

---

### 🚀 Getting Started & Configuration

#### 1. Booking Notifications (Web3Forms)
To receive booking requests to **your** email address:
1. Go to [Web3Forms](https://web3forms.com/) and enter your email to get a free **Access Key**.
2. Open `index.html` and locate the booking form: `<form id="booking-form">`.
3. Find the hidden input: `<input type="hidden" name="access_key" value="...">`.
4. Replace the `value` with your newly generated Access Key.

#### 2. Google Reviews (Trustindex)
To display your own Google Maps reviews:
1. Create a free account at [Trustindex.io](https://www.trustindex.io/).
2. Connect your Google Business Profile.
3. Customize your widget layout and copy the generated `<script>` tag.
4. Open `index.html`, find the `Customer Reviews` section, and replace the existing Trustindex script with yours.

#### 3. TikTok Feed (SociableKIT / Elfsight)
To display your own TikTok videos:
1. Create a free account at [SociableKIT](https://www.sociablekit.com/) (recommended for 2,000 monthly views) or [Elfsight](https://elfsight.com/).
2. Create a **TikTok Feed** widget and input your TikTok username.
3. Copy the generated `<div>` and `<script>` code.
4. Open `index.html`, find the `Follow us on TikTok` section, and replace the existing widget code with yours.

---

## 🚀 Deployment (Vercel)

This project is highly optimized for deployment on [Vercel](https://vercel.com/):

1. Commit and push your code to a GitHub repository.
2. Log in to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: `Other`, Build Command: `None`, Output Directory: `None`).
5. Click **Deploy**.

---

## 📞 Contact & Support

**1997 Barber Studio**
- **Address:** 24654 Joyce street, Hayward 94544
- **Phone:** 510-501-0274
- **Email:** tuaudi@gmail.com
