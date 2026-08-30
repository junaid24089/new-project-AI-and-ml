/* Teachers page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== TEACHERS LIST =====
function renderTeachers() {
  const rows = DATA.teachers.map(t => `
    <tr data-href="teachers.html?id=${t.id}">
      <td class="mono-id">${esc(t.id)}</td>
      <td class="cell-strong">${esc(t.name)}</td>
      <td>${esc(t.email)}</td>
      <td>${esc(t.dept)}</td>
      <td>${t.courses}</td>
      <td>${t.lectures}</td>
      <td>${bar(t.attendanceAvg)}<span class="bar-num">${t.attendanceAvg}%</span></td>
      <td>${badge(t.status)}</td>
      <td class="row-actions">⋮</td>
    </tr>`).join("");
  const body = `
    ${card(`
      ${sectionHead("", "Search register", "")}
      <div class="filter-row">
        <div class="search-box search-box-inline" style="flex:2">${icon("search")}<input placeholder="Search by name, ID, or email"/></div>
        ${selectFilter("All departments")}${selectFilter("All statuses")}
        <a class="link-muted" href="teachers.html">Clear filters</a>
      </div>
    `, "card-tight")}
    ${card(`
      ${sectionHead("03", "Teacher register", "Current faculty records from the registrar directory", `<span class="cell-muted">${DATA.teachers.length} / ${DATA.teachers.length} records</span>`)}
      ${table(["Teacher ID", "Name", "Email", "Department", "Courses", "Lectures", "Attendance Avg.", "Status", ""], rows)}
    `)}
  `;
  return shell("teachers", `<a href="dashboard.html">University directory</a><span>/</span><span>Teachers</span>`,
    "Teachers", body, `<button class="btn btn-primary">${icon("plus")} Add teacher</button>`);
}

// ===== TEACHER PROFILE =====
function renderTeacherProfile(id) {
  const t = DATA.teachers.find(x => x.id === id) || DATA.teachers[0];
  const courses = DATA.courses.filter(c => c.teacherId === t.id);
  const lectures = DATA.lectures.filter(l => l.teacherId === t.id);
  const body = `
    <div class="detail-head">
      <div><div class="eyebrow">03 / Teacher record</div><h2 class="detail-title">${esc(t.name)} ${badge(t.status)}</h2><div class="cell-muted">Faculty record · Department of ${esc(t.dept)} · Academic year 2025–26</div></div>
      <div class="btn-row"><button class="btn btn-primary">Edit teacher</button><button class="btn btn-outline">Delete teacher</button></div>
    </div>
    ${card(`
      <dl class="kv-grid">
        <div><dt>Identity</dt><dd class="cell-strong">${esc(t.name)}</dd></div>
        <div><dt>Teacher ID</dt><dd class="mono-id">${esc(t.id)}</dd></div>
        <div><dt>Email</dt><dd>${esc(t.email)}</dd></div>
        <div><dt>Department</dt><dd>${esc(t.dept)}</dd></div>
        <div><dt>Status</dt><dd>${badge(t.status)}</dd></div>
      </dl>
    `)}
    ${card(`
      ${sectionHead("01", "Attendance statistics", "", `<span class="cell-muted">Calculated from ${t.lectures} lecture records</span>`)}
      <div class="kpi-row kpi-row-4">
        ${statCard(t.lectures, "Lectures")}
        ${statCard(t.attendanceAvg + "%", "Average attendance")}
        ${statCard("83 min", "Average duration")}
        ${statCard(t.coverageAvg + "%", "Syllabus coverage")}
      </div>
    `)}
    ${card(`
      ${sectionHead("03", "Assigned courses", "", `<span class="cell-muted">${courses.length} active assignments</span>`)}
      ${table(["Course", "Semester", "Section", "Lectures", "Syllabus Coverage"], courses.map(c => `
        <tr data-href="courses.html?id=${c.code}"><td><div class="mono-id">${esc(c.code)}</div><div class="cell-strong">${esc(c.name)}</div></td><td>Semester ${c.semester}</td><td>${esc(c.section)}</td><td>${c.lectures}</td><td>${bar(c.coverage)}<span class="bar-num">${c.coverage}%</span></td></tr>`).join("") || `<tr><td colspan="5" class="cell-muted">No assigned courses.</td></tr>`)}
    `)}
    ${card(`
      ${sectionHead("04", "Lecture history", "", `<span class="cell-muted">Showing ${lectures.length} records</span>`)}
      ${table(["Lecture ID", "Course", "Classroom", "Date", "Attendance", "Syllabus Coverage", "Status"], lectures.map(l => `
        <tr data-href="lectures.html?id=${l.id}"><td class="mono-id">${esc(l.id)}</td><td>${esc(l.course)}</td><td>${esc(l.classroom)}</td><td>${esc(l.date)}</td><td>${pct(l.attendance)}</td><td>${pct(l.coverage)}</td><td>${badge(l.status === "Live" ? "Live" : l.status === "Upcoming" ? "Upcoming" : "Complete")}</td></tr>`).join("") || `<tr><td colspan="7" class="cell-muted">No lecture records match these filters.</td></tr>`)}
    `)}
  `;
  return shell("teachers", `<a href="teachers.html">University directory</a><span>/</span><a href="teachers.html">Teachers</a><span>/</span><span>${esc(t.id)}</span>`,
    "Teacher Profile", body);
}


document.addEventListener("DOMContentLoaded", () => {
  const id = param("id");
  mountPage(id ? renderTeacherProfile(id) : renderTeachers());
});
