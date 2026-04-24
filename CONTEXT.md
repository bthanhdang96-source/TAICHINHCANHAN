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

## 4. Quy trình Quản lý Task với Beads (Tối ưu Token)

Dự án sử dụng **Beads (`bd` CLI)** để quản lý task và bộ nhớ AI. Đây là quy trình bắt buộc:

### BẮT ĐẦU CÔNG VIỆC:
```bash
bd prime              # Lấy bối cảnh nén (~1-2k tokens) — thay thế việc đọc file log dài
bd ready              # Xem task nào sẵn sàng để làm (không bị chặn bởi task khác)
bd show <id>          # Xem chi tiết task cụ thể
bd update <id> --claim # Nhận task về mình
```

### TRONG KHI CODE:
- Dùng `bd create "Tiêu đề" -p <priority> -t task` để tạo sub-task nếu cần.
- Dùng `bd update <id> --notes "ghi chú"` để lưu lại ghi chú kỹ thuật.
- Dùng `bd remember "thông tin quan trọng"` để lưu kiến thức vĩnh viễn.

### KẾT THÚC CÔNG VIỆC:
1. Đóng task đã hoàn thành: `bd close <id> "Lý do"`.
2. Cập nhật `CHANGELOG.md` (cho Human đọc).
3. Chạy lệnh push code:
```bash
git add .; git commit -m "mô tả"; git push origin main
```
