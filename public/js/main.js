/*
 * Shared shell: utilities, icons, badges, charts, sidebar/topbar, table helpers,
 * session guard, mobile navigation drawer and delegated row navigation.
 * Loaded by every page in pages/.
 */
// ===== Small utilities =====
function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function pct(n) { return (n === null || n === undefined) ? "—" : n + "%"; }
function fmt(n) { return (n === null || n === undefined) ? "—" : n; }

// ===== Icons (18x18 stroke icons) =====
const ICONS = {
  grid: '<svg viewBox="0 0 18 18"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/></svg>',
  video: '<svg viewBox="0 0 18 18"><rect x="2" y="5" width="9" height="8" rx="1"/><path d="M11 8l5-3v8l-5-3z"/></svg>',
  book: '<svg viewBox="0 0 18 18"><path d="M3 3h6a2 2 0 012 2v10a2 2 0 00-2-1H3z"/><path d="M15 3H9a2 2 0 00-2 2v10a2 2 0 012-1h6z"/></svg>',
  check: '<svg viewBox="0 0 18 18"><rect x="2" y="2" width="14" height="14" rx="2"/><path d="M5.5 9l2.3 2.3L12.5 6.8"/></svg>',
  list: '<svg viewBox="0 0 18 18"><path d="M6 4h9M6 9h9M6 14h9"/><circle cx="2.5" cy="4" r="1"/><circle cx="2.5" cy="9" r="1"/><circle cx="2.5" cy="14" r="1"/></svg>',
  file: '<svg viewBox="0 0 18 18"><path d="M4 2h7l3 3v11a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M11 2v3h3"/></svg>',
  users: '<svg viewBox="0 0 18 18"><circle cx="6.5" cy="6" r="2.5"/><path d="M2 15c0-2.5 2-4 4.5-4S11 12.5 11 15"/><circle cx="13" cy="7" r="2"/><path d="M12 15c0-2 1.3-3.3 3.3-3.3s2.7 1.3 2.7 3.3"/></svg>',
  teacher: '<svg viewBox="0 0 18 18"><circle cx="9" cy="6" r="3"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>',
  folder: '<svg viewBox="0 0 18 18"><path d="M2 4a1 1 0 011-1h4l1.5 2H15a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"/></svg>',
  chart: '<svg viewBox="0 0 18 18"><path d="M3 15V8M8.5 15V3M14 15v-5"/><path d="M2 16h14"/></svg>',
  gear: '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="2.5"/><path d="M9 2v2.2M9 13.8V16M16 9h-2.2M4.2 9H2M13.7 4.3l-1.5 1.5M5.8 12.2l-1.5 1.5M13.7 13.7l-1.5-1.5M5.8 5.8L4.3 4.3"/></svg>',
  search: '<svg viewBox="0 0 18 18"><circle cx="8" cy="8" r="5.5"/><path d="M16 16l-3.5-3.5"/></svg>',
  bell: '<svg viewBox="0 0 18 18"><path d="M9 2a4 4 0 00-4 4v2.5c0 1-.4 2-1.1 2.7L3 12h12l-.9-.8A3.8 3.8 0 0113 8.5V6a4 4 0 00-4-4z"/><path d="M7 15a2 2 0 004 0"/></svg>',
  chevron: '<svg viewBox="0 0 18 18"><path d="M6 4l5 5-5 5"/></svg>',
  arrow: '<svg viewBox="0 0 18 18"><path d="M4 14L14 4M14 4H7M14 4v7"/></svg>',
  download: '<svg viewBox="0 0 18 18"><path d="M9 2v9m0 0l-3.5-3.5M9 11l3.5-3.5"/><path d="M3 14v1a1 1 0 001 1h10a1 1 0 001-1v-1"/></svg>',
  camera: '<svg viewBox="0 0 18 18"><rect x="2" y="5" width="10" height="8" rx="1"/><path d="M12 8l4-2.5v7L12 10"/></svg>',
  eye: '<svg viewBox="0 0 18 18"><path d="M1 9s3-5.5 8-5.5S17 9 17 9s-3 5.5-8 5.5S1 9 1 9z"/><circle cx="9" cy="9" r="2"/></svg>',
  plus: '<svg viewBox="0 0 18 18"><path d="M9 3v12M3 9h12"/></svg>'
};
function icon(name, cls) { return `<span class="ic ${cls || ""}">${ICONS[name] || ""}</span>`; }

// ===== Badges =====
function badge(status) {
  const s = String(status || "").toLowerCase();
  let cls = "b-neutral";
  if (["active", "present", "covered", "available", "completed", "registered", "live"].includes(s)) cls = "b-good";
  else if (["late", "review", "needs review", "partially covered", "processing", "not registered"].includes(s)) cls = "b-warn";
  else if (["absent", "missing", "on leave", "error"].includes(s)) cls = "b-bad";
  else if (["upcoming", "pending"].includes(s)) cls = "b-info";
  const dotted = s === "live";
  return `<span class="badge ${cls}">${dotted ? '<i class="live-dot"></i>' : ""}${esc(status)}</span>`;
}

