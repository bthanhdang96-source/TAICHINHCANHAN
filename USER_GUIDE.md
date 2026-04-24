# Hướng dẫn Khởi chạy Website Vibe Code

File này hướng dẫn bạn cách khởi chạy và test website trên máy tính cá nhân của bạn một cách nhanh chóng.

## 1. Yêu cầu trước khi chạy
Đảm bảo máy tính của bạn đã cài đặt **Node.js** (Khuyên dùng phiên bản LTS mới nhất). Bạn có thể kiểm tra bằng cách mở Terminal / Command Prompt và gõ:
```bash
node -v
npm -v
```

## 2. Các bước khởi chạy dự án lần đầu tiên

**Bước 1: Cài đặt thư viện**
Mở Terminal, trỏ vào thư mục dự án `TAICHINHCANHAN` và chạy lệnh sau để tải các gói phụ thuộc (Vite, Supabase):
```bash
npm install
```

**Bước 2: Cấu hình biến môi trường**
- Copy file `.env.example` thành một file mới có tên là `.env`.
- Mở file `.env` và điền thông tin Supabase của bạn vào:
```
VITE_SUPABASE_URL=link_url_supabase_cua_ban
VITE_SUPABASE_ANON_KEY=key_anon_supabase_cua_ban
```
*(Nếu bạn chưa có DB Supabase, bạn vẫn có thể chạy web nhưng các tính năng liên quan đến DB sẽ không hoạt động).*

**Bước 3: Khởi chạy Web**
Chạy lệnh sau để bật môi trường lập trình (Dev Server):
```bash
npm run dev
```

Sau khi chạy xong lệnh này, bạn sẽ thấy trên màn hình Terminal hiện ra một đường link cục bộ, thường là `http://localhost:3000` (hoặc 5173). Hãy click vào đó hoặc copy dán vào trình duyệt để xem trang web của mình.

Mỗi khi bạn sửa code trong thư mục `src/`, trình duyệt sẽ tự động cập nhật ngay lập tức mà không cần F5!

## 3. Cách build dự án để đưa lên mạng (Deploy)
Lệnh này sẽ nén toàn bộ code của bạn thành một thư mục `dist` tối ưu nhất:
```bash
npm run build
```
*(Dự án này đã được cấu hình sẵn cho Render.com. Nếu bạn kết nối Github với Render, việc build sẽ được Render tự động làm mỗi khi bạn Push code lên).*
