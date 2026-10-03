/* ================================================================
   CLIENTIVITY — Progress & Analytics Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { formatMinutes } from '../utils.js';

export function renderProgress() {
  const today = new Date();
  const todayScore = store.getDailyScore();
  const habits = store.getNonNegotiables();
  const tasks = store.getTasks();
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const totalTasksCount = tasks.length;
  const weekStudyHours = (store.getStudyTimeForWeek() / 60).toFixed(1);
  const weekSkillHours = (store.getSkillTimeForWeek() / 60).toFixed(1);

  // Past 7 days data for performance chart
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayLabel = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const score = store.getDailyScore(d);
    last7Days.push({ label: dayLabel, score, date: d });
  }

  // Calculate average 7-day score
  const avgScore = Math.round(last7Days.reduce((sum, d) => sum + d.score, 0) / 7);

  return `
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Analytics & Performance</h1>
        <p class="text-sm text-secondary">Data-driven insights into your daily consistency and output</p>
      </div>

      <!-- Top Score Cards -->
      <div class="grid grid-2" style="margin-bottom:var(--sp-5);gap:var(--sp-3)">
        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(108,92,231,0.15), rgba(78,168,246,0.1));border:1px solid rgba(108,92,231,0.3)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-1)">
            <span class="text-xs font-semibold uppercase text-tertiary">Today's Score</span>
            <span class="badge badge-personal">${icon('award', 12)} Daily</span>
          </div>
          <div class="text-3xl font-extrabold" style="color:var(--c-accent)">${todayScore}<span class="text-sm font-normal text-secondary"> / 100</span></div>
          <div class="progress-bar" style="margin-top:var(--sp-2)">
            <div class="progress-bar-fill" style="width:${todayScore}%"></div>
          </div>
        </div>

        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(0,212,211,0.15), rgba(0,214,143,0.1));border:1px solid rgba(0,212,211,0.3)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-1)">
            <span class="text-xs font-semibold uppercase text-tertiary">7-Day Average</span>
            <span class="badge badge-fitness">${avgScore >= 75 ? 'Optimal' : 'Building'}</span>
          </div>
          <div class="text-3xl font-extrabold" style="color:var(--c-teal)">${avgScore}<span class="text-sm font-normal text-secondary"> / 100</span></div>
          <p class="text-xs text-secondary" style="margin-top:var(--sp-2)">Weekly consistency metric</p>
        </div>
      </div>

      <!-- 7-Day Performance Bar Graph -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-4)">
          <p class="label">7-Day Consistency Trend</p>
          <span class="text-xs text-tertiary">Target: 80+</span>
        </div>
        <div class="flex items-end justify-between" style="height:140px;padding:0 var(--sp-2);gap:var(--sp-2)">
          ${last7Days.map(d => {
            const heightPx = Math.max(12, Math.round((d.score / 100) * 110));
            const isToday = d.label === 'Today';
            return `
              <div class="flex flex-col items-center" style="flex:1;height:100%;justify-content:flex-end">
                <span class="text-xs font-semibold" style="margin-bottom:4px;font-size:10px;color:${isToday ? 'var(--c-accent)' : 'var(--t-tertiary)'}">${d.score}</span>
                <div style="width:100%;max-width:28px;height:${heightPx}px;background:${isToday ? 'var(--grad-primary)' : 'rgba(255,255,255,0.12)'};border-radius:var(--r-sm) var(--r-sm) 0 0;transition:all 0.3s var(--ease)"></div>
                <span class="text-xs" style="margin-top:6px;font-size:11px;color:${isToday ? 'var(--t-primary)' : 'var(--t-tertiary)'};font-weight:${isToday ? '700' : '500'}">${d.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Weekly Hours Summary -->
      <div class="grid grid-2" style="margin-bottom:var(--sp-5);gap:var(--sp-3)">
        <div class="card" style="padding:var(--sp-4)">
          <div class="flex items-center gap-2" style="margin-bottom:var(--sp-2);color:var(--c-study)">
            ${icon('study', 18)}
            <span class="font-bold text-sm">Study Output</span>
          </div>
          <div class="text-2xl font-bold">${weekStudyHours} <span class="text-xs font-normal text-secondary">hrs this week</span></div>
        </div>

        <div class="card" style="padding:var(--sp-4)">
          <div class="flex items-center gap-2" style="margin-bottom:var(--sp-2);color:var(--c-skills)">
            ${icon('skills', 18)}
            <span class="font-bold text-sm">Skill Output</span>
          </div>
          <div class="text-2xl font-bold">${weekSkillHours} <span class="text-xs font-normal text-secondary">hrs this week</span></div>
        </div>
      </div>

      <!-- Habit Streaks -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-3)">Non-Negotiable Streaks</p>
        ${habits.length === 0 ? `
          <p class="text-xs text-tertiary">No non-negotiables configured yet.</p>
        ` : `
          <div class="flex flex-col gap-2">
            ${habits.map(h => {
              const streak = store.getNNStreak(h.id);
              return `
                <div class="flex items-center justify-between" style="padding:var(--sp-2) var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--b-subtle)">
                  <div class="flex items-center gap-2">
                    <span style="font-size:16px">${h.icon || '✨'}</span>
                    <span class="text-sm font-semibold">${h.title}</span>
                  </div>
                  <div class="flex items-center gap-1" style="color:var(--c-warning);font-weight:700;font-size:13px">
                    🔥 <span>${streak} ${streak === 1 ? 'day' : 'days'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Task Execution Stats -->
      <div class="card" style="padding:var(--sp-4)">
        <p class="label" style="margin-bottom:var(--sp-2)">Task Completion Rate</p>
        <div class="flex items-baseline justify-between" style="margin-bottom:var(--sp-2)">
          <span class="text-2xl font-bold">${completedTasksCount} / ${totalTasksCount}</span>
          <span class="text-sm font-semibold" style="color:var(--c-accent)">
            ${totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0}% Total Completed
          </span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width:${totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0}%"></div>
        </div>
      </div>
    </div>
  `;
}

export function initProgress() {
  // Static rendering, no direct binding required
}
