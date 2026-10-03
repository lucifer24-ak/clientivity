/* ================================================================
   CLIENTIVITY — Persistent Data Store
   All data lives in localStorage. Architecture ready for cloud migration.
   ================================================================ */

const STORAGE_PREFIX = 'clientivity_';

function getKey(key) { return STORAGE_PREFIX + key; }

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(getKey(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key, data) {
  try { localStorage.setItem(getKey(key), JSON.stringify(data)); } catch (e) { console.warn('Storage save failed:', e); }
}

function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function todayKey() { return new Date().toISOString().split('T')[0]; }

function dateKey(d) { return d instanceof Date ? d.toISOString().split('T')[0] : d; }

// ——— Settings ———
const DEFAULT_SETTINGS = {
  name: 'Prerana',
  theme: 'dark',
  accentColor: '#6C5CE7',
  weekStart: 'monday',
  defaultStudyDuration: 60,
  defaultFocusTimer: 25,
  scoreWeights: { nonNegotiables: 40, tasks: 30, study: 15, skills: 15 },
};

export function getSettings() { return { ...DEFAULT_SETTINGS, ...load('settings', {}) }; }
export function saveSettings(s) { save('settings', { ...getSettings(), ...s }); }

// ——— Non-Negotiables ———
const DEFAULT_NON_NEGOTIABLES = [
  { id: 'nn1', title: 'Move your body', icon: '🏃‍♀️', color: '#00D68F', target: 30, unit: 'minutes', frequency: 'daily', order: 0, countsToScore: true },
  { id: 'nn2', title: 'Study — 1 hour minimum', icon: '📖', color: '#4EA8F6', target: 60, unit: 'minutes', frequency: 'daily', order: 1, countsToScore: true },
  { id: 'nn3', title: 'Skill/Work — 2 hours', icon: '💻', color: '#A78BFA', target: 120, unit: 'minutes', frequency: 'daily', order: 2, countsToScore: true },
  { id: 'nn4', title: 'Sleep target', icon: '😴', color: '#818CF8', target: 1, unit: 'checkbox', frequency: 'daily', order: 3, countsToScore: true },
  { id: 'nn5', title: 'Read / Learn', icon: '📚', color: '#F59E0B', target: 20, unit: 'pages', frequency: 'daily', order: 4, countsToScore: true },
  { id: 'nn6', title: 'Personal reset', icon: '🧘', color: '#F472B6', target: 1, unit: 'checkbox', frequency: 'daily', order: 5, countsToScore: true },
];

export function getNonNegotiables() {
  const stored = load('nonNegotiables', null);
  if (stored === null) { save('nonNegotiables', DEFAULT_NON_NEGOTIABLES); return DEFAULT_NON_NEGOTIABLES; }
  return stored;
}
export function saveNonNegotiables(list) { save('nonNegotiables', list); }
export function addNonNegotiable(nn) {
  const list = getNonNegotiables();
  list.push({ ...nn, id: generateId(), order: list.length, countsToScore: true });
  saveNonNegotiables(list);
}
export function updateNonNegotiable(id, updates) {
  const list = getNonNegotiables().map(n => n.id === id ? { ...n, ...updates } : n);
  saveNonNegotiables(list);
}
export function deleteNonNegotiable(id) {
  saveNonNegotiables(getNonNegotiables().filter(n => n.id !== id));
}

// ——— Daily Progress (non-negotiable completions per day) ———
export function getDailyProgress(date) {
  const all = load('dailyProgress', {});
  return all[dateKey(date || new Date())] || {};
}
export function saveDailyNNProgress(nnId, data, date) {
  const all = load('dailyProgress', {});
  const dk = dateKey(date || new Date());
  if (!all[dk]) all[dk] = {};
  all[dk][nnId] = data;
  save('dailyProgress', all);
}
export function getAllDailyProgress() { return load('dailyProgress', {}); }

// ——— Tasks ———
export function getTasks() { return load('tasks', []); }
export function saveTasks(list) { save('tasks', list); }
export function addTask(t) {
  const list = getTasks();
  list.push({ ...t, id: generateId(), createdAt: new Date().toISOString(), status: 'pending', completedAt: null });
  saveTasks(list);
  return list;
}
export function updateTask(id, updates) {
  const list = getTasks().map(t => {
    if (t.id === id) {
      const updated = { ...t, ...updates };
      if (updates.status === 'completed' && !t.completedAt) updated.completedAt = new Date().toISOString();
      if (updates.status === 'pending') updated.completedAt = null;
      return updated;
    }
    return t;
  });
  saveTasks(list);
}
export function deleteTask(id) { saveTasks(getTasks().filter(t => t.id !== id)); }

// ——— Deadlines ———
export function getDeadlines() { return load('deadlines', []); }
export function saveDeadlines(list) { save('deadlines', list); }
export function addDeadline(d) {
  const list = getDeadlines();
  list.push({ ...d, id: generateId(), createdAt: new Date().toISOString(), progress: d.progress || 0 });
  saveDeadlines(list);
}
export function updateDeadline(id, updates) {
  saveDeadlines(getDeadlines().map(d => d.id === id ? { ...d, ...updates } : d));
}
export function deleteDeadline(id) { saveDeadlines(getDeadlines().filter(d => d.id !== id)); }

// ——— Subjects ———
const DEFAULT_SUBJECTS = [
  { id: 'sub1', name: 'Mathematics', color: '#4EA8F6', topics: [], weeklyGoal: 420 },
  { id: 'sub2', name: 'Chemistry', color: '#00D68F', topics: [], weeklyGoal: 420 },
  { id: 'sub3', name: 'Physics', color: '#F59E0B', topics: [], weeklyGoal: 300 },
  { id: 'sub4', name: 'Programming', color: '#A78BFA', topics: [], weeklyGoal: 300 },
];

export function getSubjects() {
  const stored = load('subjects', null);
  if (stored === null) { save('subjects', DEFAULT_SUBJECTS); return DEFAULT_SUBJECTS; }
  return stored;
}
export function saveSubjects(list) { save('subjects', list); }
export function addSubject(s) {
  const list = getSubjects();
  list.push({ ...s, id: generateId(), topics: s.topics || [], weeklyGoal: s.weeklyGoal || 300 });
  saveSubjects(list);
}
export function updateSubject(id, updates) {
  saveSubjects(getSubjects().map(s => s.id === id ? { ...s, ...updates } : s));
}
export function deleteSubject(id) { saveSubjects(getSubjects().filter(s => s.id !== id)); }

// ——— Study Sessions ———
export function getStudySessions() { return load('studySessions', []); }
export function saveStudySessions(list) { save('studySessions', list); }
export function addStudySession(s) {
  const list = getStudySessions();
  list.push({ ...s, id: generateId(), createdAt: new Date().toISOString(), date: s.date || todayKey() });
  saveStudySessions(list);
}
export function deleteStudySession(id) { saveStudySessions(getStudySessions().filter(s => s.id !== id)); }

// ——— Skills ———
const DEFAULT_SKILLS = [
  { id: 'sk1', name: 'Video Editing', color: '#F472B6', weeklyGoal: 420 },
  { id: 'sk2', name: 'Content Strategy', color: '#A78BFA', weeklyGoal: 420 },
  { id: 'sk3', name: 'Writing', color: '#4EA8F6', weeklyGoal: 300 },
];

export function getSkills() {
  const stored = load('skills', null);
  if (stored === null) { save('skills', DEFAULT_SKILLS); return DEFAULT_SKILLS; }
  return stored;
}
export function saveSkills(list) { save('skills', list); }
export function addSkill(s) {
  const list = getSkills();
  list.push({ ...s, id: generateId(), weeklyGoal: s.weeklyGoal || 300 });
  saveSkills(list);
}
export function updateSkill(id, updates) {
  saveSkills(getSkills().map(s => s.id === id ? { ...s, ...updates } : s));
}
export function deleteSkill(id) { saveSkills(getSkills().filter(s => s.id !== id)); }

// ——— Skill Sessions ———
export function getSkillSessions() { return load('skillSessions', []); }
export function saveSkillSessions(list) { save('skillSessions', list); }
export function addSkillSession(s) {
  const list = getSkillSessions();
  list.push({ ...s, id: generateId(), createdAt: new Date().toISOString(), date: s.date || todayKey() });
  saveSkillSessions(list);
}
export function deleteSkillSession(id) { saveSkillSessions(getSkillSessions().filter(s => s.id !== id)); }

// ——— Weekly Reviews ———
export function getWeeklyReviews() { return load('weeklyReviews', []); }
export function saveWeeklyReview(review) {
  const list = getWeeklyReviews();
  const existing = list.findIndex(r => r.weekStart === review.weekStart);
  if (existing >= 0) list[existing] = { ...list[existing], ...review };
  else list.push({ ...review, id: generateId(), createdAt: new Date().toISOString() });
  save('weeklyReviews', list);
}

// ——— Timer State (persisted so refresh doesn't lose it) ———
export function getTimerState() { return load('timerState', null); }
export function saveTimerState(state) { save('timerState', state); }
export function clearTimerState() { localStorage.removeItem(getKey('timerState')); }

// ——— Analytics Helpers ———
export function getStudyTimeForDay(date) {
  const dk = dateKey(date);
  return getStudySessions().filter(s => s.date === dk).reduce((sum, s) => sum + (s.duration || 0), 0);
}

export function getStudyTimeForWeek(refDate) {
  const d = refDate ? new Date(refDate) : new Date();
  const dayOfWeek = d.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(d);
  monday.setDate(d.getDate() - mondayOffset);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const mk = dateKey(monday);
  const sk = dateKey(sunday);
  return getStudySessions().filter(s => s.date >= mk && s.date <= sk).reduce((sum, s) => sum + (s.duration || 0), 0);
}

export function getSkillTimeForWeek(skillId, refDate) {
  const d = refDate ? new Date(refDate) : new Date();
  const dayOfWeek = d.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(d);
  monday.setDate(d.getDate() - mondayOffset);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const mk = dateKey(monday);
  const sk = dateKey(sunday);
  const sessions = getSkillSessions().filter(s => s.date >= mk && s.date <= sk);
  if (skillId) return sessions.filter(s => s.skillId === skillId).reduce((sum, s) => sum + (s.duration || 0), 0);
  return sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
}

export function getStudyTimeForSubjectWeek(subjectId) {
  const d = new Date();
  const dayOfWeek = d.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(d);
  monday.setDate(d.getDate() - mondayOffset);
  const mk = dateKey(monday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const sk = dateKey(sunday);
  return getStudySessions().filter(s => s.subjectId === subjectId && s.date >= mk && s.date <= sk).reduce((sum, s) => sum + (s.duration || 0), 0);
}

export function getTasksCompletedToday() {
  const dk = todayKey();
  return getTasks().filter(t => t.completedAt && t.completedAt.startsWith(dk)).length;
}

export function getNNStreak(nnId) {
  const all = getAllDailyProgress();
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dk = dateKey(d);
    const dayData = all[dk];
    if (dayData && dayData[nnId] && dayData[nnId].completed) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export function getDailyScore(date) {
  const dk = dateKey(date || new Date());
  const settings = getSettings();
  const weights = settings.scoreWeights;
  const nns = getNonNegotiables().filter(n => n.countsToScore);
  const dayProgress = getDailyProgress(dk);

  let nnScore = 0;
  if (nns.length > 0) {
    const completedNN = nns.filter(n => dayProgress[n.id] && dayProgress[n.id].completed).length;
    nnScore = (completedNN / nns.length) * weights.nonNegotiables;
  }

  const tasks = getTasks();
  const todayTasks = tasks.filter(t => t.dueDate === dk || (t.completedAt && t.completedAt.startsWith(dk)));
  let taskScore = 0;
  if (todayTasks.length > 0) {
    const completedTasks = todayTasks.filter(t => t.status === 'completed').length;
    taskScore = (completedTasks / todayTasks.length) * weights.tasks;
  } else {
    taskScore = weights.tasks * 0.5; // neutral if no tasks
  }

  const studyTime = getStudyTimeForDay(dk);
  const studyTarget = settings.defaultStudyDuration || 60;
  const studyScore = Math.min(1, studyTime / studyTarget) * weights.study;

  const skillTime = getSkillSessions().filter(s => s.date === dk).reduce((sum, s) => sum + (s.duration || 0), 0);
  const skillTarget = 120;
  const skillScore = Math.min(1, skillTime / skillTarget) * weights.skills;

  return Math.round(nnScore + taskScore + studyScore + skillScore);
}

export function getCompletedNNCount(date) {
  const dk = dateKey(date || new Date());
  const nns = getNonNegotiables();
  const dayProgress = getDailyProgress(dk);
  return nns.filter(n => dayProgress[n.id] && dayProgress[n.id].completed).length;
}

export { generateId, todayKey, dateKey };
