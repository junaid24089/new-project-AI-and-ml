# BBSUL Registrar Ledger — Smart AI Classroom & University Lecture Intelligence System

Plain HTML / CSS / vanilla JavaScript multi-page frontend. No frameworks, no build step,
no inline CSS or JS, no inline event handlers (`addEventListener` only).

## Structure

```
login.html                 sign-in page (frontend-only session flag)
pages/
  dashboard.html           overview KPIs, today's lectures, recent reports, charts
  live-classroom.html      live lecture, detection state, camera panel (mock)
  lectures.html            lecture register  (+ ?id=L-… lecture details)
  attendance.html          attendance records, filters, KPIs
  syllabus.html            course coverage, topic register, covered/missing topics
  lecture-reports.html     report register   (+ ?id=RPT-… report viewer, print-safe)
  students.html            student directory (+ ?id=ST-… student profile)
  teachers.html            teacher directory (+ ?id=TCH-… teacher profile)
  courses.html             course register   (+ ?id=CS-301 course details)
  analytics.html           attendance trends, coverage, course comparison
  settings.html            profile / academic / notifications / display / system
css/
  global.css               design system, shell, sidebar, tables, cards, charts, responsive
  login.css                login screen
  <page>.css               one small stylesheet per page
js/
  data.js                  mock datasets + get*() data-access layer
  main.js                  shared shell: utils, icons, badges, charts, sidebar/topbar,
                           session guard, mobile drawer, delegated row navigation
  login.js                 login page
  <page>.js                one render module per page
```

Each page loads `data.js` → `main.js` → `<page>.js`, and the page module renders the
full shell into `#app` via `mountPage(...)`.

## Data layer (backend-ready)

Pages never touch `DATA` directly; they call the accessors in `js/data.js`:

`getStudents()` `getStudent(id)` `getTeachers()` `getTeacher(id)` `getCourses()`
`getCourse(code)` `getLectures()` `getLecture(id)` `getLiveLecture()` `getSyllabus(code)`
`getReports()` `getReport(id)` `getAttendance()` `getTranscript(id)` `getAnalytics()`

Later these become `fetch()` calls to FastAPI: `/api/students`, `/api/teachers`,
`/api/courses`, `/api/lectures`, `/api/attendance`, `/api/reports`, `/api/analytics`.

## Not implemented (intentionally)

Camera feeds, YOLO / OpenCV / face recognition, Whisper transcripts, NLP summaries and
ML analytics are **mock data only**. The Live Classroom page shows detection state as
"Waiting for service data" / "Not connected" rather than pretending a model is attached.
Settings are frontend-only and persist nothing.
