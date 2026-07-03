# BỘ PROMPT COPY-PASTE — VIẾT BÁO CÁO FoodieMenu (3 cấp, chi tiết)

> Dùng được cho **Claude** hoặc **ChatGPT**. Mở một cuộc trò chuyện mới, gửi **PROMPT 0** trước,
> rồi lần lượt **PROMPT 1 → 8**, mỗi lần một prompt, đợi viết xong chương mới gửi tiếp.
> Cuối cùng gửi **PROMPT KẾT**. Giữ nguyên cùng một cuộc trò chuyện để mô hình nhớ ngữ cảnh.
>
> **Mẹo tiết kiệm token:** PROMPT 0 chứa toàn bộ dữ kiện nên khá dài — chỉ gửi **một lần**.
> Các prompt chương sau đã ngắn gọn, chỉ còn dàn ý 3 cấp; không cần lặp lại dữ kiện.
> Nếu mô hình "quên" giữa chừng, dán lại đúng khối "DỮ KIỆN KỸ THUẬT" trong PROMPT 0.

---

## PROMPT 0 — KHỞI TẠO NGỮ CẢNH (gửi đầu tiên)

```
Bạn là trợ lý học thuật giúp em viết báo cáo bài tập lớn học phần "Thiết kế, Lập trình
Front-End" (Trường Đại học Đại Nam) cho đề tài "Xây dựng ứng dụng thực đơn trực tuyến
cho nhà hàng — FoodieMenu". Em sẽ gửi yêu cầu viết từng chương trong các tin nhắn tiếp theo.
Trước hết, hãy ĐỌC KỸ và GHI NHỚ toàn bộ thông tin dưới đây; chưa viết nội dung chương nào.

================= QUY TẮC TRÌNH BÀY (BẮT BUỘC, áp dụng cho mọi chương) =================
1. CẤU TRÚC ĐỀ MỤC 3 CẤP: mỗi chương phải chia tới mức ba chữ số (ví dụ 1.1, rồi 1.1.1,
   1.1.2, 1.1.3). KHÔNG gộp nhiều ý vào một đề mục lớn. Mỗi mục cấp 2 (x.y) nên có
   ít nhất 2–3 mục cấp 3 (x.y.z). Mỗi mục cấp 3 viết TỐI THIỂU 2–3 đoạn văn hoàn chỉnh.
2. Đánh số tiêu đề chính xác và liên tục theo đúng dàn ý em cung cấp; giữ nguyên tên mục.
3. VĂN PHONG: viết tự nhiên, mạch lạc, dễ hiểu; KHÔNG hàn lâm, KHÔNG quảng cáo, KHÔNG hoa mỹ;
   tránh câu kiểu giáo trình hay định nghĩa khô cứng. Mỗi ý triển khai thành đoạn văn đầy đủ,
   không liệt kê sơ sài, không viết quá ngắn.
4. GIỌNG VĂN: như sinh viên tự phân tích và trình bày sản phẩm của chính mình; xưng "em".
5. LIÊN HỆ THỰC TẾ: khi giải thích bất kỳ công nghệ nào, phải liên hệ trực tiếp với code
   FoodieMenu và nêu ĐÚNG tên file/hàm/biến có thật (xem mục DỮ KIỆN KỸ THUẬT). Không bịa.
6. HÌNH & BẢNG: tại chỗ cần minh họa, chèn placeholder dạng "[Hình X.Y. <mô tả>]" hoặc
   "[Bảng X.Y. <mô tả>]" kèm 1–2 câu dẫn giải; em sẽ tự chèn ảnh code/sơ đồ vào Word sau.
   Đánh số hình/bảng liên tục theo từng chương.
7. ĐỘ DÀI: tôn trọng số trang mục tiêu của mỗi chương; nếu thiếu, hãy mở rộng phần phân tích
   và ví dụ liên hệ code chứ không thêm lý thuyết suông.

================= DỮ KIỆN KỸ THUẬT (CHỈ dùng dữ kiện này, KHÔNG bịa) =================
Công nghệ: HTML5, CSS3, Bootstrap 5.3.2, Bootstrap Icons 1.11.3, Google Fonts
(Playfair Display + DM Sans), Vanilla JavaScript ES6+, localStorage làm "DB giả lập".
Mô hình SPA (Single Page Application) — điều hướng bằng JS, không reload trang.
Không backend, không cơ sở dữ liệu thật.

Cấu trúc mã nguồn (thư mục FoodieMenu/):
- index.html (giao diện khách hàng), admin.html (giao diện quản trị)
- css/style.css (Design System + custom, ~44KB)
- js/api.js (Mock API + seed, ~34KB), js/main.js (logic khách, ~93KB),
  js/admin.js (logic quản trị, ~22KB), js/utils.js (tiện ích, ~6KB), js/auth.js (đăng nhập admin)
- img/ (ảnh món ăn)

Design System (biến CSS trong style.css):
--fm-primary:#E85D04  --fm-primary-dark:#C24A02  --fm-amber:#F48C06
--fm-cream:#FFFBF5  --fm-dark:#1A0A00  --fm-muted:#7A5C3F

Khóa localStorage: fm_products, fm_products_version (DATA_VERSION=3), fm_tables,
fm_reservations, fm_order_history, fm_cart, fm_selected_table.

Đối tượng dữ liệu: Món ăn (id, tên, giá, danh mục, ảnh, mô tả, nguyên liệu, available, tag),
Danh mục, Bàn ăn (id, name, status, visible), Giỏ hàng, Đơn hàng (bàn, danh sách món,
số lượng, tổng tiền, time, status), Đặt bàn (reservation), Lịch sử đơn, Tài khoản.

Mock API (api.js) — phương thức thật: getProducts({category,search}), getProduct(id),
createProduct(data), updateProduct(id,data), deleteProduct(id), resetData(), getDataVersion(),
getTables(), getVisibleTables(), addTable(name), updateTable(id,data), deleteTable(id),
resetTables(), addOrder(orderData), getOrders(tableId,customerEmail), getReservations(date),
updateReservation(id,data), updateOrderStatus(orderId,status).
Hàm nội bộ: _getData/_setData/_seedDefaults, _getTables/_setTables/_seedTables,
_getReservations/_setReservations, _getHistory/_setHistory.
Cơ chế versioning: khi fm_products_version ≠ DATA_VERSION thì seed lại dữ liệu mặc định.
Mọi hàm API trả về Promise (giả lập async) → có thể thay bằng fetch() thật mà không sửa main.js/admin.js.

Tiện ích (utils.js, object Utils): validation form, toast (thông báo), debounce,
đọc/ghi giỏ hàng (CART_KEY='fm_cart'), PLACEHOLDER_IMG (ảnh SVG dự phòng),
escape/an toàn HTML, format tiền tệ, chuẩn hóa URL ảnh.

Logic khách hàng (main.js): điều hướng SPA (navigateTo, setNavActive), renderHome,
renderMenu, tìm kiếm+lọc+sắp xếp (onSearch, filterByCategory, filterByPrice, sortProducts,
applyFilters, _matchPrice), modal chi tiết (openProductModal, _buildProductModalHTML),
giỏ hàng (addToCart, updateQty, removeFromCart, syncCartBadge, renderCart),
đặt món nhiều hình thức (placeOrder, _placeOrderForTable, _placeOrderTakeaway,
_placeOrderDineIn, _placeOrderDelivery), chọn bàn (renderTableSelection, selectTable,
_applyTableSelection), đặt bàn (_renderReservationPanel, _assignReservationToTable,
_checkinReservation, _cancelReservation), giờ mở cửa (_getStoreStatus, _isStoreOpen,
_showStoreStatusModal), lịch sử đơn (renderHistory), xác thực khách (getCustomerSession,
requireCustomerAuth, _handleCustomerLogin, _handleCustomerRegister).

Logic quản trị (admin.js + auth.js): đăng nhập admin, dashboard 4 thẻ thống kê
(tổng món / còn phục vụ / hết món / số danh mục), CRUD món (modal thêm/sửa có preview
ảnh realtime, xóa có confirm, toggle trạng thái), quản lý bàn (thêm/ẩn/hiện/đổi trạng thái/khôi phục).

================= THÔNG TIN TRANG BÌA =================
Trường Đại học Đại Nam — Khoa Công nghệ Thông tin. Học phần: Thiết kế, Lập trình Front-End.
Đề tài: Xây dựng ứng dụng thực đơn trực tuyến cho nhà hàng — FoodieMenu.
Giảng viên hướng dẫn: TS. Nguyễn Văn Chung. Sinh viên thực hiện: Lê Ngọc Tú (1971020481),
Lưu Thị Hồng Vân (1971020511), Trần Đức Duy (1971020141). Hà Nội, năm 2026.

Nếu đã hiểu, hãy trả lời ngắn gọn "Đã nắm thông tin", rồi viết giúp em:
(1) TRANG BÌA; (2) LỜI NÓI ĐẦU (khoảng 1.5–2 trang, đúng văn phong trên, có nhắc tới bố cục
8 chương); (3) khung MỤC LỤC ba cấp cho toàn bộ 8 chương (chỉ liệt kê tiêu đề, chưa viết nội dung).
```

