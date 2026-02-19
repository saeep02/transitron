
/* ── State ─────────────────────────────────────────────── */
let selectedIssue = '';
let selectedSev   = '';

/* ── Page Navigation ───────────────────────────────────── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  document.getElementById('page-' + name).classList.add('active');

  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');

  window.scrollTo(0, 0);
}

/* ── Report Form──────────────────────────── */
function selectIssue(btn, val) {
  document.querySelectorAll('.issue-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedIssue = val;
}

/*  Severity ────────────────────────────── */
function selectSev(btn, val) {
  document.querySelectorAll('.sev-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSev = val;
}

/*Step Navigation ────────────────────── */
function goStep(n) {
  // Hide all sub-steps
  ['report-step-1', 'report-step-2', 'report-step-3', 'report-success'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  //
  if (n === 3) {
    document.getElementById('rv-type').textContent  = selectedIssue || '(not selected)';
    document.getElementById('rv-sev').textContent   = selectedSev   || '(not selected)';
    document.getElementById('rv-loc').textContent   = document.getElementById('inp-location').value  || '(not specified)';
    document.getElementById('rv-desc').textContent  = document.getElementById('inp-desc').value      || '(none)';
    document.getElementById('rv-photo').textContent = document.getElementById('fileInput').files.length > 0
      ? '✓ Attached'
      : 'Not uploaded';
  }

  const el = document.getElementById('report-step-' + n);
  if (el) el.style.display = 'block';
}


function submitReport() {
  ['report-step-1', 'report-step-2', 'report-step-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  document.getElementById('report-success').style.display = 'block';
}

/*File Upload ─────────────────────────── */
function handleFile(input) {
  if (input.files.length > 0) {
    document.getElementById('file-preview').style.display = 'block';
  }
}

/* Filter Tabs ─────────────────────────────────── */
function filterMap(btn, filter) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Future: filter the issue list by `filter` value
}

/* ── Leaderboard – Tab Switching ───────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/* ── Admin – Tab Switching ─────────────────────────────── */
function adminTab(btn, tabName) {
  document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.admin-tab-content').forEach(t => t.style.display = 'none');
  document.getElementById('tab-' + tabName).style.display = 'block';
  document.getElementById('admin-page-title').textContent =
    tabName.charAt(0).toUpperCase() + tabName.slice(1);
}

/* ── Admin – Assign Modal ──────────────────────────────── */
let currentAssignBtn = null;

function assignComplaint(btn) {
  currentAssignBtn = btn;
  document.getElementById('assign-modal').style.display = 'flex';
}

function closeAssign() {
  document.getElementById('assign-modal').style.display = 'none';
  currentAssignBtn = null;
}

function confirmAssign() {
  if (currentAssignBtn) {
    const dept = document.getElementById('assign-dept').value;
    const row = currentAssignBtn.closest('tr');
    // Update status badge
    const statusCell = row.querySelector('.status-badge');
    if (statusCell) {
      statusCell.textContent = 'In Progress';
      statusCell.className = 'status-badge status-progress';
    }
    // Update dept cell if present
    const deptCell = row.querySelector('.dept-tag');
    if (deptCell) deptCell.textContent = dept;
    // Swap button
    currentAssignBtn.textContent = 'View';
    currentAssignBtn.className = 'admin-btn-view';
    currentAssignBtn.onclick = null;
  }
  closeAssign();
}


document.addEventListener('click', function(e) {
  const modal = document.getElementById('assign-modal');
  if (modal && e.target === modal) closeAssign();
});

/* ── Login – Type Switch (Citizen / Official) ──────────── */
function switchLoginType(type) {
  document.getElementById('tab-citizen').classList.toggle('active', type === 'citizen');
  document.getElementById('tab-official').classList.toggle('active', type === 'official');
  document.getElementById('login-citizen').style.display  = type === 'citizen'  ? 'block' : 'none';
  document.getElementById('login-official').style.display = type === 'official' ? 'block' : 'none';
  document.getElementById('login-signup').style.display   = 'none';
}

/* ── Login – Email / Phone Method Switch ───────────────── */
function switchMethod(btn, formId) {
  document.querySelectorAll('.login-method-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('email-form').style.display = formId === 'email-form' ? 'block' : 'none';
  document.getElementById('phone-form').style.display = formId === 'phone-form' ? 'block' : 'none';
}

/* ── Login – Send OTP ──────────────────────────────────── */
function sendOTP() {
  const phone = document.getElementById('phone-input').value;
  if (!phone || phone.length < 10) {
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }
  document.getElementById('send-otp-btn').textContent = '✓ OTP Sent!';
  document.getElementById('send-otp-btn').style.background = 'var(--green)';
  document.getElementById('otp-section').style.display = 'block';
  document.querySelectorAll('.otp-input')[0].focus();
}

/* ── Login – OTP Box Auto-advance ─────────────────────── */
function otpNext(input) {
  if (input.value.length === 1) {
    const inputs = document.querySelectorAll('.otp-input');
    const idx = Array.from(inputs).indexOf(input);
    if (idx < inputs.length - 1) inputs[idx + 1].focus();
  }
}

/* ── Login – Password Toggle ───────────────────────────── */
function togglePw(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

/* ── Login – Sign Up Form ──────────────────────────────── */
function showSignup() {
  document.getElementById('login-citizen').style.display = 'none';
  document.getElementById('login-signup').style.display  = 'block';
}
function backToLogin() {
  document.getElementById('login-signup').style.display  = 'none';
  document.getElementById('login-citizen').style.display = 'block';
}

/* ── Login – Submit (demo) ─────────────────────────────── */
function doLogin(type) {
  if (type === 'official') {
    showPage('admin');
  } else {
    showPage('home');
  }
}
