/* ================================================================
   CLIENTIVITY — Study Tracking Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { showToast, miniConfetti, formatMinutes } from '../utils.js';
import { openModal, closeModal, refresh, navigate } from '../app.js';

export function renderStudy() {
  const subjects = store.getSubjects();
  const sessions = store.getStudySessions();
  const todayMinutes = store.getStudyTimeForDay();
  const weekMinutes = store.getStudyTimeForWeek();

  // Total weekly target across all subjects
  const totalWeeklyTarget = subjects.reduce((sum, s) => sum + (s.weeklyGoal || 300), 0);
  const weekPercent = totalWeeklyTarget > 0 ? Math.min(100, Math.round((weekMinutes / totalWeeklyTarget) * 100)) : 0;

  // Recent 10 sessions sorted by date
  const recentSessions = [...sessions].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)).slice(0, 10);

  return `
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Study Operating Center</h1>
          <p class="text-sm text-secondary">Track focus hours, subjects & active recall progress</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-manage-subjects">${icon('settings', 16)} Subjects</button>
          <button class="btn btn-primary btn-sm" id="btn-log-study">${icon('plus', 16)} Log Session</button>
        </div>
      </div>

      <!-- Stats Overview Header -->
      <div class="grid grid-2" style="margin-bottom:var(--sp-5);gap:var(--sp-3)">
        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(78,168,246,0.12), rgba(108,92,231,0.08));border:1px solid rgba(78,168,246,0.25)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
            <span class="text-xs font-semibold uppercase text-tertiary" style="letter-spacing:0.5px">Today's Focus</span>
            <span class="badge badge-study">${icon('study', 12)} Active</span>
          </div>
          <div class="text-2xl font-bold" style="color:var(--c-study)">${formatMinutes(todayMinutes)}</div>
          <p class="text-xs text-secondary" style="margin-top:var(--sp-1)">Logged across all subjects today</p>
        </div>

        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(0,214,143,0.12), rgba(78,168,246,0.08));border:1px solid rgba(0,214,143,0.25)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
            <span class="text-xs font-semibold uppercase text-tertiary" style="letter-spacing:0.5px">This Week Goal</span>
            <span class="text-xs font-bold" style="color:var(--c-success)">${weekPercent}%</span>
          </div>
          <div class="text-2xl font-bold" style="color:var(--c-success)">${(weekMinutes / 60).toFixed(1)} / ${(totalWeeklyTarget / 60).toFixed(0)} hrs</div>
          <div class="progress-bar" style="margin-top:var(--sp-2)">
            <div class="progress-bar-fill" style="width:${weekPercent}%;background:var(--c-success)"></div>
          </div>
        </div>
      </div>

      <!-- Subjects Grid -->
      <div style="margin-bottom:var(--sp-6)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-3)">
          <p class="label">Subjects & Targets</p>
          <button class="text-xs text-accent font-medium" id="btn-quick-timer">Start Timer ${icon('timer', 12)}</button>
        </div>

        ${subjects.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${icon('study')}</div>
            <h3>No subjects created yet</h3>
            <p>Add subjects like Math, Science, or Computer Science to track study hours.</p>
            <button class="btn btn-primary btn-sm" id="btn-add-first-subject" style="margin-top:var(--sp-3)">Add Subject</button>
          </div>
        ` : `
          <div class="grid grid-2" style="gap:var(--sp-3)">
            ${subjects.map(s => {
              const sMinutes = store.getStudyTimeForSubjectWeek(s.id);
              const goal = s.weeklyGoal || 300;
              const p = Math.min(100, Math.round((sMinutes / goal) * 100));
              return `
                <div class="card" style="padding:var(--sp-4);border-left:4px solid ${s.color || '#4EA8F6'}">
                  <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
                    <div class="flex items-center gap-2">
                      <div style="width:10px;height:10px;border-radius:50%;background:${s.color || '#4EA8F6'}"></div>
                      <span class="font-bold text-sm">${s.name}</span>
                    </div>
                    <button class="btn-icon btn-sm btn-quick-log-sub" data-sub-id="${s.id}" title="Quick log">${icon('plus', 14)}</button>
                  </div>
                  <div class="flex items-baseline justify-between" style="margin-bottom:var(--sp-1)">
                    <span class="text-xs text-secondary">${formatMinutes(sMinutes)} / ${formatMinutes(goal)}</span>
                    <span class="text-xs font-semibold" style="color:${s.color || '#4EA8F6'}">${p}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill" style="width:${p}%;background:${s.color || '#4EA8F6'}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Recent Study Sessions Log -->
      <div>
        <p class="label" style="margin-bottom:var(--sp-3)">Recent Focus Logs</p>
        ${recentSessions.length === 0 ? `
          <div class="card" style="padding:var(--sp-4);text-align:center;color:var(--t-tertiary)">
            No study sessions logged yet. Tap <strong>Log Session</strong> above to add one.
          </div>
        ` : `
          <div class="card" style="padding:0">
            ${recentSessions.map((sess, idx) => {
              const sub = subjects.find(s => s.id === sess.subjectId);
              const color = sub ? sub.color : '#4EA8F6';
              const name = sub ? sub.name : (sess.subjectName || 'Study');
              return `
                <div class="flex items-center justify-between" style="padding:var(--sp-3) var(--sp-4);${idx !== recentSessions.length - 1 ? 'border-bottom:1px solid var(--b-subtle)' : ''}">
                  <div class="flex items-center gap-3">
                    <div style="width:36px;height:36px;border-radius:var(--r-md);background:${color}22;color:${color};display:flex;align-items:center;justify-content:center;font-weight:700">
                      ${icon('study', 18)}
                    </div>
                    <div>
                      <div class="font-semibold text-sm">${name}</div>
                      <div class="text-xs text-tertiary">${sess.notes || 'Focus session'} · ${sess.date || 'Today'}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="badge" style="background:${color}22;color:${color};font-weight:700">+${formatMinutes(sess.duration)}</span>
                    <button class="btn-icon btn-sm text-tertiary btn-delete-sess" data-sess-id="${sess.id}">${icon('trash', 14)}</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

export function initStudy() {
  // Log Study Session Modal
  document.getElementById('btn-log-study')?.addEventListener('click', () => openLogModal());
  document.getElementById('btn-quick-timer')?.addEventListener('click', () => navigate('timer'));
  document.getElementById('btn-manage-subjects')?.addEventListener('click', () => openManageSubjectsModal());
  document.getElementById('btn-add-first-subject')?.addEventListener('click', () => openManageSubjectsModal());

  // Quick log for subject
  document.querySelectorAll('.btn-quick-log-sub').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLogModal(btn.dataset.subId);
    });
  });

  // Delete session
  document.querySelectorAll('.btn-delete-sess').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.sessId;
      if (confirm('Delete this study log?')) {
        store.deleteStudySession(id);
        showToast('Study session deleted');
        refresh();
      }
    });
  });
}

function openLogModal(defaultSubjectId = '') {
  const subjects = store.getSubjects();
  if (subjects.length === 0) {
    showToast('Please add a subject first!');
    openManageSubjectsModal();
    return;
  }

  const defaultSub = defaultSubjectId || subjects[0]?.id;

  const html = `
    <form id="form-study-log">
      <div class="form-group">
        <label class="form-label">Subject</label>
        <select class="form-select" id="log-subject-id" required>
          ${subjects.map(s => `<option value="${s.id}" ${s.id === defaultSub ? 'selected' : ''}>${s.name}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Duration (Minutes)</label>
        <div class="flex gap-2" style="margin-bottom:var(--sp-2)">
          <button type="button" class="btn btn-secondary btn-sm dur-preset" data-dur="25">25m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset" data-dur="45">45m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset" data-dur="60">60m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset" data-dur="90">90m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset" data-dur="120">120m</button>
        </div>
        <input type="number" class="form-input" id="log-duration" min="5" max="720" value="60" required />
      </div>

      <div class="form-group">
        <label class="form-label">Topic / Notes (Optional)</label>
        <input type="text" class="form-input" id="log-notes" placeholder="e.g. Calculus chapter 4, Organic Synthesis review..." />
      </div>

      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" class="form-input" id="log-date" value="${store.todayKey()}" required />
      </div>

      <div class="flex justify-end gap-2" style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">${icon('check', 16)} Save Session</button>
      </div>
    </form>
  `;

  openModal('Log Study Session', html, (modal) => {
    modal.querySelector('#modal-cancel').addEventListener('click', closeModal);

    // Preset duration buttons
    modal.querySelectorAll('.dur-preset').forEach(b => {
      b.addEventListener('click', () => {
        modal.querySelector('#log-duration').value = b.dataset.dur;
      });
    });

    modal.querySelector('#form-study-log').addEventListener('submit', (e) => {
      e.preventDefault();
      const subjectId = modal.querySelector('#log-subject-id').value;
      const duration = parseInt(modal.querySelector('#log-duration').value, 10);
      const notes = modal.querySelector('#log-notes').value.trim();
      const date = modal.querySelector('#log-date').value;

      store.addStudySession({ subjectId, duration, notes, date });
      closeModal();
      showToast('Study session logged! 📚');
      miniConfetti(window.innerWidth / 2, window.innerHeight / 2);
      refresh();
    });
  });
}

function openManageSubjectsModal() {
  const subjects = store.getSubjects();

  const html = `
    <div>
      <div style="margin-bottom:var(--sp-4)">
        <p class="label" style="margin-bottom:var(--sp-2)">Add New Subject</p>
        <form id="form-new-subject" class="flex flex-col gap-3">
          <div class="flex gap-2">
            <input type="text" class="form-input" id="new-sub-name" placeholder="Subject Name (e.g. Neuroscience)" required style="flex:1" />
            <input type="color" id="new-sub-color" value="#4EA8F6" style="width:44px;height:44px;border:none;border-radius:var(--r-md);cursor:pointer;background:transparent" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-secondary" style="white-space:nowrap">Weekly Target (hrs):</span>
            <input type="number" class="form-input" id="new-sub-goal" value="7" min="1" max="100" style="width:80px" />
            <button type="submit" class="btn btn-primary btn-sm" style="margin-left:auto">${icon('plus', 14)} Add</button>
          </div>
        </form>
      </div>

      <div class="divider" style="margin:var(--sp-4) 0"></div>

      <p class="label" style="margin-bottom:var(--sp-2)">Existing Subjects</p>
      <div class="flex flex-col gap-2" style="max-height:220px;overflow-y:auto">
        ${subjects.map(s => `
          <div class="flex items-center justify-between" style="padding:var(--sp-2) var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--b-subtle)">
            <div class="flex items-center gap-2">
              <div style="width:12px;height:12px;border-radius:50%;background:${s.color}"></div>
              <span class="font-semibold text-sm">${s.name}</span>
              <span class="text-xs text-tertiary">(${(s.weeklyGoal / 60).toFixed(1)} hrs/wk)</span>
            </div>
            <button class="btn-icon btn-sm text-tertiary btn-del-sub" data-sub-id="${s.id}">${icon('trash', 14)}</button>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-done">Done</button>
      </div>
    </div>
  `;

  openModal('Manage Subjects', html, (modal) => {
    modal.querySelector('#modal-done').addEventListener('click', closeModal);

    modal.querySelector('#form-new-subject').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modal.querySelector('#new-sub-name').value.trim();
      const color = modal.querySelector('#new-sub-color').value;
      const hours = parseFloat(modal.querySelector('#new-sub-goal').value) || 5;

      if (name) {
        store.addSubject({ name, color, weeklyGoal: Math.round(hours * 60) });
        showToast(`Added subject "${name}"`);
        closeModal();
        refresh();
      }
    });

    modal.querySelectorAll('.btn-del-sub').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.subId;
        if (confirm('Delete subject and all related study sessions?')) {
          store.deleteSubject(id);
          showToast('Subject deleted');
          closeModal();
          refresh();
        }
      });
    });
  });
}