---

## PROMPT 1 — CHƯƠNG 1 (mục tiêu 10–12 trang)

```
Viết CHƯƠNG 1: GIỚI THIỆU MỘT SỐ KHÁI NIỆM TRONG JAVASCRIPT, khoảng 10–12 trang, đề mục 3 cấp.
Bám đúng dàn ý sau (giữ nguyên số và tên mục):

1.1 Tổng quan về ngôn ngữ JavaScript
    1.1.1 Khái niệm JavaScript và vị trí trong bộ ba HTML – CSS – JavaScript
    1.1.2 Lịch sử ra đời và mối quan hệ giữa JavaScript với chuẩn ECMAScript
    1.1.3 JavaScript phía client và phía server; lý do FoodieMenu chỉ dùng phía client
    1.1.4 Vai trò của JavaScript trong toàn bộ hệ thống FoodieMenu
1.2 Tiêu chuẩn ES6+ và các tính năng cốt lõi dùng trong dự án
    1.2.1 Bối cảnh ra đời ES6 và ý nghĩa với JavaScript hiện đại
    1.2.2 Khai báo biến let, const so với var (block scope, hoisting, TDZ)
    1.2.3 Arrow function và cách dùng trong callback của map/filter/reduce
    1.2.4 Template literal và việc dựng HTML động cho thẻ món ăn
    1.2.5 Destructuring, spread/rest operator trong xử lý dữ liệu món và đơn hàng
    1.2.6 Các phương thức xử lý mảng (map, filter, reduce, find) trong lọc và thống kê
1.3 Lập trình bất đồng bộ và tương tác sự kiện
    1.3.1 Promise và async/await trong việc mô phỏng gọi API (api.js)
    1.3.2 Cơ chế sự kiện và event delegation trên giao diện
    1.3.3 Kỹ thuật debounce áp dụng cho ô tìm kiếm món ăn
1.4 Lưu trữ dữ liệu phía trình duyệt
    1.4.1 Tổng quan Web Storage và localStorage
    1.4.2 Cách FoodieMenu dùng localStorage làm cơ sở dữ liệu giả lập
    1.4.3 Ưu điểm và hạn chế của localStorage trong phạm vi đề tài

Yêu cầu kèm: [Bảng 1.1. Một số mốc phát triển của JavaScript và ECMAScript];
[Hình 1.1. Sơ đồ vai trò của JavaScript trong FoodieMenu]; tối thiểu 3 placeholder ảnh code
(khai báo STORAGE_KEY/DATA_VERSION; arrow function trong filter; template literal dựng thẻ món).
Mỗi mục cấp 3 có ví dụ liên hệ code thật. Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 2 — CHƯƠNG 2 (mục tiêu 6–8 trang)

```
Viết CHƯƠNG 2: GIỚI THIỆU, MÔ TẢ ĐỀ TÀI, khoảng 6–8 trang, đề mục 3 cấp. Bám dàn ý:

