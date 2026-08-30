/* Students page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== STUDENTS LIST =====
function renderStudents() {
  const rows = DATA.students.map(s => `
    <tr data-href="students.html?id=${s.id}">
      <td class="mono-id">${esc(s.id)}</td>
      <td>${esc(s.roll)}</td>
      <td class="cell-strong">${esc(s.name)}</td>
      <td>${esc(s.email)}</td>
      <td>${esc(s.dept)}</td>
      <td>${s.semester}</td>
      <td>${esc(s.section)}</td>
      <td>${s.attendance}%</td>
      <td>${badge(s.face)}</td>
      <td>${badge(s.status)}</td>
    </tr>`).join("");
  const body = `
    ${card(`
      ${sectionHead("00", "Find a student", `${DATA.students.length} records`, `<a class="link-muted" href="students.html">Clear filters</a>`)}
      <div class="filter-row">
        <div class="search-box search-box-inline" style="flex:2">${icon("search")}<input placeholder="Name, ID, roll number, email"/></div>
        ${selectFilter("All departments")}${selectFilter("All semesters")}${selectFilter("All sections")}${selectFilter("All statuses")}
      </div>
    `, "card-tight")}
    ${card(`
      ${sectionHead("01", "Student records", `Showing 1–${DATA.students.length} of ${DATA.students.length}`)}
      ${table(["Student ID", "Roll Number", "Name", "Email", "Department", "Semester", "Section", "Attendance %", "Face Profile", "Status"], rows)}
      <div class="cell-muted note-inline">Face profile status is recorded as explicit text; face recognition is a future service integration.</div>
    `)}
  `;
  return shell("students", `<a href="dashboard.html">University directory</a><span>/</span><span>Students</span>`,
    "Students", body, `<a class="link-muted" href="students.html">Import roster</a><button class="btn btn-primary">${icon("plus")} Add student</button>`);
}

// ===== STUDENT PROFILE =====
function renderStudentProfile(id) {
  const s = DATA.students.find(x => x.id === id) || DATA.students[0];
  const courses = DATA.courses.filter(c => c.code === "CS-301" || c.code === "CS-205").slice(0, 2);
  const history = DATA.attendanceRecords.filter(r => r.studentId === s.id);
  const initials = s.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const body = `
    <div class="detail-head">
      <div><div class="eyebrow">Record / Student</div><h2 class="detail-title">${esc(s.name)}</h2><div class="cell-muted">Student Profile · ${esc(s.status)} academic record</div></div>
      <div class="btn-row"><button class="btn btn-primary">Edit student</button><button class="btn btn-outline">Delete student</button></div>
    </div>
    ${card(`
      ${sectionHead("01", "Identity register", "", `<span class="cell-muted">Current / 2024–25</span>`)}
      <div class="profile-id-row">
        <div class="profile-monogram">${initials}</div>
        <div class="profile-id-info">
          <div class="detail-title">${esc(s.name)}</div>
          <div class="cell-muted">${esc(s.id)} · Roll No ${esc(s.roll)}</div>
          <div class="kv-grid kv-grid-compact">
            <div><dt>Email</dt><dd>${esc(s.email)}</dd></div>
            <div><dt>Department</dt><dd>${esc(s.dept)}</dd></div>
            <div><dt>Semester</dt><dd>${s.semester}</dd></div>
            <div><dt>Section</dt><dd>${esc(s.section)}</dd></div>
            <div><dt>Face profile</dt><dd>${badge(s.face)}</dd></div>
            <div><dt>Status</dt><dd>${badge(s.status)}</dd></div>
          </div>
        </div>
      </div>
      <div class="attendance-summary-row">
        <span class="cell-muted">Attendance summary</span>
        <b>42</b> total lectures <b>37</b> present <b>3</b> absent <b>2</b> late
        <span class="attendance-pct">${s.attendance}%</span>
      </div>
      ${bar(s.attendance)}
    `)}
    <div class="grid-2">
      ${card(`
        ${sectionHead("02", "Academic load", "Courses", `<span class="cell-muted">${courses.length} enrolled</span>`)}
        ${table(["Course", "Teacher", "Credits", "Attendance"], courses.map(c => `
          <tr data-href="courses.html?id=${c.code}"><td><div class="mono-id">${esc(c.code)}</div><div class="cell-strong">${esc(c.name)}</div></td><td>${esc(c.teacher)}</td><td>04</td><td>${s.attendance}%</td></tr>`).join(""))}
      `)}
      ${card(`
        ${sectionHead("03", "Detected records", "Attendance history", `<span class="cell-muted">Latest ${history.length}</span>`)}
        ${table(["Date", "Course", "Lecture", "Status"], history.map(h => `<tr><td>${esc(h.date)}</td><td>${esc(h.course)}</td><td class="mono-id">${esc(h.lecture)}</td><td>${badge(h.status)}</td></tr>`).join("") || `<tr><td colspan="4" class="cell-muted">No attendance history yet.</td></tr>`)}
      `)}
    </div>
    ${card(`
      ${sectionHead("04", "Course activity", "Lecture history", `<span class="cell-muted">${DATA.lectures.length} lectures</span>`)}
      ${table(["Lecture ID", "Course", "Date", "Duration", "Attendance", "Coverage"], DATA.lectures.map(l => `
        <tr data-href="lectures.html?id=${l.id}"><td class="mono-id">${esc(l.id)}</td><td>${esc(l.course)}</td><td>${esc(l.date)}</td><td>${esc(l.duration)}</td><td>${pct(l.attendance)}</td><td>${pct(l.coverage)}</td></tr>`).join(""))}
    `)}
  `;
  return shell("students", `<a href="students.html">University directory</a><span>/</span><a href="students.html">Students</a><span>/</span><span>${esc(s.id)}</span>`,
    "Student Profile", body);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = param("id");
  mountPage(id ? renderStudentProfile(id) : renderStudents());
});
