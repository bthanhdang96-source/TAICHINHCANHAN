# AI MEMORY LOG (BỘ NHỚ DÀNH CHO AI)

File này lưu trữ các quyết định kiến trúc lớn. Để quản lý task chi tiết, hãy dùng **Beads (`bd` CLI)**.

> **AI INSTRUCTION:** Thay vì đọc toàn bộ file này mỗi phiên, hãy chạy `bd prime` để lấy bối cảnh nén (~1-2k tokens). File này chỉ dành cho các ghi chú kiến trúc quan trọng.

---

## [2026-04-24] - Tích hợp Taste Skill (Design System cho AI)
- **SKILL MỚI:** Đã thêm `skills/taste-skill/SKILL.md` — bộ quy tắc thiết kế premium chống AI "slop".
- **Nguồn gốc:** Dựa trên [taste-skill](https://github.com/Leonxlnx/taste-skill) (12.4k stars), đã customized cho Vanilla JS + CSS stack (gốc hỗ trợ React/Tailwind).
- **3 thông số điều chỉnh:** DESIGN_VARIANCE=8, MOTION_INTENSITY=6, VISUAL_DENSITY=4. User có thể yêu cầu thay đổi qua chat.
- **Quy tắc bắt buộc:** AI PHẢI đọc `skills/taste-skill/SKILL.md` trước khi viết bất kỳ CSS/HTML nào. Xem `CONTEXT.md` mục 3.
- **Anti-Slop Blacklist:** Cấm Inter font, cấm emoji, cấm pure black (#000), cấm neon glow, cấm 3-column card layout generic, cấm centered hero (khi DESIGN_VARIANCE > 4).

## [2026-04-24] - Tích hợp Beads (Bộ nhớ AI nâng cấp)
- **CHUYỂN ĐỔI LỚN:** Task tracking từ nay được quản lý bằng Beads (`bd` commands) thay vì ghi tay vào file.
- **Cài đặt:** `bd` CLI v1.0.2 đã được cài đặt tại `C:\Users\DTGK\AppData\Local\Programs\bd\bd.exe`.
- **Database:** `.beads/` chứa Dolt database (nằm trong `.gitignore`, không push lên GitHub).
- **Quy trình mới:** `bd prime` → `bd ready` → code → `bd close` → push. Xem `CONTEXT.md` mục 4 để biết chi tiết.
- **Files mới do Beads tạo:** `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`.

## [2026-04-24] - Khởi tạo & Cấu trúc
- **Kiến trúc:** Khởi tạo kiến trúc Vite + Vanilla JS thuần.
- **Rules:** KHÔNG dùng TailwindCSS hay thư viện UI nặng trừ khi có yêu cầu. Dùng Vanilla CSS.
- **Git workflow:** Đã thiết lập `CHANGELOG.md` cho Human và `sync.bat` để push code.
- **Tiến độ:** Khởi tạo xong khung cơ bản, sẵn sàng thiết kế UI Components.
