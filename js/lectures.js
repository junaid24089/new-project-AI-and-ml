/* Lectures page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== LECTURES LIST =====
function renderLectures() {
  const rows = DATA.lectures.map(l => `
    <tr data-href="lectures.html?id=${l.id}">
      <td class="mono-id">${esc(l.id)}</td>
      <td><div class="cell-strong">${esc(l.course)}</div><div class="cell-muted">${esc(l.courseName)}</div></td>
      <td>${esc(l.teacher)}</td>
      <td>${esc(l.classroom)}</td>
      <td>${esc(l.date)}</td>
      <td>${esc(l.start)}–${esc(l.end)}</td>
      <td>${esc(l.duration)}</td>
      <td>${l.studentsN}</td>
      <td>${l.attendance !== null ? bar(l.attendance) + `<span class="bar-num">${l.attendance}%</span>` : "—"}</td>
      <td>${l.coverage !== null ? bar(l.coverage, { color: "var(--info)" }) + `<span class="bar-num">${l.coverage}%</span>` : "—"}</td>
      <td>${badge(l.status)}</td>
    </tr>`).join("");

  const body = `
    ${card(`
      ${sectionHead("", "Filter register", "Refine the teaching record set")}
      <div class="filter-row">
        ${selectFilter("All dates")}${selectFilter("All courses")}${selectFilter("All teachers")}${selectFilter("All rooms")}${selectFilter("All statuses")}
        <div class="search-box search-box-inline">${icon("search")}<input placeholder="ID or course"/></div>
      </div>
    `, "card-tight")}
    ${card(`
      ${sectionHead("", "Lecture register", `${DATA.lectures.length} visible records · sorted by date, newest first`)}
      ${table(["Lecture ID", "Course", "Teacher", "Classroom", "Date", "Time", "Duration", "Students", "Attendance", "Coverage", "Status"], rows)}
    `)}
  `;
  return shell("lectures", `<a href="dashboard.html">Teaching records</a><span>/</span><span>Lectures</span>`,
    "Lectures", body, `<button class="btn btn-outline">${icon("download")} Export</button><button class="btn btn-primary">${icon("plus")} Add lecture</button>`);
}
// ===== LECTURE DETAILS =====
function renderLectureDetails(id) {
  const l = DATA.lectures.find(x => x.id === id) || DATA.lectures[0];
  const syl = DATA.syllabus["CS-301"] || [];
  const covered = syl.filter(t => t.status === "Covered");
  const missing = syl.filter(t => t.status === "Missing");
  const transcript = (DATA.transcript[l.id] || []).map(p => `<p>${esc(p)}</p>`).join("");

  const body = `
    <div class="detail-head">
      <div>
        <div class="eyebrow">Lecture record / detail view</div>
        <h2 class="detail-title">${esc(l.courseName)} <span class="detail-title-tag">${esc(l.course)}</span></h2>
        <div class="cell-muted">${esc(l.id)} / ${esc(l.date)} / ${esc(l.classroom)} ${badge(l.status)}</div>
      </div>
      <div class="btn-row"><button class="btn btn-outline">Edit lecture</button><button class="btn btn-primary">Generate report ${icon("arrow")}</button></div>
    </div>
    <div class="grid-detail">
      <div class="col-main">
        ${card(`
          ${sectionHead("01", "Lecture information", "")}
          <dl class="kv-grid">
            <div><dt>Course</dt><dd>${esc(l.course)} ${esc(l.courseName)}</dd></div>
            <div><dt>Teacher</dt><dd>${esc(l.teacher)}</dd></div>
            <div><dt>Classroom</dt><dd>${esc(l.classroom)}</dd></div>
            <div><dt>Date</dt><dd>${esc(l.date)}</dd></div>
            <div><dt>Start</dt><dd>${esc(l.start)}</dd></div>
            <div><dt>Duration</dt><dd>${esc(l.duration)}</dd></div>
          </dl>
        `)}
        ${card(`
          ${sectionHead("02", "Transcript", "", `<span class="cell-muted">Whisper transcript · available</span>`)}
          <div class="transcript">${transcript || "<p class='cell-muted'>No transcript recorded for this lecture.</p>"}</div>
        `)}
      </div>
      <div class="col-side">
        ${card(`
          ${sectionHead("03", "Outcomes", "", `<span class="cell-muted">Lecture closeout</span>`)}
          <div class="stat-block-head"><span class="eyebrow">Attendance</span></div>
          <div class="stat-big">${pct(l.attendance)}</div>
          <div class="cell-muted" style="margin-bottom:10px">${l.present ?? "—"} of ${l.studentsN} present</div>
          <div class="kpi-row kpi-row-4">
            ${statCard(l.studentsN, "Total")}${statCard(l.present ?? "—", "Present")}${statCard(l.absent ?? "—", "Absent")}${statCard(l.late ?? "—", "Late")}
          </div>
          ${bar(l.attendance || 0)}
          <div class="two-col-list" style="margin-top:16px">
            <div><div class="list-title text-good">Topics covered</div>${covered.map(t => `<div class="check-row good">✓ ${esc(t.name)}</div>`).join("")}</div>
            <div><div class="list-title text-bad">Missing topics</div>${missing.map(t => `<div class="check-row bad">✕ ${esc(t.name)}</div>`).join("")}</div>
          </div>
        `)}
        ${card(`
          ${sectionHead("04", "Syllabus coverage", "", "")}
          <div class="stat-big">${pct(l.coverage)}</div>
          <div class="cell-muted" style="margin-bottom:8px">25 topics</div>
          ${bar(l.coverage || 0, { color: "var(--info)" })}
        `)}
        ${card(`
          ${sectionHead("05", "Lecture analytics", "", `<span class="cell-muted">Course benchmark</span>`)}
          <dl class="kv-list">
            <div><dt>Attendance</dt><dd>${pct(l.attendance)} <span class="cell-muted">(course ref. 81%)</span></dd></div>
            <div><dt>Duration</dt><dd>${esc(l.duration)} <span class="cell-muted">(90 min target)</span></dd></div>
            <div><dt>Topics covered</dt><dd>${covered.length} <span class="cell-muted">(course ref. 4)</span></dd></div>
            <div><dt>Syllabus coverage</dt><dd>${pct(l.coverage)} <span class="cell-muted">(course ref. 72%)</span></dd></div>
          </dl>
        `)}
      </div>
    </div>
    <div class="note-box">Report viewer: print-safe. AI results are display-only and remain subject to registrar review.</div>
  `;
  return shell("lectures", `<a href="lectures.html">Teaching records</a><span>/</span><a href="lectures.html">Lectures</a><span>/</span><span>${esc(l.id)}</span>`,
    "Lecture Details", body);
}


document.addEventListener("DOMContentLoaded", () => {
  const id = param("id");
  mountPage(id ? renderLectureDetails(id) : renderLectures());
});
