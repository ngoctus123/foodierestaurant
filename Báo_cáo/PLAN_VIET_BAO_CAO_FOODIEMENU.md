# KẾ HOẠCH VIẾT BÁO CÁO HỌC PHẦN — FoodieMenu
## (Prompt & dàn ý chi tiết để đưa cho Claude AI web)

> **Mục tiêu:** Viết hoàn chỉnh báo cáo bài tập lớn học phần *Thiết kế, Lập trình Front-End* cho đề tài **“Xây dựng ứng dụng thực đơn trực tuyến cho nhà hàng — FoodieMenu”**, độ dài **hơn 60 trang A4**, dựa trên mẫu báo cáo đã có (`Mẫu báo cáo bài tập lớn Thiết kế, Lập trình Front-End.docx`).

---

## A. THÔNG TIN CỐ ĐỊNH (giữ nguyên ở trang bìa)

- Trường: **ĐẠI HỌC ĐẠI NAM** — Khoa **Công nghệ Thông tin**
- Học phần: **Thiết kế, Lập trình Front-End**
- Đề tài: **Xây dựng ứng dụng thực đơn trực tuyến cho nhà hàng — FoodieMenu**
- Giảng viên: **TS. Nguyễn Văn Chung**
- Sinh viên:
  - Lê Ngọc Tú — MSV 1971020481
  - Lưu Thị Hồng Vân — MSV 1971020511
  - Trần Đức Duy — MSV 1971020141
- Địa điểm/năm: **Hà Nội, năm 2026**

---

## B. YÊU CẦU VĂN PHONG (bắt buộc — chèn vào đầu mọi prompt)

> Hãy viết với văn phong sau:
> - Viết tự nhiên, mạch lạc, dễ hiểu, **không quá hàn lâm**.
> - Tránh câu kiểu giáo trình hoặc định nghĩa khô cứng.
> - Khi giải thích công nghệ, **liên hệ trực tiếp với dự án FoodieMenu** thay vì chỉ nêu lý thuyết chung.
> - Mỗi ý triển khai thành **đoạn văn đầy đủ**, không liệt kê sơ sài, không viết quá ngắn.
> - Giọng văn như **sinh viên tự phân tích và trình bày sản phẩm của mình**.
> - Xưng hô trang trọng, dùng **“em”** khi nói về quá trình thực hiện.
> - **Không** dùng văn phong quảng cáo, không hoa mỹ.
> - Chèn **hình minh họa từ code** (ảnh chụp đoạn code thực tế) và **sơ đồ minh họa** (kiến trúc, use case, luồng xử lý, ERD/cấu trúc dữ liệu).
> - Mỗi hình/bảng phải có **số thứ tự + chú thích** (ví dụ: *Hình 4.2. Sơ đồ use case khách hàng*; *Bảng 5.1. Danh sách phương thức của API*).

---

## C. SỰ THẬT KỸ THUẬT VỀ DỰ ÁN (để Claude viết đúng, không bịa)

Dùng khối này làm “nguồn dữ kiện” dán kèm mỗi prompt chương kỹ thuật.

**Công nghệ:** HTML5, CSS3, Bootstrap 5.3.2, Bootstrap Icons 1.11.3, Google Fonts (Playfair Display + DM Sans), Vanilla JavaScript ES6+, localStorage (Web API) làm “cơ sở dữ liệu giả lập”. Mô hình **SPA (Single Page Application)** — điều hướng bằng JS, không reload trang. Không backend, không DB thật.

**Cấu trúc mã nguồn (thư mục `FoodieMenu/`):**
- `index.html` — giao diện khách hàng
- `admin.html` — giao diện quản trị
- `css/style.css` — Design System + custom CSS (~44 KB)
- `js/api.js` — Mock API + seed dữ liệu (~34 KB)
- `js/main.js` — logic khách hàng (~93 KB)
- `js/admin.js` — logic quản trị (~22 KB)
- `js/utils.js` — hàm tiện ích dùng chung (~6 KB)
- `js/auth.js` — đăng nhập admin
- `img/` — ảnh món ăn

**Design System (biến CSS trong `style.css`):**
```
--fm-primary: #E85D04   --fm-primary-dark: #C24A02   --fm-amber: #F48C06
--fm-cream: #FFFBF5      --fm-dark: #1A0A00          --fm-muted: #7A5C3F
```

**Khóa localStorage:** `fm_products`, `fm_products_version` (DATA_VERSION=3), `fm_tables`, `fm_reservations`, `fm_order_history`, `fm_cart`, `fm_selected_table`.