2.1 Tính cấp thiết và lý do chọn đề tài
    2.1.1 Xu hướng số hóa hoạt động kinh doanh dịch vụ ăn uống
    2.1.2 Hạn chế của thực đơn giấy và phương pháp quản lý thủ công
    2.1.3 Nhu cầu xây dựng ứng dụng thực đơn trực tuyến như FoodieMenu
2.2 Mục tiêu của đề tài
    2.2.1 Mục tiêu tổng quát
    2.2.2 Mục tiêu cụ thể về chức năng khách hàng
    2.2.3 Mục tiêu cụ thể về chức năng quản trị
2.3 Đối tượng và phạm vi nghiên cứu
    2.3.1 Đối tượng nghiên cứu và các nhóm dữ liệu chính
    2.3.2 Phạm vi giới hạn ở Front-End (Mock API + localStorage)
    2.3.3 Những nội dung chưa nằm trong phạm vi (backend, thanh toán, realtime)
2.4 Phương pháp và công cụ thực hiện
    2.4.1 Phương pháp phân tích – thiết kế – cài đặt – kiểm thử
    2.4.2 Công cụ sử dụng (VS Code, Live Server, trình duyệt, Git)
    2.4.3 Cấu trúc tổng thể của báo cáo (8 chương)

Yêu cầu kèm: [Hình 2.1. Giao diện trang chủ FoodieMenu]; [Bảng 2.1. So sánh chức năng
khách hàng và quản trị]. Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 3 — CHƯƠNG 3 (mục tiêu 9–11 trang)

