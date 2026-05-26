# Prompt cho Claude AI - Khôi phục luồng nhân viên đặt bàn, chọn món tại quán và cập nhật thông tin quán

Bạn là lập trình viên frontend Vanilla JS/Bootstrap. Hãy cập nhật project `FoodieMenu` và trang Lab 10 bên ngoài theo đúng yêu cầu nghiệp vụ dưới đây. Giữ nguyên giao diện đẹp hiện tại nhiều nhất có thể, chỉ sửa các phần cần thiết để luồng đặt bàn/đặt món hoạt động đúng.

## Bối cảnh project

Project có 2 phần:

```text
index.html                 # Trang Lab 10 bên ngoài
css/style.css
js/script.js

FoodieMenu/index.html      # App FoodieMenu bên trong
FoodieMenu/js/main.js
FoodieMenu/js/api.js
FoodieMenu/js/utils.js
FoodieMenu/css/style.css
```

Hiện tại `FoodieMenu` đã có chức năng menu, giỏ hàng, order, lịch sử đơn hàng và một số logic đăng nhập. Tuy nhiên chức năng nhân viên chọn bàn/đặt bàn/order tại quán đang bị mờ hoặc không còn đúng như bản FoodieMenu ban đầu.

## Mục tiêu chính

Khôi phục và làm rõ lại luồng:

```text
Tài khoản nhân viên/admin đăng nhập
-> vào giao diện chọn/sắp xếp bàn tại quán
-> chọn bàn
-> chọn món giúp khách
-> order tại quán cho bàn đó
-> đơn được lưu vào hệ thống/lịch sử FoodieMenu
```

Khách hàng thường không được vào giao diện chọn bàn/sắp xếp bàn. Khách hàng chỉ có thể xem menu, đặt món theo luồng khách hàng nếu app đang hỗ trợ, hoặc gửi form đặt bàn nhanh từ trang ngoài.

## Yêu cầu chi tiết

### 1. Phân quyền tài khoản nhân viên/admin

Trong `FoodieMenu/js/main.js`, kiểm tra lại hệ thống session đang dùng key:

```js
fm_customer_session
fm_customer_users
```

Cần có role rõ ràng:

- `staff`
- `admin`
- `customer`

Tài khoản nhân viên/admin sau khi đăng nhập phải có quyền vào giao diện chọn bàn/sắp xếp bàn.

Nếu project đang seed sẵn tài khoản demo, giữ hoặc bổ sung tài khoản demo dạng:

```js
{
  name: 'Nhân viên Demo',
  email: 'staff@foodiemenu.vn',
  password: '123456',
  role: 'staff'
}
```

Nếu có tài khoản admin thì dùng:

```js
{
  name: 'Admin',
  email: 'admin@foodiemenu.vn',
  password: '123456',
  role: 'admin'
}
```

Lưu ý: đây là demo localStorage, không cần backend.

### 2. Chỉ nhân viên/admin được chọn bàn

Trong `FoodieMenu`, giao diện/nút/chức năng chọn bàn phải bị khóa với user không phải `staff` hoặc `admin`.

Yêu cầu:

- Nếu chưa đăng nhập mà bấm vào chọn bàn/order tại quán thì mở modal đăng nhập.
- Nếu đăng nhập bằng `customer` mà vào chọn bàn thì hiển thị toast:

```text
Chức năng chọn bàn chỉ dành cho nhân viên.
```

- Nếu đăng nhập bằng `staff` hoặc `admin`, cho phép vào màn hình chọn bàn.
- Nếu nhân viên/admin chưa chọn bàn mà bấm đặt hàng tại quán, bắt buộc chuyển về màn hình chọn bàn và báo:

```text
Vui lòng chọn bàn trước khi đặt hàng tại quán.
```

### 3. Khôi phục giao diện chọn bàn và order tại quán

Trong `FoodieMenu`, cần có màn hình chọn bàn giống tinh thần FoodieMenu ban đầu:

- Hiển thị danh sách bàn: số bàn, trạng thái bàn.
- Các trạng thái tối thiểu:
  - `available` / còn trống
  - `reserved` / đã đặt
  - `serving` / đang phục vụ
- Nhân viên/admin chọn một bàn trước khi order.
- Sau khi chọn bàn, hiển thị chip/trạng thái hiện tại: ví dụ `Đang chọn: Bàn 03`.
- Sau đó nhân viên/admin quay lại menu, thêm món vào giỏ và bấm đặt hàng.
- Đơn hàng phải gắn với `tableId`, `tableName`, `orderType: 'table'`.
- Sau khi order thành công, cập nhật bàn sang trạng thái `serving`.
- Đơn hàng xuất hiện trong lịch sử/hệ thống FoodieMenu.

Không được để khách hàng thường tự chọn bàn và tự sắp xếp bàn.