**Đối tượng dữ liệu chính:** Món ăn (id, tên, giá, danh mục, ảnh, mô tả, nguyên liệu, available, tag), Danh mục, Bàn ăn (id, name, status, visible), Giỏ hàng, Đơn hàng (bàn, danh sách món, số lượng, tổng tiền, time, status), Đặt bàn (reservation), Lịch sử đơn, Tài khoản.

**Mock API — các phương thức thực tế trong `api.js`:**
`getProducts({category,search})`, `getProduct(id)`, `createProduct(data)`, `updateProduct(id,data)`, `deleteProduct(id)`, `resetData()`, `getDataVersion()`, `getTables()`, `getVisibleTables()`, `addTable(name)`, `updateTable(id,data)`, `deleteTable(id)`, `resetTables()`, `addOrder(orderData)`, `getOrders(tableId,customerEmail)`, `getReservations(date)`, `updateReservation(id,data)`, `updateOrderStatus(orderId,status)`. Hàm nội bộ: `_getData/_setData/_seedDefaults`, `_getTables/_setTables/_seedTables`, `_getReservations/_setReservations`, `_getHistory/_setHistory`. Cơ chế **versioning**: khi `fm_products_version` ≠ `DATA_VERSION` thì seed lại dữ liệu mặc định. Mọi hàm trả về **Promise** (giả lập async) → có thể thay bằng `fetch()` thật mà không sửa main.js/admin.js.

**Tiện ích trong `utils.js` (object `Utils`):** validation form, `toast` (thông báo), `debounce`, đọc/ghi giỏ hàng (`CART_KEY='fm_cart'`), `PLACEHOLDER_IMG` (ảnh SVG dự phòng), escape/an toàn HTML, format tiền tệ, chuẩn hóa URL ảnh.

**Logic khách hàng nổi bật trong `main.js`:** điều hướng SPA (`navigateTo`, `setNavActive`), `renderHome`, `renderMenu`, tìm kiếm + lọc + sắp xếp (`onSearch`, `filterByCategory`, `filterByPrice`, `sortProducts`, `applyFilters`, `_matchPrice`), modal chi tiết món (`openProductModal`, `_buildProductModalHTML`), giỏ hàng (`addToCart`, `updateQty`, `removeFromCart`, `syncCartBadge`, `renderCart`), đặt món nhiều hình thức (`placeOrder`, `_placeOrderForTable`, `_placeOrderTakeaway`, `_placeOrderDineIn`, `_placeOrderDelivery`), chọn bàn (`renderTableSelection`, `selectTable`, `_applyTableSelection`), đặt bàn (`_renderReservationPanel`, `_assignReservationToTable`, `_checkinReservation`, `_cancelReservation`), kiểm tra giờ mở cửa (`_getStoreStatus`, `_isStoreOpen`, `_showStoreStatusModal`), lịch sử đơn (`renderHistory`), xác thực khách hàng (`getCustomerSession`, `requireCustomerAuth`, `_handleCustomerLogin`, `_handleCustomerRegister`).

> **Lưu ý quan trọng:** Sản phẩm thực tế đã mở rộng hơn mẫu báo cáo (có thêm: chọn bàn, đặt bàn, nhiều hình thức nhận món — tại bàn/mang về/giao hàng, kiểm tra giờ mở cửa, đăng nhập khách hàng & nhân viên). Báo cáo nên **mô tả các tính năng mở rộng này** để bám sát code, nhưng vẫn giữ khung 8 chương của mẫu.

---

## D. CẤU TRÚC 8 CHƯƠNG + PHÂN BỔ TRANG (mục tiêu > 60 trang)

| Phần | Nội dung | Trang |
|------|----------|-------|
| Bìa + bìa lót + bảng điểm | Theo mẫu | 2–3 |
| Lời nói đầu | Giữ/biên tập lại bản đã có | 3–4 |
| Mục lục, danh mục hình, danh mục bảng | Tự động 3 mức | 3–4 |
| **Chương 1** — JavaScript & ES6+ trong dự án | Lý thuyết + liên hệ code | 9–11 |
| **Chương 2** — Tổng quan đề tài | Tính cấp thiết, mục tiêu, phạm vi, phương pháp | 5–6 |
| **Chương 3** — Cơ sở lý thuyết & công nghệ | Web/SPA, HTML5, CSS3, Bootstrap, localStorage, Mock API, Design System, so sánh | 8–10 |
| **Chương 4** — Phân tích & thiết kế hệ thống | Yêu cầu, actor, use case, dữ liệu, kiến trúc, luồng, giao diện | 9–11 |
| **Chương 5** — Mock API & module tiện ích | `api.js` + `utils.js` | 7–9 |
| **Chương 6** — Giao diện khách hàng | `index.html` + `main.js` | 9–11 |
| **Chương 7** — Giao diện Admin & CSS Design System | `admin.html` + `admin.js` + `style.css` | 7–9 |
| **Chương 8** — Kiểm thử, đánh giá & hướng phát triển | Test case, đánh giá, hạn chế, mở rộng | 6–8 |
| Kết luận + Tài liệu tham khảo | | 2–3 |

