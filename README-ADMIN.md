# Hướng Dẫn Sử Dụng Trang Quản Trị Viên

## Giới thiệu

Trang quản trị viên cho phép bạn quản lý các liên kết Google Apps Script và dữ liệu lớp học của Hệ thống Phòng Đào Tạo.

---

## Truy cập Trang Quản Trị

### Bước 1: Mở trang đăng nhập
Truy cập đường dẫn: `/admin/login`

Hoặc từ trang chủ, nhấn vào nút **"Quản trị viên"** trong sidebar.

### Bước 2: Đăng nhập
- Nhập **Tên đăng nhập** và **Mật khẩu** đã được cung cấp
- Nhấn nút **"Đăng nhập"**

> ⚠️ **Lưu ý bảo mật**: Không chia sẻ thông tin đăng nhập với người không có quyền truy cập.

---

## Các Chức Năng Chính

### 1. Quản lý Google Sheet Links

Tab này cho phép bạn quản lý các liên kết Google Apps Script được sử dụng trong hệ thống.

#### Thêm Google Sheet Link mới
1. Nhấn nút **"Thêm link mới"**
2. Điền các thông tin:
   - **Tên liên kết** (bắt buộc): Tên hiển thị cho liên kết
   - **Mô tả**: Mô tả ngắn gọn về chức năng
   - **URL** (bắt buộc): Đường dẫn Google Apps Script
   - **Danh mục**: Chọn loại chức năng:
     - Gantt Chart TKB
     - Thống kê giờ giảng
     - Báo cáo tiến độ
     - Tình hình mở lớp
3. Nhấn **"Thêm mới"**

#### Cập nhật liên kết
1. Tìm liên kết cần sửa trong bảng
2. Nhấn nút **Sửa** (biểu tượng bút)
3. Cập nhật thông tin
4. Nhấn **"Cập nhật"**

#### Xóa liên kết
1. Tìm liên kết cần xóa
2. Nhấn nút **Xóa** (biểu tượng thùng rác)
3. Xác nhận xóa

---

### 2. Quản lý Dữ liệu Lớp học

Tab này cho phép quản lý dữ liệu lớp học để tìm kiếm tại trang chủ.

#### Thêm lớp học mới
1. Nhấn nút **"Thêm lớp mới"**
2. Điền các thông tin:
   - **Mã lớp** (bắt buộc): Ví dụ `1/2026`, `2/2026`
   - **Tên lớp**: Tên môn học/lớp
   - **Giảng viên**: Tên giảng viên
   - **Lịch học**: Thời gian học
   - **Trạng thái**: Đang hoạt động / Chờ duyệt / Đã kết thúc
   - **Google Sheet ID**: ID sheet liên kết (nếu có)
3. Nhấn **"Thêm mới"**

#### Cập nhật lớp học
1. Tìm lớp cần sửa trong bảng
2. Nhấn nút **Sửa** (biểu tượng bút)
3. Cập nhật thông tin
4. Nhấn **"Cập nhật"**

#### Xóa lớp học
1. Tìm lớp cần xóa
2. Nhấn nút **Xóa** (biểu tượng thùng rác)
3. Xác nhận xóa

---

## Tìm Kiếm Lớp Học tại Trang Chủ

Tại trang chủ, thanh tìm kiếm chỉ hoạt động theo **mã lớp**:

- Nhập mã lớp như: `1/2026`, `2/2026`, `10/2026`
- Hệ thống sẽ tìm kiếm trong cơ sở dữ liệu và hiển thị kết quả

---

## Tích Hợp Google Apps Script

### Các sản phẩm có thể tích hợp:

1. **Gantt Chart TKB** - Biểu đồ thời khóa biểu
2. **Thống kê giờ giảng** - Báo cáo giờ giảng của giảng viên
3. **Báo cáo tiến độ** - Theo dõi tiến độ công việc
4. **Tình hình mở lớp** - Quản lý các lớp học

### Cách lấy URL Google Apps Script:

1. Mở Google Apps Script project
2. Triển khai (Deploy) as Web app
3. Copy URL được cung cấp
4. Thêm vào trang quản trị

---

## Đăng Xuất

Để đăng xuất:
1. Nhấn nút **"Đăng xuất"** ở góc trên bên phải
2. Bạn sẽ được chuyển về trang đăng nhập

---

## Câu Hỏi Thường Gặp

### Q: Tôi quên mật khẩu怎么办?
A: Liên hệ quản trị viên hệ thống để được cấp lại mật khẩu.

### Q: Tôi có thể thêm bao nhiêu Google Sheet link?
A: Không có giới hạn số lượng liên kết.

### Q: Dữ liệu được lưu trữ ở đâu?
A: Dữ liệu được lưu trữ an toàn trong cơ sở dữ liệu SQLite của hệ thống.

### Q: Làm sao để thay đổi mật khẩu?
A: Hiện tại cần liên hệ quản trị viên hệ thống. Tính năng đổi mật khẩu sẽ được cập nhật trong phiên bản sau.

---

## Liên Hệ Hỗ Trợ

Nếu gặp vấn đề, vui lòng liên hệ:
- Email: support@prd.edu.vn
- Hotline: 1900-xxxx

---

*Tài liệu này được cập nhật lần cuối: Tháng 4/2026*