// ===== Progress bar =====
function bar(value, opts) {
  opts = opts || {};
  const v = value === null || value === undefined ? 0 : value;
  const color = opts.color || "var(--accent)";
  return `<div class="bar-track"><div class="bar-fill" style="width:${v}%;background:${color}"></div></div>`;
}

// ===== SVG line chart =====
function lineChart(points, opts) {
  opts = opts || {};
  const w = opts.w || 560, h = opts.h || 180, pad = 28;
  const vals = points.map(p => p.v);
  const min = opts.min !== undefined ? opts.min : Math.min(...vals) - 8;
  const max = opts.max !== undefined ? opts.max : Math.max(...vals) + 8;
  const stepX = (w - pad * 2) / (points.length - 1);
  const toY = v => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const coords = points.map((p, i) => [pad + i * stepX, toY(p.v)]);
  const path = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0].toFixed(1) + "," + c[1].toFixed(1)).join(" ");
  const areaPath = path + ` L${coords[coords.length - 1][0]},${h - pad} L${coords[0][0]},${h - pad} Z`;
  const dots = coords.map((c, i) => `<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="3" class="chart-dot"><title>${esc(points[i].d)}: ${points[i].v}%</title></circle>`).join("");
  const labels = points.map((p, i) => `<text x="${coords[i][0].toFixed(1)}" y="${h - 6}" class="chart-axis-label" text-anchor="middle">${esc(p.d)}</text>`).join("");
  const gridY = [0, 0.5, 1].map(t => {
    const y = pad + t * (h - pad * 2);
    const val = Math.round(max - t * (max - min));
    return `<line x1="${pad}" y1="${y.toFixed(1)}" x2="${w - pad}" y2="${y.toFixed(1)}" class="chart-grid"/><text x="2" y="${(y + 3).toFixed(1)}" class="chart-axis-label">${val}%</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" class="line-chart" preserveAspectRatio="none">
    ${gridY}
    <path d="${areaPath}" class="chart-area"/>
    <path d="${path}" class="chart-line"/>
    ${dots}
    ${labels}
  </svg>`;
}

// ===== Horizontal bar list (course attendance / coverage) =====
function hbarList(rows, opts) {
  opts = opts || {};
  const max = opts.max || 100;
  return `<div class="hbar-list">${rows.map(r => {
    const danger = r.v < (opts.threshold || 80);
    return `<div class="hbar-row">
      <span class="hbar-label">${esc(r.name)}</span>
      <div class="hbar-track"><div class="hbar-fill ${danger ? "hbar-danger" : ""}" style="width:${(r.v / max) * 100}%"></div></div>
      <span class="hbar-value">${r.v}%</span>
    </div>`;
  }).join("")}</div>`;
}

// ===== Nav config =====
const NAV = [
  { section: "Overview", items: [
    { key: "dashboard", label: "Dashboard", icon: "grid", href: "dashboard.html" },
    { key: "live", label: "Live Classroom", icon: "video", href: "live-classroom.html" }
  ]},
  { section: "Teaching records", items: [
    { key: "lectures", label: "Lectures", icon: "book", href: "lectures.html" },
    { key: "attendance", label: "Attendance", icon: "check", href: "attendance.html" },
    { key: "syllabus", label: "Syllabus", icon: "list", href: "syllabus.html" },
    { key: "reports", label: "Lecture Reports", icon: "file", href: "lecture-reports.html" }
  ]},
  { section: "University directory", items: [
    { key: "students", label: "Students", icon: "users", href: "students.html" },
    { key: "teachers", label: "Teachers", icon: "teacher", href: "teachers.html" },
    { key: "courses", label: "Courses", icon: "folder", href: "courses.html" }
  ]},
  { section: "Review", items: [
    { key: "analytics", label: "Analytics", icon: "chart", href: "analytics.html" }
  ]},
  { section: "Administration", items: [
    { key: "settings", label: "Settings", icon: "gear", href: "settings.html" }
  ]}
];

function sidebarHTML(active) {
  const sections = NAV.map(sec => `
    <div class="nav-section">
      <div class="nav-section-label">${esc(sec.section)}</div>
      ${sec.items.map(it => `
        <a class="nav-item ${it.key === active ? "nav-item-active" : ""}" href="${it.href}">
          ${icon(it.icon, "nav-ic")}<span>${it.label}</span>
        </a>
      `).join("")}
    </div>
  `).join("");
  return `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">N</div>
        <div class="brand-text"><div class="brand-name">BBSUL</div><div class="brand-sub">Registrar Ledger</div></div>
      </div>
      <nav class="sidebar-nav">${sections}</nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="avatar">${esc(DATA.user.initials)}</div>
          <div><div class="user-name">${esc(DATA.user.name)}</div><div class="user-role">${esc(DATA.user.role)}</div></div>
        </div>
        <a href="../login.html" class="sidebar-logout" id="sign-out">Sign out</a>
      </div>
    </aside>`;
}

function topbarHTML(crumbs) {
  return `
    <header class="topbar">
      <button class="nav-toggle" id="nav-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
      <div class="crumbs">${crumbs}</div>
      <div class="topbar-right">
        <div class="search-box">${icon("search")}<input placeholder="Search students, lectures, courses…" data-search-input data-table-search/><span class="kbd">⌘K</span></div>
        <button class="icon-btn" aria-label="Notifications">${icon("bell")}<span class="dot-alert"></span></button>
        <div class="topbar-user">
          <div class="avatar avatar-sm">${esc(DATA.user.initials)}</div>
          <div><div class="user-name-sm">${esc(DATA.user.name)}</div><div class="user-role-sm">${esc(DATA.user.role)}</div></div>
        </div>
      </div>
    </header>`;
}

function pageHeader(title, subtitle, actions) {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">${esc(title)}</h1>
        ${subtitle ? `<p class="page-subtitle">${esc(subtitle)}</p>` : ""}
      </div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ""}
    </div>`;
}

function shell(active, crumbs, title, body, actions, subtitle) {
  return `
    <div class="app-shell">
      <div class="nav-scrim" id="nav-scrim"></div>
      ${sidebarHTML(active)}
      <div class="main-col">
        ${topbarHTML(crumbs)}
        <main class="content">
          ${pageHeader(title, subtitle, actions)}
          ${body}
        </main>
      </div>
    </div>`;
}

function sectionHead(num, eyebrow, heading, right) {
  return `<div class="section-head">
    <div><span class="eyebrow-num">${num}</span><span class="eyebrow">${esc(eyebrow)}</span></div>
    ${right ? `<div class="section-head-right">${right}</div>` : ""}
  </div>
  <h2 class="section-heading">${heading}</h2>`;
}

function statCard(value, label, sub) {
  return `<div class="stat-card">
    <div class="stat-value">${value}</div>
    <div class="stat-label">${esc(label)}</div>
    ${sub ? `<div class="stat-sub">${esc(sub)}</div>` : ""}
  </div>`;
}

function card(inner, cls) {
  return `<div class="card ${cls || ""}">${inner}</div>`;
}

function table(cols, rows) {
  // rows may be a pre-joined HTML string, or an array of row-HTML strings
  const body = Array.isArray(rows) ? rows.join("") : rows;
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${body}</tbody>
  </table></div>`;
}