> Tổng ước tính: **65–80 trang** (đã gồm hình/bảng/sơ đồ). Mỗi chương nên có **2–4 ảnh code thật** + **1–2 sơ đồ/bảng**.

---

## E. DÀN Ý CHI TIẾT TỪNG CHƯƠNG (mục con + hình/bảng cần có)

### Chương 1 — Giới thiệu một số khái niệm trong JavaScript *(giữ phần đã viết, mở rộng thêm)*
- 1.1 Khái niệm JavaScript; lịch sử JS ↔ ECMAScript; vai trò JS phía client trong FoodieMenu
- 1.2 Tiến hóa ES6+: `let`/`const` vs `var` (scope, hoisting, TDZ); arrow function; template literal; destructuring; spread/rest; method mảng (`map`/`filter`/`reduce`/`find`); `Promise` & `async/await`; module
- 1.3 Cú pháp, biến, kiểu dữ liệu; **event delegation**; **localStorage**; **debounce** (liên hệ ô tìm kiếm)
- *Bảng 1.1* mốc phát triển JS/ECMAScript · *Hình 1.1* sơ đồ vai trò JS trong FoodieMenu · *ảnh code:* khai báo `STORAGE_KEY/DATA_VERSION`, một arrow function trong `filter`, template literal dựng HTML thẻ món.

### Chương 2 — Giới thiệu, mô tả đề tài
- 2.1 Tính cấp thiết & lý do chọn đề tài (hạn chế thực đơn giấy, nhu cầu số hóa)
- 2.2 Mục tiêu (tổng quát + cụ thể), đối tượng & phạm vi (giới hạn Front-End)
- 2.3 Phương pháp thực hiện; công cụ (VS Code, Live Server, Git); cấu trúc báo cáo
- *Hình 2.1* ảnh chụp giao diện trang chủ FoodieMenu · *Bảng 2.1* chức năng khách hàng vs admin.

### Chương 3 — Cơ sở lý thuyết & công nghệ sử dụng
- 3.1 Ứng dụng web & mô hình SPA; client–server (vì sao FoodieMenu là SPA thuần JS)
- 3.2 HTML5 (cấu trúc ngữ nghĩa), CSS3 (Flexbox/Grid, responsive)
- 3.3 Bootstrap 5 & Bootstrap Icons (grid, modal, component); Google Fonts
- 3.4 localStorage làm DB giả lập; khái niệm Mock API; Design System
- 3.5 So sánh cách tiếp cận FoodieMenu với React/Vue/website thực đơn khác (bảng so sánh)
- *Hình 3.1* sơ đồ kiến trúc tầng (HTML ↔ JS ↔ localStorage) · *Bảng 3.1* so sánh công nghệ · *ảnh code:* link Bootstrap/Fonts trong `<head>`.

### Chương 4 — Phân tích & thiết kế hệ thống
- 4.1 Yêu cầu chức năng (khách hàng, admin) & phi chức năng (hiệu năng, dễ dùng, responsive, bảo trì)
- 4.2 Actor & **sơ đồ use case** (khách hàng, quản trị/nhân viên)
- 4.3 Thiết kế dữ liệu: các thực thể & thuộc tính (Món, Danh mục, Bàn, Đơn, Đặt bàn, Lịch sử) — **sơ đồ cấu trúc dữ liệu/ERD giả lập**
- 4.4 Kiến trúc ứng dụng (tách lớp api/main/admin/utils/auth)
- 4.5 Luồng xử lý chính: **sơ đồ luồng đặt món** (chọn bàn → duyệt menu → thêm giỏ → xác nhận → lưu lịch sử)
- 4.6 Thiết kế giao diện & wireframe các trang
- *Hình 4.1* use case · *Hình 4.2* ERD/cấu trúc dữ liệu · *Hình 4.3* flowchart đặt món · *Hình 4.4* sơ đồ kiến trúc file · *Bảng 4.1* yêu cầu chức năng.

