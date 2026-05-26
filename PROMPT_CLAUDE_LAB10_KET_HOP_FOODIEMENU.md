# Prompt cho Claude AI - Kết hợp giao diện Lab 10 với dữ liệu FoodieMenu

Bạn là lập trình viên frontend giỏi Bootstrap 5. Hãy chỉnh project Lab 10 hiện tại để kết hợp với project `FoodieMenu` đã có sẵn trong cùng thư mục.

## Mục tiêu

Giữ nguyên phong cách giao diện Lab 10 hiện tại vì giao diện đang rất đẹp, hiện đại và phù hợp để nộp bài. Chỉ chỉnh lại dữ liệu món ăn và một vài chức năng để phù hợp với project `FoodieMenu`.

Quan trọng:

- Không làm lại giao diện từ đầu.
- Không phá layout đẹp hiện tại của Lab 10.
- Không sửa hoặc làm hỏng project `FoodieMenu`.
- Lab 10 vẫn phải đạt yêu cầu bài PDF: header, body, footer, Bootstrap components, responsive.
- `FoodieMenu` được xem là project gốc chứa dữ liệu món ăn, giỏ hàng, chọn bàn và đặt món.

## Cấu trúc hiện có

Project Lab 10 hiện tại:

```text
index.html
css/style.css
js/script.js
```

Project FoodieMenu hiện có:

```text
FoodieMenu/
  index.html
  admin.html
  css/style.css
  js/api.js
  js/main.js
  js/utils.js
  img/
```

Trong `FoodieMenu/js/api.js` có danh sách món ăn gốc. Hãy lấy danh sách món từ file này để thay cho danh sách món ăn đang hard-code trong Lab 10.

## Yêu cầu chỉnh sửa chính

### 1. Giữ nguyên thiết kế Lab 10

Giữ các phần đẹp hiện có:

- Navbar cố định/sticky
- Hero banner
- Search section
- Card món nổi bật
- Grid thực đơn
- Combo/table section
- Review section
- Contact/footer
- Modal, toast, responsive layout

Chỉ thay nội dung món ăn, danh mục, ảnh và logic liên quan cho đúng với `FoodieMenu`.

### 2. Thay toàn bộ món ăn Lab 10 bằng danh sách món của FoodieMenu

Lấy dữ liệu từ `FoodieMenu/js/api.js`, gồm các trường chính:

- `name`
- `price`
- `category`
- `image`
- `description`
- `detail`
- `ingredients`
- `tags`
- `available`

Danh sách món cần dùng gồm các nhóm như:

- Khai vị
- Món chính
- Bánh mặn
- Bánh tráng miệng
- Tráng miệng
- Đồ uống lạnh
- Đồ uống nóng
- Set/Combo

Một số món tiêu biểu:

- Gỏi Cuốn Tôm Thịt
- Nem Rán Nhân Thập Cẩm
- Nộm Bò Khô Xanh
- Súp Cua Bắp
- Phở Bò Đặc Biệt
- Bún Bò Huế Cay
- Cơm Tấm Sườn Bì Chả
- Cơm Gà Hội An
- Bánh Đúc Nóng Thịt Nấm
- Bún Chả Hà Nội
- Bánh Cuốn Nhân Thịt
- Bánh Xèo Miền Trung
- Bánh Bột Lọc Trần
- Bánh Giò Hà Nội
- Bánh Flan Caramel
- Bánh Da Lợn Lá Dứa
- Bánh Chuối Hấp Dừa
- Bánh Bò Nướng
- Chè Bưởi Xanh
- Chè Khúc Bạch
- Sữa Chua Nếp Cẩm
- Tàu Hũ Nước Gừng
- Trà Đào Cam Sả
- Cà Phê Sữa Đá
- Nước Sấu Đường Phèn
- Sinh Tố Xoài Tươi
- Trà Gừng Mật Ong
- Trà Sen Hà Nội
- Cà Phê Trứng Nóng
- Cacao Nóng Kem Tươi
- Set Đôi Lãng Mạn
- Set Gia Đình Vui Vẻ
- Set Họp Lớp Hội Tụ
- Set Văn Phòng Nhanh

Nếu ảnh trong dữ liệu có đường dẫn dạng `img/...`, khi dùng từ Lab 10 ở thư mục cha phải đổi thành:

```text
FoodieMenu/img/ten-file
```

Ví dụ:

```text
img/suachuanepcam.webp
```

phải thành:

```text
FoodieMenu/img/suachuanepcam.webp
```

Nếu ảnh là URL online thì giữ nguyên.

### 3. Cách tích hợp dữ liệu

Ưu tiên cách đơn giản, chắc chắn chạy được khi mở `index.html`:

- Tạo một mảng sản phẩm trong `js/script.js`, ví dụ `const FOODIEMENU_PRODUCTS = [...]`, copy dữ liệu cần thiết từ `FoodieMenu/js/api.js`.
- Không import trực tiếp `FoodieMenu/js/api.js` nếu việc đó gây xung đột localStorage hoặc sai đường dẫn ảnh.
- Render card món ăn bằng JavaScript từ mảng này để dễ search/filter.

Không được để danh sách món Lab 10 cũ như:

- Phở/Bún/Cơm hard-code rời rạc kiểu demo
- Combo cũ không liên quan đến FoodieMenu

### 4. Chỉnh Hero và nội dung cho phù hợp

Giữ layout hero đẹp, nhưng chỉnh nội dung để nói rõ đây là trang giới thiệu đẹp cho `FoodieMenu`.

Gợi ý text:

