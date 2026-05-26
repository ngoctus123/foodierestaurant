# Prompt cho Claude AI - Siết chặt logic đăng ký, đăng nhập, đặt món và phân quyền

Bạn là lập trình viên frontend Vanilla JS/Bootstrap. Hãy cập nhật tiếp project `FoodieMenu` và trang Lab 10 bên ngoài theo các yêu cầu mới dưới đây. Ưu tiên logic rõ ràng, không mâu thuẫn, không phá giao diện đẹp hiện có.

## Bối cảnh

Project có:

```text
index.html                 # Trang Lab 10 bên ngoài
js/script.js
css/style.css

FoodieMenu/index.html      # App đặt món bên trong
FoodieMenu/js/main.js
FoodieMenu/js/api.js
FoodieMenu/js/utils.js
FoodieMenu/css/style.css
```

Các update trước đó đã yêu cầu:

- Bấm `Đặt món` ở Lab 10 thì sang `FoodieMenu/index.html`.
- Trong FoodieMenu, bấm `Đặt hàng ngay` phải đăng nhập.
- Có form đăng nhập/đăng ký.
- Logo `FoodieMenu` trong `FoodieMenu/index.html` quay về `../index.html`.

Bây giờ cần siết logic kỹ hơn.

## Yêu cầu mới

### 1. Đăng ký xong không tự vào app, phải quay về đăng nhập

Hiện tại nếu đăng ký thành công có thể lưu session và vào thẳng.

Hãy đổi lại:

- Sau khi đăng ký thành công, chỉ lưu user demo vào `localStorage`, ví dụ key `fm_customer_users`.
- Không tự động đăng nhập.
- Không tạo `fm_customer_session` ngay sau đăng ký.
- Đóng/ẩn form đăng ký hoặc chuyển tab về form đăng nhập.
- Tự điền email/số điện thoại vừa đăng ký vào form đăng nhập nếu tiện.
- Hiện toast/thông báo:

```text
Đăng ký thành công! Vui lòng đăng nhập để tiếp tục đặt món.
```

Luồng đúng:

```text
Đăng ký -> quay về form Đăng nhập -> Đăng nhập thành công -> mới được dùng chức năng đặt/chọn món
```

### 2. Sau khi đăng xuất thì bắt buộc đăng nhập/đăng ký mới được chọn món

Khi người dùng đăng xuất:

- Xóa `fm_customer_session`.
- Không xóa giỏ hàng nếu không cần, nhưng khóa các hành động đặt/chọn món.
- Hiện toast:

```text
Bạn đã đăng xuất. Vui lòng đăng nhập để tiếp tục đặt món.
```

Sau khi logout, các hành động sau phải bị chặn nếu chưa đăng nhập:

- Thêm món vào giỏ
- Mở chi tiết món rồi bấm thêm vào giỏ
- Vào giỏ hàng để đặt hàng
- Bấm `Đặt hàng ngay`

Nếu chưa đăng nhập mà bấm các hành động trên:

- Mở modal đăng nhập.
- Hiện thông báo:

```text
Vui lòng đăng nhập hoặc đăng ký để chọn món.
```

Không cho âm thầm thêm món vào giỏ khi chưa đăng nhập.

Gợi ý helper:

```js
function getCustomerSession() {
  try {
    return JSON.parse(localStorage.getItem('fm_customer_session') || 'null');
  } catch {
    return null;
  }
}

function requireCustomerAuth(actionMessage = 'Vui lòng đăng nhập hoặc đăng ký để chọn món.') {
  if (getCustomerSession()) return true;
  showCustomerAuthModal('login');
  Utils.showToast(actionMessage, 'warning');
  return false;
}
```

Áp dụng `requireCustomerAuth()` trước:

- `addToCart(product)`
- handler `data-add-id`
- handler `data-modal-add-id`
- `placeOrder()`
- nếu cần cả `navigateTo('cart')`

### 3. Phân quyền: chọn bàn chỉ dành cho nhân viên