```
Viết CHƯƠNG 3: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ SỬ DỤNG, khoảng 9–11 trang, đề mục 3 cấp. Bám dàn ý:

3.1 Ứng dụng web và mô hình một trang (SPA)
    3.1.1 Khái niệm ứng dụng web và mô hình client – server
    3.1.2 Single Page Application: nguyên lý và ưu nhược điểm
    3.1.3 Lý do FoodieMenu chọn SPA thuần JavaScript thay vì framework
3.2 Ngôn ngữ đánh dấu và trình bày giao diện
    3.2.1 HTML5 và cấu trúc ngữ nghĩa của index.html, admin.html
    3.2.2 CSS3, Flexbox và Grid trong bố cục giao diện
    3.2.3 Thiết kế responsive cho nhiều kích thước màn hình
3.3 Thư viện và tài nguyên hỗ trợ
    3.3.1 Bootstrap 5 (grid system, component, modal)
    3.3.2 Bootstrap Icons và hệ thống biểu tượng
    3.3.3 Google Fonts (Playfair Display và DM Sans)
3.4 Lưu trữ và mô phỏng dữ liệu
    3.4.1 localStorage làm cơ sở dữ liệu giả lập
    3.4.2 Khái niệm Mock API và vai trò của api.js
    3.4.3 Khái niệm Design System trong dự án
3.5 So sánh và định vị giải pháp
    3.5.1 So sánh FoodieMenu với cách tiếp cận dùng React/Vue
    3.5.2 So sánh với một số website thực đơn trực tuyến phổ biến
    3.5.3 Đánh giá mức độ phù hợp với phạm vi học phần

Yêu cầu kèm: [Hình 3.1. Sơ đồ kiến trúc tầng HTML – JavaScript – localStorage];
[Bảng 3.1. So sánh công nghệ và cách tiếp cận]; placeholder ảnh code link Bootstrap/Fonts
trong <head>. Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 4 — CHƯƠNG 4 (mục tiêu 10–12 trang)

```
Viết CHƯƠNG 4: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG, khoảng 10–12 trang, đề mục 3 cấp. Bám dàn ý:

4.1 Khảo sát và xác định yêu cầu
    4.1.1 Yêu cầu chức năng phía khách hàng
    4.1.2 Yêu cầu chức năng phía quản trị
    4.1.3 Yêu cầu phi chức năng (hiệu năng, dễ dùng, responsive, bảo trì)
4.2 Phân tích tác nhân và ca sử dụng
    4.2.1 Xác định các tác nhân (khách hàng, quản trị viên/nhân viên)
    4.2.2 Sơ đồ use case tổng quát của hệ thống
    4.2.3 Đặc tả một số ca sử dụng tiêu biểu (đặt món, quản lý món)
4.3 Thiết kế dữ liệu
    4.3.1 Các thực thể dữ liệu và thuộc tính (Món, Danh mục, Bàn)
    4.3.2 Thực thể Đơn hàng, Đặt bàn và Lịch sử đơn
    4.3.3 Sơ đồ cấu trúc dữ liệu (ERD giả lập) và quan hệ giữa các đối tượng
