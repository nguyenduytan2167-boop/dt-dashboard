================================================================================
                    HUỚNG DẪN SỬ DỤNG VÀ DEPLOYMENT
               HỆ THỐNG PHÒNG ĐÀO TẠO - TRAINING DEPARTMENT SYSTEM
================================================================================

📝 PHIÊN BẢN: 1.0.0
📅 CẬP NHẬT: Tháng 4/2026
👨‍💻 TÁC GIẢ: AI Developer

================================================================================
                              MỤC LỤC
================================================================================
1. GIỚI THIỆU CHUNG
2. YÊU CẦU HỆ THỐNG
3. CẤU TRÚC DỰ ÁN
4. HƯỚNG DẪN CHẠY LOCAL
5. DEPLOY LÊN GITHUB PAGES
6. DEPLOY LÊN VERCEL (KHUYẾN NGHỊ)
7. DEPLOY LÊN SERVER RIÊNG
8. HƯỚNG DẪN SỬ DỤNG
9. TÀI KHOẢN MẶC ĐỊNH
10. XỬ LÝ SỰ CỐ THƯỜNG GẶP
11. LIÊN HỆ HỖ TRỢ

================================================================================
                         1. GIỚI THIỆU CHUNG
================================================================================

Đây là hệ thống quản lý Phòng Đào Tạo với các tính năng chính:

✅ TRANG CHỦ:
   - Dashboard với thống kê tổng quan
   - Sidebar điều hướng có thể thu nhỏ/mở rộng
   - Tìm kiếm lớp học theo mã lớp
   - Hiển thị iframe Google Apps Script
   - Dark/Light mode

✅ QUẢN TRỊ VIÊN:
   - Đăng nhập bảo mật
   - Quản lý Google Sheet Links
   - Quản lý dữ liệu lớp học
   - CRUD operations

✅ TÍNH NĂNG ĐẶC BIỆT:
   - Tích hợp Google Apps Script iframe
   - Sidebar thu gọn với nút << / >>
   - Tìm kiếm lớp theo mã
   - Responsive design

================================================================================
                       2. YÊU CẦU HỆ THỐNG
================================================================================

🖥️ ĐỂ CHẠY LOCAL:
   - Node.js >= 18.x
   - Bun >= 1.0 (hoặc npm/yarn/pnpm)
   - Git

🌐 ĐỂ DEPLOY:
   - Tài khoản GitHub
   - (Khuyến nghị) Tài khoản Vercel - FREE
   - Hoặc server riêng với Node.js

================================================================================
                        3. CẤU TRÚC DỰ ÁN
================================================================================

my-project/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 page.tsx              # Trang chủ
│   │   ├── 📄 layout.tsx            # Layout chính
│   │   ├── 📁 admin/
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx      # Trang đăng nhập admin
│   │   │   └── 📁 panel/
│   │   │       └── 📄 page.tsx      # Trang quản trị
│   │   └── 📁 api/
│   │       └── 📁 admin/
│   │           ├── 📄 login/route.ts
│   │           ├── 📄 sheets/route.ts
│   │           └── 📄 classes/route.ts
│   ├── 📁 components/
│   │   └── 📁 ui/                   # shadcn/ui components
│   └── 📁 lib/
│       └── 📄 db.ts                 # Database client
├── 📁 prisma/
│   └── 📄 schema.prisma             # Database schema
├── 📁 public/
│   ├── 📄 prd-logo.png              # Logo
│   └── 📄 logo.svg
├── 📄 package.json
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
├── 📄 next.config.ts
└── 📄 readme-hdsd.txt               # File này

================================================================================
                    4. HƯỚNG DẪN CHẠY LOCAL
================================================================================

📌 BƯỚC 1: CLONE DỰ ÁN TỪ GITHUB
----------------------------------
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

📌 BƯỚC 2: CÀI ĐẶT DEPENDENCIES
----------------------------------
# Sử dụng Bun (khuyến nghị)
bun install

# HOẶC sử dụng npm
npm install

# HOẶC sử dụng yarn
yarn install

📌 BƯỚC 3: CẤU HÌNH DATABASE
----------------------------------
# Tạo database và push schema
bun run db:push

# (Nếu có file seed)
bun run db:seed

📌 BƯỚC 4: CHẠY DEVELOPMENT SERVER
----------------------------------
# Sử dụng Bun
bun run dev

# HOẶC sử dụng npm
npm run dev

📌 BƯỚC 5: TRUY CẬP ỨNG DỤNG
----------------------------------
Mở trình duyệt tại: http://localhost:3000

================================================================================
                  5. DEPLOY LÊN GITHUB PAGES
================================================================================

⚠️ LƯU Ý QUAN TRỌNG:
GitHub Pages chỉ hỗ trợ STATIC sites. Dự án này là Next.js với SERVER-SIDE 
features (API routes, Prisma database). Để deploy đầy đủ, bạn nên dùng Vercel.

📌 NẾU VẪN MUỐN DÙNG GITHUB PAGES (STATIC EXPORT):
--------------------------------------------------

BƯỚC 1: Cập nhật next.config.ts
----------------------------------
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

BƯỚC 2: Build static export
----------------------------------
bun run build

BƯỚC 3: Cấu hình GitHub Actions
----------------------------------
Tạo file: .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

BƯỚC 4: Enable GitHub Pages
----------------------------------
1. Vào Repository > Settings > Pages
2. Source: chọn "GitHub Actions"
3. Push code lên branch main