Hiện app FoodieMenu có tính năng chọn bàn. Từ giờ:

- Chức năng `Chọn bàn` chỉ dành cho tài khoản nhân viên.
- Thành viên/khách bình thường không được chọn bàn.
- Nếu khách bình thường bấm `Chọn bàn`, hiển thị toast:

```text
Chức năng chọn bàn chỉ dành cho nhân viên.
```

Có thể phân biệt role demo như sau:

```js
// customer thường
{
  name: 'Nguyễn Văn A',
  email: 'a@gmail.com',
  role: 'customer'
}

// nhân viên demo
{
  name: 'Nhân viên',
  email: 'staff@foodiemenu.vn',
  password: '123456',
  role: 'staff'
}
```

Yêu cầu:

- Thêm sẵn tài khoản nhân viên demo nếu cần:

```text
Email: staff@foodiemenu.vn
Password: 123456
Role: staff
```

- Chỉ `role === 'staff'` mới được dùng `navigateTo('table')` và chọn bàn.
- UI nên ẩn hoặc disable nút `Chọn bàn` với khách thường.
- Nếu muốn vẫn hiển thị nút, khi click phải báo không có quyền.

### 4. Luồng thành viên bình thường sau khi đăng nhập

Với tài khoản `role: customer`, không dùng chọn bàn nữa.

Sau khi khách đăng nhập và chọn món, khi đặt hàng cần hỏi:

```text
Bạn muốn nhận món ở đâu?
```

Có 2 lựa chọn:

1. `Ăn tại quán`
2. `Giao về nhà`

#### 4.1. Nếu chọn `Ăn tại quán`

- Không yêu cầu chọn bàn.
- Không dùng `selectedTable`.
- Khi bấm xác nhận, hiển thị modal/toast:

```text
Đặt món thành công! Vui lòng đến quầy để nhận số bàn hoặc chờ nhân viên hỗ trợ.
```

- Lưu đơn hàng demo vào history với type:

```js
orderType: 'dine-in'
```

- Có thể dùng `tableName: 'Khách tự chọn tại quán'` hoặc `tableName: 'Tại quán'`.

#### 4.2. Nếu chọn `Giao về nhà`

Phải hiện form thông tin giao hàng và thanh toán:

Thông tin giao hàng:

- Họ tên người nhận
- Số điện thoại
- Địa chỉ nhận hàng
- Ghi chú giao hàng

Thanh toán:

- Chọn phương thức thanh toán:
  - Tiền mặt khi nhận hàng
  - Chuyển khoản ngân hàng
  - Ví MoMo
  - ZaloPay
  - VNPay

Nếu chọn `Chuyển khoản ngân hàng`, hiển thị thêm:

- Ngân hàng: Vietcombank, MB Bank, BIDV, Techcombank, ACB
- Số tài khoản demo
- Chủ tài khoản demo
- Nội dung chuyển khoản gợi ý, ví dụ:

```text
FM [số điện thoại] [tổng tiền]
```

Sau khi xác nhận giao về nhà:

- Validate form giao hàng.
- Lưu order demo với:

```js
orderType: 'delivery',
deliveryInfo: {
  receiverName,
  phone,
  address,
  note
},
payment: {
  method,
  bankName,
  transferContent
}
```

- Hiện modal/toast:

```text
Đặt hàng giao về nhà thành công! FoodieMenu sẽ liên hệ xác nhận đơn trong ít phút.
```

### 5. Logic đặt hàng mới trong `placeOrder()`

Hãy refactor `placeOrder()` theo thứ tự logic sau:

```text
1. Nếu đang xử lý order thì return.
2. Nếu chưa đăng nhập -> mở modal đăng nhập, return.
3. Nếu giỏ hàng trống -> báo lỗi, return.
4. Nếu cửa hàng đóng -> báo cửa hàng đóng, return.
5. Nếu user role = staff:
   - Staff có thể chọn bàn.
   - Nếu chưa chọn bàn, yêu cầu chọn bàn.
   - Đặt đơn theo bàn như logic cũ.
6. Nếu user role = customer:
   - Không yêu cầu chọn bàn.
   - Mở modal lựa chọn: Ăn tại quán / Giao về nhà.
   - Xử lý theo lựa chọn ở mục 4.
```