### Chương 5 — Xây dựng Mock API & module tiện ích
- 5.1 Tổ chức `api.js`: khóa lưu trữ, **seed dữ liệu mặc định**, cơ chế **versioning** (`DATA_VERSION`)
- 5.2 CRUD món ăn: `getProducts/getProduct/createProduct/updateProduct/deleteProduct/resetData`
- 5.3 Quản lý bàn: `getTables/getVisibleTables/addTable/updateTable/deleteTable/resetTables`
- 5.4 Đơn hàng & đặt bàn: `addOrder/getOrders/getReservations/updateReservation/updateOrderStatus`
- 5.5 `utils.js`: format tiền tệ, validation, escape HTML an toàn, `debounce`, toast, lưu giỏ hàng, `PLACEHOLDER_IMG`
- *Bảng 5.1* danh sách phương thức API (tên, tham số, trả về) · *ảnh code:* `_seedDefaults`, một hàm CRUD trả Promise, hàm `debounce`, hàm format tiền · *Hình 5.1* sơ đồ luồng versioning/seed.

### Chương 6 — Xây dựng giao diện khách hàng
- 6.1 Kiến trúc SPA & điều hướng (`navigateTo`, `setNavActive`)
- 6.2 Trang chủ (`renderHome`: hero, feature cards, danh mục, món nổi bật)
- 6.3 Trang thực đơn: render lưới, **tìm kiếm real-time + debounce**, lọc danh mục/giá, sắp xếp
- 6.4 Modal chi tiết món; badge “Hết món” khi `available=false`
- 6.5 Giỏ hàng (`addToCart/updateQty/removeFromCart/renderCart`, persist localStorage)
- 6.6 Chọn bàn, các hình thức nhận món (tại bàn/mang về/giao hàng), kiểm tra giờ mở cửa
- 6.7 Lịch sử đơn hàng; đăng nhập/đăng ký khách hàng
- *Hình 6.1–6.4* ảnh chụp: trang chủ, thực đơn + bộ lọc, modal món, giỏ hàng · *ảnh code:* `applyFilters`, `addToCart`, `_buildProductModalHTML`.

### Chương 7 — Giao diện Admin & CSS Design System
- 7.1 Trang admin & đăng nhập (`auth.js`)
- 7.2 Dashboard 4 thẻ thống kê (tổng món/còn/hết/số danh mục)
- 7.3 CRUD món: modal thêm/sửa + **preview ảnh realtime**, xóa có confirm, toggle trạng thái
- 7.4 Quản lý bàn (thêm/ẩn/hiện/đổi trạng thái/khôi phục)
- 7.5 **CSS Design System**: biến màu, typography (Playfair + DM Sans), spacing, component tùy chỉnh, responsive
- *Hình 7.1* dashboard admin · *Hình 7.2* modal thêm món + preview · *ảnh code:* biến `:root` trong `style.css`, hàm render bảng admin · *Bảng 7.1* bảng màu Design System.

### Chương 8 — Kiểm thử, đánh giá & hướng phát triển
- 8.1 Kế hoạch & phương pháp kiểm thử (thủ công theo kịch bản)
- 8.2 **Bảng test case** (mã, mô tả, đầu vào, kết quả mong đợi, kết quả thực tế, đạt/không)
- 8.3 Đánh giá hiệu năng, trải nghiệm người dùng, tính responsive
- 8.4 Hạn chế: **bảo mật khi dùng localStorage**, không có backend, dữ liệu cục bộ trình duyệt
- 8.5 Hướng phát triển: Node.js/Express, MongoDB/MySQL, xác thực thật, upload ảnh (Cloudinary/S3), thanh toán online, realtime, PWA
- *Bảng 8.1* test case · *Bảng 8.2* hạn chế ↔ hướng khắc phục.

---

## F. CÁCH CHIA VIỆC CHO CLAUDE WEB (vì >60 trang không xuất hết 1 lần)

Claude web có giới hạn độ dài mỗi câu trả lời, nên **không yêu cầu cả 60 trang trong 1 lần**. Làm theo trình tự:

