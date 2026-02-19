/* ============================================================
   RoadEye – app.js
   ============================================================ */

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

/* ── Report Form – Issue Type ──────────────────────────── */
function selectIssue(btn, val) {
  document.querySelectorAll('.issue-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedIssue = val;
}

/* ── Report Form – Severity ────────────────────────────── */
function selectSev(btn, val) {
  document.querySelectorAll('.sev-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSev = val;
}

/* ── Report Form – Step Navigation ────────────────────── */
function goStep(n) {
  // Hide all sub-steps
  ['report-step-1', 'report-step-2', 'report-step-3', 'report-success'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Populate review step before showing it
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

/* ── Report Form – Submit ──────────────────────────────── */
function submitReport() {
  ['report-step-1', 'report-step-2', 'report-step-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  document.getElementById('report-success').style.display = 'block';
}

/* ── Report Form – File Upload ─────────────────────────── */
function handleFile(input) {
  if (input.files.length > 0) {
    document.getElementById('file-preview').style.display = 'block';
  }
}

/* ── Map – Filter Tabs ─────────────────────────────────── */
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
