/* Lecture Reports page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== LECTURE REPORTS LIST =====
function renderReports() {
  const rows = DATA.reports.map(r => `
    <tr data-href="lecture-reports.html?id=${r.id}">
      <td class="mono-id">${esc(r.id)}<div>${badge(r.status)}</div></td>
      <td class="mono-id">${esc(r.lectureId)}</td>
      <td><div class="cell-strong">${esc(r.course)} ${esc(r.courseName)}</div><div class="cell-muted">Completed lecture record</div></td>
      <td>${esc(r.teacher)}</td>
      <td>${esc(r.date)}</td>
      <td>${bar(r.attendance)}<span class="bar-num">${r.attendance}%</span></td>
      <td>${bar(r.coverage, { color: "var(--info)" })}<span class="bar-num">${r.coverage}%</span></td>
      <td>${esc(r.generatedAt)}</td>
      <td class="row-actions">…</td>
    </tr>`).join("");
  const body = `
    ${card(`
      ${sectionHead("01", "Filter reports", `${DATA.reports.length} reports available`)}
      <div class="filter-row">
        ${selectFilter("All dates")}${selectFilter("All courses")}${selectFilter("All teachers")}${selectFilter("All statuses")}
        <div class="search-box search-box-inline">${icon("search")}<input placeholder="Report ID or course"/></div>
      </div>
    `, "card-tight")}
    ${card(`
      ${sectionHead("02", "Generated report register", "Completed lecture records · " + DATA.reports.length + " available")}
      ${table(["Report ID", "Lecture", "Course", "Teacher", "Date", "Attendance", "Syllabus Coverage", "Generated At", ""], rows)}
    `)}
    <div class="note-box">Print actions remain outside the printable region. Use Print from a report menu to create an official record.</div>
  `;
  return shell("reports", `<a href="dashboard.html">Teaching records</a><span>/</span><span>Lecture Reports</span>`,
    "Lecture Reports", body, `<button class="btn btn-outline">${icon("download")} Export register</button><button class="btn btn-primary">Generate report ${icon("arrow")}</button>`);
}

// ===== REPORT VIEWER =====
function renderReportViewer(id) {
  const r = DATA.reports.find(x => x.id === id) || DATA.reports[0];
  const l = DATA.lectures.find(x => x.id === r.lectureId) || DATA.lectures[0];
  const syl = DATA.syllabus["CS-301"] || [];
  const covered = syl.filter(t => t.status === "Covered");
  const missing = syl.filter(t => t.status === "Missing");
  const transcript = (DATA.transcript[l.id] || []).map(p => `<p>${esc(p)}</p>`).join("");
  const body = `
    <div class="detail-head">
      <div><div class="eyebrow">Report · ${esc(r.id)}</div><div class="cell-muted">Lecture Reports / ${esc(r.id)}</div></div>
      <div class="btn-row">
        <button class="btn btn-outline" data-href="lectures.html?id=${l.id}">View lecture ${icon("arrow")}</button>
        <button class="btn btn-outline">${icon("download")} Download PDF</button>
        <button class="btn btn-primary">Print report</button>
      </div>
    </div>
    ${card(`
      <div class="report-letterhead">
        <div class="report-mark">UN</div>
        <div><div class="report-org">${esc(DATA.org.name)}</div><div class="cell-muted">Office of the Registrar</div></div>
        <div class="report-meta"><div class="mono-id">${esc(r.id)}</div><div class="cell-muted">Generated ${esc(r.generatedAt)}</div></div>
      </div>
      <div class="eyebrow" style="margin-top:24px">Official record</div>
      <h2 class="section-heading">Official Lecture Intelligence Report</h2>
      <div class="print-safe-row">${icon("download")} <b>Print-safe document</b><span class="cell-muted">Navigation and interface actions are omitted in print view.</span></div>

      ${sectionHead("01", "Lecture information", "")}
      <dl class="kv-grid">
        <div><dt>Course</dt><dd>${esc(l.course)}<br/><span class="cell-muted">${esc(l.courseName)}</span></dd></div>
        <div><dt>Teacher</dt><dd>${esc(l.teacher)}</dd></div>
        <div><dt>Classroom</dt><dd>${esc(l.classroom)}</dd></div>
        <div><dt>Date</dt><dd>${esc(l.date)}</dd></div>
        <div><dt>Time</dt><dd>${esc(l.start)}–${esc(l.end)}</dd></div>
        <div><dt>Duration</dt><dd>${esc(l.duration)}</dd></div>
      </dl>

      ${sectionHead("02", "Attendance", "")}
      <div class="kpi-row kpi-row-5">
        ${statCard(l.studentsN, "Total")}${statCard(l.present, "Present")}${statCard(l.absent, "Absent")}${statCard(l.late, "Late")}${statCard(pct(l.attendance), "Attendance")}
      </div>
      ${bar(l.attendance)}

      ${sectionHead("03", "Transcript", "", `<span class="cell-muted">Whisper transcript</span>`)}
      <div class="transcript">${transcript}</div>

      <div class="two-col-list" style="margin-top:20px">
        <div>${sectionHead("04", "Topics covered", "")}${covered.map(t => `<div class="check-row good">✓ ${esc(t.name)}</div>`).join("")}</div>
        <div>${sectionHead("05", "Missing topics", "")}${missing.map(t => `<div class="check-row bad">✕ ${esc(t.name)}</div>`).join("")}</div>
      </div>

      ${sectionHead("06", "Syllabus coverage", "")}
      <div class="stat-big">${pct(r.coverage)}</div>
      ${bar(r.coverage, { color: "var(--info)" })}

      ${sectionHead("07", "Lecture analytics", "")}
      <dl class="kv-list">
        <div><dt>Attendance</dt><dd>${pct(l.attendance)}</dd></div>
        <div><dt>Duration</dt><dd>${esc(l.duration)}</dd></div>
        <div><dt>Topics covered</dt><dd>${covered.length}</dd></div>
        <div><dt>Syllabus coverage</dt><dd>${pct(r.coverage)}</dd></div>
      </dl>
      <div class="note-box">AI results are display-only: connected services provide detection, face recognition, transcript, and topic coverage data.</div>
    `)}
  `;
  return shell("reports", `<a href="lecture-reports.html">Lecture Reports</a><span>/</span><span>${esc(r.id)}</span>`, "Report · " + r.id, body);
}


document.addEventListener("DOMContentLoaded", () => {
  const id = param("id");
  mountPage(id ? renderReportViewer(id) : renderReports());
});
