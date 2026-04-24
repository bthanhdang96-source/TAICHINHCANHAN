# BẢN ĐỒ DỰ ÁN DÀNH CHO AI (ANTIGRAVITY)

## 1. Mục tiêu Dự án
Đây là một website **Vibe Code** sử dụng cấu trúc **Vite + Vanilla JS + Vanilla CSS**.
- **Hosting**: Render (Static Web)
- **Database/Auth**: Supabase

Quy tắc tối thượng: Giữ mọi thứ đơn giản, tốc độ cao, module hóa và không dùng các thư viện rườm rà nếu không có yêu cầu từ User. Style được định nghĩa thuần bằng CSS (hoặc SCSS/CSS Variables) tập trung vào hiệu ứng thị giác (Vibe).

## 2. Cấu trúc Thư mục

- `index.html`: Cấu trúc DOM chính. Không nhét script logic vào đây.
- `src/main.js`: File entry point. Chuyên trách khởi tạo app và render UI ban đầu.
- `src/style.css`: Nơi chứa toàn bộ biến CSS và các class tiện ích dùng chung (Design System).
- `src/lib/`: Các tiện ích kết nối (API, Supabase, Helper function).
  - `supabase.js`: Khởi tạo và export Supabase client duy nhất.
- `src/components/`: Chứa các Component UI độc lập (dạng JS Class hoặc Hàm trả về DOM/String template).
- `src/pages/`: Chứa các layout/view chính cho từng màn hình.
- `supabase/schema.sql`: Nơi tham khảo cấu trúc bảng DB để viết truy vấn. **Không cần query vào DB để tìm hiểu cấu trúc, chỉ cần đọc file này**.

## 3. Quy tắc Lập trình (AI Rule)
- Đọc file `USER_GUIDE.md` nếu User gặp khó khăn trong việc chạy code.
- Khi cần viết CSS mới: Hạn chế viết CSS inline, hãy tận dụng các biến CSS chung.
- Khi làm việc với Supabase: Luôn import từ `src/lib/supabase.js`.
- Khi cần tạo Component: Định nghĩa nó trong `src/components/` và export ra.
- Nếu không chắc về ý định của User, hãy hỏi thay vì tự ý cài thêm packages.
- **BẮT BUỘC TRƯỚC KHI KẾT THÚC CÔNG VIỆC**: Phải cập nhật log vào `CHANGELOG.md` (cho Human) và `AI_MEMORY.md` (cho AI). Sau đó, chạy lệnh `sync.bat` (hoặc các lệnh git add/commit/push) để tự động đẩy code lên GitHub.
- **BẮT BUỘC TRƯỚC KHI BẮT ĐẦU CÔNG VIỆC**: Phải đọc `AI_MEMORY.md` để lấy bối cảnh kỹ thuật hiện hành.