1. **Lượt 1 — Khởi tạo ngữ cảnh:** dán mục **B (văn phong)** + **C (sự thật kỹ thuật)** + **D (cấu trúc)** + **E (dàn ý)**. Yêu cầu Claude xác nhận đã nắm và **chỉ in trang bìa + Lời nói đầu + Mục lục**.
2. **Lượt 2 → 9 — Viết từng chương:** mỗi lượt yêu cầu **1 chương** theo dàn ý mục E, đúng số trang mục D. Câu lệnh mẫu ở mục G.
3. **Lượt cuối — Kết luận + Tài liệu tham khảo + rà soát** đánh số hình/bảng liên tục.
4. **Ghép & định dạng trong Word:** Times New Roman 13–14pt, giãn dòng 1.5, căn đều (justify), heading theo Styles để **Mục lục tự động 3 mức**; chèn ảnh code (chụp từ VS Code) và sơ đồ (vẽ bằng draw.io/Excalidraw) đúng vị trí chú thích.

---

## G. PROMPT MẪU ĐỂ COPY (dùng cho từng chương)

```
Bạn là trợ lý viết báo cáo học phần. Hãy viết [CHƯƠNG X: TÊN CHƯƠNG] cho báo cáo
đề tài "Xây dựng ứng dụng thực đơn trực tuyến cho nhà hàng — FoodieMenu" (học phần
Thiết kế, Lập trình Front-End, ĐH Đại Nam).

VĂN PHONG (bắt buộc):
- Tự nhiên, mạch lạc, dễ hiểu, không hàn lâm, không quảng cáo, không hoa mỹ.
- Mỗi ý là một đoạn văn đầy đủ; không liệt kê sơ sài.
- Giọng như sinh viên tự phân tích sản phẩm của mình; xưng "em".
- Khi nói về công nghệ phải LIÊN HỆ TRỰC TIẾP với code FoodieMenu (tên file/hàm thật).

ĐỘ DÀI: khoảng [N] trang A4 (Times New Roman 13pt, giãn 1.5).

DÀN Ý cần bám theo: [dán mục con của chương từ phần E].

DỮ KIỆN KỸ THUẬT (chỉ dùng dữ kiện này, không bịa): [dán phần C].

YÊU CẦU HÌNH/BẢNG: tại mỗi vị trí cần minh họa, hãy chèn placeholder dạng
"[Hình X.Y. <mô tả>]" hoặc "[Bảng X.Y. <mô tả>]" và viết 1–2 câu dẫn/giải thích
cho hình/bảng đó (em sẽ tự chèn ảnh code + sơ đồ vào Word sau).

Viết liền mạch, đầy đủ, đúng số mục con. Bắt đầu ngay.
```

---

## H. DANH SÁCH HÌNH/SƠ ĐỒ CẦN TỰ TẠO (để chèn vào Word)

**Ảnh chụp code (từ VS Code):** khai báo hằng + versioning trong `api.js`; một hàm CRUD trả Promise; hàm `debounce` và format tiền trong `utils.js`; `applyFilters`/`addToCart` trong `main.js`; biến `:root` Design System trong `style.css`; link Bootstrap/Fonts trong `<head>`.

**Ảnh chụp giao diện (chạy app):** trang chủ, trang thực đơn + bộ lọc, modal chi tiết món, giỏ hàng, chọn bàn, dashboard admin, modal thêm món + preview ảnh.

**Sơ đồ cần vẽ (draw.io/Excalidraw):**
1. Vai trò JS trong FoodieMenu (Hình 1.1)
2. Kiến trúc tầng HTML ↔ JS ↔ localStorage (Hình 3.1)
3. Use case khách hàng & admin (Hình 4.1)
4. Cấu trúc dữ liệu/ERD giả lập (Hình 4.2)
5. Flowchart luồng đặt món (Hình 4.3)
6. Sơ đồ tổ chức file mã nguồn (Hình 4.4)
7. Luồng seed/versioning dữ liệu (Hình 5.1)

---

## I. CHECKLIST TRƯỚC KHI NỘP
- [ ] Trang bìa đúng thông tin (mục A), có bảng điểm cán bộ chấm thi 1 & 2
- [ ] Mục lục tự động 3 mức + danh mục hình + danh mục bảng
- [ ] Đủ 8 chương + Kết luận + Tài liệu tham khảo, **> 60 trang**
- [ ] Mọi hình/bảng có số thứ tự + chú thích, được nhắc trong văn bản
- [ ] Tên file/hàm trong báo cáo khớp code thật (đối chiếu mục C)
- [ ] Font Times New Roman, 13–14pt, giãn 1.5, căn đều, đánh số trang
- [ ] Tài liệu tham khảo: MDN Web Docs, ECMA International, Bootstrap docs, W3Schools…
```
```