4.4 Thiết kế kiến trúc ứng dụng
    4.4.1 Nguyên tắc tách lớp api / main / admin / utils / auth
    4.4.2 Luồng dữ liệu giữa giao diện, Mock API và localStorage
    4.4.3 Sơ đồ tổ chức file mã nguồn
4.5 Thiết kế luồng xử lý nghiệp vụ
    4.5.1 Luồng chọn bàn và duyệt thực đơn
    4.5.2 Luồng thêm món vào giỏ và xác nhận đặt món
    4.5.3 Lưu đồ tổng quát quy trình đặt món
4.6 Thiết kế giao diện
    4.6.1 Nguyên tắc bố cục và trải nghiệm người dùng
    4.6.2 Wireframe các trang khách hàng
    4.6.3 Wireframe trang quản trị

Yêu cầu kèm: [Hình 4.1. Sơ đồ use case]; [Hình 4.2. Sơ đồ cấu trúc dữ liệu (ERD giả lập)];
[Hình 4.3. Lưu đồ quy trình đặt món]; [Hình 4.4. Sơ đồ tổ chức file mã nguồn];
[Bảng 4.1. Danh sách yêu cầu chức năng]. Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 5 — CHƯƠNG 5 (mục tiêu 8–10 trang)

```
Viết CHƯƠNG 5: XÂY DỰNG MOCK API VÀ MODULE TIỆN ÍCH, khoảng 8–10 trang, đề mục 3 cấp. Bám dàn ý:

5.1 Tổ chức tổng thể file api.js
    5.1.1 Các khóa lưu trữ và hằng số cấu hình (STORAGE_KEY, DATA_VERSION...)
    5.1.2 Cơ chế seed dữ liệu mặc định (_seedDefaults, _seedTables)
    5.1.3 Cơ chế versioning và tự khôi phục dữ liệu khi đổi schema
5.2 Nhóm phương thức quản lý món ăn (CRUD)
    5.2.1 Lấy danh sách và chi tiết món (getProducts, getProduct)
    5.2.2 Thêm và cập nhật món (createProduct, updateProduct)
    5.2.3 Xóa món và khôi phục dữ liệu (deleteProduct, resetData)
5.3 Nhóm phương thức quản lý bàn
    5.3.1 Lấy danh sách bàn (getTables, getVisibleTables)
    5.3.2 Thêm, sửa, xóa bàn (addTable, updateTable, deleteTable)
    5.3.3 Khôi phục bàn mặc định (resetTables)
5.4 Nhóm phương thức đơn hàng và đặt bàn
    5.4.1 Tạo và truy vấn đơn hàng (addOrder, getOrders)
    5.4.2 Quản lý đặt bàn (getReservations, updateReservation)
    5.4.3 Cập nhật trạng thái đơn (updateOrderStatus)
5.5 Module tiện ích utils.js
    5.5.1 Định dạng tiền tệ và chuẩn hóa URL ảnh, PLACEHOLDER_IMG
    5.5.2 Kiểm tra dữ liệu (validation) và xử lý an toàn HTML
    5.5.3 Kỹ thuật debounce và hệ thống thông báo toast
    5.5.4 Đọc/ghi giỏ hàng trong localStorage (CART_KEY)

Yêu cầu kèm: [Bảng 5.1. Danh sách phương thức của Mock API (tên – tham số – giá trị trả về)];
[Hình 5.1. Lưu đồ cơ chế seed và versioning dữ liệu]; tối thiểu 3 placeholder ảnh code
(_seedDefaults; một hàm CRUD trả Promise; hàm debounce hoặc format tiền).
Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 6 — CHƯƠNG 6 (mục tiêu 10–12 trang)

```
Viết CHƯƠNG 6: XÂY DỰNG GIAO DIỆN KHÁCH HÀNG, khoảng 10–12 trang, đề mục 3 cấp. Bám dàn ý:

6.1 Kiến trúc trang khách hàng (index.html + main.js)
    6.1.1 Tổ chức bố cục index.html và navbar
    6.1.2 Cơ chế điều hướng SPA (navigateTo, setNavActive)
    6.1.3 Quy trình khởi tạo và nạp dữ liệu khi mở trang
