/* Settings page. Rendered into #app by main.js; data comes from js/data.js. */
// ===== SETTINGS =====
function renderSettings() {
  const body = `
    <div class="grid-settings">
      ${card(`
        <div class="settings-nav-title">Local sections</div>
        <div class="settings-nav">
          <div class="settings-nav-item settings-nav-active">01 · Profile</div>
          <div class="settings-nav-item">02 · Notifications</div>
          <div class="settings-nav-item">03 · System</div>
          <div class="settings-nav-item">04 · Classroom</div>
          <div class="settings-nav-item">05 · Account</div>
        </div>
        <div class="settings-nav-title" style="margin-top:18px">Record state</div>
        <div class="cell-muted">Changes are saved per register.</div>
        <div class="save-pill">● All changes saved</div>
      `, "card-tight")}
      <div>
        ${card(`
          ${sectionHead("01", "Identity", "Profile settings")}
          <p class="cell-muted">This identity appears on reports and notifications.</p>
          <div class="form-grid">
            <div><label class="field-label">Full name</label><input class="field-input" value="${esc(DATA.user.name)}"/></div>
            <div><label class="field-label">Email</label><input class="field-input" value="junaid.ali@bbsul.edu"/></div>
            <div><label class="field-label">Role</label><select class="field-input"><option>${esc(DATA.user.role)}</option></select></div>
            <div><label class="field-label">Department</label><select class="field-input"><option>Computer Science</option></select></div>
          </div>
          <div class="note-box" style="margin-top:16px">Profile changes are reflected on future reports after they are saved.</div>
        `)}
        <div class="grid-2" style="margin-top:20px">
          ${card(`
            ${sectionHead("02", "Delivery", "Notification settings")}
            <div class="toggle-row"><div><div class="cell-strong">Email alerts</div><div class="cell-muted">Account and report notices</div></div><label class="switch"><input type="checkbox" checked/><span></span></label></div>
            <div class="toggle-row"><div><div class="cell-strong">Lecture completion</div><div class="cell-muted">When a lecture report is ready</div></div><label class="switch"><input type="checkbox" checked/><span></span></label></div>
            <div class="toggle-row"><div><div class="cell-strong">Weekly digest</div></div><select class="select-input"><option>Monday morning</option></select></div>
          `)}
          ${card(`
            ${sectionHead("03", "Runtime", "System settings")}
            <label class="field-label">API mode</label><select class="field-input"><option>Mock adapter</option></select>
            <label class="field-label" style="margin-top:12px">Base URL</label><input class="field-input" placeholder="/api"/>
          `)}
        </div>
        <div class="grid-2" style="margin-top:20px">
          ${card(`
            ${sectionHead("04", "Defaults", "Classroom settings")}
            <label class="field-label">Default classroom</label><select class="field-input"><option>Lab B-204</option></select>
            <label class="field-label" style="margin-top:12px">Camera feed state</label><div class="cell-muted">■ Frontend placeholder</div>
          `)}
          ${card(`
            ${sectionHead("05", "Access", "Account settings")}
            <a class="link-muted" href="#" data-noop>Change password</a>
            <button class="btn btn-outline" style="margin-top:10px">Sign out all sessions</button>
            <div class="cell-muted" style="margin-top:8px">This ends other active browser sessions.</div>
          `)}
        </div>
      </div>
    </div>
  `;
  return shell("settings", `<a href="dashboard.html">Administration</a><span>/</span><span>Settings</span>`, "Settings", body);
}


document.addEventListener("DOMContentLoaded", () => {
  mountPage(renderSettings());
});