================================================================================
                 6. DEPLOY LÊN VERCEL (KHUYẾN NGHỊ)
================================================================================

✅ VERCEL LÀ LỰA CHỌN TỐT NHẤT CHO NEXT.JS!

📌 BƯỚC 1: TẠO TÀI KHOẢN VERCEL
----------------------------------
1. Truy cập: https://vercel.com
2. Đăng ký bằng tài khoản GitHub

📌 BƯỚC 2: IMPORT PROJECT
----------------------------------
1. Click "New Project"
2. Chọn "Import Git Repository"
3. Chọn repository của bạn từ GitHub
4. Click "Import"

📌 BƯỚC 3: CẤU HÌNH DEPLOY
----------------------------------
- Framework Preset: Next.js (tự động detect)
- Root Directory: ./
- Build Command: bun run build (hoặc npm run build)
- Output Directory: .next

📌 BƯỚC 4: THÊM ENVIRONMENT VARIABLES
----------------------------------
Vào Project Settings > Environment Variables, thêm:

```
DATABASE_URL="file:./dev.db"
```

📌 BƯỚC 5: DEPLOY
----------------------------------
Click "Deploy" và chờ vài phút.

📌 BƯỚC 6: TRUY CẬP
----------------------------------
Vercel sẽ cung cấp URL dạng:
https://your-project.vercel.app

================================================================================
                   7. DEPLOY LÊN SERVER RIÊNG
================================================================================

📌 OPTION A: SỬ DỤNG PM2
----------------------------------

# Cài đặt PM2
npm install -g pm2

# Build project
bun run build

# Start với PM2
pm2 start npm --name "prd-system" -- start

# Save PM2 config
pm2 save
pm2 startup

📌 OPTION B: SỬ DỤNG DOCKER
----------------------------------

Tạo Dockerfile:
```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN bun run build

# Expose port
EXPOSE 3000

# Start
CMD ["bun", "start"]
```

Build và run:
```bash
docker build -t prd-system .
docker run -p 3000:3000 prd-system
```

================================================================================
                       8. HƯỚNG DẪN SỬ DỤNG
================================================================================

🏠 TRANG CHỦ (http://localhost:3000)
------------------------------------
- Sidebar bên trái chứa các menu:
  • Gantt Chart TKB
  • Thống kê giờ giảng
  • Báo cáo tiến độ
  • Tình hình mở lớp
  
- Nút << / >> để thu nhỏ/mở rộng sidebar
- Ô tìm kiếm để tìm lớp theo mã
- Dashboard hiển thị thống kê

🔐 ĐĂNG NHẬP ADMIN
------------------------------------
- URL: http://localhost:3000/admin/login
- Tài khoản mặc định (xem phần 9)
- Sau khi đăng nhập sẽ vào trang quản trị

⚙️ TRANG QUẢN TRỊ
------------------------------------
1. Tab "Google Sheet Links":
   - Thêm/sửa/xóa các link Google Apps Script
   - Mỗi link có danh mục tương ứng
   
2. Tab "Dữ liệu lớp học":
   - Thêm/sửa/xóa thông tin lớp học
   - Dữ liệu này dùng cho tìm kiếm

📊 IFRAME GOOGLE APPS SCRIPT
------------------------------------
- Khi click vào menu, iframe sẽ hiển thị
- Nhấn ESC để đóng iframe
- Nút fullscreen để phóng to

================================================================================
                       9. TÀI KHOẢN MẶC ĐỊNH
================================================================================

🔐 ADMIN LOGIN:
------------------------------------
Username: admin
Password: admin123

⚠️ QUAN TRỌNG: Đổi mật khẩu ngay sau khi deploy!

Để đổi mật khẩu, chỉnh sửa file:
src/app/api/admin/login/route.ts

================================================================================
                 10. XỬ LÝ SỰ CỐ THƯỜNG GẶP
================================================================================

❌ LỖI: "Module not found"
----------------------------------
Giải pháp: Xóa node_modules và cài lại
rm -rf node_modules bun.lockb
bun install

❌ LỖI: "Database connection error"
----------------------------------
Giải pháp: Push lại schema
bun run db:push

❌ LỖI: "Port 3000 already in use"
----------------------------------
Giải pháp: Đổi port hoặc kill process
bun run dev -p 3001
# HOẶC
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill

❌ LỖI: Trang không hiển thị
----------------------------------
Giải pháp: 
1. Kiểm tra console browser (F12)
2. Xóa cache browser (Ctrl+Shift+R)
3. Check dev.log: tail -f /home/z/my-project/dev.log

❌ LỖI: Google Apps Script không load
----------------------------------
Nguyên nhân: Google Apps Script có thể chặn iframe
Giải pháp: 
1. Kiểm tra URL có đúng không
2. Đảm bảo Google Apps Script cho phép embed

❌ LỖI: Đăng nhập admin không được
----------------------------------
Giải pháp:
1. Xóa cookies browser
2. Kiểm tra session storage
3. Restart dev server

================================================================================
                      11. LIÊN HỆ HỖ TRỢ
================================================================================

📧 Email: support@prd.edu.vn
🌐 Website: https://prd.edu.vn
📞 Hotline: 1900-xxxx

================================================================================
                         END OF DOCUMENT
================================================================================

© 2026 Phòng Đào Tạo - Training Department System
All rights reserved.

================================================================================
