# 1997 Barber - Men's Grooming Studio

Đây là trang web đích (Landing Page) hiện đại, tối ưu hóa cho thiết bị di động dành cho tiệm cắt tóc nam cao cấp.
Được thiết kế để mang lại trải nghiệm người dùng mượt mà trên mọi thiết bị, tập trung vào các thao tác vuốt chạm và giao diện đẹp mắt.

## 🚀 Các tính năng chính

*   **Tối ưu cho Di động (Mobile-First):** Giao diện thân thiện với thiết bị di động, nút bấm lớn, bố cục lưới (grid) linh hoạt.
*   **Hỗ trợ Đa ngôn ngữ:** Chuyển đổi tức thì giữa Tiếng Anh (EN) và Tiếng Việt (VN) mà không cần tải lại trang.
*   **Đánh giá của khách hàng (Trustindex):** Tự động lấy và hiển thị các đánh giá mới nhất, chân thực nhất từ Google Maps thông qua widget Trustindex.
*   **Mạng xã hội (TikTok Feed):** Tích hợp lưới video TikTok tự động cập nhật từ kênh của quán thông qua Elfsight widget.
*   **Hệ thống Đặt lịch:** Tích hợp form đặt lịch với [Flatpickr](https://flatpickr.js.org/) để chọn ngày giờ. Dữ liệu được gửi an toàn trực tiếp về email thông qua [Web3Forms](https://web3forms.com/).
*   **Chuẩn SEO Local Business:** Đã thiết lập đầy đủ thẻ Open Graph, Canonical, và JSON-LD Schema để tối ưu tìm kiếm địa phương trên Google.

## 📁 Cấu trúc Dự án

```text
barber_house/
├── index.html            # File giao diện HTML chính
├── README.md             # Tài liệu hướng dẫn
├── .gitignore            # Cấu hình Git
├── img/                  # Chứa hình ảnh (logo, background)
└── assets/
    ├── css/
    │   └── style.css     # CSS tùy chỉnh và Tailwind
    └── js/
        └── main.js       # Logic JavaScript chính
```

## 🛠 Công nghệ sử dụng

*   **HTML5** (Cấu trúc Semantic)
*   **Tailwind CSS** (Định dạng qua CDN)
*   **Vanilla JavaScript** (ES6+, DOM, Intersection Observer)
*   **Web3Forms** (Backend gửi email cho Form đặt lịch)
*   **Trustindex & Elfsight** (Widget đánh giá và mạng xã hội)

---

## 💻 Cách chạy thử trên máy tính

Dự án này là Front-end tĩnh. Không cần cài đặt máy chủ phức tạp!
1. Tải (Clone) mã nguồn về máy.
2. Mở file `index.html` trên bất kỳ trình duyệt web nào (Chrome, Safari, Edge).
3. *(Tùy chọn)* Để các hiệu ứng chạy mượt nhất, hãy mở bằng một Live Server (ví dụ: tiện ích Live Server trên VS Code).

---

## 🌐 Triển khai (Deploy) lên Vercel

Trang web đã được cấu hình sẵn để triển khai dễ dàng lên các nền tảng miễn phí như Vercel:
1. Đẩy (Push) mã nguồn lên tài khoản GitHub của bạn.
2. Đăng nhập vào [Vercel](https://vercel.com/), chọn **Add New Project**.
3. Kết nối với kho lưu trữ (repository) GitHub chứa mã nguồn này.
4. Bấm **Deploy**. Vercel sẽ tự động cấp cho bạn một đường link HTTPS miễn phí (ví dụ: `https://barber-eight-omega.vercel.app/`).
5. Nếu bạn có tên miền riêng (VD: `1997barber.com`), bạn có thể cấu hình Custom Domain trong phần Settings của Vercel.

---

## ⚙️ Hướng dẫn: Nhận thông báo Đặt lịch qua Email (Web3Forms)

Hệ thống đặt lịch sử dụng Web3Forms để gửi email miễn phí mà không cần cài đặt máy chủ (server-side). Hiện tại form đã được kết nối, nhưng nếu bạn muốn thay đổi email nhận thông báo:

1. Truy cập [Web3Forms.com](https://web3forms.com/).
2. Nhập địa chỉ Email của bạn vào ô đăng ký để lấy **Access Key**.
3. Bạn sẽ nhận được một đoạn mã Access Key (ví dụ: `e6e61688-7823...`) gửi vào email.
4. Mở file `index.html`, tìm đến đoạn `<form id="booking-form">` (gần cuối file).
5. Thay thế giá trị trong thẻ `<input type="hidden" name="access_key" value="...">` bằng Access Key bạn vừa nhận được.
6. Xong! Bất kỳ khi nào khách hàng điền form, thông tin sẽ được tự động gửi thẳng vào hộp thư email của bạn.

---
*Được thiết kế nhằm mang lại trải nghiệm phong cách nam tính và đẳng cấp nhất.*
