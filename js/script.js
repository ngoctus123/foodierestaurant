/* =============================================
   FoodieMenu — Main JavaScript (Lab 10 tích hợp FoodieMenu data)
   ============================================= */

/* --- XSS-safe HTML escape helper --- */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/* =============================================
   TOAST HELPER
   ============================================= */
function showToast(icon, text, type = 'success') {
  const toastEl  = document.getElementById('mainToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toastEl || !toastMsg) return;
  toastEl.className = 'toast align-items-center border-0 text-bg-' + type;
  toastMsg.innerHTML = '';
  if (icon) {
    const i = document.createElement('i');
    i.className = icon + ' me-2';
    toastMsg.appendChild(i);
  }
  toastMsg.appendChild(document.createTextNode(text));
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 }).show();
}

/* =============================================
   FOODIEMENU PRODUCTS DATA
   (copy từ FoodieMenu/js/api.js, sửa đường dẫn ảnh local → FoodieMenu/img/...)
   ============================================= */
const FOODIEMENU_PRODUCTS = [
  // ── KHAI VỊ ──────────────────────────────────────────
  {
    id: 1,
    name: 'Gỏi Cuốn Tôm Thịt',
    price: 45000,
    category: 'Khai vị',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDiDfaAc82y_656yac7nqD4nRFJwALoDOdaQ&s',
    available: true,
    description: 'Gỏi cuốn tươi mát, nhân tôm thịt giòn ngon',
    tags: ['Bán chạy'],
  },
  {
    id: 2,
    name: 'Nem Rán Nhân Thập Cẩm',
    price: 50000,
    category: 'Khai vị',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpvpeEZ0KI9LqbAnw59rlnpUlvchk1qmc_xg&s',
    available: true,
    description: 'Nem rán vàng giòn, nhân thập cẩm thơm ngon (5 cái/phần)',
    tags: [],
  },
  {
    id: 3,
    name: 'Nộm Bò Khô Xanh',
    price: 55000,
    category: 'Khai vị',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCro4gMesD3Z3cEms1KdATSW1srFYlH0K2cg&s',
    available: true,
    description: 'Nộm giòn chua cay, bò khô thơm đậm vị miền Trung',
    tags: ['Món mới'],
  },
  {
    id: 4,
    name: 'Súp Cua Bắp',
    price: 45000,
    category: 'Khai vị',
    image: 'https://cdn.tgdd.vn/Files/2020/10/18/1300089/cach-nau-sup-cua-ngon-bo-duong-chuan-vi-don-gian-tai-nha-202205251250388279.jpg',
    available: true,
    description: 'Súp cua béo ngọt, bắp tươi hầm mềm thơm nức',
    tags: [],
  },

  // ── MÓN CHÍNH ─────────────────────────────────────────
  {
    id: 5,
    name: 'Phở Bò Đặc Biệt',
    price: 75000,
    category: 'Món chính',
    image: 'https://bizweb.dktcdn.net/100/442/328/products/pho-bo-dac-biet-com-nieu-sai-gon.jpg?v=1721796376980',
    available: true,
    description: 'Nước dùng hầm xương 12 tiếng, thịt bò tươi mềm',
    tags: ['Bán chạy'],
  },
  {
    id: 6,
    name: 'Bún Bò Huế Cay',
    price: 70000,
    category: 'Món chính',
    image: 'https://i.ytimg.com/vi/A_o2qfaTgKs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDLj67gTiQBsryAaEQJ6s5Fa07yWg',
    available: true,
    description: 'Cay nồng đặc trưng xứ Huế, bò chả lụa đậm đà',
    tags: ['Bán chạy'],
  },
  {
    id: 7,
    name: 'Cơm Tấm Sườn Bì Chả',
    price: 80000,
    category: 'Món chính',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS03D3gzDYzWws3V3jc8JkrrDVb4v0EREstEw&s',
    available: true,
    description: 'Cơm tấm Sài Gòn đủ món, sườn nướng than hoa thơm',
    tags: ['Bán chạy', 'Ưu đãi'],
  },
  {
    id: 8,
    name: 'Cơm Gà Hội An',
    price: 70000,
    category: 'Món chính',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMvTk4KFs119EdWgK2Xacjf460r7cOcRIyjA&s',
    available: true,
    description: 'Gà ta thả vườn xé phay, cơm vàng nghệ truyền thống',
    tags: [],
  },
  {
    id: 9,
    name: 'Bánh Đúc Nóng Thịt Nấm',
    price: 55000,
    category: 'Món chính',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J670KkAS7pniJOzKhl-AQtwOjdJzNvFRGA&s',
    available: true,
    description: 'Bánh đúc mềm mịn, nhân thịt nấm béo ngậy chan nước dùng',
    tags: ['Món mới'],
  },
  {
    id: 10,
    name: 'Bún Chả Hà Nội',
    price: 70000,
    category: 'Món chính',
    image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/kien-thuc/cach-lam-bun-cha-ha-noi/cach-lam-bun-cha-ha-noi-1.jpg',
    available: false,
    description: 'Chả nướng than hoa thơm lừng, nước chấm chuẩn Hà Nội',
    tags: [],
  },

  // ── BÁNH MẶN ──────────────────────────────────────────
  {
    id: 11,
    name: 'Bánh Cuốn Nhân Thịt',
    price: 55000,
    category: 'Bánh mặn',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4e-62QHvRSMjgmN9BsSxGZnHpR8jzRk04lg&s',
    available: true,
    description: 'Bánh cuốn hấp mỏng mềm, nhân thịt mộc nhĩ thơm ngon',
    tags: ['Bán chạy'],
  },
  {
    id: 12,
    name: 'Bánh Xèo Miền Trung',
    price: 65000,
    category: 'Bánh mặn',
    image: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/02/cach-lam-banh-xeo-mien-trung.jpg',
    available: true,
    description: 'Bánh xèo giòn rụm, nhân tôm thịt giá đỗ hấp dẫn',
    tags: [],
  },
  {
    id: 13,
    name: 'Bánh Bột Lọc Trần',
    price: 45000,
    category: 'Bánh mặn',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kC3nY-8C6mDj1fGUo57F6DviQKveEo98vA&s',
    available: true,
    description: 'Bánh Huế trong suốt, nhân tôm thịt thơm béo (6 cái)',
    tags: ['Món mới'],
  },
  {
    id: 14,
    name: 'Bánh Giò Hà Nội',
    price: 35000,
    category: 'Bánh mặn',
    image: 'https://daylambanh.edu.vn/wp-content/uploads/2024/05/cach-lam-banh-gio-bang-bot-gao.jpg',
    available: true,
    description: 'Bánh giò bọc lá chuối, nhân thịt mộc nhĩ thơm mềm',
    tags: [],
  },

  // ── BÁNH TRÁNG MIỆNG ───────────────────────────────────
  {
    id: 15,
    name: 'Bánh Flan Caramel',
    price: 35000,
    category: 'Bánh tráng miệng',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wXb_ANn3IBMcOotnhn9pG9MAtS3FVqb8Hw&s',
    available: true,
    description: 'Flan mịn béo, caramel đắng ngọt tan chảy',
    tags: ['Bán chạy'],
  },
  {
    id: 16,
    name: 'Bánh Da Lợn Lá Dứa',
    price: 30000,
    category: 'Bánh tráng miệng',
    image: 'https://cdn.tgdd.vn/2021/12/CookDish/cach-lam-banh-da-lon-dau-xanh-thom-ngon-tai-nha-avt-1200x676.jpg',
    available: true,
    description: 'Bánh da lợn thơm lá dứa, lớp dừa béo ngậy xen kẽ',
    tags: ['Món mới'],
  },
  {
    id: 17,
    name: 'Bánh Chuối Hấp Dừa',
    price: 30000,
    category: 'Bánh tráng miệng',
    image: 'https://www.huongnghiepaau.com/wp-content/uploads/2016/10/cach-lam-banh-chuoi-hap-nuoc-cot-dua.jpg',
    available: true,
    description: 'Bánh chuối dẻo ngọt, chan nước dừa béo ngậy',
    tags: [],
  },
  {
    id: 18,
    name: 'Bánh Bò Nướng',
    price: 25000,
    category: 'Bánh tráng miệng',
    image: 'https://daylambanh.edu.vn/wp-content/uploads/2024/04/cach-lam-banh-bo-bang-bot-gao.jpg',
    available: true,
    description: 'Bánh bò xốp nhẹ, nướng vàng thơm ngọt ngào',
    tags: [],
  },

  // ── TRÁNG MIỆNG ────────────────────────────────────────
  {
    id: 19,
    name: 'Chè Bưởi Xanh',
    price: 35000,
    category: 'Tráng miệng',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMMcgvy089g_FEsRKpE-tbWo4KSSAbLBZeQ&s',
    available: true,
    description: 'Bưởi tươi mùa hè, chè thanh mát ngọt dịu',
    tags: ['Bán chạy'],
  },
  {
    id: 20,
    name: 'Chè Khúc Bạch',
    price: 45000,
    category: 'Tráng miệng',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBqVX3I9sCaL38TeUkjRaPKQcD9K5Hud3cIA&s',
    available: true,
    description: 'Chè Bắc trắng mịn, hạt lựu dứa thơm ngọt mát',
    tags: ['Bán chạy'],
  },
  {
    id: 21,
    name: 'Sữa Chua Nếp Cẩm',
    price: 40000,
    category: 'Tráng miệng',
    image: 'FoodieMenu/img/suachuanepcam.webp',
    available: true,
    description: 'Sữa chua dẻo béo, nếp cẩm tím đặc biệt',
    tags: ['Món mới'],
  },
  {
    id: 22,
    name: 'Tàu Hũ Nước Gừng',
    price: 30000,
    category: 'Tráng miệng',
    image: 'FoodieMenu/img/tauhu.jpg',
    available: true,
    description: 'Tàu hũ mềm mịn, nước gừng cay nhẹ ấm bụng',
    tags: [],
  },

  // ── ĐỒ UỐNG LẠNH ──────────────────────────────────────
  {
    id: 23,
    name: 'Trà Đào Cam Sả',
    price: 45000,
    category: 'Đồ uống lạnh',
    image: 'FoodieMenu/img/tra-dao-cam-sa__1__e962d6032789456081956f901689eb3e.jpg',
    available: true,
    description: 'Trà đào thơm mát, kết hợp cam sả tươi thanh',
    tags: ['Bán chạy'],
  },
  {
    id: 24,
    name: 'Cà Phê Sữa Đá',
    price: 35000,
    category: 'Đồ uống lạnh',
    image: 'FoodieMenu/img/caphesua.jpg',
    available: true,
    description: 'Cà phê phin đậm đà, sữa đặc ngọt béo pha đá',
    tags: ['Bán chạy'],
  },
  {
    id: 25,
    name: 'Nước Sấu Đường Phèn',
    price: 30000,
    category: 'Đồ uống lạnh',
    image: 'FoodieMenu/img/nuocsau.jpg',
    available: true,
    description: 'Nước sấu Hà Nội chua ngọt mát lạnh, giải nhiệt',
    tags: [],
  },
  {
    id: 26,
    name: 'Sinh Tố Xoài Tươi',
    price: 50000,
    category: 'Đồ uống lạnh',
    image: 'FoodieMenu/img/stxoai.jpg',
    available: true,
    description: 'Xoài cát Hòa Lộc chín ngọt, xay kem béo thơm',
    tags: ['Món mới'],
  },

  // ── ĐỒ UỐNG NÓNG ──────────────────────────────────────
  {
    id: 27,
    name: 'Trà Gừng Mật Ong',
    price: 35000,
    category: 'Đồ uống nóng',
    image: 'FoodieMenu/img/gungmatong.webp',
    available: true,
    description: 'Trà gừng ấm bụng, mật ong rừng nguyên chất ngọt dịu',
    tags: [],
  },
  {
    id: 28,
    name: 'Trà Sen Hà Nội',
    price: 40000,
    category: 'Đồ uống nóng',
    image: 'FoodieMenu/img/trasen.jpg',
    available: true,
    description: 'Trà sen Tây Hồ ướp bằng sen bách diệp, tinh tế',
    tags: ['Ưu đãi'],
  },
  {
    id: 29,
    name: 'Cà Phê Trứng Nóng',
    price: 55000,
    category: 'Đồ uống nóng',
    image: 'FoodieMenu/img/cftrungmuoi.jpg',
    available: true,
    description: 'Đặc sản Hà Nội, lớp kem trứng béo thơm phủ cà phê đen',
    tags: ['Bán chạy'],
  },
  {
    id: 30,
    name: 'Cacao Nóng Kem Tươi',
    price: 45000,
    category: 'Đồ uống nóng',
    image: 'FoodieMenu/img/cfkem.jpg',
    available: true,
    description: 'Cacao nguyên chất đắng ngọt, kem tươi tan chảy',
    tags: ['Món mới'],
  },

  // ── SET / COMBO ────────────────────────────────────────
  {
    id: 31,
    name: 'Set Đôi Lãng Mạn',
    price: 160000,
    category: 'Set/Combo',
    image: 'FoodieMenu/img/setcapdoi.jpg',
    available: true,
    description: 'Set dành cho 2 người: 2 món chính + 2 đồ uống + 1 tráng miệng',
    tags: ['Ưu đãi'],
    comboInfo: { serves: 2, savings: '20%' },
  },
  {
    id: 32,
    name: 'Set Gia Đình Vui Vẻ',
    price: 320000,
    category: 'Set/Combo',
    image: 'FoodieMenu/img/setgiadinh.webp',
    available: true,
    description: 'Set dành cho 4-5 người: 2 khai vị + 4 món chính + 4 đồ uống',
    tags: ['Ưu đãi', 'Bán chạy'],
    comboInfo: { serves: 5, savings: '25%' },
  },
  {
    id: 33,
    name: 'Set Họp Lớp Hội Tụ',
    price: 240000,
    category: 'Set/Combo',
    image: 'FoodieMenu/img/sethoplop.jpg',
    available: true,
    description: 'Set 3-4 người: 2 khai vị + 3 món chính + 3 đồ uống',
    tags: ['Ưu đãi'],
    comboInfo: { serves: 4, savings: '22%' },
  },
  {
    id: 34,
    name: 'Set Văn Phòng Nhanh',
    price: 195000,
    category: 'Set/Combo',
    image: 'FoodieMenu/img/comvanphong.jpg',
    available: true,
    description: 'Set 3 người, phục vụ nhanh trong 20 phút cho giờ trưa',
    tags: ['Bán chạy', 'Ưu đãi'],
    comboInfo: { serves: 3, savings: '18%' },
  },
];

