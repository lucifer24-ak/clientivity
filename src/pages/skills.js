/* ================================================================
   CLIENTIVITY — Skills & Work Tracking Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { showToast, miniConfetti, formatMinutes } from '../utils.js';
import { openModal, closeModal, refresh, navigate } from '../app.js';

export function renderSkills() {
  const skills = store.getSkills();
  const sessions = store.getSkillSessions();
  const weekMinutes = store.getSkillTimeForWeek();

  // Total weekly target across skills
  const totalWeeklyTarget = skills.reduce((sum, s) => sum + (s.weeklyGoal || 300), 0);
  const weekPercent = totalWeeklyTarget > 0 ? Math.min(100, Math.round((weekMinutes / totalWeeklyTarget) * 100)) : 0;

  // Recent 10 skill sessions sorted by date
  const recentSessions = [...sessions].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)).slice(0, 10);

  function getSkillLevel(totalMinutes) {
    const hours = totalMinutes / 60;
    if (hours < 10) return { level: 'Beginner', badge: 'badge-personal' };
    if (hours < 50) return { level: 'Practitioner', badge: 'badge-work' };
    if (hours < 200) return { level: 'Advanced', badge: 'badge-study' };
    return { level: 'Master', badge: 'badge-fitness' };
  }

  return `
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Skill & Work Studio</h1>
          <p class="text-sm text-secondary">Level up your core crafts through continuous practice</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-manage-skills">${icon('settings', 16)} Skills</button>
          <button class="btn btn-primary btn-sm" id="btn-log-skill">${icon('plus', 16)} Log Work</button>
        </div>
      </div>

      <!-- Weekly Summary -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5);background:linear-gradient(135deg, rgba(167,139,250,0.12), rgba(244,114,182,0.08));border:1px solid rgba(167,139,250,0.25)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <div>
            <span class="text-xs font-semibold uppercase text-tertiary" style="letter-spacing:0.5px">Weekly Practice Output</span>
            <div class="text-2xl font-bold" style="color:var(--c-skills)">${(weekMinutes / 60).toFixed(1)} / ${(totalWeeklyTarget / 60).toFixed(0)} hrs</div>
          </div>
          <span class="badge" style="background:var(--c-skills);color:#fff;font-weight:700;padding:4px 10px">${weekPercent}% of Target</span>
        </div>
        <div class="progress-bar" style="margin-top:var(--sp-2)">
          <div class="progress-bar-fill" style="width:${weekPercent}%;background:var(--c-skills)"></div>
        </div>
      </div>

      <!-- Skills List Grid -->
      <div style="margin-bottom:var(--sp-6)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-3)">
          <p class="label">Skills & Proficiency</p>
          <button class="text-xs text-accent font-medium" id="btn-quick-timer-skill">Focus Timer ${icon('timer', 12)}</button>
        </div>

        ${skills.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${icon('skills')}</div>
            <h3>No skills registered yet</h3>
            <p>Add skills like Video Editing, Programming, or Writing to track progress.</p>
            <button class="btn btn-primary btn-sm" id="btn-add-first-skill" style="margin-top:var(--sp-3)">Add Skill</button>
          </div>
        ` : `
          <div class="grid grid-2" style="gap:var(--sp-3)">
            ${skills.map(s => {
              const weekMins = store.getSkillTimeForWeek(s.id);
              const allMins = sessions.filter(sess => sess.skillId === s.id).reduce((sum, sess) => sum + (sess.duration || 0), 0);
              const goal = s.weeklyGoal || 300;
              const p = Math.min(100, Math.round((weekMins / goal) * 100));
              const lvl = getSkillLevel(allMins);
              return `
                <div class="card" style="padding:var(--sp-4);border-top:4px solid ${s.color || '#A78BFA'}">
                  <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
                    <div class="font-bold text-sm flex items-center gap-2">
                      <div style="width:10px;height:10px;border-radius:50%;background:${s.color || '#A78BFA'}"></div>
                      ${s.name}
                    </div>
                    <span class="badge ${lvl.badge}">${lvl.level}</span>
                  </div>
                  <div class="text-xs text-secondary" style="margin-bottom:var(--sp-2)">
                    Total: <strong>${(allMins / 60).toFixed(1)} hrs</strong> logged
                  </div>
                  <div class="flex items-baseline justify-between text-xs" style="margin-bottom:4px">
                    <span class="text-tertiary">This Week: ${formatMinutes(weekMins)}</span>
                    <span class="font-semibold" style="color:${s.color || '#A78BFA'}">${p}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill" style="width:${p}%;background:${s.color || '#A78BFA'}"></div>
                  </div>
                  <div class="flex justify-end" style="margin-top:var(--sp-3)">
                    <button class="btn btn-secondary btn-sm btn-quick-log-skill" data-skill-id="${s.id}" style="padding:3px 8px;font-size:11px">+ Log Work</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Recent Practice Logs -->
      <div>
        <p class="label" style="margin-bottom:var(--sp-3)">Recent Work Logs</p>
        ${recentSessions.length === 0 ? `
          <div class="card" style="padding:var(--sp-4);text-align:center;color:var(--t-tertiary)">
            No work logged yet. Click <strong>Log Work</strong> above to record a session.
          </div>
        ` : `
          <div class="card" style="padding:0">
            ${recentSessions.map((sess, idx) => {
              const sk = skills.find(s => s.id === sess.skillId);
              const color = sk ? sk.color : '#A78BFA';
              const name = sk ? sk.name : (sess.skillName || 'Skill');
              return `
                <div class="flex items-center justify-between" style="padding:var(--sp-3) var(--sp-4);${idx !== recentSessions.length - 1 ? 'border-bottom:1px solid var(--b-subtle)' : ''}">
                  <div class="flex items-center gap-3">
                    <div style="width:36px;height:36px;border-radius:var(--r-md);background:${color}22;color:${color};display:flex;align-items:center;justify-content:center;font-weight:700">
                      ${icon('skills', 18)}
                    </div>
                    <div>
                      <div class="font-semibold text-sm">${name}</div>
                      <div class="text-xs text-tertiary">${sess.notes || 'Practice session'} · ${sess.date || 'Today'}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="badge" style="background:${color}22;color:${color};font-weight:700">+${formatMinutes(sess.duration)}</span>
                    <button class="btn-icon btn-sm text-tertiary btn-delete-skill-sess" data-sess-id="${sess.id}">${icon('trash', 14)}</button>
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

export function initSkills() {
  document.getElementById('btn-log-skill')?.addEventListener('click', () => openLogSkillModal());
  document.getElementById('btn-quick-timer-skill')?.addEventListener('click', () => navigate('timer'));
  document.getElementById('btn-manage-skills')?.addEventListener('click', () => openManageSkillsModal());
  document.getElementById('btn-add-first-skill')?.addEventListener('click', () => openManageSkillsModal());

  document.querySelectorAll('.btn-quick-log-skill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLogSkillModal(btn.dataset.skillId);
    });
  });

  document.querySelectorAll('.btn-delete-skill-sess').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.sessId;
      if (confirm('Delete this practice log?')) {
        store.deleteSkillSession(id);
        showToast('Practice log deleted');
        refresh();
      }
    });
  });
}

function openLogSkillModal(defaultSkillId = '') {
  const skills = store.getSkills();
  if (skills.length === 0) {
    showToast('Please add a skill first!');
    openManageSkillsModal();
    return;
  }

  const defaultSk = defaultSkillId || skills[0]?.id;

  const html = `
    <form id="form-skill-log">
      <div class="form-group">
        <label class="form-label">Skill / Work Stream</label>
        <select class="form-select" id="log-skill-id" required>
          ${skills.map(s => `<option value="${s.id}" ${s.id === defaultSk ? 'selected' : ''}>${s.name}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Duration (Minutes)</label>
        <div class="flex gap-2" style="margin-bottom:var(--sp-2)">
          <button type="button" class="btn btn-secondary btn-sm dur-preset-skill" data-dur="30">30m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset-skill" data-dur="60">60m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset-skill" data-dur="90">90m</button>
          <button type="button" class="btn btn-secondary btn-sm dur-preset-skill" data-dur="120">120m</button>
        </div>
        <input type="number" class="form-input" id="log-skill-duration" min="5" max="720" value="60" required />
      </div>

      <div class="form-group">
        <label class="form-label">Work Summary / Project Notes</label>
        <input type="text" class="form-input" id="log-skill-notes" placeholder="e.g. Edited Chapter 2, built landing page..." />
      </div>

      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" class="form-input" id="log-skill-date" value="${store.todayKey()}" required />
      </div>

      <div class="flex justify-end gap-2" style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">${icon('check', 16)} Save Log</button>
      </div>
    </form>
  `;

  openModal('Log Work / Skill Practice', html, (modal) => {
    modal.querySelector('#modal-cancel').addEventListener('click', closeModal);

    modal.querySelectorAll('.dur-preset-skill').forEach(b => {
      b.addEventListener('click', () => {
        modal.querySelector('#log-skill-duration').value = b.dataset.dur;
      });
    });

    modal.querySelector('#form-skill-log').addEventListener('submit', (e) => {
      e.preventDefault();
      const skillId = modal.querySelector('#log-skill-id').value;
      const duration = parseInt(modal.querySelector('#log-skill-duration').value, 10);
      const notes = modal.querySelector('#log-skill-notes').value.trim();
      const date = modal.querySelector('#log-skill-date').value;

      store.addSkillSession({ skillId, duration, notes, date });
      closeModal();
      showToast('Practice logged! 💻');
      miniConfetti(window.innerWidth / 2, window.innerHeight / 2);
      refresh();
    });
  });
}

function openManageSkillsModal() {
  const skills = store.getSkills();

  const html = `
    <div>
      <div style="margin-bottom:var(--sp-4)">
        <p class="label" style="margin-bottom:var(--sp-2)">Add New Skill</p>
        <form id="form-new-skill" class="flex flex-col gap-3">
          <div class="flex gap-2">
            <input type="text" class="form-input" id="new-skill-name" placeholder="Skill Name (e.g. UI Design)" required style="flex:1" />
            <input type="color" id="new-skill-color" value="#A78BFA" style="width:44px;height:44px;border:none;border-radius:var(--r-md);cursor:pointer;background:transparent" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-secondary" style="white-space:nowrap">Weekly Target (hrs):</span>
            <input type="number" class="form-input" id="new-skill-goal" value="7" min="1" max="100" style="width:80px" />
            <button type="submit" class="btn btn-primary btn-sm" style="margin-left:auto">${icon('plus', 14)} Add</button>
          </div>
        </form>
      </div>

      <div class="divider" style="margin:var(--sp-4) 0"></div>

      <p class="label" style="margin-bottom:var(--sp-2)">Active Skills</p>
      <div class="flex flex-col gap-2" style="max-height:220px;overflow-y:auto">
        ${skills.map(s => `
          <div class="flex items-center justify-between" style="padding:var(--sp-2) var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--b-subtle)">
            <div class="flex items-center gap-2">
              <div style="width:12px;height:12px;border-radius:50%;background:${s.color}"></div>
              <span class="font-semibold text-sm">${s.name}</span>
              <span class="text-xs text-tertiary">(${(s.weeklyGoal / 60).toFixed(1)} hrs/wk)</span>
            </div>
            <button class="btn-icon btn-sm text-tertiary btn-del-skill" data-skill-id="${s.id}">${icon('trash', 14)}</button>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-done">Done</button>
      </div>
    </div>
  `;

  openModal('Manage Skills', html, (modal) => {
    modal.querySelector('#modal-done').addEventListener('click', closeModal);

    modal.querySelector('#form-new-skill').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modal.querySelector('#new-skill-name').value.trim();
      const color = modal.querySelector('#new-skill-color').value;
      const hours = parseFloat(modal.querySelector('#new-skill-goal').value) || 7;

      if (name) {
        store.addSkill({ name, color, weeklyGoal: Math.round(hours * 60) });
        showToast(`Added skill "${name}"`);
        closeModal();
        refresh();
      }
    });

    modal.querySelectorAll('.btn-del-skill').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.skillId;
        if (confirm('Delete skill and recorded practice logs?')) {
          store.deleteSkill(id);
          showToast('Skill deleted');
          closeModal();
          refresh();
        }
      });
    });
  });
}
