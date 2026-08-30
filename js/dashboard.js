/* Dashboard page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== DASHBOARD =====
function renderDashboard() {
  const todays = DATA.lectures.slice().sort((a, b) => a.start.localeCompare(b.start));
  const rows = todays.map(l => `
    <tr data-href="lectures.html?id=${l.id}">
      <td><div class="cell-strong">${esc(l.course)} ${esc(l.courseName)}</div><div class="cell-muted">${esc(l.teacher)}</div></td>
      <td>${esc(l.classroom)}</td>
      <td>${esc(l.start)}–${esc(l.end)}</td>
      <td>${pct(l.attendance)}</td>
      <td>${badge(l.status)}</td>
    </tr>`).join("");

  const present = DATA.attendanceRecords.filter(r => r.status === "Present").length;
  const totalStudents = 248, totalTeachers = 18, activeClassrooms = 4;

  const reportRows = DATA.reports.map(r => `
    <tr data-href="lecture-reports.html?id=${r.id}">
      <td class="mono-id">${esc(r.id)}</td>
      <td><div class="cell-strong">${esc(r.course)} · ${esc(r.courseName)}</div></td>
      <td>${esc(r.generatedAt)}</td>
      <td>${pct(r.attendance)}</td>
      <td>${pct(r.coverage)}</td>
      <td class="row-actions"><a href="lecture-reports.html?id=${r.id}">View</a></td>
    </tr>`).join("");

  const body = `
    ${card(`
      <div class="kpi-row">
        ${statCard(248, "Total students", "12 sections")}
        ${statCard(18, "Total teachers", "7 departments")}
        ${statCard(4, "Today's lectures", "1 live now")}
        ${statCard("84%", "Average attendance", "248 enrolled")}
        ${statCard("76%", "Average syllabus coverage", "25 topics tracked")}
        ${statCard(4, "Active classrooms", "of 16 available")}
      </div>
    `)}

    <div class="grid-2">
      ${card(`
        ${sectionHead("02", "Teaching records", "Today's lectures", `<a class="link-muted" href="lectures.html">View all ${icon("arrow")}</a>`)}
        ${table(["Course / Teacher", "Classroom", "Time", "Attend.", "Status"], rows)}
      `)}
      ${card(`
        ${sectionHead("03", "Room register", "Classroom activity")}
        <div class="room-list">
          <div class="room-row"><div><div class="cell-strong">Lab B-204</div><div class="cell-muted">CS-301 · 09:00 · Dr. Malik</div></div>${badge("Live")}</div>
          <div class="room-row"><div><div class="cell-strong">Room A-112</div><div class="cell-muted">CS-205 · 08:00 · Dr. Farooq</div></div>${badge("Completed")}</div>
          <div class="room-row"><div><div class="cell-strong">Lab C-104</div><div class="cell-muted">SE-210 · 11:00 · Ms. Tariq</div></div>${badge("Completed")}</div>
          <div class="room-row"><div><div class="cell-strong">Room B-101</div><div class="cell-muted">AI-312 · 13:00 · Dr. Qureshi</div></div>${badge("Upcoming")}</div>
        </div>
      `)}
    </div>

    <div class="grid-2">
      ${card(`
        <div class="stat-block-head"><span class="eyebrow">Daily presence</span><span class="stat-big">84%</span></div>
        <div class="stat-block-title">Attendance overview</div>
        ${bar(84)}
        <div class="stat-block-legend">
          <div><span class="dot dot-good"></span>208 present</div>
          <div><span class="dot dot-warn"></span>17 late</div>
          <div><span class="dot dot-bad"></span>23 absent</div>
        </div>
      `)}
      ${card(`
        <div class="stat-block-head"><span class="eyebrow">Curriculum register</span><span class="stat-big">76%</span></div>
        <div class="stat-block-title">Syllabus coverage</div>
        ${bar(76, { color: "var(--info)" })}
        <div class="stat-block-legend">
          <div><span class="dot dot-good"></span>19 covered</div>
          <div><span class="dot dot-bad"></span>6 missing</div>
        </div>
      `)}
    </div>

    ${card(`
      ${sectionHead("06", "Filed this week", "Recent lecture reports", `<a class="link-muted" href="lecture-reports.html">All reports ${icon("arrow")}</a>`)}
      ${table(["Report ID", "Course", "Generated", "Attendance", "Coverage", ""], reportRows)}
    `)}

    <div class="grid-2">
      ${card(`
        ${sectionHead("07", "Last 7 teaching days", "Attendance trend")}
        ${lineChart(DATA.attendanceTrend, { h: 200 })}
      `)}
      ${card(`
        ${sectionHead("08", "By course · % covered", "Syllabus coverage by course")}
        ${hbarList(DATA.courseCoverage.slice(0, 4))}
      `)}
    </div>
  `;
  return shell("dashboard", `<a href="dashboard.html">Overview</a><span>/</span><span>Dashboard</span>`, "Dashboard", body);
}


document.addEventListener("DOMContentLoaded", () => {
  mountPage(renderDashboard());
});
