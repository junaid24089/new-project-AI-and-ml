/*
 * Mock data layer.
 * Every page reads data through the get*() accessors below, never from DATA
 * directly. When the FastAPI backend is ready, only these accessors change:
 *   getStudents()  ->  GET /api/students          getReports()    -> /api/reports
 *   getTeachers()  ->  GET /api/teachers          getAttendance() -> /api/attendance
 *   getCourses()   ->  GET /api/courses           getAnalytics()  -> /api/analytics
 *   getLectures()  ->  GET /api/lectures          getSyllabus()   -> /api/syllabus
 */
const DATA = {
  org: { name: "BBSUL", short: "BBSUL", dept: "Computer Science", year: "2025-26" },
  user: { name: "Junaid Ali", role: "Department Admin", initials: "JA" },

  students: [
    { id: "ST-2024-018", roll: "CS-24-018", name: "Ahmed Raza", email: "ahmed.raza@bbsul.edu", dept: "Computer Science", semester: 4, section: "A", attendance: 88, face: "Registered", status: "Active" },
    { id: "ST-2024-026", roll: "CS-24-026", name: "Hira Noor", email: "hira.noor@bbsul.edu", dept: "Computer Science", semester: 4, section: "A", attendance: 79, face: "Registered", status: "Active" },
    { id: "ST-2024-041", roll: "EE-24-041", name: "Bilal Shah", email: "bilal.shah@bbsul.edu", dept: "Electrical Engineering", semester: 4, section: "B", attendance: 91, face: "Not registered", status: "Active" },
    { id: "ST-2024-052", roll: "SE-24-052", name: "Zara Ali", email: "zara.ali@bbsul.edu", dept: "Software Engineering", semester: 6, section: "A", attendance: 64, face: "Not registered", status: "Review" }
  ],

  teachers: [
    { id: "TCH-018", name: "Dr. Ayesha Malik", email: "ayesha.malik@bbsul.edu", dept: "Computer Science", courses: 3, lectures: 42, attendanceAvg: 84, coverageAvg: 76, status: "Active" },
    { id: "TCH-011", name: "Dr. Omar Farooq", email: "omar.farooq@bbsul.edu", dept: "Computer Science", courses: 2, lectures: 38, attendanceAvg: 91, coverageAvg: 82, status: "Active" },
    { id: "TCH-023", name: "Ms. Iman Tariq", email: "iman.tariq@bbsul.edu", dept: "Software Engineering", courses: 2, lectures: 27, attendanceAvg: 78, coverageAvg: 68, status: "Active" },
    { id: "TCH-007", name: "Dr. Hamza Qureshi", email: "hamza.qureshi@bbsul.edu", dept: "Artificial Intelligence", courses: 4, lectures: 56, attendanceAvg: 88, coverageAvg: 54, status: "On leave" }
  ],

  courses: [
    { code: "CS-301", name: "Object-Oriented Programming", teacherId: "TCH-018", teacher: "Dr. Ayesha Malik", semester: 4, section: "A", students: 34, lectures: 12, coverage: 76, status: "Active" },
    { code: "CS-205", name: "Data Structures", teacherId: "TCH-011", teacher: "Dr. Omar Farooq", semester: 4, section: "A", students: 41, lectures: 14, coverage: 82, status: "Active" },
    { code: "SE-210", name: "Software Design", teacherId: "TCH-023", teacher: "Ms. Iman Tariq", semester: 4, section: "B", students: 29, lectures: 10, coverage: 68, status: "Active" },
    { code: "AI-312", name: "Machine Learning", teacherId: "TCH-007", teacher: "Dr. Hamza Qureshi", semester: 6, section: "A", students: 38, lectures: 9, coverage: 54, status: "Needs review" }
  ],

  lectures: [
    { id: "L-2025-092", course: "AI-312", courseName: "Machine Learning", teacherId: "TCH-007", teacher: "Dr. Hamza Qureshi", classroom: "Room B-101", date: "14 Mar 2026", start: "13:00", end: "14:30", duration: "90 min", studentsN: 38, present: null, absent: null, late: null, attendance: null, coverage: null, status: "Upcoming" },
    { id: "L-2025-091", course: "CS-301", courseName: "Object-Oriented Programming", teacherId: "TCH-018", teacher: "Dr. Ayesha Malik", classroom: "Lab B-204", date: "14 Mar 2026", start: "09:00", end: "10:25", duration: "85 min", studentsN: 34, present: 29, absent: 3, late: 2, attendance: 84, coverage: 76, status: "Live" },
    { id: "L-2025-090", course: "CS-205", courseName: "Data Structures", teacherId: "TCH-011", teacher: "Dr. Omar Farooq", classroom: "Room A-112", date: "14 Mar 2026", start: "08:00", end: "09:20", duration: "80 min", studentsN: 41, present: 37, absent: 2, late: 2, attendance: 91, coverage: 82, status: "Completed" },
    { id: "L-2025-089", course: "SE-210", courseName: "Software Design", teacherId: "TCH-023", teacher: "Ms. Iman Tariq", classroom: "Lab C-104", date: "13 Mar 2026", start: "11:00", end: "12:15", duration: "75 min", studentsN: 29, present: 22, absent: 5, late: 2, attendance: 78, coverage: 68, status: "Completed" }
  ],

  syllabus: {
    "CS-301": [
      { name: "Introduction to OOP", status: "Covered", lecture: "L-2025-091", date: "14 Mar 2026" },
      { name: "Classes", status: "Covered", lecture: "L-2025-091", date: "—" },
      { name: "Objects", status: "Covered", lecture: "L-2025-091", date: "—" },
      { name: "Encapsulation", status: "Covered", lecture: "L-2025-091", date: "—" },
      { name: "Inheritance", status: "Partially covered", lecture: "L-2025-091", date: "—" },
      { name: "Polymorphism", status: "Missing", lecture: "—", date: "—" },
      { name: "Abstraction", status: "Missing", lecture: "—", date: "—" }
    ]
  },

  reports: [
    { id: "RPT-2025-091", lectureId: "L-2025-091", course: "CS-301", courseName: "Object-Oriented Programming", teacher: "Dr. Ayesha Malik", date: "14 Mar 2026", attendance: 84, coverage: 76, generatedAt: "14 Mar 2026 · 10:41", status: "Available" },
    { id: "RPT-2025-090", lectureId: "L-2025-090", course: "CS-205", courseName: "Data Structures", teacher: "Dr. Omar Farooq", date: "14 Mar 2026", attendance: 91, coverage: 82, generatedAt: "14 Mar 2026 · 09:36", status: "Available" },
    { id: "RPT-2025-089", lectureId: "L-2025-089", course: "SE-210", courseName: "Software Design", teacher: "Ms. Iman Tariq", date: "13 Mar 2026", attendance: 78, coverage: 68, generatedAt: "13 Mar 2026 · 12:33", status: "Available" }
  ],

  attendanceRecords: [
    { studentId: "ST-2024-018", name: "Ahmed Raza", course: "CS-301", date: "14 Mar 2026", lecture: "L-2025-091", status: "Present", time: "09:04:12" },
    { studentId: "ST-2024-026", name: "Hira Noor", course: "CS-301", date: "14 Mar 2026", lecture: "L-2025-091", status: "Late", time: "09:11:08" },
    { studentId: "ST-2024-041", name: "Bilal Shah", course: "CS-301", date: "14 Mar 2026", lecture: "L-2025-091", status: "Present", time: "09:05:37" },
    { studentId: "ST-2024-052", name: "Zara Ali", course: "SE-210", date: "13 Mar 2026", lecture: "L-2025-089", status: "Absent", time: "—" }
  ],

  transcript: {
    "L-2025-091": [
      "Today we are moving from the idea of a class as a design into the objects that carry its state. A class describes the shape and behaviour we expect, while an object is a concrete instance that can respond to those behaviours. We will begin with a simple account example, then use encapsulation to keep internal state protected from accidental changes.",
      "Once the base class is clear, inheritance lets a specialised class reuse a common interface. The important distinction is that reuse should support a clear model rather than simply shorten the code."
    ]
  },

  attendanceTrend: [
    { d: "01 Mar", v: 82 }, { d: "03 Mar", v: 84 }, { d: "05 Mar", v: 78 }, { d: "07 Mar", v: 88 },
    { d: "09 Mar", v: 86 }, { d: "11 Mar", v: 91 }, { d: "13 Mar", v: 84 }, { d: "14 Mar", v: 88 }
  ],

  courseAttendance: [
    { name: "CS-301 OOP", v: 91 }, { name: "CS-204 Data Structures", v: 88 }, { name: "SE-310 Software Eng.", v: 84 },
    { name: "AI-220 Intro AI", v: 82 }, { name: "DB-215 Databases", v: 78 }, { name: "MATH-205 Discrete", v: 76 }
  ],

  courseCoverage: [
    { name: "CS-301 OOP", v: 88 }, { name: "SE-310 Software Eng.", v: 82 }, { name: "CS-204 Data Structures", v: 76 },
    { name: "DB-215 Databases", v: 72 }, { name: "AI-220 Intro AI", v: 64 }, { name: "MATH-205 Discrete", v: 58 }
  ]
};


