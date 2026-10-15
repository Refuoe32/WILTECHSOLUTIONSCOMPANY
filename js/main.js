/* ============================================================
   WilTec Solutions - main script
   Change the CONFIG block below to update contact details.
   ============================================================ */
const CONFIG = {
  name: "WilTec Solutions",
  tagline: "Mokhotlong",
  phoneDisplay: "+266 5173 3235",
  phoneTel: "+26651733235",       // used for tel: links
  whatsapp: "26651733235",        // international format, no + or spaces
  location: "Mokhotlong, Lesotho",
  hours: ["Mon – Fri: 08:00 – 17:00", "Sat: 09:00 – 13:00 (by appointment)"],
  currency: "M",
  delivery: 0
};

const SERVICES = [
  {icon:"💻", title:"Computer & Laptop Repairs", short:"Hardware and software troubleshooting, upgrades and maintenance.",
   items:["Diagnose and fix hardware/software issues","Screen, keyboard and battery replacement","Performance upgrades (SSD, RAM)","Virus and malware removal"]},
  {icon:"🪟", title:"OS Installation & Configuration", short:"Windows, Linux and other operating systems installed properly.",
   items:["Windows (all versions)","Linux (Ubuntu, etc.)","macOS (basic support)","Driver installation and system setup"]},
  {icon:"🌐", title:"Networking Solutions", short:"LAN, Wi-Fi, router setup, firewall and network troubleshooting.",
   items:["LAN and Wi-Fi setup","Router and modem configuration","Firewall and security setup","Network troubleshooting"]},
  {icon:"🗄️", title:"Data Backup & Recovery", short:"Protect your valuable data and recover lost files.",
   items:["Backup of important files and systems","Recover lost or deleted data","Cloud backup solutions","External drive setup"]},
  {icon:"⚙️", title:"Software Installation", short:"Office, drivers, antivirus and business applications.",
   items:["Microsoft Office and productivity tools","Antivirus and security software","Business applications","Custom software setup"]},
  {icon:"🧑‍💻", title:"Web & App Development", short:"Custom websites, web apps and business systems.",
   items:["Business websites and online shops","Web applications","Desktop and mobile applications","System integration"]},
  {icon:"🛠️", title:"IT Consulting & Support", short:"Expert advice and ongoing technical support for your business.",
   items:["Network design and setup","IT infrastructure planning","Security assessment","Ongoing technical support"]},
  {icon:"🔧", title:"Maintenance & Monitoring", short:"Keep your systems healthy with regular checks and updates.",
   items:["Regular system checks","Performance optimisation","Security updates","Remote monitoring"]},
  {icon:"☁️", title:"Cloud Services", short:"Cloud storage, email and remote access set up for you.",
   items:["Cloud storage setup","Email configuration","Remote access solutions","Migration support"]},
  {icon:"📹", title:"CCTV & Security Systems", short:"Camera installation to keep your home and business safe.",
   items:["CCTV camera installation","DVR/NVR setup","Remote phone viewing","Maintenance and repairs"]},
  {icon:"🖨️", title:"Printer & Office Equipment", short:"Printer installation, sharing and troubleshooting.",
   items:["Printer setup and drivers","Network printer sharing","Troubleshooting and servicing","Toner and consumables supply"]},
  {icon:"🎓", title:"IT Training", short:"Practical computer skills for individuals and staff.",
   items:["Computer basics","Microsoft Office training","Internet and email safety","Custom staff training"]}
];

