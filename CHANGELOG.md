# Nhật ký Thay đổi (Changelog)

File này ghi lại lịch sử cập nhật của dự án dưới dạng ngôn ngữ dễ hiểu dành cho Con người.
Mỗi khi có tính năng mới hoặc lỗi được sửa, AI (hoặc bạn) sẽ cập nhật nội dung vào đây trước khi Push code.

---

## [2026-04-24] - Thêm Taste Skill (Design System)
- Tích hợp bộ quy tắc thiết kế UI premium từ [taste-skill](https://github.com/Leonxlnx/taste-skill).
- AI sẽ tự động tuân theo các quy tắc chống giao diện "nhạt nhẽo" (anti-slop): cấm font Inter, cấm emoji, cấm layout generic 3 cột đều nhau.
- Có 3 thông số điều chỉnh phong cách: DESIGN_VARIANCE (bố cục), MOTION_INTENSITY (hiệu ứng), VISUAL_DENSITY (mật độ nội dung).
- File skill nằm tại `skills/taste-skill/SKILL.md`.

## [2026-04-24] - Tích hợp Beads
- Cài đặt hệ thống quản lý task Beads (bd CLI v1.0.2) để tối ưu quy trình AI.
- Cập nhật cấu trúc dự án: thêm `.gitignore` hoàn chỉnh, `AGENTS.md`, `CLAUDE.md`.
- Cập nhật `CONTEXT.md` với quy trình Beads chi tiết cho AI.

## [2026-04-24] - Khởi tạo Dự án
- Khởi tạo cấu trúc dự án Vibe Code với Vite, Vanilla JS.
- Thiết lập hệ thống thư mục (`src/components`, `src/pages`).
- Cấu hình file Render (`render.yaml`) và thiết lập Supabase ban đầu.
- Thiết lập quy trình Git Auto Push (`sync.bat`) và hệ thống Logging.
