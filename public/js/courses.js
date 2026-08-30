/* Courses page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== COURSES LIST =====
function renderCourses() {
  const rows = DATA.courses.map(c => `
    <tr data-href="courses.html?id=${c.code}">
      <td class="mono-id">${esc(c.code)}</td>
      <td class="cell-strong">${esc(c.name)}</td>
      <td>${esc(c.teacher)}</td>
      <td>${c.semester}</td>
      <td>${esc(c.section)}</td>
      <td>${c.students}</td>
      <td>${c.lectures}</td>
      <td>${bar(c.coverage)}<span class="bar-num">${c.coverage}%</span></td>
      <td>${badge(c.status)}</td>
    </tr>`).join("");
  const totalStudents = DATA.courses.reduce((a, c) => a + c.students, 0);
  const body = `
    ${card(`
      ${sectionHead("03", "University directory", "Courses", `<span class="cell-muted">${DATA.courses.length} records</span>`)}
      <div class="filter-row">
        ${selectFilter("Department: All")}${selectFilter("Semester: All")}${selectFilter("Section: All")}${selectFilter("Teacher: All")}${selectFilter("Status: All")}
        <div class="search-box search-box-inline">${icon("search")}<input placeholder="Search courses"/></div>
      </div>
    `, "card-tight")}
    ${card(`
      ${sectionHead("04", "Active register", "Course register", `<span class="cell-muted">Showing 1–${DATA.courses.length} of ${DATA.courses.length}</span>`)}
      ${table(["Course Code", "Course Name", "Teacher", "Semester", "Section", "Students", "Total Lectures", "Syllabus Coverage", "Status"], rows)}
      <div class="cell-muted note-inline">${DATA.courses.length} courses · ${totalStudents} enrolled students</div>
    `)}
  `;
  return shell("courses", `<a href="dashboard.html">University directory</a><span>/</span><span>Courses</span>`,
    "Courses", body, `<button class="btn btn-outline">${icon("download")} Export</button><button class="btn btn-primary">${icon("plus")} Add course</button>`);
}

// ===== COURSE DETAILS =====
function renderCourseDetails(code) {
  const c = DATA.courses.find(x => x.code === code) || DATA.courses[0];
  const syl = DATA.syllabus["CS-301"] || [];
  const covered = syl.filter(t => t.status === "Covered");
  const missing = syl.filter(t => t.status === "Missing" || t.status === "Partially covered");
  const roster = DATA.students.slice(0, 4);
  const lectures = DATA.lectures.filter(l => l.course === c.code);
  const body = `
    <div class="detail-head">
      <div><div class="eyebrow">University directory / Courses / ${esc(c.code)}</div><h2 class="detail-title">${esc(c.code)}</h2><div class="cell-muted">${esc(c.name)} · Department · Spring 2025 ${badge(c.status)}</div></div>
      <div class="btn-row"><button class="btn btn-outline">Edit course</button><button class="btn btn-primary">Generate report</button></div>
    </div>
    ${card(`
      ${sectionHead("01", "Course register / Section " + c.section, "", "")}
      <dl class="kv-grid">
        <div><dt>Teacher</dt><dd class="cell-strong">${esc(c.teacher)}</dd></div>
        <div><dt>Semester</dt><dd>${c.semester}</dd></div>
        <div><dt>Section</dt><dd>${esc(c.section)}</dd></div>
        <div><dt>Students</dt><dd>${c.students}</dd></div>
        <div><dt>Total lectures</dt><dd>${c.lectures}</dd></div>
      </dl>
    `)}
    ${card(`
      ${sectionHead("02", "Coverage record / 25 mapped topics", "Syllabus coverage", `<span class="stat-big">${c.coverage}%</span>`)}
      ${bar(c.coverage, { color: "var(--info)" })}
      <div class="two-col-list" style="margin-top:16px">
        <div><div class="list-title text-good">Covered topics (${covered.length})</div>${covered.map(t => `<div class="check-row good">✓ ${esc(t.name)}</div>`).join("")}</div>
        <div><div class="list-title text-bad">Missing topics</div>${missing.map(t => `<div class="check-row bad">✕ ${esc(t.name)}</div>`).join("")}<div class="cell-muted" style="margin-top:6px">+4 additional topics awaiting coverage</div></div>
      </div>
    `)}
    ${card(`
      <div class="stat-block-head"><span class="eyebrow">Attendance statistics</span><span class="stat-big">84%</span></div>
      <div class="cell-muted" style="margin-bottom:8px">28 present · 4 absent · 2 late average across ${c.lectures} lectures</div>
      ${lineChart(DATA.attendanceTrend.slice(-6), { h: 120 })}
    `)}
    ${card(`
      ${sectionHead("03", "Roster / Section " + c.section, "Student roster", `<span class="cell-muted">${c.students} enrolled</span>`)}
      ${table(["Student ID", "Roll Number", "Name", "Attendance %", "Face Profile Status"], roster.map(s => `
        <tr data-href="students.html?id=${s.id}"><td class="mono-id">${esc(s.id)}</td><td>${esc(s.roll)}</td><td class="cell-strong">${esc(s.name)}</td><td>${s.attendance}%</td><td>${badge(s.face)}</td></tr>`).join(""))}
    `)}
    ${card(`
      ${sectionHead("04", "Record index / latest first", "Lecture history", `<span class="cell-muted">${c.lectures} total lectures</span>`)}
      ${table(["Lecture ID", "Date", "Classroom", "Duration", "Attendance", "Coverage", "Status"], lectures.map(l => `
        <tr data-href="lectures.html?id=${l.id}"><td class="mono-id">${esc(l.id)}</td><td>${esc(l.date)}</td><td>${esc(l.classroom)}</td><td>${esc(l.duration)}</td><td>${pct(l.attendance)}</td><td>${pct(l.coverage)}</td><td>${badge(l.status === "Live" ? "Live" : "Completed")}</td></tr>`).join("") || `<tr><td colspan="7" class="cell-muted">No lecture records logged yet.</td></tr>`)}
    `)}
  `;
  return shell("courses", `<a href="courses.html">University directory</a><span>/</span><a href="courses.html">Courses</a><span>/</span><span>${esc(c.code)}</span>`,
    "Course Details", body);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = param("id");
  mountPage(id ? renderCourseDetails(id) : renderCourses());
});