Không để khách thường bị chặn vì chưa chọn bàn.
Không để khách thường vào chọn bàn.
Không để người chưa login thêm món hoặc đặt hàng.

### 6. Cập nhật UI navbar FoodieMenu

Navbar cần phản ánh trạng thái:

Nếu chưa đăng nhập:

- Hiển thị nút `Đăng nhập`
- Không cho chọn món, hoặc khi click món thì bắt đăng nhập
- Nút `Chọn bàn` nên ẩn hoặc disable

Nếu là customer:

- Hiển thị `Xin chào, [Tên]`
- Hiển thị `Đăng xuất`
- Ẩn/disable `Chọn bàn`
- Cho thêm món, giỏ hàng, đặt hàng theo luồng `Ăn tại quán/Giao về nhà`

Nếu là staff:

- Hiển thị `Nhân viên: [Tên]`
- Hiển thị `Đăng xuất`
- Hiển thị và cho dùng `Chọn bàn`
- Đặt hàng theo bàn như logic cũ

### 7. Lịch sử đơn hàng

Nếu đang có lịch sử đơn hàng, hãy hiển thị thêm thông tin:

- Đơn tại quán hay giao hàng
- Phương thức thanh toán nếu là giao hàng
- Địa chỉ nếu là giao hàng
- Bàn nếu là nhân viên đặt theo bàn

Không cần quá phức tạp, nhưng không được làm hỏng history cũ.

### 8. Trang Lab 10 bên ngoài

Trang Lab 10 bên ngoài vẫn giữ đẹp như hiện tại.

Yêu cầu thêm:

- Modal đăng ký bên ngoài cũng phải theo logic mới: đăng ký xong quay về đăng nhập, không tự login.
- Nếu người dùng bấm `Đặt món` từ Lab 10 thì vẫn chỉ chuyển sang `FoodieMenu/index.html`.
- Không bắt đăng nhập ở trang Lab 10 trước khi chuyển trang.

### 9. Code quality

Yêu cầu bắt buộc:

- Không lỗi console.
- Không dùng `innerHTML` với input người dùng nếu chưa escape.
- Có helper escape nếu cần.
- Không phá dữ liệu món ăn.
- Không phá chọn món, giỏ hàng, tăng giảm số lượng.
- Không phá admin.
- UI modal responsive tốt trên mobile.
- Text tiếng Việt đúng UTF-8.
- Logic role rõ ràng, dễ đọc.

## File cần sửa

Ưu tiên sửa:

```text
FoodieMenu/index.html
FoodieMenu/js/main.js
FoodieMenu/css/style.css
index.html
js/script.js
```

Không sửa `FoodieMenu/js/api.js` trừ khi cần bổ sung field cho order mà không thể xử lý trong main.

## Checklist cuối cùng

Trước khi trả lời, hãy test tay các luồng:

1. Chưa login -> bấm thêm món -> mở modal login, không thêm món.
2. Đăng ký -> quay về form đăng nhập, chưa login.
3. Đăng nhập customer -> thêm món được.
4. Customer bấm chọn bàn -> bị chặn, báo chỉ dành cho nhân viên.
5. Customer đặt hàng -> hiện chọn `Ăn tại quán` hoặc `Giao về nhà`.
6. Customer chọn `Ăn tại quán` -> đặt món thành công, không yêu cầu bàn.
7. Customer chọn `Giao về nhà` -> hiện form địa chỉ + thanh toán + ngân hàng nếu chọn chuyển khoản.
8. Staff login -> chọn bàn được.
9. Staff đặt hàng -> dùng logic bàn cũ.
10. Đăng xuất -> không thêm món/đặt hàng được nữa nếu chưa đăng nhập lại.
11. Logo `FoodieMenu` trong app -> quay về `../index.html`.
