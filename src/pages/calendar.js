/* ================================================================
   CLIENTIVITY — Calendar Overview Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { dateKey } from '../store.js';
import { openModal, closeModal } from '../app.js';

let currentDate = new Date();

export function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const firstDayIndex = new Date(year, month, 1).getDay();
  // Adjust so Monday is index 0
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const deadlines = store.getDeadlines();
  const tasks = store.getTasks();
  const studySessions = store.getStudySessions();
  const skillSessions = store.getSkillSessions();
  const dailyProgress = store.getAllDailyProgress();

  const calendarDays = [];
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push({ empty: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayObj = new Date(year, month, d);
    const dk = dateKey(dayObj);

    // Items for this day
    const dayDeadlines = deadlines.filter(dl => dl.dueDate === dk);
    const dayTasks = tasks.filter(t => t.dueDate === dk);
    const dayStudyMins = studySessions.filter(s => s.date === dk).reduce((sum, s) => sum + (s.duration || 0), 0);
    const daySkillMins = skillSessions.filter(s => s.date === dk).reduce((sum, s) => sum + (s.duration || 0), 0);
    const dayNNs = dailyProgress[dk] ? Object.values(dailyProgress[dk]).filter(v => v.completed).length : 0;

    const isToday = dk === store.todayKey();

    calendarDays.push({
      day: d,
      dateKey: dk,
      dateObj: dayObj,
      isToday,
      hasDeadline: dayDeadlines.length > 0,
      hasTask: dayTasks.length > 0,
      studyMins: dayStudyMins,
      skillMins: daySkillMins,
      nnCompleted: dayNNs,
    });
  }

  return `
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Calendar Overview</h1>
          <p class="text-sm text-secondary">Visual schedule of deadlines, tasks & focus logs</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn btn-secondary btn-sm" id="cal-prev">${icon('chevronLeft', 16)}</button>
          <span class="font-bold text-sm" style="min-width:110px;text-align:center">${monthName} ${year}</span>
          <button class="btn btn-secondary btn-sm" id="cal-next">${icon('chevronRight', 16)}</button>
          <button class="btn btn-primary btn-sm" id="cal-today">Today</button>
        </div>
      </div>

      <!-- Month Grid Header -->
      <div class="card" style="padding:var(--sp-3)">
        <div class="grid" style="grid-template-columns:repeat(7, 1fr);text-align:center;font-weight:700;font-size:11px;color:var(--t-tertiary);margin-bottom:var(--sp-2)">
          <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
        </div>

        <div class="grid" style="grid-template-columns:repeat(7, 1fr);gap:4px">
          ${calendarDays.map(cd => {
            if (cd.empty) return `<div style="height:68px"></div>`;
            return `
              <div class="cal-day-cell ${cd.isToday ? 'is-today' : ''}" data-date-key="${cd.dateKey}"
                   style="height:68px;padding:6px;border-radius:var(--r-sm);border:1px solid ${cd.isToday ? 'var(--c-accent)' : 'var(--b-subtle)'};background:${cd.isToday ? 'rgba(108,92,231,0.1)' : 'var(--bg-card)'};cursor:pointer;display:flex;flex-col;justify-content:space-between">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold" style="${cd.isToday ? 'color:var(--c-accent)' : ''}">${cd.day}</span>
                  ${cd.hasDeadline ? `<span style="width:6px;height:6px;border-radius:50%;background:var(--c-danger)"></span>` : ''}
                </div>
                <div class="flex flex-col gap-1">
                  ${cd.studyMins > 0 ? `<div style="font-size:9px;color:var(--c-study);font-weight:700">📖 ${Math.round(cd.studyMins / 60)}h</div>` : ''}
                  ${cd.skillMins > 0 ? `<div style="font-size:9px;color:var(--c-skills);font-weight:700">💻 ${Math.round(cd.skillMins / 60)}h</div>` : ''}
                  ${cd.hasTask ? `<div style="font-size:9px;color:var(--c-warning)">📋 Tasks</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initCalendar() {
  document.getElementById('cal-prev')?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    refreshCalendar();
  });
  document.getElementById('cal-next')?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    refreshCalendar();
  });
  document.getElementById('cal-today')?.addEventListener('click', () => {
    currentDate = new Date();
    refreshCalendar();
  });

  document.querySelectorAll('[data-date-key]').forEach(cell => {
    cell.addEventListener('click', () => {
      const dk = cell.dataset.dateKey;
      openDayDetailModal(dk);
    });
  });
}

function refreshCalendar() {
  const content = document.getElementById('page-content');
  if (content) {
    content.innerHTML = renderCalendar();
    initCalendar();
  }
}

function openDayDetailModal(dk) {
  const deadlines = store.getDeadlines().filter(d => d.dueDate === dk);
  const tasks = store.getTasks().filter(t => t.dueDate === dk || (t.completedAt && t.completedAt.startsWith(dk)));
  const studySessions = store.getStudySessions().filter(s => s.date === dk);
  const skillSessions = store.getSkillSessions().filter(s => s.date === dk);
  const subjects = store.getSubjects();
  const skills = store.getSkills();

  const html = `
    <div>
      <div style="margin-bottom:var(--sp-4)">
        <p class="text-sm font-semibold text-secondary">${dk}</p>
      </div>

      <!-- Deadlines -->
      ${deadlines.length > 0 ? `
        <div style="margin-bottom:var(--sp-4)">
          <p class="label" style="color:var(--c-danger)">Deadlines Due</p>
          ${deadlines.map(d => `
            <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px">
              <span class="font-bold text-sm">${d.title}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Tasks -->
      ${tasks.length > 0 ? `
        <div style="margin-bottom:var(--sp-4)">
          <p class="label">Scheduled Tasks</p>
          ${tasks.map(t => `
            <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px;display:flex;align-items:center;justify-content:between">
              <span class="text-sm ${t.status === 'completed' ? 'completed-text' : ''}">${t.title}</span>
              <span class="badge ${t.status === 'completed' ? 'badge-fitness' : 'badge-work'}">${t.status}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Study Logs -->
      ${studySessions.length > 0 ? `
        <div style="margin-bottom:var(--sp-4)">
          <p class="label" style="color:var(--c-study)">Study Sessions</p>
          ${studySessions.map(s => {
            const sub = subjects.find(sb => sb.id === s.subjectId);
            return `
              <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px">
                <div class="font-bold text-sm">${sub ? sub.name : 'Study'} (${s.duration}m)</div>
                <div class="text-xs text-tertiary">${s.notes || 'Focus session'}</div>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <!-- Skill Logs -->
      ${skillSessions.length > 0 ? `
        <div style="margin-bottom:var(--sp-4)">
          <p class="label" style="color:var(--c-skills)">Skill Work Logs</p>
          ${skillSessions.map(s => {
            const sk = skills.find(k => k.id === s.skillId);
            return `
              <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px">
                <div class="font-bold text-sm">${sk ? sk.name : 'Skill'} (${s.duration}m)</div>
                <div class="text-xs text-tertiary">${s.notes || 'Work session'}</div>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      ${deadlines.length === 0 && tasks.length === 0 && studySessions.length === 0 && skillSessions.length === 0 ? `
        <div class="empty-state" style="padding:var(--sp-4) 0">
          <p>No logged activities or deadlines for this date.</p>
        </div>
      ` : ''}

      <div class="flex justify-end" style="margin-top:var(--sp-4)">
        <button class="btn btn-secondary" id="modal-close-day">Close</button>
      </div>
    </div>
  `;

  openModal(`Date: ${dk}`, html, (modal) => {
    modal.querySelector('#modal-close-day').addEventListener('click', closeModal);
  });
}