### 4. Form đặt bàn nhanh ở trang ngoài chỉ ghi nhận đặt bàn

Trang ngoài `index.html` có form `Đặt Bàn Nhanh`.

Hãy sửa logic trong `js/script.js` theo nghiệp vụ mới:

- Khi khách điền form đặt bàn nhanh và submit hợp lệ, chỉ xác nhận rằng khách đã gửi yêu cầu đặt bàn.
- Không cho khách chọn món/order ngay từ form này.
- Thông báo/modal nên nói rõ:

```text
Đặt bàn thành công! Thông tin đã được ghi nhận lên hệ thống FoodieMenu. Khi khách đến quán, nhân viên sẽ hỗ trợ chọn món và order tại bàn.
```

- Nếu có thể, lưu booking/reservation vào localStorage để FoodieMenu nhận biết bàn/yêu cầu đặt bàn. Có thể dùng key mới:

```js
fm_reservations
```

Mỗi reservation nên có:

```js
{
  id,
  name,
  phone,
  email,
  guests,
  date,
  time,
  note,
  status: 'reserved',
  createdAt
}
```

- Sau khi lưu reservation, không tạo order món ăn.
- Không tự chuyển khách vào luồng chọn món.
- Nếu FoodieMenu có màn hình bàn, có thể hiển thị reservation/bàn đã đặt cho nhân viên xem.

### 5. Cập nhật toàn bộ thông tin quán sang Đại học Đại Nam

Cập nhật đồng bộ ở cả:

- `index.html`
- `js/script.js`
- `FoodieMenu/index.html`
- `FoodieMenu/js/main.js`
- các footer/contact/map/hotline/email/link liên quan

Thông tin mới:

```text
Địa chỉ: Trường Đại học Đại Nam, Số 1 Phố Xốm, Phú Lãm, Hà Đông, Hà Nội
Số điện thoại: 0876785977
Email: tule2077@gmail.com
```

Tất cả link điện thoại phải đổi thành:

```html
tel:0876785977
```

Tất cả link email phải đổi thành:

```html
mailto:tule2077@gmail.com
```

Google Map phải trỏ đến Đại học Đại Nam. Dùng URL dạng:

```text
https://www.google.com/maps/search/?api=1&query=Tr%C6%B0%E1%BB%9Dng%20%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20%C4%90%E1%BA%A1i%20Nam%20S%E1%BB%91%201%20Ph%E1%BB%91%20X%E1%BB%91m%20Ph%C3%BA%20L%C3%A3m%20H%C3%A0%20%C4%90%C3%B4ng%20H%C3%A0%20N%E1%BB%99i
```

Nếu có iframe bản đồ, cũng cập nhật query sang địa chỉ trên.

### 6. Copy/text trên UI cần rõ nghiệp vụ

Các nút/copy nên phản ánh đúng:

- Với khách: `Đặt bàn nhanh`, `Gửi yêu cầu đặt bàn`, `Nhân viên sẽ hỗ trợ order khi đến quán`.
- Với nhân viên/admin: `Chọn bàn`, `Order tại quán`, `Đặt món cho bàn`.
- Không dùng text khiến khách hiểu rằng họ tự chọn bàn/sắp xếp bàn nếu họ không có quyền.

### 7. Không phá chức năng hiện có

Sau khi sửa, cần tự kiểm tra các luồng:

1. Khách mở trang ngoài, điền form đặt bàn nhanh -> thấy xác nhận đặt bàn, dữ liệu được lưu vào `fm_reservations`.
2. Khách bấm vào FoodieMenu -> không tự có quyền chọn bàn.
3. Customer đăng nhập -> không vào được màn hình chọn bàn.
4. Staff/admin đăng nhập -> vào được màn hình chọn bàn.
5. Staff/admin chọn bàn -> thêm món -> đặt hàng -> order có `tableId`, `tableName`, `orderType: 'table'`.
6. Sau khi order tại quán thành công -> bàn chuyển sang `serving`.
7. Hotline, email, địa chỉ, Google Map ở mọi nơi đều là thông tin Đại học Đại Nam:

```text
Trường Đại học Đại Nam, Số 1 Phố Xốm, Phú Lãm, Hà Đông, Hà Nội
0876785977
tule2077@gmail.com
```

## Lưu ý kỹ thuật

- Ưu tiên sửa trong `FoodieMenu/js/main.js`, `FoodieMenu/js/api.js`, `js/script.js`, `index.html`.
- Dùng DOM API hoặc escape HTML khi chèn dữ liệu người dùng vào UI.
- Không rewrite toàn bộ project nếu không cần.
- Không xóa dữ liệu menu/món ăn hiện có.
- Không làm mất giao diện Bootstrap/thiết kế hiện tại.
- Nếu thêm localStorage key mới, đặt tên rõ ràng và có hàm load/save an toàn với `try/catch`.
