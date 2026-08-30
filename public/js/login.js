/* Login page. Frontend-only session flag; real auth will call FastAPI later. */
function renderLogin() {
  return `
  <div class="login-screen">
    <div class="login-left">
      <div class="login-left-top">
        <div class="brand-mark brand-mark-lg">N</div>
        <div class="login-eyebrow">01 / IDENTITY</div>
        <div class="login-eyebrow login-eyebrow-muted">BBSUL<br/>REGISTRAR / 01</div>
        <div class="login-access">Registrar access</div>
      </div>
      <div class="login-left-mid">
        <div class="login-tag">UNIVERSITY IDENTITY / AUTHENTICATED WORKSPACE</div>
        <h1 class="login-h1">BBSUL</h1>
        <div class="login-rule"></div>
        <div class="login-desc-title">Smart AI Classroom &amp; University Lecture Intelligence System</div>
        <p class="login-desc">A frontend workspace for lecture, attendance, and syllabus records.</p>
      </div>
      <div class="login-left-bottom">
        <span>INSTITUTIONAL USE ONLY</span><span>AUTH GATE · V0.1</span>
      </div>
    </div>
    <div class="login-right">
      <div class="login-right-inner">
        <div class="login-right-top">
          <span>02 / SIGN IN</span><span>REGISTRAR PORTAL</span>
        </div>
        <div class="login-rule"></div>
        <div class="login-form-wrap">
          <div class="login-tag">BBSUL CREDENTIALS</div>
          <h2 class="login-h2">Sign in to the ledger.</h2>
          <p class="login-sub">Use your university credentials to access classroom and lecture records.</p>
          <form id="login-form">
            <label class="field-label">Email or username</label>
            <input class="field-input" type="text" placeholder="name@bbsul.edu" value="junaid.ali@bbsul.edu"/>
            <label class="field-label" style="margin-top:20px">Password</label>
            <div class="pw-wrap">
              <input class="field-input" id="login-password" type="password" placeholder="Enter your password" value="••••••••••"/>
              ${icon("eye", "pw-eye")}
            </div>
            <div class="login-row">
              <label class="checkbox-row"><input type="checkbox"/> Remember me</label>
              <a href="#" class="link-muted" data-noop>Forgot password</a>
            </div>
            <button class="btn btn-primary btn-block" type="submit">Login ${icon("arrow")}</button>
          </form>
        </div>
        <div class="login-rule"></div>
        <div class="login-right-bottom">
          <span>FRONTEND PROTOTYPE · AUTHENTICATION WILL CONNECT TO FASTAPI</span>
          <span>MOBILE RULE · IDENTITY → 96PX HEADER</span>
        </div>
      </div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("login-body");
  document.getElementById("app").innerHTML = renderLogin();

  const form = document.getElementById("login-form");
  form.addEventListener("submit", ev => {
    ev.preventDefault();
    signIn();
    location.href = "pages/dashboard.html";
  });

  document.querySelectorAll("[data-noop]").forEach(el => el.addEventListener("click", ev => ev.preventDefault()));

  const eye = document.querySelector(".pw-eye");
  const pw = document.getElementById("login-password");
  if (eye && pw) {
    eye.addEventListener("click", () => { pw.type = pw.type === "password" ? "text" : "password"; });
  }
});
