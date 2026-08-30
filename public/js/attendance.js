/* Attendance page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== ATTENDANCE =====
function renderAttendance() {
  const rows = DATA.attendanceRecords.map(r => `
    <tr data-href="students.html?id=${r.studentId}">
      <td class="mono-id">${esc(r.studentId)}</td>
      <td class="cell-strong">${esc(r.name)}</td>
      <td>${esc(r.course)}</td>
      <td>${esc(r.date)}</td>
      <td class="mono-id">${esc(r.lecture)}</td>
      <td>${badge(r.status)}</td>
      <td>${esc(r.time)}</td>
    </tr>`).join("");
  const total = 248, present = 208, absent = 23, late = 17;
  const body = `
    ${card(`
      ${sectionHead("01", "Current register", "")}
      <div class="kpi-row kpi-row-4">
        ${statCard(total, "Total records")}${statCard(present, "Present")}${statCard(absent, "Absent")}${statCard(`${late} · 84%`, "Late / Attendance")}
      </div>
    `)}
    ${card(`
      ${sectionHead("02", "Filters", "")}
      <div class="filter-row">
        ${selectFilter("All courses")}${selectFilter("All lectures")}
        <input class="select-input" placeholder="Any date"/>
        <input class="select-input" placeholder="Name or ID"/>
        ${selectFilter("All teachers")}
        <div class="search-box search-box-inline">${icon("search")}<input placeholder="Search attendance records"/></div>
        <button class="btn btn-outline">${icon("download")} Export</button>
      </div>
    `, "card-tight")}
    ${card(`
      ${sectionHead("03", "Attendance records", "Recorded student presence by lecture", `<span class="cell-muted">${DATA.attendanceRecords.length} entries shown</span>`)}
      ${table(["Student ID", "Student Name", "Course", "Date", "Lecture", "Status", "Time"], rows)}
    `)}
  `;
  return shell("attendance", `<a href="dashboard.html">Teaching records</a><span>/</span><span>Attendance</span>`, "Attendance", body);
}


document.addEventListener("DOMContentLoaded", () => {
  mountPage(renderAttendance());
});
