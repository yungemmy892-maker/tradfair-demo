(function() {
  "use strict";

  /* ===================== DATA ===================== */
  const WA_NUMBER = "2349027296389";

  const TIERS = [
    { min: 1, max: 5, label: "Retail", discount: 0 },
    { min: 6, max: 11, label: "Reseller", discount: 0.08 },
    { min: 12, max: Infinity, label: "Wholesale", discount: 0.15 }
  ];

  function getTier(qty) { return TIERS.find(t => qty >= t.min && qty <= t.max) || TIERS[0]; }

  function unitPriceForQty(base, qty) { const t = getTier(qty); return Math.round(base * (1 - t.discount) / 10) * 10; }

  function naira(n) { return "₦" + Math.round(n).toLocaleString("en-NG"); }

  const CATEGORIES = [
    { id: "men", name: "Men's Fragrances", icon: "men" },
    { id: "women", name: "Women's Fragrances", icon: "women" },
    { id: "unisex", name: "Unisex Fragrances", icon: "unisex" },
    { id: "oils", name: "Perfume Oils", icon: "oils" },
    { id: "sprays", name: "Body Sprays", icon: "sprays" },
    { id: "deals", name: "Wholesale Deals", icon: "deals" }
  ];

  const PRODUCTS = [{
    id: "oud-royale",
    image: "https://cdn.pixabay.com/photo/2017/03/08/13/26/attar-2126745_1280.jpg",
    name: "Oud Royale",
    category: "men",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Oud, Saffron, Amber",
    price: 45000,
    oldPrice: 55000,
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
    deal: true,
    shape: "tall",
    liquid: "#8B5A2B",
    cap: "#B08D4F",
    desc: "A bold, resinous oud layered with warm saffron and smoky amber. An assertive signature scent with excellent projection and lasting power — a consistent favourite with resellers."
  }, {
    id: "velvet-rose",
    image: "https://cdn.pixabay.com/photo/2017/10/03/12/07/bottle-2812214_1280.jpg",
    name: "Velvet Rose",
    category: "women",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Rose, Peony, Soft Musk",
    price: 28000,
    oldPrice: null,
    rating: 4.6,
    reviews: 89,
    badge: "",
    deal: false,
    shape: "flacon",
    liquid: "#C97B84",
    cap: "#B08D4F",
    desc: "A romantic bouquet of fresh rose and peony, softened with a gentle musk base. Elegant and wearable from day to evening."
  }, {
    id: "blue-ocean",
    image: "https://cdn.pixabay.com/photo/2019/09/13/07/31/bottle-4473322_1280.jpg",
    name: "Blue Ocean",
    category: "unisex",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Sea Breeze, Bergamot, Driftwood",
    price: 22000,
    oldPrice: 27000,
    rating: 4.7,
    reviews: 156,
    badge: "Sale",
    deal: true,
    shape: "tall",
    liquid: "#4E8FA6",
    cap: "#3A3A3A",
    desc: "A crisp aquatic fragrance with citrus top notes over a clean driftwood base. Fresh, versatile and easy to wear daily."
  }, {
    id: "amber-noir",
    image: "https://cdn.pixabay.com/photo/2017/04/18/14/35/perfume-2239285_1280.jpg",
    name: "Amber Noir",
    category: "men",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Amber, Tobacco, Dark Vanilla",
    price: 38500,
    oldPrice: null,
    rating: 4.9,
    reviews: 203,
    badge: "Bestseller",
    deal: false,
    shape: "angular",
    liquid: "#6B3F2A",
    cap: "#201B16",
    desc: "A rich, smoky amber deepened with tobacco leaf and dark vanilla. Confident and long-lasting — built for cooler evenings."
  }, {
    id: "musk-essence",
    image: "https://cdn.pixabay.com/photo/2017/06/08/22/15/essential-oils-2385072_1280.jpg",
    name: "Musk Essence",
    category: "oils",
    type: "Perfume Oil",
    size: "12ml",
    notes: "White Musk, Sandalwood",
    price: 15000,
    oldPrice: 18000,
    rating: 4.5,
    reviews: 67,
    badge: "",
    deal: true,
    shape: "dropper",
    liquid: "#B79572",
    cap: "#B08D4F",
    desc: "A concentrated, alcohol-free musk oil with soft sandalwood undertones. Long-wearing and skin-close — a favourite for reselling in small quantities."
  }, {
    id: "vanilla-elixir",
    image: "https://cdn.pixabay.com/photo/2017/03/14/11/36/perfume-2142792_1280.jpg",
    name: "Vanilla Elixir",
    category: "women",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Vanilla, Caramel, Tonka Bean",
    price: 32000,
    oldPrice: null,
    rating: 4.7,
    reviews: 45,
    badge: "New",
    deal: false,
    shape: "flacon",
    liquid: "#E8D5B5",
    cap: "#B08D4F",
    desc: "A warm gourmand blend of vanilla, caramel and tonka bean. Sweet without being heavy — a comforting everyday signature."
  }, {
    id: "royal-oud",
    image: "https://cdn.pixabay.com/photo/2017/08/02/23/40/perfume-2574073_1280.jpg",
    name: "Royal Oud",
    category: "men",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Rare Oud, Rose, Leather",
    price: 65000,
    oldPrice: null,
    rating: 4.9,
    reviews: 178,
    badge: "New",
    deal: false,
    shape: "tall",
    liquid: "#A67C27",
    cap: "#B08D4F",
    desc: "Our most premium oud blend, layered with rose and soft leather. Deep, opulent and unmistakably luxurious."
  }, {
    id: "intense-homme",
    image: "https://cdn.pixabay.com/photo/2016/01/31/13/30/perfumes-1171391_1280.jpg",
    name: "Intense Homme",
    category: "men",
    type: "Eau de Parfum",
    size: "100ml",
    notes: "Black Pepper, Vetiver, Oakmoss",
    price: 40000,
    oldPrice: null,
    rating: 4.6,
    reviews: 92,
    badge: "",
    deal: false,
    shape: "angular",
    liquid: "#2A2622",
    cap: "#201B16",
    desc: "A sharp, spiced opening of black pepper settling into earthy vetiver and oakmoss. Bold and distinctly masculine."
  }, {
    id: "citrus-burst",
    image: "https://cdn.pixabay.com/photo/2016/07/13/11/55/spray-1514264_1280.jpg",
    name: "Citrus Burst",
    category: "sprays",
    type: "Body Spray",
    size: "250ml",
    notes: "Lemon, Orange Zest, Mint",
    price: 8500,
    oldPrice: 10000,
    rating: 4.4,
    reviews: 51,
    badge: "",
    deal: true,
    shape: "spray",
    liquid: "#D98A3D",
    cap: "#EDEDED",
    desc: "A bright, energising citrus spray with a cooling hint of mint. Ideal for daily freshening and fast-moving retail shelves."
  }, {
    id: "sandal-mist",
    image: "https://cdn.pixabay.com/photo/2017/06/08/22/17/essential-oils-2385087_1280.jpg",
    name: "Sandal Mist",
    category: "oils",
    type: "Perfume Oil",
    size: "12ml",
    notes: "Sandalwood, Cedar, Amber",
    price: 12000,
    oldPrice: null,
    rating: 4.5,
    reviews: 38,
    badge: "",
    deal: false,
    shape: "dropper",
    liquid: "#8A8153",
    cap: "#B08D4F",
    desc: "A grounded woody oil blending sandalwood, cedar and warm amber. Subtle, long-lasting and easy to layer."
  }];

  const TESTIMONIALS = [{
    name: "Aisha B.",
    role: "Retailer · Lagos",
    initial: "A",
    quote: "I've been restocking my shop from Tradfair for a while now. The fragrances are consistent and my customers keep coming back for more."
  }, {
    name: "Chidi O.",
    role: "Reseller · Abuja",
    initial: "C",
    quote: "Ordering is straightforward — I message on WhatsApp, confirm quantities, and my order is sorted. The wholesale pricing makes a real difference to my margins."
  }, {
    name: "Funmi A.",
    role: "Personal Buyer · Ibadan",
    initial: "F",
    quote: "Good quality at a fair price. I bought Vanilla Elixir for myself and ended up ordering a few more bottles for friends."
  }];

  /* ===================== HELPERS ===================== */

  /* Returns a smaller Pixabay CDN rendition (e.g. _640) of a product's
     full-size (_1280) image, for lighter, faster-loading thumbnails
     on cards and in the cart. Falls back to the original URL if the
     pattern isn't recognised. */
  function imgSize(url, size) {
    if (!url) return url;
    return url.replace(/_1280\.(jpg|jpeg|png)$/i, '_' + size + '.$1');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function(ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function starIcon(filled) {
    return '<svg viewBox="0 0 24 24" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.3"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>';
  }

  function starRow(rating) {
    let out = '<span class="stars">';
    for (let i = 1; i <= 5; i++) { out += starIcon(i <= Math.round(rating)); }
    return out + '</span>';
  }

  function categoryIcon(icon) {
    const icons = {
      men: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="9" width="8" height="13" rx="2"/><path d="M10 9V6a2 2 0 0 1 4 0v3"/></svg>',
      women: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M12 12v9M8 17h8"/></svg>',
      unisex: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10" cy="9" r="4"/><path d="M16 4l4 4m0-4l-4 4M10 13v8M7 18h6"/></svg>',
      oils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v6M9 9h6l2 4a5 5 0 1 1-10 0z"/></svg>',
      sprays: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="9" width="8" height="12" rx="3"/><path d="M11 9V6h2v3M14 5l2-1M15 7l2.5-.5M14 9.5l2.5 1"/></svg>',
      deals: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20.6 12.6L12 21.2 2.8 12 3 3l9-.2z"/><circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none"/></svg>'
    };
    return icons[icon] || icons.unisex;
  }

  /* ===================== STATE ===================== */
  let cart = []; // {id, size, qty}
  let activeFilter = "all";

  /* ===================== RENDER: CATEGORIES ===================== */
  function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = CATEGORIES.map(function(c) {
      const count = c.id === "deals" ? PRODUCTS.filter(p => p.deal).length : PRODUCTS.filter(p => p.category === c.id).length;
      return '<div class="cat-card reveal" data-cat="' + c.id + '" tabindex="0" role="button" aria-label="Shop ' + c.name + '">' +
        '<div class="cat-bg" style="background:linear-gradient(150deg,' + catTint(c.id) + ');position:absolute;inset:0;"></div>' +
        '<div class="cat-overlay"></div>' +
        '<div class="cat-icon">' + categoryIcon(c.icon) + '</div>' +
        '<div class="cat-info"><div><h3>' + c.name + '</h3><small>' + count + ' product' + (count === 1 ? '' : 's') + '</small></div><div class="cat-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div></div>' +
        '</div>';
    }).join("");
    grid.querySelectorAll(".cat-card").forEach(function(card) {
      card.addEventListener("click", function() {
        setFilter(card.dataset.cat);
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
      });
      card.addEventListener("keypress", function(e) { if (e.key === "Enter") card.click(); });
    });
  }

  function catTint(id) {
    const tints = {
      men: "#2A2622,#4A3A28",
      women: "#3A2630,#5A3C48",
      unisex: "#243238,#3C555E",
      oils: "#3A2F1E,#5C4A28",
      sprays: "#2E3A2C,#48604A",
      deals: "#3A2A18,#8C6B34"
    };
    return tints[id] || tints.unisex;
  }

  /* ===================== RENDER: FILTERS ===================== */
  function renderFilters() {
    const bar = document.getElementById("filterBar");
    const all = [{ id: "all", name: "All" }].concat(CATEGORIES);
    bar.innerHTML = all.map(function(c) {
      return '<button class="filter-btn' + (c.id === activeFilter ? ' active' : '') + '" data-filter="' + c.id + '">' + c.name + '</button>';
    }).join("");
    bar.querySelectorAll(".filter-btn").forEach(function(btn) {
      btn.addEventListener("click", function() { setFilter(btn.dataset.filter); });
    });
  }

  function setFilter(id) {
    activeFilter = id;
    renderFilters();
    renderProducts();
  }

  /* ===================== RENDER: PRODUCTS ===================== */
  function renderProducts() {
    const grid = document.getElementById("productGrid");
    const list = PRODUCTS.filter(function(p) {
      if (activeFilter === "all") return true;
      if (activeFilter === "deals") return !!p.deal;
      return p.category === activeFilter;
    });
    grid.innerHTML = list.map(productCard).join("");
    grid.querySelectorAll(".product-card").forEach(function(card) {
      const id = card.dataset.id;
      card.querySelector(".pc-quick-btn").addEventListener("click", function(e) { e.stopPropagation();
        openModal(id); });
      card.querySelector(".pc-add-btn").addEventListener("click", function(e) { e.stopPropagation();
        addToCart(id, PRODUCTS.find(p => p.id === id).size, 1); });
      card.querySelector(".pc-visual").addEventListener("click", function() { openModal(id); });
      card.querySelector(".pc-name").addEventListener("click", function() { openModal(id); });
    });
    observeReveals();
  }

  function productCard(p) {
    const badges = [];
    if (p.badge === "Bestseller") badges.push('<span class="pc-badge bestseller">Bestseller</span>');
    if (p.badge === "New") badges.push('<span class="pc-badge new">New</span>');
    if (p.oldPrice) {
      const pct = Math.round((1 - p.price / p.oldPrice) * 100);
      badges.push('<span class="pc-badge sale">-' + pct + '%</span>');
    }
    return '<div class="product-card reveal" data-id="' + p.id + '">' +
      '<div class="pc-visual" style="cursor:pointer;">' +
      '<div class="pc-badges">' + badges.join("") + '</div>' +
      '<img class="pc-img" src="' + imgSize(p.image, 640) + '" alt="' + escapeHtml(p.name) + ' — ' + escapeHtml(p.type) + '" loading="lazy" decoding="async" width="640" height="640">' +
      '<div class="pc-quick"><button class="pc-quick-btn">Quick View</button></div>' +
      '</div>' +
      '<div class="pc-body">' +
      '<span class="pc-cat">' + p.type + '</span>' +
      '<h3 class="pc-name" style="cursor:pointer;">' + p.name + '</h3>' +
      '<span class="pc-notes">' + p.notes + '</span>' +
      '<div class="pc-rating">' + starRow(p.rating) + ' <span>' + p.rating.toFixed(1) + ' (' + p.reviews + ')</span></div>' +
      '<div class="pc-price-row"><span class="pc-price">' + naira(p.price) + '</span>' + (p.oldPrice ? '<span class="pc-old-price">' + naira(p.oldPrice) + '</span>' : '') + '</div>' +
      '<span class="pc-size">' + p.size + ' · ' + categoryName(p.category) + '</span>' +
      '<div class="pc-actions">' +
      '<button class="btn btn-primary pc-add-btn">Add to Cart</button>' +
      '<a href="#" class="btn btn-outline pc-wa-btn" target="_blank" rel="noopener">WhatsApp</a>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function categoryName(id) { const c = CATEGORIES.find(x => x.id === id); return c ? c.name : ""; }

  /* attach WA links after render (needs event delegation since innerHTML rebuilt) */
  document.addEventListener("click", function(e) {
    const waBtn = e.target.closest(".pc-wa-btn");
    if (waBtn) {
      e.preventDefault();
      const card = e.target.closest(".product-card");
      const p = PRODUCTS.find(x => x.id === card.dataset.id);
      openWhatsApp("Hello Tradfair, I'd like to order 1 x " + p.name + " (" + p.size + ").");
    }
  });

  /* ===================== WHATSAPP ===================== */
  function openWhatsApp(message) {
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  }

  function setStaticWaLinks() {
    const generic = "Hello Tradfair, I'd like to place an order.";
    ["navWaBtn"].forEach(function(id) {
      const el = document.getElementById(id);
      if (el) { el.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(generic); }
    });
    document.querySelectorAll(".hero-wa-btn, .mm-wa-btn").forEach(function(el) {
      el.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(generic);
    });
    const floatWa = document.getElementById("floatingWa");
    floatWa.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(generic);
    const footerWa = document.getElementById("footerWaBtn");
    footerWa.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(generic);
    const wholesaleCta = document.getElementById("wholesaleCta");
    wholesaleCta.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello Tradfair, I'd like to register as a wholesale customer.");
  }

  /* ===================== CART ===================== */
  function addToCart(id, size, qty) {
    const existing = cart.find(function(c) { return c.id === id && c.size === size; });
    if (existing) { existing.qty += qty; } else { cart.push({ id: id, size: size, qty: qty }); }
    renderCart();
    openCart();
  }

  function removeFromCart(id, size) {
    cart = cart.filter(function(c) { return !(c.id === id && c.size === size); });
    renderCart();
  }

  function changeCartQty(id, size, delta) {
    const item = cart.find(function(c) { return c.id === id && c.size === size; });
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    renderCart();
  }

  function cartTotals() {
    let subtotal = 0,
      retailTotal = 0;
    cart.forEach(function(c) {
      const p = PRODUCTS.find(x => x.id === c.id);
      const unit = unitPriceForQty(p.price, c.qty);
      subtotal += unit * c.qty;
      retailTotal += p.price * c.qty;
    });
    return { subtotal: subtotal, savings: retailTotal - subtotal };
  }

  function renderCart() {
    const count = cart.reduce(function(a, c) { return a + c.qty; }, 0);
    document.getElementById("cartCount").textContent = count;
    const itemsEl = document.getElementById("cartItems");
    const footEl = document.getElementById("cartFoot");
    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 6h2l1.6 10.6A2 2 0 0 0 9.6 18h8.2a2 2 0 0 0 2-1.7L21 8H6"/></svg><p>Your cart is empty.<br>Add a fragrance to get started.</p></div>';
      footEl.innerHTML = '';
      return;
    }
    itemsEl.innerHTML = cart.map(function(c) {
      const p = PRODUCTS.find(x => x.id === c.id);
      const tier = getTier(c.qty);
      const unit = unitPriceForQty(p.price, c.qty);
      return '<div class="cart-item">' +
        '<div class="ci-thumb"><img src="' + imgSize(p.image, 640) + '" alt="' + escapeHtml(p.name) + '" loading="lazy" decoding="async" width="64" height="64"></div>' +
        '<div class="ci-body">' +
        '<div class="ci-name">' + p.name + '</div>' +
        '<div class="ci-size">' + c.size + '</div>' +
        (tier.discount > 0 ? '<div class="ci-tier-tag">' + tier.label + ' rate applied</div>' : '') +
        '<div class="ci-row">' +
        '<div class="ci-qty"><button data-act="minus" data-id="' + c.id + '" data-size="' + c.size + '">−</button><span>' + c.qty + '</span><button data-act="plus" data-id="' + c.id + '" data-size="' + c.size + '">+</button></div>' +
        '<span class="ci-price">' + naira(unit * c.qty) + '</span>' +
        '</div>' +
        '<div class="ci-remove" data-act="remove" data-id="' + c.id + '" data-size="' + c.size + '">Remove</div>' +
        '</div>' +
        '</div>';
    }).join("");
    const totals = cartTotals();
    footEl.innerHTML = '<div class="cart-sub-row"><span>Subtotal</span><span>' + naira(totals.subtotal) + '</span></div>' +
      (totals.savings > 0 ? '<div class="cart-sub-row save"><span>Wholesale savings</span><span>−' + naira(totals.savings) + '</span></div>' : '') +
      '<div class="cart-sub-row total"><span>Estimated Total</span><span>' + naira(totals.subtotal) + '</span></div>' +
      '<button class="btn btn-wa btn-block" id="checkoutWaBtn">Checkout via WhatsApp</button>';
    document.getElementById("checkoutWaBtn").addEventListener("click", function() {
      let msg = "Hello Tradfair, I'd like to order:\n";
      cart.forEach(function(c) {
        const p = PRODUCTS.find(x => x.id === c.id);
        msg += "- " + c.qty + " x " + p.name + " (" + c.size + ")\n";
      });
      msg += "Estimated total: " + naira(cartTotals().subtotal);
      openWhatsApp(msg);
    });
  }

  document.getElementById("cartItems").addEventListener("click", function(e) {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act,
      id = btn.dataset.id,
      size = btn.dataset.size;
    if (act === "plus") changeCartQty(id, size, 1);
    if (act === "minus") changeCartQty(id, size, -1);
    if (act === "remove") removeFromCart(id, size);
  });

  function openCart() { document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open"); }

  function closeCart() { document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("open"); }
  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  /* ===================== PRODUCT MODAL ===================== */
  let modalState = { id: null, qty: 1, size: null };

  function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    modalState = { id: id, qty: 1, size: p.size };
    document.getElementById("modalVisual").innerHTML = '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + ' — ' + escapeHtml(p.type) + '" decoding="async" width="1280" height="1280">';
    renderModalInfo(p);
    document.getElementById("modalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderModalInfo(p) {
    const tier = getTier(modalState.qty);
    const unit = unitPriceForQty(p.price, modalState.qty);
    const sizes = p.size === "100ml" ? ["50ml", "100ml"] : (p.size === "12ml" ? ["6ml", "12ml"] : ["150ml", "250ml"]);
    document.getElementById("modalInfo").innerHTML =
      '<span class="pc-cat">' + p.type + '</span>' +
      '<h2>' + p.name + '</h2>' +
      '<div class="modal-notes">' + p.notes + '</div>' +
      '<div class="modal-rating">' + starRow(p.rating) + ' <span>' + p.rating.toFixed(1) + ' · ' + p.reviews + ' reviews</span></div>' +
      '<p class="modal-desc">' + p.desc + '</p>' +
      '<div class="modal-size-row" id="modalSizeRow">' + sizes.map(function(s) {
        return '<button class="size-pill' + (s === modalState.size ? ' active' : '') + '" data-size="' + s + '">' + s + '</button>';
      }).join("") + '</div>' +
      '<div class="modal-price-block"><span class="modal-price" id="modalPrice">' + naira(unit) + '</span>' + (p.oldPrice ? '<span class="modal-old-price">' + naira(p.oldPrice) + '</span>' : '') + '</div>' +
      '<div class="modal-qty-row">' +
      '<span class="qty-label">Quantity</span>' +
      '<div class="qty-stepper"><button id="modalMinus">−</button><span id="modalQty">' + modalState.qty + '</span><button id="modalPlus">+</button></div>' +
      '</div>' +
      '<div class="modal-tier-note" id="modalTierNote">' + (tier.discount > 0 ? tier.label + " pricing applied — you save " + naira((p.price - unit) * modalState.qty) + " on this order." : "Order 6+ to unlock reseller pricing.") + '</div>' +
      '<div class="modal-actions">' +
      '<button class="btn btn-primary" id="modalAddBtn">Add to Cart</button>' +
      '<button class="btn btn-wa" id="modalWaBtn">Order via WhatsApp</button>' +
      '</div>';

    document.querySelectorAll("#modalSizeRow .size-pill").forEach(function(btn) {
      btn.addEventListener("click", function() { modalState.size = btn.dataset.size;
        renderModalInfo(p); });
    });
    document.getElementById("modalMinus").addEventListener("click", function() { modalState.qty = Math.max(1, modalState.qty - 1);
      renderModalInfo(p); });
    document.getElementById("modalPlus").addEventListener("click", function() { modalState.qty += 1;
      renderModalInfo(p); });
    document.getElementById("modalAddBtn").addEventListener("click", function() { addToCart(p.id, modalState.size, modalState.qty);
      closeModal(); });
    document.getElementById("modalWaBtn").addEventListener("click", function() {
      openWhatsApp("Hello Tradfair, I'd like to order " + modalState.qty + " x " + p.name + " (" + modalState.size + ").");
    });
  }

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", function(e) { if (e.target.id === "modalOverlay") closeModal(); });
  document.addEventListener("keydown", function(e) { if (e.key === "Escape") { closeModal();
      closeCart();
      closeSearch();
      closeMobileMenu(); } });

  /* ===================== WHOLESALE CALCULATOR ===================== */
  const CALC_PRODUCT = PRODUCTS.find(p => p.id === "oud-royale");
  let calcQty = 1;

  function renderCalc() {
    const tier = getTier(calcQty);
    const unit = unitPriceForQty(CALC_PRODUCT.price, calcQty);
    const total = unit * calcQty;
    const retailTotal = CALC_PRODUCT.price * calcQty;
    document.getElementById("calcQty").textContent = calcQty;
    document.getElementById("calcTierBadge").textContent = tier.label;
    document.getElementById("calcUnit").textContent = naira(unit);
    document.getElementById("calcQtyLine").textContent = calcQty + " bottle" + (calcQty === 1 ? "" : "s");
    document.getElementById("calcTotal").textContent = naira(total);
    document.getElementById("calcSave").textContent = tier.discount > 0 ? "You save " + naira(retailTotal - total) + " vs. single-unit retail price." : "";
  }

  document.getElementById("calcMinus").addEventListener("click", function() { calcQty = Math.max(1, calcQty - 1);
    renderCalc(); });
  document.getElementById("calcPlus").addEventListener("click", function() { calcQty = Math.min(200, calcQty + 1);
    renderCalc(); });

  /* ===================== TESTIMONIALS ===================== */
  function renderTestimonials() {
    document.getElementById("testiGrid").innerHTML = TESTIMONIALS.map(function(t) {
      return '<div class="testi-card reveal">' +
        '<div class="testi-stars">' + starRow(5) + '</div>' +
        '<p class="quote">"' + t.quote + '"</p>' +
        '<div class="testi-person"><div class="testi-avatar">' + t.initial + '</div><div><strong>' + t.name + '</strong><small>' + t.role + '</small></div></div>' +
        '</div>';
    }).join("");
  }

  /* ===================== FOOTER CATEGORY LIST ===================== */
  function renderFooterCats() {
    document.getElementById("footerCatList").innerHTML = CATEGORIES.map(function(c) {
      return '<li><a href="#shop" data-cat="' + c.id + '">' + c.name + '</a></li>';
    }).join("");
    document.querySelectorAll("#footerCatList a").forEach(function(a) {
      a.addEventListener("click", function() { setFilter(a.dataset.cat); });
    });
  }

  /* ===================== MARQUEE ===================== */
  function renderMarquee() {
    const notes = ["OUD", "ROSE", "AMBER", "MUSK", "VANILLA", "CITRUS", "SANDALWOOD", "JASMINE", "BERGAMOT", "LEATHER"];
    const html = notes.map(function(n) { return "<span>" + n + "</span>"; }).join("<span>·</span>");
    document.getElementById("marqueeTrack").innerHTML = html + html;
  }

  /* ===================== HERO BOTTLE ===================== */
  function renderHero() {
    const hero = PRODUCTS.find(p => p.id === "oud-royale");
    document.getElementById("heroBottleWrap").innerHTML =
      '<img src="' + hero.image + '" alt="Oud Royale, the signature Tradfair oud fragrance" decoding="async" fetchpriority="high" width="1280" height="1280">';
  }


  /* ===================== SEARCH ===================== */
  function openSearch() {
    document.getElementById("searchOverlay").classList.add("open");
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
    setTimeout(function() { document.getElementById("searchInput").focus(); }, 150);
  }

  function closeSearch() { document.getElementById("searchOverlay").classList.remove("open"); }
  document.getElementById("searchToggle").addEventListener("click", openSearch);
  document.getElementById("searchClose").addEventListener("click", closeSearch);
  document.getElementById("searchInput").addEventListener("input", function(e) {
    const q = e.target.value.trim().toLowerCase();
    const resultsEl = document.getElementById("searchResults");
    if (!q) { resultsEl.innerHTML = ""; return; }
    const matches = PRODUCTS.filter(function(p) {
      return p.name.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q) || p.category.includes(q);
    });
    if (matches.length === 0) { resultsEl.innerHTML = '<div class="search-empty">No fragrances found for "' + q + '"</div>'; return; }
    resultsEl.innerHTML = matches.map(function(p) {
      return '<div class="search-result" data-id="' + p.id + '"><span class="sr-name">' + p.name + '</span><span class="sr-price">' + naira(p.price) + '</span></div>';
    }).join("");
    resultsEl.querySelectorAll(".search-result").forEach(function(r) {
      r.addEventListener("click", function() { closeSearch();
        openModal(r.dataset.id); });
    });
  });

  /* ===================== MOBILE MENU ===================== */
  function openMobileMenu() {
    document.getElementById("mobileMenu").classList.add("open");
    document.getElementById("mmOverlay").classList.add("open");
    document.getElementById("hamburgerBtn").classList.add("active");
  }

  function closeMobileMenu() {
    document.getElementById("mobileMenu").classList.remove("open");
    document.getElementById("mmOverlay").classList.remove("open");
    document.getElementById("hamburgerBtn").classList.remove("active");
  }

  document.getElementById("hamburgerBtn").addEventListener("click", function() {
    document.getElementById("mobileMenu").classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  });
  document.getElementById("mmClose").addEventListener("click", closeMobileMenu);
  document.getElementById("mmOverlay").addEventListener("click", closeMobileMenu);
  document.querySelectorAll(".mm-link").forEach(function(a) { a.addEventListener("click", closeMobileMenu); });

  /* ===================== NEWSLETTER ===================== */
  document.getElementById("newsForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("newsEmail").value;
    document.getElementById("newsMsg").textContent = "Thanks — " + email + " is on the list.";
    document.getElementById("newsEmail").value = "";
  });

  /* ===================== NAV SCROLL STATE ===================== */
  function onScroll() {
    const nav = document.getElementById("siteNav");
    if (window.scrollY > 40) nav.classList.add("solid");
    else nav.classList.remove("solid");
  }
  window.addEventListener("scroll", onScroll);

  /* ===================== SCROLL REVEAL ===================== */
  let observer;

  function observeReveals() {
    if (!observer) {
      observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) { entry.target.classList.add("in-view");
            observer.unobserve(entry.target); }
        });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll(".reveal:not(.in-view)").forEach(function(el) { observer.observe(el); });
  }

  /* ===================== INIT ===================== */
  function init() {
    document.getElementById("copyrightYear").textContent = "© " + new Date().getFullYear() + " Tradfair Perfume Wholesale. All rights reserved.";
    renderHero();
    renderMarquee();
    renderCategories();
    renderFilters();
    renderProducts();
    renderCart();
    renderTestimonials();
    renderFooterCats();
    renderCalc();
    setStaticWaLinks();
    observeReveals();
    onScroll();
  }
  document.addEventListener("DOMContentLoaded", init);
})();