/* ===== Data access layer (mock -> future API) ===== */
function getOrg()       { return DATA.org; }
function getUser()      { return DATA.user; }
function getStudents()  { return DATA.students.slice(); }
function getStudent(id) { return DATA.students.find(s => s.id === id) || null; }
function getTeachers()  { return DATA.teachers.slice(); }
function getTeacher(id) { return DATA.teachers.find(t => t.id === id) || null; }
function getCourses()   { return DATA.courses.slice(); }
function getCourse(code){ return DATA.courses.find(c => c.code === code) || null; }
function getLectures()  { return DATA.lectures.slice(); }
function getLecture(id) { return DATA.lectures.find(l => l.id === id) || null; }
function getLiveLecture(){ return DATA.lectures.find(l => l.status === "Live") || null; }
function getSyllabus(code){ return (DATA.syllabus[code] || []).slice(); }
function getReports()   { return DATA.reports.slice(); }
function getReport(id)  { return DATA.reports.find(r => r.id === id) || null; }
function getAttendance(){ return DATA.attendanceRecords.slice(); }
function getTranscript(lectureId){ return (DATA.transcript[lectureId] || []).slice(); }
function getAnalytics() {
  return {
    attendanceTrend: DATA.attendanceTrend.slice(),
    courseAttendance: DATA.courseAttendance.slice(),
    courseCoverage: DATA.courseCoverage.slice()
  };
}