6.2 Trang chủ
    6.2.1 Hero section và các feature card
    6.2.2 Shortcut danh mục và khu vực món nổi bật (renderHome)
    6.2.3 Liên kết điều hướng sang thực đơn
6.3 Trang thực đơn và tìm kiếm, lọc món
    6.3.1 Hiển thị lưới sản phẩm responsive (renderMenu, buildProductCard)
    6.3.2 Tìm kiếm thời gian thực kết hợp debounce (onSearch)
    6.3.3 Lọc theo danh mục, theo giá và sắp xếp (applyFilters, _matchPrice)
6.4 Chi tiết món và trạng thái phục vụ
    6.4.1 Modal chi tiết món (openProductModal, _buildProductModalHTML)
    6.4.2 Hiển thị badge "Hết món" khi available = false
    6.4.3 Nhãn hiển thị (tag) và xử lý ảnh dự phòng
6.5 Giỏ hàng
    6.5.1 Thêm món và điều chỉnh số lượng (addToCart, updateQty, removeFromCart)
    6.5.2 Hiển thị giỏ hàng và tổng tiền (renderCart, syncCartBadge)
    6.5.3 Lưu trữ giỏ hàng trong localStorage (fm_cart)
6.6 Đặt món và các hình thức nhận món
    6.6.1 Chọn bàn trước khi đặt (renderTableSelection, selectTable)
    6.6.2 Đặt món tại bàn, mang về và giao hàng (_placeOrderForTable, _placeOrderTakeaway, _placeOrderDelivery)
    6.6.3 Kiểm tra giờ mở cửa trước khi nhận đơn (_getStoreStatus, _isStoreOpen)
6.7 Đặt bàn, lịch sử đơn và tài khoản khách hàng
    6.7.1 Đặt bàn và quản lý đặt bàn (_renderReservationPanel)
    6.7.2 Lịch sử đơn hàng theo khách/bàn (renderHistory)
    6.7.3 Đăng nhập, đăng ký khách hàng (_handleCustomerLogin, _handleCustomerRegister)

Yêu cầu kèm: [Hình 6.1. Trang chủ]; [Hình 6.2. Trang thực đơn và bộ lọc]; [Hình 6.3. Modal
chi tiết món]; [Hình 6.4. Giỏ hàng]; tối thiểu 2 placeholder ảnh code (applyFilters; addToCart
hoặc _buildProductModalHTML). Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 7 — CHƯƠNG 7 (mục tiêu 8–10 trang)

```
Viết CHƯƠNG 7: XÂY DỰNG GIAO DIỆN QUẢN TRỊ ADMIN VÀ CSS DESIGN SYSTEM, khoảng 8–10 trang,
đề mục 3 cấp. Bám dàn ý:

7.1 Tổng quan trang quản trị
    7.1.1 Bố cục admin.html và phân vùng giao diện
    7.1.2 Đăng nhập quản trị (auth.js) và phân biệt khu vực khách/quản trị
    7.1.3 Luồng làm việc của quản trị viên
7.2 Bảng điều khiển thống kê (Dashboard)
    7.2.1 Bốn thẻ thống kê: tổng món, còn phục vụ, hết món, số danh mục
    7.2.2 Cách tính toán số liệu từ dữ liệu localStorage
    7.2.3 Cập nhật thống kê khi dữ liệu thay đổi
7.3 Quản lý món ăn
    7.3.1 Modal thêm/sửa món và xem trước ảnh thời gian thực
    7.3.2 Xóa món có xác nhận và cập nhật trạng thái còn/hết
    7.3.3 Hiển thị danh sách món và đồng bộ với Mock API
7.4 Quản lý bàn
    7.4.1 Thêm, ẩn/hiện và đổi trạng thái bàn
    7.4.2 Khôi phục danh sách bàn mặc định (resetTables)
    7.4.3 Ràng buộc khi bàn đang được sử dụng
7.5 Hệ thống thiết kế giao diện (CSS Design System)
    7.5.1 Hệ biến màu --fm-* và bảng màu chủ đạo
    7.5.2 Typography với Playfair Display và DM Sans
    7.5.3 Spacing, component tùy chỉnh và thiết kế responsive

Yêu cầu kèm: [Hình 7.1. Bảng điều khiển quản trị]; [Hình 7.2. Modal thêm món có xem trước ảnh];
[Bảng 7.1. Bảng màu Design System]; placeholder ảnh code khối biến :root trong style.css.
Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT 8 — CHƯƠNG 8 (mục tiêu 7–9 trang)

```
Viết CHƯƠNG 8: KIỂM THỬ, ĐÁNH GIÁ VÀ HƯỚNG PHÁT TRIỂN, khoảng 7–9 trang, đề mục 3 cấp. Bám dàn ý:

