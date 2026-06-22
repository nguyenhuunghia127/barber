# 1997 Barber - Men's Grooming Studio

Đây là trang web đích (Landing Page) hiện đại, tối ưu hóa cho thiết bị di động dành cho tiệm cắt tóc nam cao cấp.
Được thiết kế để mang lại trải nghiệm người dùng mượt mà trên mọi thiết bị, tập trung vào các thao tác vuốt chạm và giao diện đẹp mắt.

## 🚀 Các tính năng chính

*   **Tối ưu cho Di động (Mobile-First):** Giao diện thân thiện với thiết bị di động, nút bấm lớn, thiết kế lưới (grid) và linh hoạt (flex).
*   **Thanh trượt động (Carousel):** Tự động cuộn cho Banner, Không gian tiệm và Thư viện ảnh. Hỗ trợ tính năng kéo để cuộn trên máy tính và dừng khi di chuột vào.
*   **Hỗ trợ Đa ngôn ngữ:** Chuyển đổi tức thì giữa Tiếng Anh (EN) và Tiếng Việt (VN) mà không cần tải lại trang.
*   **Hệ thống Đặt lịch:** Tích hợp form đặt lịch với [Flatpickr](https://flatpickr.js.org/) để chọn ngày giờ. Dữ liệu được gửi an toàn thông qua [Web3Forms](https://web3forms.com/).
*   **Đánh giá của khách hàng (Live Reviews):** Tự động lấy và hiển thị các đánh giá thực tế từ cơ sở dữ liệu Google Sheets.
*   **Hiệu ứng cuộn trang (Scroll Animations):** Các phần tử xuất hiện mượt mà khi cuộn nhờ Intersection Observer API.

## 📁 Cấu trúc Dự án

```text
barber_house/
├── index.html            # File layout HTML chính
├── README.md             # Tài liệu hướng dẫn
├── .gitignore            # Cấu hình Git
└── assets/
    ├── css/
    │   └── style.css     # CSS tùy chỉnh và Tailwind
    └── js/
        └── main.js       # Logic JavaScript chính
```

## 🛠️ Công nghệ sử dụng

*   **HTML5** (Cấu trúc Semantic)
*   **Tailwind CSS** (Định dạng qua CDN)
*   **Vanilla JavaScript** (ES6+, DOM, Intersection Observer)
*   **Web3Forms** (Backend cho Form liên hệ/đặt lịch)
*   **Google Sheets API (gviz)** (Cơ sở dữ liệu cho phần Đánh giá)

## 💡 Cách chạy thử trên máy tính

Dự án này là Front-end tĩnh. Không cần cài đặt công cụ phức tạp!
1. Tải (Clone) mã nguồn về máy.
2. Mở file `index.html` trên bất kỳ trình duyệt web nào.
3. *(Tùy chọn)* Để tránh lỗi CORS khi tải đánh giá, hãy mở bằng một Live Server (ví dụ: tiện ích Live Server trên VS Code).

---

## 🤖 Hướng dẫn chi tiết: Tự động hóa lấy Đánh giá từ Google Maps lên Web

Trang web này sử dụng một quy trình tự động, hoàn toàn miễn phí để lấy các đánh giá từ Google Maps hiển thị lên web thông qua Make.com và Google Sheets.

**Luồng hoạt động (Workflow):**
1. Khách hàng nhấp vào nút đánh giá và để lại nhận xét trên Google Maps.
2. Nền tảng **Make.com** (Bản miễn phí) đóng vai trò là cầu nối tự động.
3. **Kích hoạt (Trigger):** Make.com liên tục theo dõi các đánh giá mới trên trang Google Business của bạn.
4. **Hành động (Action):** Khi có đánh giá mới, Make.com sẽ tự động lấy Tên, Số sao và Nội dung đánh giá, sau đó thêm thành 1 dòng mới vào file Google Sheet.
5. **Kết quả:** Website tự động đọc dữ liệu từ file Google Sheet này và hiển thị đánh giá mới lên giao diện ngay lập tức.

### Bước 1: Chuẩn bị file Google Sheets
1. Tạo một file Google Sheets mới trên Google Drive của bạn.
2. Đặt quyền chia sẻ file là **"Bất kỳ ai có liên kết đều có thể xem" (Anyone with the link can view)**.
3. Nhìn lên thanh địa chỉ (URL) của file, copy đoạn mã ID của file. (Ví dụ: `https://docs.google.com/spreadsheets/d/1F6YAkHVe4AQq3_6ElJivWSOWcd3vAZlmuQ9vDz6vFwc/edit` thì ID là `1F6YAkHVe4AQq3_6ElJivWSOWcd3vAZlmuQ9vDz6vFwc`).
4. Mở file `assets/js/main.js` trong thư mục dự án, tìm hàm `fetchReviews` (khoảng dòng 208). Thay thế biến `SHEET_ID` bằng ID file Google Sheet mới của bạn.

### Bước 2: Thiết lập tự động trên Make.com
1. Đăng ký một tài khoản miễn phí tại [Make.com](https://www.make.com/).
2. Đăng nhập và tạo một kịch bản mới (Nhấn **Create a new scenario**).
3. **Thêm Trigger:** Nhấp vào dấu **+**, tìm ứng dụng **Google Business Profile**, chọn **Watch Reviews** (Theo dõi đánh giá mới). Đăng nhập bằng tài khoản Google quản lý tiệm của bạn và chọn đúng địa điểm tiệm trên Google Map.
4. **Thêm Action:** Nhấp vào dấu **+** tiếp theo, tìm ứng dụng **Google Sheets**, chọn **Add a Row** (Thêm dòng mới).
   - Đăng nhập bằng tài khoản Google chứa file Sheet đã tạo ở Bước 1.
   - Chọn đúng file Spreadsheet của bạn.
   - Khi Make.com yêu cầu khớp dữ liệu (Map), hãy thiết lập như sau (tuân theo đúng định dạng được đọc trong `main.js`):
     - **Cột B:** Gắn với trường `Reviewer Name` (Tên khách).
     - **Cột E:** Gắn với trường `Star Rating` (Số sao, ví dụ: FIVE, FOUR...).
     - **Cột F:** Gắn với trường `Comment` (Nội dung đánh giá).
5. **(Tùy chọn)** Thêm bộ lọc (Filter) giữa 2 bước này nếu bạn chỉ muốn lấy các đánh giá 5 sao.
6. Lưu lại (Save) kịch bản.
7. Bật chế độ lập lịch (Scheduling) thành **ON** ở góc dưới bên trái và cài đặt thời gian chạy tự động (ví dụ: 15 phút một lần hoặc 1 ngày 1 lần).

---

## 📧 Hướng dẫn: Nhận thông báo Đặt lịch qua Web3Forms

Hệ thống đặt lịch sử dụng Web3Forms để gửi email miễn phí mà không cần cài đặt máy chủ (server-side).

1. Truy cập [Web3Forms.com](https://web3forms.com/).
2. Nhập địa chỉ Email của bạn vào ô đăng ký để lấy **Access Key**.
3. Bạn sẽ nhận được một đoạn mã Access Key (ví dụ: `e6e61688-7823-4900-945e-fd037ffb6865`) gửi vào email.
4. Mở file `index.html`, tìm đến đoạn `<form id="booking-form">` (gần cuối file).
5. Thay thế giá trị trong thẻ `<input type="hidden" name="access_key" value="...">` bằng Access Key bạn vừa nhận được.
6. Nếu bạn muốn đổi tên chủ đề email, hãy sửa `value` trong thẻ `<input type="hidden" name="subject" value="🔔 NEW BOOKING FROM 1997 BARBER WEBSITE!">`.
7. Xong! Bất kỳ khi nào khách hàng điền form, thông tin sẽ được tự động gửi thẳng vào hộp thư email của bạn.

---
*Được thiết kế nhằm mang lại trải nghiệm phong cách nam tính và đẳng cấp nhất.*
