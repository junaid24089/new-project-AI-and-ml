/* Live Classroom page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== LIVE CLASSROOM =====
function renderLiveClassroom() {
  const l = DATA.lectures.find(x => x.status === "Live") || DATA.lectures[0];
  const body = `
    ${card(`
      <div class="live-head">
        <div>
          <div class="eyebrow">Active lecture / field register</div>
          <h2 class="live-title">${esc(l.classroom)}</h2>
          <div class="cell-muted">${esc(l.course)} ${esc(l.courseName)} · ${esc(l.teacher)}</div>
        </div>
        <div class="btn-row">
          <button class="btn btn-ghost">${icon("arrow")} Retry feed</button>
          <button class="btn btn-primary">${icon("file")} Generate report</button>
        </div>
      </div>
      <div class="kpi-row kpi-row-6">
        ${statCard(`<span class="live-dot-inline"></span> Live`, "Lecture status")}
        ${statCard(l.start, "Start time")}
        ${statCard("00:58:12", "Current duration")}
        ${statCard(l.studentsN, "Detected students")}
        ${statCard(l.present ?? "—", "Present students")}
        ${statCard(pct(l.attendance), "Attendance")}
      </div>
    `)}
    <div class="grid-live">
      ${card(`
        <div class="cam-frame">
          <div class="cam-top"><span>LIVE CLASSROOM CAMERA</span><span class="cam-badge">VIDEO OFF</span></div>
          <div class="cam-body">
            ${icon("camera", "cam-icon")}
            <div class="cam-title">Camera feed unavailable</div>
            <div class="cam-sub">Waiting for service data</div>
          </div>
          <div class="cam-chips">
            <span class="chip">PERSON DETECTED · ${l.studentsN}</span>
            <span class="chip">TEACHER DETECTED · YES</span>
            <span class="chip">STUDENT COUNT · ${l.studentsN}</span>
            <span class="chip">FACE RECOGNITION STATUS · PENDING</span>
          </div>
        </div>
      `)}
      ${card(`
        ${sectionHead("02", "Detection state", "")}
        <dl class="kv-list">
          <div><dt>Teacher detected</dt><dd>Detected · ${esc(l.teacher)}</dd></div>
          <div><dt>Students detected</dt><dd>${l.studentsN}</dd></div>
          <div><dt>Unknown persons</dt><dd>Waiting for service data</dd></div>
          <div><dt>Attendance status</dt><dd>${l.present ?? "—"} present · ${pct(l.attendance)}</dd></div>
          <div><dt>Feed state</dt><dd class="text-bad">Unavailable</dd></div>
          <div><dt>Identity results</dt><dd class="text-bad">Not connected</dd></div>
        </dl>
      `, "card-tight")}
    </div>
    ${card(`
      ${sectionHead("03", "Student detections", "Detection timeline", `<span class="cell-muted">${l.start}–now · 4 recorded marks</span>`)}
      ${table(["Student ID", "Name", "Status", "Detection time"], DATA.attendanceRecords.filter(r => r.lecture === l.id).map(r => `
        <tr data-href="students.html?id=${r.studentId}">
          <td class="mono-id">${esc(r.studentId)}</td><td class="cell-strong">${esc(r.name)}</td><td>${badge(r.status)}</td><td>${esc(r.time)}</td>
        </tr>`).join("") + `<tr><td>—</td><td class="cell-muted">Waiting for detection</td><td>${badge("Pending")}</td><td>—</td></tr>`)}
    `)}
  `;
  return shell("live", `<a href="dashboard.html">Overview</a><span>/</span><span>Live Classroom</span>`, "Live Classroom", body);
}

document.addEventListener("DOMContentLoaded", () => {
  mountPage(renderLiveClassroom());
});