8.1 Kế hoạch và phương pháp kiểm thử
    8.1.1 Mục tiêu và phạm vi kiểm thử
    8.1.2 Phương pháp kiểm thử thủ công theo kịch bản
    8.1.3 Môi trường và công cụ kiểm thử
8.2 Thực hiện kiểm thử chức năng
    8.2.1 Kiểm thử tìm kiếm, lọc và sắp xếp món
    8.2.2 Kiểm thử giỏ hàng, chọn bàn và đặt món
    8.2.3 Kiểm thử các chức năng quản trị (CRUD món, quản lý bàn)
8.3 Đánh giá kết quả
    8.3.1 Đánh giá mức độ hoàn thành chức năng
    8.3.2 Đánh giá hiệu năng và trải nghiệm người dùng
    8.3.3 Đánh giá tính responsive trên nhiều thiết bị
8.4 Hạn chế của hệ thống
    8.4.1 Hạn chế về bảo mật khi dùng localStorage
    8.4.2 Hạn chế do chưa có backend và dữ liệu cục bộ theo trình duyệt
    8.4.3 Các chức năng nâng cao còn thiếu
8.5 Hướng phát triển
    8.5.1 Tích hợp backend thật (Node.js/Express) và cơ sở dữ liệu (MongoDB/MySQL)
    8.5.2 Xác thực người dùng, upload ảnh và thanh toán trực tuyến
    8.5.3 Thông báo realtime và phát triển thành PWA

Yêu cầu kèm: [Bảng 8.1. Bảng test case] (viết tối thiểu 12 ca: mã, mô tả, đầu vào,
kết quả mong đợi, kết quả thực tế, đạt/không); [Bảng 8.2. Hạn chế và hướng khắc phục].
Giữ đúng quy tắc trình bày đã thống nhất.
```

---

## PROMPT KẾT — KẾT LUẬN + TÀI LIỆU THAM KHẢO + DANH MỤC

```
Viết phần cuối báo cáo gồm ba phần:
1) KẾT LUẬN (khoảng 1–1.5 trang): tóm tắt kết quả đạt được, các kiến thức Front-End đã vận dụng,
   ý nghĩa thực tiễn của FoodieMenu và bài học rút ra của em.
2) DANH MỤC TÀI LIỆU THAM KHẢO theo định dạng nhất quán, tối thiểu gồm: MDN Web Docs;
   ECMA International (ECMAScript 2015); tài liệu chính thức Bootstrap 5; W3Schools;
   và 1–2 nguồn về localStorage hoặc SPA.
3) DANH MỤC HÌNH và DANH MỤC BẢNG: liệt kê lại toàn bộ hình và bảng đã dùng trong 8 chương
   theo đúng số thứ tự, để em chèn vào phần đầu báo cáo.
Giữ đúng văn phong đã thống nhất.
```

---

## SAU KHI CÓ ĐỦ NỘI DUNG — GHÉP VÀO WORD
1. Ghép tất cả vào một file Word; font Times New Roman 13–14pt, giãn dòng 1.5, căn đều (justify).
2. Đặt tiêu đề bằng Styles: Heading 1 (Chương), Heading 2 (x.y), Heading 3 (x.y.z)
   → tạo **Mục lục tự động ba cấp** (References → Table of Contents).
3. Thay từng `[Hình X.Y]` bằng ảnh chụp code (từ VS Code) hoặc sơ đồ (vẽ ở draw.io/Excalidraw);
   thay `[Bảng X.Y]` bằng bảng thật; giữ đúng chú thích.
4. Đánh số trang; tạo danh mục hình/bảng; rà soát theo checklist trong
   `PLAN_VIET_BAO_CAO_FOODIEMENU.md`. Kiểm tra tổng độ dài đã vượt 60 trang.
```
