/* ================================================================
   CLIENTIVITY — App Shell, Router & Navigation
   ================================================================ */

import { icon, icons } from './icons.js';
import { getSettings } from './store.js';
import { renderHome, initHome } from './pages/home.js';
import { renderToday, initToday } from './pages/today.js';
import { renderTasks, initTasks } from './pages/tasks.js';
import { renderDeadlines, initDeadlines } from './pages/deadlines.js';
import { renderHabits, initHabits } from './pages/habits.js';
import { renderStudy, initStudy } from './pages/study.js';
import { renderSkills, initSkills } from './pages/skills.js';
import { renderProgress, initProgress } from './pages/progress.js';
import { renderSettings, initSettings } from './pages/settings.js';
import { renderTimer, initTimer } from './pages/timer.js';
import { renderCalendar, initCalendar } from './pages/calendar.js';
import { renderReview, initReview } from './pages/review.js';

// ——— Route definitions ———
const routes = {
  home:      { render: renderHome,      init: initHome,      label: 'Home',      icon: 'home',     mobile: true },
  today:     { render: renderToday,     init: initToday,     label: 'Today',     icon: 'today',    mobile: true },
  tasks:     { render: renderTasks,     init: initTasks,     label: 'Tasks',     icon: 'tasks',    mobile: true },
  progress:  { render: renderProgress,  init: initProgress,  label: 'Progress',  icon: 'progress', mobile: true },
  more:      { render: null,            init: null,          label: 'More',      icon: 'more',     mobile: true },
  deadlines: { render: renderDeadlines, init: initDeadlines, label: 'Deadlines', icon: 'deadline' },
  habits:    { render: renderHabits,    init: initHabits,    label: 'Habits',    icon: 'habits' },
  study:     { render: renderStudy,     init: initStudy,     label: 'Study',     icon: 'study' },
  skills:    { render: renderSkills,    init: initSkills,    label: 'Skills',    icon: 'skills' },
  timer:     { render: renderTimer,     init: initTimer,     label: 'Timer',     icon: 'timer' },
  calendar:  { render: renderCalendar,  init: initCalendar,  label: 'Calendar',  icon: 'calendar' },
  review:    { render: renderReview,    init: initReview,    label: 'Review',    icon: 'award' },
  settings:  { render: renderSettings,  init: initSettings,  label: 'Settings',  icon: 'settings' },
};

let currentRoute = 'home';
let fabOpen = false;