/* =============================================
   HELPER FUNCTIONS
   ============================================= */
function fixImagePath(img) {
  if (!img) return 'https://via.placeholder.com/400x240?text=FoodieMenu';
  return img; // paths already fixed in data above
}

function formatPrice(price) {
  return Number(price).toLocaleString('vi-VN') + 'đ';
}

function getCategoryBadgeClass(category) {
  const map = {
    'Khai vị':           'info text-dark',
    'Món chính':         'warning text-dark',
    'Bánh mặn':          'secondary',
    'Bánh tráng miệng':  'danger',
    'Tráng miệng':       'success',
    'Đồ uống lạnh':      'primary',
    'Đồ uống nóng':      'warning text-dark',
    'Set/Combo':         'dark',
  };
  return map[category] || 'secondary';
}

const FALLBACK_IMG = 'https://via.placeholder.com/400x240?text=FoodieMenu';
const FALLBACK_THUMB = 'https://via.placeholder.com/80?text=?';

/* =============================================
   STATE
   ============================================= */
let currentCategory = 'Tất cả';
let currentSearch   = '';
let currentPrice    = 'all';
let currentSort     = 'default';

/* =============================================
   RENDER: FEATURED (Món nổi bật)
   ============================================= */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = FOODIEMENU_PRODUCTS.filter(p =>
    p.tags.includes('Bán chạy') || p.tags.includes('Đề xuất')
  ).slice(0, 6);

  grid.innerHTML = '';

  featured.forEach(p => {
    const col  = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';

    const img   = fixImagePath(p.image);
    const name  = escapeHtml(p.name);
    const cat   = escapeHtml(p.category);
    const desc  = escapeHtml(p.description);
    const price = formatPrice(p.price);

    const badgeLabel = p.tags.includes('Bán chạy') ? 'Bán chạy'
                     : p.tags.includes('Đề xuất')  ? 'Đề xuất'
                     : escapeHtml(p.tags[0] || 'Nổi bật');
    const badgeClass  = p.tags.includes('Bán chạy') ? 'bg-danger'
                      : p.tags.includes('Đề xuất')  ? 'bg-success'
                      : 'bg-warning text-dark';

    const availBadgeHtml = !p.available
      ? '<span class="badge bg-secondary position-absolute" style="top:14px;right:14px;border-radius:50px;padding:5px 12px;font-size:.73rem">Hết món</span>'
      : '';
    const btnHtml = p.available
      ? `<a href="FoodieMenu/index.html" class="btn btn-warning w-100 mt-2"><i class="bi bi-cart-plus me-1"></i>Đặt món</a>`
      : `<button class="btn btn-secondary w-100 mt-2" disabled><i class="bi bi-x-circle me-1"></i>Hết món</button>`;

    col.innerHTML = `
      <div class="food-card card h-100 border-0 shadow-sm">
        <div class="food-card-img-wrapper">
          <img src="${img}" class="card-img-top img-fluid" alt="${name}" loading="lazy"
               onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
          <span class="badge ${badgeClass} card-badge">${badgeLabel}</span>
          ${availBadgeHtml}
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">${name}</h5>
            <span class="price-tag">${price}</span>
          </div>
          <div class="mb-2">
            <span class="badge bg-${getCategoryBadgeClass(p.category)}">${cat}</span>
          </div>
          <p class="card-text text-muted small flex-grow-1">${desc}</p>
          ${btnHtml}
        </div>
      </div>`;

    grid.appendChild(col);
  });
}