function selectFilter(label) { return `<select class="select-input"><option>${label}</option></select>`; }


/* ===== Session (frontend only - will be replaced by FastAPI auth) ===== */
const SESSION_KEY = "bbsul.session";
function isSignedIn() { try { return localStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; } }
function signIn()     { try { localStorage.setItem(SESSION_KEY, "1"); } catch (e) {} }
function signOut()    { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} }

/* ===== Page bootstrap =====
 * Each page script calls mountPage(renderX()) once the DOM is ready. */
function mountPage(html) {
  if (!isSignedIn()) { location.replace("../login.html"); return; }
  const app = document.getElementById("app");
  app.innerHTML = html;
  wireShell();
}

function param(name) { return new URLSearchParams(location.search).get(name); }

function wireShell() {
  // Row navigation (no inline onclick handlers).
  document.querySelectorAll("[data-href]").forEach(el => {
    el.classList.add("row-link");
    el.addEventListener("click", ev => {
      if (ev.target.closest("a,button,input,select")) return;
      location.href = el.getAttribute("data-href");
    });
  });

  // Links / buttons that are frontend-only placeholders.
  document.querySelectorAll("[data-noop]").forEach(el => {
    el.addEventListener("click", ev => ev.preventDefault());
  });

  // Search inputs: keep Enter from reloading the page.
  document.querySelectorAll("[data-search-input]").forEach(el => {
    el.addEventListener("keydown", ev => { if (ev.key === "Enter") ev.preventDefault(); });
  });

  // Sign out.
  const out = document.getElementById("sign-out");
  if (out) out.addEventListener("click", ev => { ev.preventDefault(); signOut(); location.href = "../login.html"; });

  wireDrawer();
  wireTableSearch();
}

/* ===== Mobile navigation drawer ===== */
function wireDrawer() {
  const sidebar = document.querySelector(".sidebar");
  const toggle = document.getElementById("nav-toggle");
  const scrim = document.getElementById("nav-scrim");
  if (!sidebar || !toggle || !scrim) return;
  const close = () => { sidebar.classList.remove("sidebar-open"); scrim.classList.remove("scrim-show"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("sidebar-open");
    scrim.classList.toggle("scrim-show", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  scrim.addEventListener("click", close);
  document.addEventListener("keydown", ev => { if (ev.key === "Escape") close(); });
  sidebar.querySelectorAll(".nav-item").forEach(a => a.addEventListener("click", close));
}

/* ===== Client-side table search (works on any .data-table) ===== */
function wireTableSearch() {
  document.querySelectorAll("[data-table-search]").forEach(input => {
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      document.querySelectorAll(".data-table tbody tr").forEach(tr => {
        tr.style.display = !q || tr.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
  });
}
