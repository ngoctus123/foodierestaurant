# Prompt cho Claude AI - Update đăng nhập khi đặt hàng, đăng ký tài khoản và nút về trang chủ ngoài

Bạn là lập trình viên frontend Bootstrap/Vanilla JS. Hãy cập nhật project hiện tại theo đúng yêu cầu dưới đây, giữ nguyên giao diện đẹp sẵn có của Lab 10 và không làm hỏng app `FoodieMenu`.

## Bối cảnh hiện tại

Project có 2 phần:

```text
index.html                 # Trang Lab 10 bên ngoài, giao diện đẹp
css/style.css
js/script.js

FoodieMenu/index.html      # App FoodieMenu bên trong
FoodieMenu/js/main.js
FoodieMenu/js/api.js
FoodieMenu/js/utils.js
FoodieMenu/css/style.css
```

Hiện tại:

- Trang Lab 10 đã dùng giao diện đẹp và dữ liệu món ăn từ FoodieMenu.
- Nút `Đặt món`, `Đặt bàn`, `Chọn bàn` ở Lab 10 đã dẫn sang `FoodieMenu/index.html`.
- Trong `FoodieMenu`, người dùng có thể chọn món, thêm giỏ hàng và bấm `Đặt hàng ngay`.
- Cần bổ sung luồng bắt đăng nhập trước khi đặt hàng và thêm form đăng ký.

## Yêu cầu chính

### 1. Khi bấm `Đặt hàng ngay` trong FoodieMenu thì bắt đăng nhập

Trong `FoodieMenu/js/main.js`, hàm đặt hàng hiện là `placeOrder()`.

Yêu cầu:

- Khi người dùng bấm nút `Đặt hàng ngay` trong giỏ hàng, nếu chưa đăng nhập thì không được đặt hàng ngay.
- Thay vào đó, hiển thị giao diện/modal đăng nhập.
- Sau khi đăng nhập thành công, tiếp tục quay lại giỏ hàng và cho phép đặt hàng.
- Nếu đăng nhập thành công ngay trong modal, có thể tự động gọi lại `placeOrder()` hoặc hiện toast: `Đăng nhập thành công, bạn có thể đặt hàng ngay`.

Gợi ý triển khai đơn giản:

```js
function isCustomerLoggedIn() {
  return localStorage.getItem('fm_customer_session') !== null;
}
```

Trong đầu `placeOrder()` thêm:

```js
if (!isCustomerLoggedIn()) {
  showCustomerAuthModal('login');
  Utils.showToast('Vui lòng đăng nhập trước khi đặt hàng!', 'warning');
  return;
}
```

Sau khi login/register thành công:

```js
localStorage.setItem('fm_customer_session', JSON.stringify({
  name,
  email,
  loginAt: Date.now()
}));
```

Không dùng backend, chỉ dùng localStorage demo là đủ.

### 2. Tạo giao diện đăng nhập trong FoodieMenu

Thêm modal đăng nhập dành cho khách hàng trong `FoodieMenu/index.html` hoặc render bằng JS trong `FoodieMenu/js/main.js`.

Modal cần đẹp, đồng bộ với thiết kế FoodieMenu hiện tại:

- Tiêu đề: `Đăng nhập để đặt hàng`
- Email hoặc số điện thoại
- Mật khẩu
- Checkbox `Ghi nhớ tôi`
- Nút `Đăng nhập`
- Link chuyển sang form đăng ký: `Chưa có tài khoản? Đăng ký ngay`
- Nút đóng modal

Validation cơ bản:

- Email/số điện thoại không được trống
- Mật khẩu ít nhất 6 ký tự
- Nếu hợp lệ thì lưu session vào localStorage và đóng modal
- Hiện toast đăng nhập thành công

### 3. Thêm form đăng ký trong cùng modal

Trong modal đăng nhập, thêm chế độ đăng ký. Có thể dùng tab, toggle hoặc thay nội dung form.

Form đăng ký cần có:

- Họ tên
- Email
- Số điện thoại
- Mật khẩu
- Nhập lại mật khẩu
- Checkbox đồng ý điều khoản
- Nút `Tạo tài khoản`
- Link quay lại form đăng nhập: `Đã có tài khoản? Đăng nhập`

Validation:

- Họ tên tối thiểu 3 ký tự
- Email đúng format cơ bản
- Số điện thoại 10-11 số
- Mật khẩu tối thiểu 6 ký tự
- Nhập lại mật khẩu phải khớp
- Phải tick đồng ý điều khoản

Sau khi đăng ký thành công:

- Lưu user demo vào localStorage, ví dụ key `fm_customer_users`.
- Lưu session key `fm_customer_session`.
- Đóng modal.
- Hiện toast: `Đăng ký thành công, chào mừng bạn đến với FoodieMenu!`
- Nếu người dùng đang ở giỏ hàng thì vẫn ở giỏ hàng để tiếp tục đặt hàng.

Không cần bảo mật thật, vì đây là demo bài lab.