const SERVICE_IMAGES = {"Computer & Laptop Repairs": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80", "OS Installation & Configuration": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80", "Networking Solutions": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80", "Data Backup & Recovery": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80", "Software Installation": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", "Web & App Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", "IT Consulting & Support": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80", "Maintenance & Monitoring": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80", "Cloud Services": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80", "CCTV & Security Systems": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80", "Printer & Office Equipment": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80", "IT Training": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => CONFIG.currency + " " + Number(n).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2});
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- Cart (saved in the visitor's browser) ---------- */
const Cart = {
  get(){ try{ return JSON.parse(localStorage.getItem("wiltec_cart")) || []; }catch(e){ return []; } },
  save(c){ try{ localStorage.setItem("wiltec_cart", JSON.stringify(c)); }catch(e){} updateCount(); },
  add(id){
    const c = this.get(); const f = c.find(i => i.id === id);
    f ? f.qty++ : c.push({id, qty: 1});
    this.save(c);
  },
  setQty(id, q){
    let c = this.get();
    c = q <= 0 ? c.filter(i => i.id !== id) : c.map(i => i.id === id ? {...i, qty: q} : i);
    this.save(c);
  },
  clear(){ this.save([]); },
  lines(){
    return this.get().map(i => ({...PRODUCTS.find(p => p.id === i.id), qty: i.qty})).filter(l => l.name);
  },
  total(){ return this.lines().reduce((s, l) => s + l.price * l.qty, 0); },
  count(){ return this.get().reduce((s, i) => s + i.qty, 0); }
};
function updateCount(){ $$(".cart-count").forEach(e => { const n = Cart.count(); e.textContent = n; e.style.display = n ? "flex" : "none"; }); }

function toast(msg){
  let t = $(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Shared layout ---------- */
const MARK = `<img src="assets/logo-mark.png" alt="" class="brand-mark">`;

function buildLayout(){
  const page = document.body.dataset.page;
  const nav = [["index.html","Home","home"],["services.html","Services","services"],["shop.html","Shop","shop"],["about.html","About","about"],["contact.html","Contact","contact"]];
  const h = $("#site-header");
  if(h) h.innerHTML = `
  <div class="topbar"><div class="container">
    <span>${CONFIG.location}</span>
    <span><a href="tel:${CONFIG.phoneTel}">${CONFIG.phoneDisplay}</a> &nbsp;|&nbsp; <a href="${waLink("Hello WilTec Solutions, I need help.")}" target="_blank" rel="noopener">WhatsApp us</a></span>
  </div></div>
  <header class="site"><div class="container nav">
    <a class="brand" href="index.html" aria-label="${CONFIG.name} home">${MARK}<div><b>WIL<span>TEC</span></b><small>Solutions · ${CONFIG.tagline}</small></div></a>
    <ul class="menu" id="menu">${nav.map(n => `<li><a href="${n[0]}" class="${page === n[2] ? "active" : ""}">${n[1]}</a></li>`).join("")}</ul>
    <div class="nav-actions">
      <a class="cart-link" href="cart.html" aria-label="Cart">Cart<span class="cart-count" style="display:none">0</span></a>
      <a class="btn btn-primary btn-sm" href="contact.html#quote">Get a Quote</a>
      <button class="burger" id="burger" aria-label="Menu">☰</button>
    </div>
  </div></header>`;

  const f = $("#site-footer");
  if(f) f.innerHTML = `
  <footer class="site"><div class="container">
    <div class="foot">
      <div><a class="brand" href="index.html">${MARK}<div><b>WIL<span>TEC</span></b><small>Solutions · ${CONFIG.tagline}</small></div></a>
        <p>Professional IT services, computer repairs, networking and digital solutions for individuals and businesses.</p></div>
      <div><h4>Company</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="services.html">Services</a></li><li><a href="contact.html">Contact</a></li></ul></div>
      <div><h4>Shop</h4><ul><li><a href="shop.html">All products</a></li><li><a href="cart.html">My cart</a></li><li><a href="contact.html#quote">Request a quote</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li>${CONFIG.location}</li>
        <li><a href="tel:${CONFIG.phoneTel}">${CONFIG.phoneDisplay}</a></li>
        <li><a href="${waLink("Hello WilTec Solutions, I need help.")}" target="_blank" rel="noopener">WhatsApp chat</a></li>
        <li>${CONFIG.hours[0]}</li></ul></div>
    </div>
    <div class="copy"><span>© ${new Date().getFullYear()} ${CONFIG.name}. All rights reserved.</span><span>Certified Engineer &amp; IT Specialist</span></div>
  </div></footer>
  <div class="wa-float">
    <a class="w" href="${waLink("Hello WilTec Solutions, I need help.")}" target="_blank" rel="noopener"><span>WhatsApp</span></a>
    <a class="c" href="tel:${CONFIG.phoneTel}"><span>Call now</span></a>
  </div>`;

  const b = $("#burger"); if(b) b.onclick = () => $("#menu").classList.toggle("open");
  updateCount();
}

/* ---------- Home / services ---------- */
function renderServices(){
  const home = $("#homeServices");
  if(home) home.innerHTML = SERVICES.slice(0, 6).map(s => `
    <div class="card service-card"><img class="card-photo" src="${SERVICE_IMAGES[s.title]}" alt="${s.title}" loading="lazy"><div class="card-body"><h3>${s.title}</h3><p>${s.short}</p></div></div>`).join("");
  const all = $("#allServices");
  if(all) all.innerHTML = SERVICES.map(s => `
    <div class="card service-card"><img class="card-photo" src="${SERVICE_IMAGES[s.title]}" alt="${s.title}" loading="lazy"><div class="card-body"><h3>${s.title}</h3>
      <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
      <a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${waLink("Hello WilTec Solutions, I would like a quote for: " + s.title)}">Request this service</a></div></div>`).join("");
}

/* ---------- Shop ---------- */
function renderShop(){
  const grid = $("#productGrid"); if(!grid) return;
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.cat))];
  let cat = "All";
  const chips = $("#chips");
  chips.innerHTML = cats.map(c => `<button class="chip ${c === "All" ? "on" : ""}" data-c="${c}">${c}</button>`).join("");
  const draw = () => {
    const q = $("#search").value.trim().toLowerCase();
    const sort = $("#sort").value;
    let list = PRODUCTS.filter(p => (cat === "All" || p.cat === cat) && (p.name + " " + p.desc + " " + p.cat).toLowerCase().includes(q));
    if(sort === "low") list.sort((a, b) => a.price - b.price);
    if(sort === "high") list.sort((a, b) => b.price - a.price);
    if(sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.length ? list.map(p => `
      <div class="card product"><div class="thumb"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80';"></div>
        <span class="cat">${p.cat}</span><h3>${esc(p.name)}</h3><p class="desc">${esc(p.desc)}</p>
        <div class="row"><span class="price">${money(p.price)}</span><button class="btn btn-primary btn-sm" data-add="${p.id}">Add to cart</button></div>
      </div>`).join("") : `<div class="empty" style="grid-column:1/-1">No products match your search. <a href="${waLink("Hello WilTec Solutions, I am looking for a product that is not listed.")}" target="_blank" rel="noopener" style="text-decoration:underline">Ask us on WhatsApp</a>.</div>`;
  };
  chips.onclick = e => { const b = e.target.closest(".chip"); if(!b) return; cat = b.dataset.c; $$(".chip").forEach(x => x.classList.toggle("on", x === b)); draw(); };
  $("#search").oninput = draw; $("#sort").onchange = draw;
  grid.onclick = e => { const b = e.target.closest("[data-add]"); if(!b) return; Cart.add(b.dataset.add); toast("Added to cart ✓"); };
  draw();
}

/* ---------- Cart page + WhatsApp checkout ---------- */
function renderCart(){
  const box = $("#cartItems"); if(!box) return;
  const draw = () => {
    const lines = Cart.lines();
    $("#checkoutCard").style.display = lines.length ? "block" : "none";
    if(!lines.length){
      box.innerHTML = `<div class="empty">Your cart is empty.<br><br><a class="btn btn-primary" href="shop.html">Browse the shop</a></div>`;
    } else {
      box.innerHTML = lines.map(l => `
        <div class="cart-item"><div class="t"><img src="${l.image}" alt="${esc(l.name)}" loading="lazy"></div>
          <div><b>${esc(l.name)}</b><div class="muted" style="font-size:.85rem">${money(l.price)} each</div>
            <div class="qty"><button data-dec="${l.id}">−</button><span>${l.qty}</span><button data-inc="${l.id}">+</button></div></div>
          <div style="text-align:right"><b>${money(l.price * l.qty)}</b><button class="rm" data-rm="${l.id}">Remove</button></div>
        </div>`).join("");
    }
    const sub = Cart.total();
    $("#sub").textContent = money(sub);
    $("#tot").textContent = money(sub + (lines.length ? CONFIG.delivery : 0));
  };
  box.onclick = e => {
    const t = e.target, q = id => (Cart.get().find(i => i.id === id) || {}).qty || 0;
    if(t.dataset.inc) Cart.setQty(t.dataset.inc, q(t.dataset.inc) + 1);
    if(t.dataset.dec) Cart.setQty(t.dataset.dec, q(t.dataset.dec) - 1);
    if(t.dataset.rm) Cart.setQty(t.dataset.rm, 0);
    draw();
  };
  $("#clearCart").onclick = () => { Cart.clear(); draw(); };
  $("#delivery").onchange = e => { $("#addrField").style.display = e.target.value === "Delivery" ? "block" : "none"; };
  $("#checkoutForm").onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target), lines = Cart.lines();
    if(!lines.length) return;
    let msg = `*NEW ORDER - ${CONFIG.name}*\n\n`;
    lines.forEach((l, i) => msg += `${i + 1}. ${l.name} x${l.qty} = ${money(l.price * l.qty)}\n`);
    msg += `\n*Total: ${money(Cart.total() + CONFIG.delivery)}*\n\n`;
    msg += `Name: ${f.get("name")}\nPhone: ${f.get("phone")}\nReceive by: ${f.get("delivery")}\n`;
    if(f.get("delivery") === "Delivery") msg += `Address: ${f.get("address")}\n`;
    msg += `Payment: ${f.get("payment")}\n`;
    if(f.get("notes")) msg += `Notes: ${f.get("notes")}\n`;
    window.open(waLink(msg), "_blank");
    toast("Opening WhatsApp to send your order…");
  };
  draw();
}

/* ---------- Contact / quote forms -> WhatsApp ---------- */
function setupForms(){
  const cf = $("#contactForm");
  if(cf) cf.onsubmit = e => {
    e.preventDefault();
    const f = new FormData(cf);
    const msg = `*New enquiry - ${CONFIG.name}*\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nSubject: ${f.get("subject")}\n\n${f.get("message")}`;
    window.open(waLink(msg), "_blank");
    toast("Opening WhatsApp…");
  };
  const sel = $("#subject");
  if(sel) sel.innerHTML = `<option value="">Select a subject</option>` + SERVICES.map(s => `<option>${s.title}</option>`).join("") + `<option>Buy a product</option><option>Other</option>`;
  if(location.hash === "#quote" && sel){ sel.value = "Other"; const m = $("#message"); if(m) m.placeholder = "Tell us what you need a quote for…"; }
}

document.addEventListener("DOMContentLoaded", () => { buildLayout(); renderServices(); renderShop(); renderCart(); setupForms(); });
