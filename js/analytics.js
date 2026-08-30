/* Analytics page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== ANALYTICS =====
function renderAnalytics() {
  const dist = [
    { label: "<60", v: 7, cls: "bar-bad" }, { label: "60-69", v: 12, cls: "bar-warn" },
    { label: "70-79", v: 28, cls: "bar-info" }, { label: "80-89", v: 36, cls: "bar-good" },
    { label: "90-99", v: 22, cls: "bar-info" }, { label: "100", v: 9, cls: "bar-good" }
  ];
  const maxDist = Math.max(...dist.map(d => d.v));
  const durBuckets = [
    { label: "45-60", v: 4 }, { label: "61-75", v: 9 }, { label: "76-90", v: 14 }, { label: "91-105", v: 8 }, { label: "106-120", v: 3 }
  ];
  const maxDur = Math.max(...durBuckets.map(d => d.v));
  const teacherLectures = [
    { name: "Dr. Ayesha Malik", v: 14 }, { name: "Dr. Omar Farooq", v: 12 }, { name: "Prof. Nida Hussain", v: 10 },
    { name: "Dr. Hamid Rauf", v: 8 }, { name: "Ms. Saria Javed", v: 6 }
  ];

  const body = `
    ${card(`
      ${sectionHead("00", "Filters · Results update immediately", "", `<span class="cell-muted">Scope: Semester 4 · Section A</span>`)}
      <div class="filter-row">
        <input class="select-input" value="01 Mar – 14 Mar 2026"/>
        ${selectFilter("All courses")}${selectFilter("All teachers")}${selectFilter("Semester 4")}${selectFilter("Section A")}
        <a class="link-muted" href="analytics.html">Clear filters</a>
      </div>
    `, "card-tight")}

    <div class="grid-2 grid-2-wide">
      ${card(`
        ${sectionHead("01", "Attendance trend", "Daily attendance across all recorded lectures")}
        ${lineChart(DATA.attendanceTrend, { h: 200 })}
      `)}
      ${card(`
        <div class="reading-note">
          <div class="eyebrow" style="color:var(--sidebar-text-muted)">Registrar's reading note</div>
          <div class="reading-note-title">A stable register, with one visible dip.</div>
          <p>Attendance reached 91% on 11 Mar before settling at 88%. The 05 Mar reading at 78% is the only mark below the 80% review line.</p>
          <dl class="kv-list kv-list-invert">
            <div><dt>Range average</dt><dd>84.6%</dd></div>
            <div><dt>Review threshold</dt><dd>80.0%</dd></div>
          </dl>
        </div>
      `, "card-invert")}
    </div>

    <div class="grid-2">
      ${card(`${sectionHead("02", "Attendance by course", "Sorted highest to lowest")}${hbarList(DATA.courseAttendance)}`)}
      ${card(`${sectionHead("04", "Syllabus coverage by course", "Coverage is strongest in OOP")}${hbarList(DATA.courseCoverage, { threshold: 70 })}`)}
    </div>

    <div class="grid-2">
      ${card(`
        ${sectionHead("03", "Attendance by student", "Ranked bar / table hybrid")}
        <div class="search-box search-box-inline" style="margin-bottom:10px">${icon("search")}<input placeholder="Find student"/></div>
        ${DATA.students.map((s, i) => `
          <div class="rank-row" data-href="students.html?id=${s.id}">
            <span class="rank-num">0${i + 1}</span>
            <div><div class="cell-strong">${esc(s.name)}</div><div class="cell-muted mono-id">${esc(s.id)}</div></div>
            <div class="rank-bar">${bar(s.attendance)}</div>
          </div>`).join("")}
      `)}
      ${card(`
        ${sectionHead("05", "Syllabus coverage over time", "Cumulative topic coverage rises after each lecture")}
        ${lineChart([{ d: "01 Mar", v: 54 }, { d: "03 Mar", v: 58 }, { d: "05 Mar", v: 61 }, { d: "07 Mar", v: 64 }, { d: "09 Mar", v: 70 }, { d: "11 Mar", v: 73 }, { d: "13 Mar", v: 76 }, { d: "14 Mar", v: 76 }], { h: 200, min: 40, max: 100 })}
      `)}
    </div>

    <div class="grid-2">
      ${card(`
        ${sectionHead("06", "Lectures per teacher", "Recorded lecture count in the selected date range")}
        <div class="vbar-list">
          ${teacherLectures.map(t => `<div class="hbar-row"><span class="hbar-label">${esc(t.name)}</span><div class="hbar-track"><div class="hbar-fill" style="width:${(t.v / 16) * 100}%;background:var(--info)"></div></div><span class="hbar-value">${t.v}</span></div>`).join("")}
        </div>
      `)}
      ${card(`
        ${sectionHead("07", "Lecture duration", "Most lectures sit in the 76–90 minute band")}
        <div class="vbar-chart">
          ${durBuckets.map(d => `<div class="vbar-col"><div class="vbar-value">${d.v}</div><div class="vbar-bar" style="height:${(d.v / maxDur) * 100}%"></div><div class="vbar-label">${d.label}</div></div>`).join("")}
        </div>
      `)}
    </div>

    <div class="grid-2">
      ${card(`
        ${sectionHead("08", "Student attendance distribution", "Most students fall between 80–89%")}
        <div class="vbar-chart">
          ${dist.map(d => `<div class="vbar-col"><div class="vbar-value">${d.v}</div><div class="vbar-bar ${d.cls}" style="height:${(d.v / maxDist) * 100}%"></div><div class="vbar-label">${d.label}</div></div>`).join("")}
        </div>
      `)}
      ${card(`
        <div class="eyebrow">Field notes</div>
        <div class="reading-note-title" style="color:var(--text)">Read the shape before the color.</div>
        <p class="cell-muted">Bars are deliberately labelled so a course can be reviewed without relying on hue. The axes carry the actual measure.</p>
        <div class="kpi-row kpi-row-4" style="margin-top:16px">
          ${statCard(48, "Lectures")}${statCard(124, "Students")}${statCard(6, "Courses")}${statCard(5, "Teachers")}
        </div>
      `)}
    </div>
  `;
  return shell("analytics", `<a href="dashboard.html">Review</a><span>/</span><span>Analytics</span>`, "Analytics", body);
}


document.addEventListener("DOMContentLoaded", () => {
  mountPage(renderAnalytics());
});
