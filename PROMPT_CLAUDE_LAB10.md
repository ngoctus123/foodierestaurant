# Prompt cho Claude AI - Lab 10 Bootstrap

Bạn là một lập trình viên frontend giỏi Bootstrap. Hãy tạo một website hoàn chỉnh cho bài Lab 10: Bootstrap, mục tiêu là đạt điểm tối đa 10/10 theo yêu cầu trong PDF.

## Bối cảnh bài lab

Lab yêu cầu thiết kế một trang web đơn giản sử dụng Bootstrap. Website bắt buộc có đủ bố cục:

- Header
- Body
- Footer
- Responsive tốt trên desktop, tablet, mobile

Thang điểm:

- Header: 2.5 điểm
- Body: 2.5 điểm
- Footer: 2.5 điểm
- Responsive: 2.5 điểm

## Yêu cầu tạo sản phẩm

Hãy tạo một website chủ đề "FoodieMenu - Nhà hàng và đặt món trực tuyến" bằng Bootstrap 5. Website phải đẹp, chuyên nghiệp, dễ nhìn, có nội dung thật, bố cục rõ ràng và thể hiện đầy đủ các thành phần Bootstrap đã học trong Lab 10.

Tạo đầy đủ các file sau:

- `index.html`
- `css/style.css`
- `js/script.js`

Nếu dùng hình ảnh, hãy dùng link ảnh online ổn định từ Unsplash/Pexels hoặc placeholder có kích thước rõ ràng. Không cần tải ảnh về máy.

## Yêu cầu kỹ thuật bắt buộc

Sử dụng:

- HTML5 chuẩn, có `<!doctype html>`, `lang="vi"`, `meta charset="utf-8"`, `meta viewport`
- Bootstrap 5 CDN
- Bootstrap Icons hoặc Font Awesome CDN
- CSS riêng trong `css/style.css`
- JavaScript riêng trong `js/script.js`
- Code sạch, có comment ngắn gọn ở các phần chính

Không sử dụng framework khác như React, Vue, Angular.

## Chi tiết để đạt tối đa điểm

### 1. Header - 2.5 điểm

Header phải có:

- Navbar Bootstrap responsive
- Logo hoặc brand name: `FoodieMenu`
- Menu điều hướng gồm: Trang chủ, Món nổi bật, Thực đơn, Đánh giá, Liên hệ
- Nút Login hoặc Đăng nhập
- Nút CTA nổi bật: `Đặt bàn`
- Navbar collapse tốt trên mobile bằng hamburger button
- Có `aria-current="page"` cho mục hiện tại
- Header sticky hoặc fixed-top, nhìn chuyên nghiệp

### 2. Body - 2.5 điểm

Body phải có đầy đủ:

- Banner/hero section lớn, có hình nền hoặc hình món ăn đẹp
- Thanh search để tìm món ăn
- Ít nhất 3 hình ảnh món ăn
- Section "Món nổi bật" dùng Bootstrap Grid/Card
- Section "Thực đơn" có ít nhất 6 món, chia theo grid responsive
- Có table Bootstrap thể hiện combo/giá khuyến mãi
- Có form Bootstrap để đặt bàn hoặc liên hệ
- Có modal Bootstrap hiển thị thông tin đăng nhập hoặc xác nhận đặt bàn
- Có nút, badge, alert hoặc toast để thể hiện thêm thành phần Bootstrap

Nội dung phải có tiếng Việt đầy đủ, không để lorem ipsum.

### 3. Footer - 2.5 điểm

Footer phải có:

- Logo hoặc brand name `FoodieMenu`
- Text mô tả ngắn
- Địa chỉ
- Email
- Số điện thoại
- Map dạng link hoặc iframe Google Maps
- Các logo/liên kết thanh toán hoặc ngân hàng: Visa, MasterCard, MoMo, ZaloPay, VNPay
- Link mạng xã hội
- Copyright

Footer cần bố cục rõ ràng bằng Bootstrap Grid.

### 4. Responsive - 2.5 điểm

Website phải responsive thật tốt:

- Desktop: bố cục rộng, nhiều cột hợp lý
- Tablet: grid tự co lại
- Mobile: navbar collapse, card/form/table không bị tràn màn hình
- Dùng các class Bootstrap như `container`, `row`, `col-*`, `col-md-*`, `col-lg-*`, `g-*`, `table-responsive`, `navbar-expand-lg`
- Không để text, ảnh, nút, bảng bị vỡ layout
- Ảnh có `img-fluid`, card có chiều cao cân đối

## Yêu cầu chất lượng để ăn điểm cao

- Giao diện hiện đại, sạch, có khoảng cách đẹp
- Màu sắc hài hòa, không quá lòe loẹt
- Có hover effect nhẹ cho card/nút
- Có animation nhỏ nếu phù hợp
- Form có label rõ ràng, placeholder, validation cơ bản
- Modal hoạt động được
- Nút đặt bàn khi gửi form hiển thị thông báo thành công bằng alert/toast
- Search có JavaScript lọc danh sách món ăn theo tên
- Code không lỗi console
- HTML semantic: dùng `header`, `main`, `section`, `footer`
- Accessibility tốt: alt cho ảnh, label cho input, aria cho navbar/modal khi cần

## Cách trả lời

Hãy trả lời bằng toàn bộ nội dung của từng file, theo đúng cấu trúc:

```text
project/
  index.html
  css/
    style.css
  js/
    script.js
```

Sau đó cung cấp code trong 3 khối riêng:

```html
<!-- index.html -->
```

```css
/* css/style.css */
```

```javascript
// js/script.js
```

Không bỏ sót file. Code phải chạy được ngay khi mở `index.html` trên trình duyệt.

## Checklist cuối cùng trước khi trả lời

Trước khi đưa code, hãy tự kiểm tra:

- Có đủ header, body, footer chưa?
- Header có logo, menu, Login, Đặt bàn chưa?
- Body có banner, search, ít nhất 3 ảnh, content, table, form, modal chưa?
- Footer có logo, địa chỉ, email, map, logo ngân hàng/liên kết thanh toán chưa?
- Responsive mobile/tablet/desktop chưa?
- Có Bootstrap CDN và JS Bootstrap bundle chưa?
- Có liên kết đúng tới `css/style.css` và `js/script.js` chưa?
- Không có lorem ipsum hoặc nội dung rỗng.
