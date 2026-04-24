# AI MEMORY LOG (BỘ NHỚ DÀNH CHO AI)

File này lưu trữ các quyết định kiến trúc lớn. Để quản lý task chi tiết, hãy dùng **Beads (`bd` CLI)**.

> **AI INSTRUCTION:** Thay vì đọc toàn bộ file này mỗi phiên, hãy chạy `bd prime` để lấy bối cảnh nén (~1-2k tokens). File này chỉ dành cho các ghi chú kiến trúc quan trọng.

---

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
