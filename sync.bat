@echo off
chcp 65001 > nul
echo =========================================
echo   TIEN HANH DONG BO CODE LEN GITHUB
echo =========================================

:: Yêu cầu người dùng nhập thông tin commit
set /p commit_msg="Nhap noi dung thay doi (hoac an Enter de dung log tu dong): "

:: Nếu người dùng không nhập gì, dùng timestamp
if "%commit_msg%"=="" (
    set commit_msg=Auto-sync update: %date% %time%
)

echo.
echo [*] Dang them cac file vao Git...
git add .

echo [*] Dang tao Commit: "%commit_msg%"...
git commit -m "%commit_msg%"

echo [*] Dang day code len GitHub...
git push origin main

echo.
echo =========================================
echo   DONG BO HOAN TAT!
echo =========================================
pause