### 4. Hiển thị trạng thái đã đăng nhập trong FoodieMenu

Nếu đã đăng nhập:

- Có thể thêm chip nhỏ trên navbar: `Xin chào, [Tên]`
- Có nút/option `Đăng xuất`
- Khi đăng xuất thì xóa `fm_customer_session`, update UI, hiện toast.

Nếu chưa đăng nhập:

- Có nút `Đăng nhập` nhỏ trên navbar hoặc dùng modal khi bấm đặt hàng.

Giữ navbar gọn, không làm vỡ layout mobile.

### 5. Logo/chữ FoodieMenu trong `FoodieMenu/index.html` phải quay về trang chủ bên ngoài

Hiện tại trong `FoodieMenu/index.html` logo đang là:

```html
<a class="fm-logo" href="#" onclick="navigateTo('home'); return false;">
  Foodie<em>Menu</em>
</a>
```

Hãy đổi chức năng của chữ/logo `FoodieMenu` để quay về trang chủ Lab 10 bên ngoài:

```html
<a class="fm-logo" href="../index.html" title="Về trang giới thiệu FoodieMenu">
  Foodie<em>Menu</em>
</a>
```

Yêu cầu:

- Khi đang trong `FoodieMenu/index.html`, bấm logo `FoodieMenu` phải về `../index.html`.
- Không còn gọi `navigateTo('home')` ở logo nữa.
- Các nút `Trang chủ`, `Thực đơn`, `Lịch sử`, `Giỏ hàng` trong app FoodieMenu vẫn giữ chức năng nội bộ như cũ.

### 6. Trang Lab 10 bên ngoài cũng cần form đăng ký trong modal đăng nhập

Trong `index.html` bên ngoài hiện đã có modal `#loginModal`.

Hãy bổ sung form đăng ký vào modal này để đồng bộ với yêu cầu:

- Có thể dùng tab `Đăng nhập` / `Đăng ký`.
- Hoặc click `Đăng ký ngay` thì chuyển sang form đăng ký trong cùng modal.
- Không cần backend, chỉ validation cơ bản và toast thành công.

Form đăng ký bên ngoài cần có:

- Họ tên
- Email
- Số điện thoại
- Mật khẩu
- Nhập lại mật khẩu
- Checkbox đồng ý điều khoản

Sau khi đăng ký thành công:

- Lưu demo vào localStorage key `fm_customer_users`.
- Lưu session `fm_customer_session`.
- Đóng modal.
- Hiện toast thành công.

### 7. Nếu người dùng bấm `Đặt món` ở Lab 10 bên ngoài

Hiện tại nút `Đặt món` ở Lab 10 đang dẫn sang:

```text
FoodieMenu/index.html
```

Giữ hành vi này. Không bắt đăng nhập ngay ở Lab 10 khi chỉ bấm `Đặt món`.

Luồng đúng:

1. Người dùng ở Lab 10 bấm `Đặt món`.
2. Chuyển sang `FoodieMenu/index.html`.
3. Người dùng chọn món, thêm giỏ hàng.
4. Khi bấm `Đặt hàng ngay` trong giỏ hàng thì mới bắt đăng nhập.
5. Đăng nhập/đăng ký xong mới được đặt hàng.

### 8. Chất lượng code

Khi cập nhật:

- Không dùng inline HTML nguy hiểm với input người dùng nếu chưa escape.
- Tạo helper escape nếu cần.
- Guard DOM query để tránh lỗi console.
- Không phá các chức năng hiện có: chọn bàn, thêm giỏ hàng, tăng giảm số lượng, lịch sử, admin link.
- Không đổi dữ liệu món ăn.
- Không làm mất responsive.
- Modal phải đẹp, không bị tràn trên mobile.
- Text tiếng Việt phải đúng UTF-8, không bị lỗi font.

## File cần sửa

Hãy sửa hoặc trả code cho các file sau nếu cần:

```text
index.html
js/script.js
FoodieMenu/index.html
FoodieMenu/js/main.js
FoodieMenu/css/style.css
```

Không sửa `FoodieMenu/js/api.js` trừ khi thật sự cần.

## Checklist cuối cùng

Trước khi trả lời, hãy kiểm tra:

- Bấm `Đặt hàng ngay` khi chưa đăng nhập có mở modal đăng nhập không?
- Đăng nhập hợp lệ có lưu `fm_customer_session` không?
- Đăng ký hợp lệ có lưu user demo và session không?
- Đăng xuất có xóa session không?
- Sau khi đăng nhập/đăng ký, có thể tiếp tục đặt hàng không?
- Logo `FoodieMenu` trong `FoodieMenu/index.html` có quay về `../index.html` không?
- Các nút nội bộ `Trang chủ`, `Thực đơn`, `Lịch sử`, `Giỏ hàng` vẫn hoạt động không?
- Trang Lab 10 bên ngoài vẫn đẹp và đủ yêu cầu Lab 10 không?
- Không có lỗi console.
