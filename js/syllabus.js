/* Syllabus page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== SYLLABUS =====
function renderSyllabus() {
  const topics = DATA.syllabus["CS-301"];
  const covered = topics.filter(t => t.status === "Covered");
  const missing = topics.filter(t => t.status === "Missing");
  const rows = topics.map(t => `
    <tr>
      <td class="cell-strong">${esc(t.name)}</td>
      <td>${badge(t.status)}</td>
      <td class="mono-id">${esc(t.lecture)}</td>
      <td>${esc(t.date)}</td>
    </tr>`).join("");
  const c = DATA.courses.find(x => x.code === "CS-301");
  const body = `
    ${card(`
      ${sectionHead("01", "Course coverage", "Active syllabus register", `<button class="btn btn-outline">${icon("download")} Export view</button>`)}
      ${table(["Course", "Code", "Semester", "Total Topics", "Covered", "Missing", "Coverage"], [`
        <tr data-href="courses.html?id=CS-301">
          <td><div class="cell-strong">${esc(c.name)}</div><div class="cell-muted">Department of Computer Science</div></td>
          <td class="mono-id">${esc(c.code)}</td>
          <td>${c.semester}</td>
          <td>25</td><td>19</td><td>6</td>
          <td>${bar(76)}<span class="bar-num">76%</span></td>
        </tr>`])}
    `)}
    ${card(`
      ${sectionHead("02", "Topic register", "CS-301 · Course syllabus", `<span class="cell-muted">${topics.length} topic records</span>`)}
      ${table(["Topic", "Status", "Lecture", "Date"], rows)}
    `)}
    <div class="grid-2">
      ${card(`
        <div class="stat-block-head"><span class="cell-strong">Covered topics</span><span class="cell-muted">${covered.length} / 25</span></div>
        ${covered.map((t, i) => `<div class="check-row good"><span>✓ ${esc(t.name)}</span><span class="cell-muted">0${i + 1}</span></div>`).join("")}
      `)}
      ${card(`
        <div class="stat-block-head"><span class="cell-strong">Missing topics</span><span class="text-bad">${missing.length + 4}</span></div>
        ${missing.map(t => `<div class="check-row bad">✕ ${esc(t.name)}</div>`).join("")}
        <div class="cell-muted" style="margin-top:8px">Four additional topic slots are still unassigned.</div>
      `)}
    </div>
  `;
  return shell("syllabus", `<a href="dashboard.html">Teaching records</a><span>/</span><span>Syllabus</span>`, "Syllabus", body);
}

document.addEventListener("DOMContentLoaded", () => {
  mountPage(renderSyllabus());
});