/* =============================================
   RENDER: MENU GRID (Thực đơn)
   ============================================= */
function getFilteredProducts() {
  let list = FOODIEMENU_PRODUCTS.filter(p => {
    if (currentCategory !== 'Tất cả' && p.category !== currentCategory) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      if (!p.name.toLowerCase().includes(q) &&
          !(p.description || '').toLowerCase().includes(q)) return false;
    }
    if (currentPrice === 'under50'  && p.price >= 50000)                    return false;
    if (currentPrice === '50to100'  && (p.price < 50000 || p.price > 100000)) return false;
    if (currentPrice === 'over100'  && p.price <= 100000)                   return false;
    return true;
  });

  if (currentSort === 'asc')  list.sort((a, b) => a.price - b.price);
  if (currentSort === 'desc') list.sort((a, b) => b.price - a.price);

  return list;
}

function renderMenuGrid() {
  const grid      = document.getElementById('menuGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const products = getFilteredProducts();
  grid.innerHTML = '';

  if (products.length === 0) {
    if (noResults) noResults.classList.remove('d-none');
    return;
  }
  if (noResults) noResults.classList.add('d-none');

  products.forEach(p => {
    const col  = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';

    const img   = fixImagePath(p.image);
    const name  = escapeHtml(p.name);
    const desc  = escapeHtml(p.description);
    const price = formatPrice(p.price);
    const cat   = escapeHtml(p.category);

    const soldBadge = !p.available
      ? '<span class="badge bg-danger ms-1 flex-shrink-0" style="font-size:.65rem">Hết</span>'
      : '';

    col.innerHTML = `
      <div class="menu-card d-flex align-items-center p-3 bg-white rounded-3 shadow-sm h-100">
        <img src="${img}" class="menu-img rounded-3 me-3" alt="${name}" loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_THUMB}'">
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h6 class="mb-0 fw-semibold">${name}</h6>
            ${soldBadge}
          </div>
          <p class="text-muted small mb-2">${desc}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold text-danger">${price}</span>
            <span class="badge bg-${getCategoryBadgeClass(p.category)}">${cat}</span>
          </div>
        </div>
      </div>`;

    grid.appendChild(col);
  });

  /* Re-apply fade-in to newly rendered menu cards */
  grid.querySelectorAll('.menu-card').forEach(el => {
    el.classList.add('fade-in');
    if (typeof IntersectionObserver !== 'undefined') {
      menuCardObserver.observe(el);
    } else {
      el.classList.add('visible');
    }
  });
}

/* =============================================
   RENDER: COMBO TABLE
   ============================================= */
function renderComboTable() {
  const tbody = document.getElementById('comboTableBody');
  if (!tbody) return;

  const combos = FOODIEMENU_PRODUCTS.filter(p => p.category === 'Set/Combo');
  tbody.innerHTML = '';

  combos.forEach((p, idx) => {
    const savings    = p.comboInfo && p.comboInfo.savings ? p.comboInfo.savings : null;
    const serves     = p.comboInfo && p.comboInfo.serves  ? p.comboInfo.serves  : null;
    const statusBadge = p.available
      ? '<span class="badge bg-success">Còn món</span>'
      : '<span class="badge bg-danger">Hết món</span>';
    const orderBtn = p.available
      ? '<a href="FoodieMenu/index.html" class="btn btn-sm btn-warning fw-semibold">Đặt món</a>'
      : '<button class="btn btn-sm btn-secondary fw-semibold" disabled>Hết món</button>';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th scope="row">${idx + 1}</th>
      <td>
        <strong>${escapeHtml(p.name)}</strong>
        ${serves ? `<br><small class="text-muted">Phục vụ ${serves} người</small>` : ''}
      </td>
      <td class="small">${escapeHtml(p.description)}</td>
      <td class="text-danger fw-bold text-nowrap">${formatPrice(p.price)}</td>
      <td>${savings ? `<span class="badge bg-success">-${escapeHtml(savings)}</span>` : '—'}</td>
      <td>${statusBadge}</td>
      <td>${orderBtn}</td>`;

    tbody.appendChild(tr);
  });
}

/* =============================================
   NAVBAR: scroll effect + active link tracking
   ============================================= */
const navbar = document.getElementById('mainNavbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);

    let currentId = '';
    document.querySelectorAll('main section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) currentId = sec.id;
    });

    document.querySelectorAll('#mainNavbar .nav-link').forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  });
}

/* --- Smooth scroll for all anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navCollapse)?.hide();
      }
    }
  });
});

/* --- Min reservation date: use local date, not UTC --- */
const resDateInput = document.getElementById('resDate');
const resTimeInput = document.getElementById('resTime');

function _landingLocalDateString(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm   = String(date.getMonth() + 1).padStart(2, '0');
  const dd   = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function _reservationTimeToMinutes(value) {
  const [h, m] = String(value || '').split(':').map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : null;
}

function _isPastReservationSlot(dateValue, timeValue) {
  if (!dateValue || !timeValue || dateValue !== _landingLocalDateString()) return false;
  const slotMinutes = _reservationTimeToMinutes(timeValue);
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotMinutes !== null && slotMinutes <= nowMinutes;
}

function _updateReservationTimeOptions() {
  if (!resDateInput || !resTimeInput) return;
  const selectedDate = resDateInput.value;
  Array.from(resTimeInput.options).forEach(opt => {
    if (!opt.value) return;
    opt.disabled = _isPastReservationSlot(selectedDate, opt.value);
  });
  if (resTimeInput.value && _isPastReservationSlot(selectedDate, resTimeInput.value)) {
    resTimeInput.value = '';
  }
  resTimeInput.setCustomValidity('');
}

if (resDateInput) {
  resDateInput.min = _landingLocalDateString();
  resDateInput.addEventListener('change', _updateReservationTimeOptions);
  resTimeInput?.addEventListener('focus', _updateReservationTimeOptions);
  resTimeInput?.addEventListener('change', _updateReservationTimeOptions);
  _updateReservationTimeOptions();
}

/* =============================================
   SEARCH: filter menu items by name & description
   ============================================= */
const searchInput     = document.getElementById('searchInput');
const searchBtn       = document.getElementById('searchBtn');
const searchResultsEl = document.getElementById('searchResults');

function doSearch(query) {
  currentSearch = (query || '').trim();

  if (currentSearch) {
    /* Reset category to "Tất cả" when searching */
    currentCategory = 'Tất cả';
    document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
    const allTab = document.querySelector('[data-category="Tất cả"]');
    if (allTab) allTab.classList.add('active');
  }

  renderMenuGrid();

  if (searchResultsEl) {
    if (currentSearch) {
      const count = getFilteredProducts().length;
      searchResultsEl.innerHTML =
        `<small class="text-muted">Tìm thấy <strong>${count}</strong> món khớp với "<em>${escapeHtml(currentSearch)}</em>"</small>`;
      const menuSection = document.getElementById('menu');
      if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      searchResultsEl.innerHTML = '';
    }
  }
}

function resetMenu() {
  currentSearch   = '';
  currentCategory = 'Tất cả';
  currentPrice    = 'all';
  currentSort     = 'default';
  if (searchInput)     searchInput.value = '';
  if (searchResultsEl) searchResultsEl.innerHTML = '';
  const pf = document.getElementById('priceFilter');
  const sm = document.getElementById('sortMenu');
  if (pf) pf.value = 'all';
  if (sm) sm.value = 'default';
  document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
  const allTab = document.querySelector('[data-category="Tất cả"]');
  if (allTab) allTab.classList.add('active');
  renderMenuGrid();
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => doSearch(searchInput?.value));
}
if (searchInput) {
  searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') doSearch(searchInput.value);
    if (searchInput.value === '') doSearch('');
  });
}

/* =============================================
   MENU CATEGORY FILTER TABS
   ============================================= */
document.querySelectorAll('[data-category]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    currentSearch   = '';
    if (searchInput)     searchInput.value = '';
    if (searchResultsEl) searchResultsEl.innerHTML = '';
    renderMenuGrid();
  });
});

/* =============================================
   PRICE FILTER + SORT
   ============================================= */
const priceFilterEl = document.getElementById('priceFilter');
const sortMenuEl    = document.getElementById('sortMenu');

if (priceFilterEl) {
  priceFilterEl.addEventListener('change', () => {
    currentPrice = priceFilterEl.value;
    renderMenuGrid();
  });
}
if (sortMenuEl) {
  sortMenuEl.addEventListener('change', () => {
    currentSort = sortMenuEl.value;
    renderMenuGrid();
  });
}

/* =============================================
   RESERVATION FORM SUBMIT
   ============================================= */
const FM_RESERVATIONS_KEY = 'fm_reservations';

function _saveReservation(data) {
  try {
    const list = JSON.parse(localStorage.getItem(FM_RESERVATIONS_KEY) || '[]');
    list.push(data);
    localStorage.setItem(FM_RESERVATIONS_KEY, JSON.stringify(list));
  } catch { /* không làm hỏng UI nếu localStorage đầy */ }
}

const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      this.classList.add('was-validated');
      return;
    }

    const name   = document.getElementById('fullName').value.trim();
    const phone  = document.getElementById('phone').value.trim();
    const email  = document.getElementById('email')?.value.trim() || '';
    const guests = document.getElementById('guests').value;
    const date   = document.getElementById('resDate').value;
    const time   = document.getElementById('resTime').value;
    const note   = document.getElementById('note')?.value.trim() || '';
    if (_isPastReservationSlot(date, time)) {
      const timeEl = document.getElementById('resTime');
      if (timeEl) timeEl.setCustomValidity('Vui lòng chọn khung giờ chưa trôi qua.');
      this.classList.add('was-validated');
      return;
    }
    document.getElementById('resTime')?.setCustomValidity('');
    const [yyyy, mm, dd] = date.split('-');
    const formattedDate  = `${dd}/${mm}/${yyyy}`;

    // Lưu reservation vào localStorage để FoodieMenu nhận biết
    _saveReservation({
      id:        `R${Date.now()}`,
      name, phone, email,
      guests:    Number(guests) || 1,
      date, time, note,
      status:    'pending',
      tableId:   null,
      tableName: null,
      createdAt: new Date().toISOString(),
    });

    // Hiển thị chi tiết trong modal xác nhận
    const detailsEl = document.getElementById('bookingDetails');
    if (detailsEl) {
      detailsEl.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'row g-1 small';

      [
        ['Khách hàng:', name],
        ['Số điện thoại:', phone],
        ['Số khách:', guests + ' người'],
        ['Ngày đặt:', formattedDate],
        ['Giờ đặt:', time],
        ...(note ? [['Ghi chú:', note]] : []),
      ].forEach(([label, value]) => {
        const lCol = document.createElement('div');
        lCol.className  = 'col-5 text-muted';
        lCol.textContent = label;
        const vCol = document.createElement('div');
        vCol.className  = 'col-7 fw-semibold';
        vCol.textContent = value;
        grid.appendChild(lCol);
        grid.appendChild(vCol);
      });

      // Thêm ghi chú nghiệp vụ rõ ràng
      const noteRow = document.createElement('div');
      noteRow.className = 'col-12 mt-2 pt-2 border-top text-muted small';
      noteRow.textContent = 'Khi đến quán, nhân viên sẽ hỗ trợ chọn món và order tại bàn.';
      grid.appendChild(noteRow);

      detailsEl.appendChild(grid);
    }

    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
    showToast('bi bi-calendar-check', `Đặt bàn thành công cho ${escapeHtml(name)}!`, 'success');
    this.reset();
    this.classList.remove('was-validated');
  });
}

/* =============================================
   AUTH — localStorage keys (shared with FoodieMenu)
   ============================================= */
const LAB10_SESSION_KEY = 'fm_customer_session';
const LAB10_USERS_KEY   = 'fm_customer_users';

function lab10IsLoggedIn() {
  try { return !!JSON.parse(localStorage.getItem(LAB10_SESSION_KEY)); }
  catch { return false; }
}

function lab10GetSession() {
  try { return JSON.parse(localStorage.getItem(LAB10_SESSION_KEY)) || null; }
  catch { return null; }
}

function lab10Logout() {
  localStorage.removeItem(LAB10_SESSION_KEY);
  lab10UpdateAuthChip();
  showToast('bi bi-box-arrow-left', 'Đã đăng xuất. Hẹn gặp lại!', 'secondary');
}

function lab10UpdateAuthChip() {
  const chip = document.getElementById('lab10-auth-chip');
  if (!chip) return;
  chip.innerHTML = '';
  const session = lab10GetSession();
  if (session) {
    const greeting = document.createElement('span');
    greeting.className = 'text-warning fw-semibold small me-1 d-none d-md-inline';
    greeting.textContent = 'Xin chào, ' + session.name;
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn btn-outline-warning btn-sm';
    logoutBtn.innerHTML = '<i class="bi bi-box-arrow-right me-1"></i>Đăng xuất';
    logoutBtn.addEventListener('click', lab10Logout);
    chip.appendChild(greeting);
    chip.appendChild(logoutBtn);
  } else {
    const loginBtn = document.createElement('button');
    loginBtn.className = 'btn btn-outline-warning btn-sm';
    loginBtn.setAttribute('data-bs-toggle', 'modal');
    loginBtn.setAttribute('data-bs-target', '#loginModal');
    loginBtn.innerHTML = '<i class="bi bi-person me-1"></i>Đăng nhập';
    chip.appendChild(loginBtn);
  }
}

function _lab10FieldError(inputId, errId, msg) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (!input || !err) return;
  if (msg) {
    input.classList.add('is-invalid');
    err.textContent = msg;
    err.style.display = 'block';
  } else {
    input.classList.remove('is-invalid');
    err.style.display = 'none';
  }
}

/* ── Login form ──────────────────────────────────────── */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailVal = (document.getElementById('loginEmail')?.value || '').trim();
    const pwVal    = (document.getElementById('loginPassword')?.value || '');
    let ok = true;

    if (!emailVal) {
      _lab10FieldError('loginEmail', 'loginEmailErr', 'Vui lòng nhập email hoặc số điện thoại.');
      ok = false;
    } else {
      _lab10FieldError('loginEmail', 'loginEmailErr', '');
    }
    if (!pwVal || pwVal.length < 6) {
      _lab10FieldError('loginPassword', 'loginPasswordErr', 'Mật khẩu phải có ít nhất 6 ký tự.');
      ok = false;
    } else {
      _lab10FieldError('loginPassword', 'loginPasswordErr', '');
    }
    if (!ok) return;

    const users = JSON.parse(localStorage.getItem(LAB10_USERS_KEY) || '[]');
    const found = users.find(u => u.email === emailVal || u.phone === emailVal);
    if (!found) {
      _lab10FieldError('loginEmail', 'loginEmailErr', 'Email hoặc số điện thoại chưa được đăng ký.');
      return;
    }
    if (found.password !== pwVal) {
      _lab10FieldError('loginPassword', 'loginPasswordErr', 'Mật khẩu không đúng.');
      return;
    }

    const name = found.name;
    const session = { name, email: found.email };
    const remember = document.getElementById('rememberMe')?.checked;
    if (remember) {
      localStorage.setItem(LAB10_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.setItem(LAB10_SESSION_KEY, JSON.stringify(session));
    }

    const modalEl = document.getElementById('loginModal');
    const modal = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
    if (modal) modal.hide();

    lab10UpdateAuthChip();
    setTimeout(() => {
      showToast('bi bi-person-check', 'Đăng nhập thành công! Chào mừng, ' + escapeHtml(name) + '.', 'primary');
    }, 350);
  });
}

/* ── Register form ───────────────────────────────────── */
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name  = (document.getElementById('regName')?.value || '').trim();
    const email = (document.getElementById('regEmail')?.value || '').trim().toLowerCase();
    const phone = (document.getElementById('regPhone')?.value || '').trim();
    const pw    = (document.getElementById('regPassword')?.value || '');
    const pw2   = (document.getElementById('regPassword2')?.value || '');
    const terms = document.getElementById('regTerms')?.checked;
    let ok = true;

    if (!name) { _lab10FieldError('regName', 'regNameErr', 'Vui lòng nhập họ và tên.'); ok = false; }
    else        { _lab10FieldError('regName', 'regNameErr', ''); }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) { _lab10FieldError('regEmail', 'regEmailErr', 'Email không hợp lệ.'); ok = false; }
    else                                 { _lab10FieldError('regEmail', 'regEmailErr', ''); }

    if (pw.length < 6) { _lab10FieldError('regPassword', 'regPasswordErr', 'Mật khẩu phải có ít nhất 6 ký tự.'); ok = false; }
    else               { _lab10FieldError('regPassword', 'regPasswordErr', ''); }

    if (pw !== pw2) { _lab10FieldError('regPassword2', 'regPassword2Err', 'Mật khẩu nhập lại không khớp.'); ok = false; }
    else            { _lab10FieldError('regPassword2', 'regPassword2Err', ''); }

    const termsErr = document.getElementById('regTermsErr');
    if (!terms) {
      if (termsErr) { termsErr.textContent = 'Vui lòng đồng ý với điều khoản sử dụng.'; termsErr.style.display = 'block'; }
      ok = false;
    } else {
      if (termsErr) { termsErr.style.display = 'none'; }
    }

    if (!ok) return;

    const users = JSON.parse(localStorage.getItem(LAB10_USERS_KEY) || '[]');
    if (users.some(u => u.email === email)) {
      _lab10FieldError('regEmail', 'regEmailErr', 'Email này đã được đăng ký rồi.');
      return;
    }

    users.push({ name, email, phone, password: pw, role: 'customer' });
    localStorage.setItem(LAB10_USERS_KEY, JSON.stringify(users));

    // KHÔNG tự đăng nhập — chuyển về tab Đăng nhập và pre-fill email
    const loginTab = document.getElementById('login-tab');
    if (loginTab) new bootstrap.Tab(loginTab).show();

    const loginEmailEl = document.getElementById('loginEmail');
    if (loginEmailEl) loginEmailEl.value = email;

    // Reset form đăng ký
    registerForm.reset();
    if (termsErr) termsErr.style.display = 'none';

    showToast('bi bi-person-check', 'Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.', 'success');
  });
}

/* ── Tab switch links ────────────────────────────────── */
const goToRegisterLink = document.getElementById('goToRegister');
if (goToRegisterLink) {
  goToRegisterLink.addEventListener('click', function (e) {
    e.preventDefault();
    const tab = document.getElementById('register-tab');
    if (tab) new bootstrap.Tab(tab).show();
  });
}
const goToLoginLink = document.getElementById('goToLogin');
if (goToLoginLink) {
  goToLoginLink.addEventListener('click', function (e) {
    e.preventDefault();
    const tab = document.getElementById('login-tab');
    if (tab) new bootstrap.Tab(tab).show();
  });
}

/* ── Toggle password visibility ─────────────────────── */
const togglePwBtn = document.getElementById('togglePassword');
if (togglePwBtn) {
  togglePwBtn.addEventListener('click', function () {
    const pwInput = document.getElementById('loginPassword');
    const icon    = document.getElementById('eyeIcon');
    if (!pwInput || !icon) return;
    const isHidden = pwInput.type === 'password';
    pwInput.type   = isHidden ? 'text' : 'password';
    icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
    this.setAttribute('aria-label', isHidden ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
  });
}
const toggleRegPwBtn = document.getElementById('toggleRegPassword');
if (toggleRegPwBtn) {
  toggleRegPwBtn.addEventListener('click', function () {
    const pwInput = document.getElementById('regPassword');
    const icon    = document.getElementById('regEyeIcon');
    if (!pwInput || !icon) return;
    const isHidden = pwInput.type === 'password';
    pwInput.type   = isHidden ? 'text' : 'password';
    icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
    this.setAttribute('aria-label', isHidden ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
  });
}

/* ── Init auth chip on page load ─────────────────────── */
lab10UpdateAuthChip();

/* =============================================
   SCROLL-IN ANIMATION (Intersection Observer)
   ============================================= */
const staticFadeTargets = document.querySelectorAll(
  '.food-card, .review-card, .section-header, .combo-table'
);
staticFadeTargets.forEach(el => el.classList.add('fade-in'));

/* Shared observer for menu cards rendered dynamically */
let menuCardObserver;

if (typeof IntersectionObserver !== 'undefined') {
  const sharedObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sharedObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  menuCardObserver = sharedObserver;
  staticFadeTargets.forEach(el => sharedObserver.observe(el));
} else {
  staticFadeTargets.forEach(el => el.classList.add('visible'));
}

/* =============================================
   INIT: render all dynamic sections on load
   ============================================= */
renderFeatured();
renderMenuGrid();
renderComboTable();