- Brand: `FoodieMenu`
- Subtitle: “Thực đơn online đậm chất Việt Nam”
- CTA chính: `Xem thực đơn`
- CTA phụ: `Đặt món / Chọn bàn`

Không cần đổi toàn bộ màu sắc nếu Lab 10 đang đẹp. Có thể tinh chỉnh nhẹ để đồng bộ với FoodieMenu: cam, vàng, kem, nâu tối.

### 5. Chỉnh section Món nổi bật

Section `Món nổi bật` cần lấy từ sản phẩm FoodieMenu:

- Ưu tiên món có tag `Bán chạy`, `Đề xuất`, `Combo`, hoặc `available = true`.
- Hiển thị 3-6 món nổi bật.
- Card giữ thiết kế Lab 10 hiện tại.
- Mỗi card có:
  - ảnh
  - tên món
  - giá format VNĐ
  - category badge
  - mô tả ngắn
  - trạng thái còn/hết món nếu có
  - nút `Đặt món`

Nếu `available = false`, hiển thị badge `Hết món` và disable nút.

### 6. Chỉnh section Thực đơn

Thực đơn phải dùng toàn bộ danh sách món FoodieMenu.

Yêu cầu:

- Render bằng Bootstrap grid.
- Có filter theo category:
  - Tất cả
  - Khai vị
  - Món chính
  - Bánh mặn
  - Bánh tráng miệng
  - Tráng miệng
  - Đồ uống lạnh
  - Đồ uống nóng
  - Set/Combo
- Có search theo tên món và mô tả.
- Có lọc giá nếu làm được:
  - Dưới 50.000đ
  - 50.000đ - 100.000đ
  - Trên 100.000đ
- Có sort nếu làm được:
  - Giá thấp đến cao
  - Giá cao đến thấp
  - Mặc định

Card món ăn nên giữ giao diện đẹp của Lab 10 nhưng nội dung lấy từ FoodieMenu.

### 7. Chỉnh combo/table section

Section table/combo nên lấy các món có category `Set/Combo` từ FoodieMenu:

- Set Đôi Lãng Mạn
- Set Gia Đình Vui Vẻ
- Set Họp Lớp Hội Tụ
- Set Văn Phòng Nhanh

Nếu vẫn dùng bảng Bootstrap thì bảng phải hiển thị:

- Tên set/combo
- Giá
- Mô tả
- Tình trạng
- Nút `Đặt món`

### 8. Chức năng nút Đặt bàn / Đặt món

Yêu cầu quan trọng:

- Các nút `Đặt bàn`, `Đặt món`, `Chọn bàn`, CTA ở navbar/hero/contact nếu phù hợp thì dẫn sang:

```text
FoodieMenu/index.html
```

Mục đích: khi người dùng bấm đặt bàn hoặc đặt món ở trang Lab 10, họ được chuyển sang app FoodieMenu để chọn bàn, xem menu, thêm giỏ hàng và đặt món.

Ví dụ:

```html
<a href="FoodieMenu/index.html" class="btn btn-warning">Đặt món / Chọn bàn</a>
```

Nếu muốn mở thẳng sang phần chọn bàn mà không sửa FoodieMenu, vẫn dùng:

```text
FoodieMenu/index.html
```

Không bắt buộc sửa `FoodieMenu/js/main.js`. Chỉ sửa nếu thật sự cần và đảm bảo không phá chức năng hiện có.

### 9. Chỉnh form đặt bàn

Vì FoodieMenu đã có app chọn bàn/giỏ hàng riêng, form đặt bàn trong Lab 10 có thể đổi thành:

- Form liên hệ nhanh
- Hoặc form đặt bàn demo nhưng sau submit hiển thị modal xác nhận và có nút `Tiếp tục chọn bàn trên FoodieMenu`
- Nút trong modal dẫn tới `FoodieMenu/index.html`

Không cần xử lý đặt bàn thật trong Lab 10.

### 10. Sửa các vấn đề an toàn/code quality

Khi chỉnh JS:

- Không đưa input người dùng trực tiếp vào `innerHTML` nếu chưa escape.
- Tạo hàm `escapeHtml()` hoặc dùng `textContent`.
- Khi render HTML từ dữ liệu sản phẩm, escape `name`, `category`, `description`.
- Ảnh phải có `alt`.
- Có fallback ảnh nếu ảnh lỗi.
- Guard DOM query để tránh lỗi nếu element không tồn tại.
- Không để lỗi console.

### 11. Giữ điểm Lab 10

Sau khi chỉnh, trang vẫn phải thể hiện rõ các thành phần Bootstrap:

- Navbar responsive
- Grid/card
- Form
- Table
- Modal
- Toast/alert
- Badge
- Button
- Responsive mobile/tablet/desktop

Không được xóa các thành phần khiến bài Lab mất điểm.

## File cần trả về

Hãy trả về code đầy đủ cho:

```text
index.html
css/style.css
js/script.js
```

Nếu chỉ cần sửa một số phần, vẫn phải nói rõ đoạn nào thay đổi.

## Checklist cuối cùng

Trước khi trả lời, hãy tự kiểm tra:

- Giao diện Lab 10 vẫn đẹp như cũ chưa?
- Danh sách món đã lấy từ FoodieMenu chưa?
- Đường dẫn ảnh local đã đổi sang `FoodieMenu/img/...` chưa?
- Filter/search hoạt động với danh sách FoodieMenu chưa?
- Món hết hàng có badge/disable chưa?
- Nút đặt bàn/đặt món đã dẫn sang `FoodieMenu/index.html` chưa?
- Không sửa hỏng project FoodieMenu chưa?
- Không lỗi console chưa?
- Responsive vẫn tốt chưa?