// ——— App Shell ———
export function renderApp() {
  const settings = getSettings();
  document.documentElement.setAttribute('data-theme', settings.theme || 'dark');

  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderSidebar()}
    <div class="app-main">
      <div class="app-content" id="page-content"></div>
    </div>
    ${renderBottomNav()}
    ${renderFAB()}
  `;

  navigate(getHashRoute() || 'home');
  setupNavListeners();
  setupFABListeners();

  window.addEventListener('hashchange', () => {
    const route = getHashRoute();
    if (route && routes[route]) navigate(route);
  });
}

function getHashRoute() {
  const hash = window.location.hash.slice(1);
  return hash || 'home';
}

// ——— Navigation ———
export function navigate(route) {
  if (route === 'more') {
    // On mobile "more" opens settings as a default
    route = 'settings';
  }
  if (!routes[route] || !routes[route].render) return;

  currentRoute = route;
  window.location.hash = route;

  const content = document.getElementById('page-content');
  if (!content) return;

  content.innerHTML = routes[route].render();
  content.scrollTop = 0;

  if (routes[route].init) {
    requestAnimationFrame(() => routes[route].init());
  }

  updateActiveNav();
  closeFAB();
}

function updateActiveNav() {
  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(item => {
    const route = item.dataset.route;
    // "more" tab is active for settings, calendar, review, habits, study, skills, deadlines
    const moreRoutes = ['settings', 'calendar', 'review', 'habits', 'study', 'skills', 'deadlines', 'timer'];
    if (route === 'more') {
      item.classList.toggle('active', moreRoutes.includes(currentRoute));
    } else {
      item.classList.toggle('active', route === currentRoute);
    }
  });

  // Sidebar
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.route === currentRoute);
  });
}

function setupNavListeners() {
  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const route = item.dataset.route;
      if (route === 'more') {
        // Toggle a "more" menu or go to settings
        navigate('settings');
      } else {
        navigate(route);
      }
    });
  });

  // Sidebar nav
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(item.dataset.route);
    });
  });
}

// ——— FAB (Quick Capture) ———
function renderFAB() {
  return `
    <button class="fab" id="fab-btn" aria-label="Quick capture">
      ${icon('plus')}
    </button>
    <div class="fab-menu hidden" id="fab-menu">
      <button class="fab-menu-item" data-action="task">${icon('tasks', 18)} New Task</button>
      <button class="fab-menu-item" data-action="deadline">${icon('deadline', 18)} New Deadline</button>
      <button class="fab-menu-item" data-action="study">${icon('study', 18)} Study Session</button>
      <button class="fab-menu-item" data-action="skill">${icon('skills', 18)} Skill Session</button>
      <button class="fab-menu-item" data-action="timer">${icon('timer', 18)} Focus Timer</button>
    </div>
  `;
}

function setupFABListeners() {
  const btn = document.getElementById('fab-btn');
  const menu = document.getElementById('fab-menu');

  btn?.addEventListener('click', () => {
    fabOpen = !fabOpen;
    btn.classList.toggle('open', fabOpen);
    menu.classList.toggle('hidden', !fabOpen);
  });

  menu?.querySelectorAll('.fab-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      closeFAB();
      handleQuickAction(action);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (fabOpen && !e.target.closest('#fab-btn') && !e.target.closest('#fab-menu')) {
      closeFAB();
    }
  });
}

function closeFAB() {
  fabOpen = false;
  document.getElementById('fab-btn')?.classList.remove('open');
  document.getElementById('fab-menu')?.classList.add('hidden');
}

function handleQuickAction(action) {
  switch (action) {
    case 'task':
      navigate('tasks');
      setTimeout(() => document.getElementById('open-task-modal')?.click(), 100);
      break;
    case 'deadline':
      navigate('deadlines');
      setTimeout(() => document.getElementById('open-deadline-modal')?.click(), 100);
      break;
    case 'study':
      navigate('study');
      break;
    case 'skill':
      navigate('skills');
      break;
    case 'timer':
      navigate('timer');
      break;
  }
}

// ——— Sidebar (Desktop) ———
function renderSidebar() {
  const sidebarItems = [
    { route: 'home', icon: 'home', label: 'Home' },
    { route: 'today', icon: 'today', label: 'Today' },
    { route: 'tasks', icon: 'tasks', label: 'Tasks' },
    { route: 'deadlines', icon: 'deadline', label: 'Deadlines' },
    '_divider_',
    { route: 'habits', icon: 'habits', label: 'Habits' },
    { route: 'study', icon: 'study', label: 'Study' },
    { route: 'skills', icon: 'skills', label: 'Skills' },
    { route: 'timer', icon: 'timer', label: 'Timer' },
    '_divider_',
    { route: 'progress', icon: 'progress', label: 'Progress' },
    { route: 'calendar', icon: 'calendar', label: 'Calendar' },
    { route: 'review', icon: 'award', label: 'Weekly Review' },
    '_divider_',
    { route: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return `
    <aside class="app-sidebar">
      <div class="sidebar-logo">
        <svg width="32" height="32" viewBox="0 0 512 512">
          <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6C5CE7"/><stop offset="50%" stop-color="#4EA8F6"/><stop offset="100%" stop-color="#00D2D3"/>
          </linearGradient></defs>
          <path d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160c35.3 0 67.9-11.4 94.4-30.8l-18.8-24.4C308.4 377.2 283.1 386 256 386c-71.7 0-130-58.3-130-130s58.3-130 130-130c42.7 0 80.5 20.6 104.2 52.4l24.2-19C355.1 121.4 308.3 96 256 96z" fill="url(#lg)"/>
          <circle cx="340" cy="172" r="22" fill="url(#lg)"/>
        </svg>
        <span>Clientivity</span>
      </div>
      <nav class="sidebar-nav">
        ${sidebarItems.map(item => {
          if (item === '_divider_') return '<div class="divider" style="margin:4px 12px"></div>';
          return `<a href="#${item.route}" class="sidebar-nav-item" data-route="${item.route}">
            ${icon(item.icon, 20)}
            ${item.label}
          </a>`;
        }).join('')}
      </nav>
    </aside>
  `;
}

// ——— Bottom Nav (Mobile) ———
function renderBottomNav() {
  const items = Object.entries(routes).filter(([, r]) => r.mobile);
  return `
    <nav class="bottom-nav" id="bottom-nav">
      ${items.map(([key, r]) => `
        <button class="nav-item" data-route="${key}">
          ${icon(r.icon)}
          <span>${r.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// ——— Modal Helper ———
export function openModal(title, bodyHTML, onSubmit) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'active-modal';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="btn-icon" id="modal-close">${icon('close')}</button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Close handlers
  overlay.querySelector('#modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  if (onSubmit) onSubmit(overlay);
  return overlay;
}

export function closeModal() {
  const modal = document.getElementById('active-modal');
  if (modal) {
    modal.style.animation = 'fadeOut .2s var(--ease) forwards';
    modal.querySelector('.modal').style.animation = 'slideDown .2s var(--ease) forwards';
    setTimeout(() => modal.remove(), 200);
  }
}

// Re-render current page (used after data changes)
export function refresh() {
  if (routes[currentRoute]) {
    const content = document.getElementById('page-content');
    if (content) {
      const scrollPos = content.scrollTop;
      content.innerHTML = routes[currentRoute].render();
      if (routes[currentRoute].init) {
        requestAnimationFrame(() => {
          routes[currentRoute].init();
          content.scrollTop = scrollPos;
        });
      }
    }
  }
}
