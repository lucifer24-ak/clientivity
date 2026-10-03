/* ================================================================
   CLIENTIVITY — Utility Functions
   ================================================================ */

export function formatDuration(minutes) {
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatMinutes(minutes) {
  return formatDuration(minutes);
}

export function formatDurationLong(minutes) {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h}h ${m}m` : `${h} hour${h > 1 ? 's' : ''}`;
}

export function formatTimerDisplay(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getDayName(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function getFormattedDate(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function getShortDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getRelativeTime(targetDate) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

  if (diff < 0) return { text: `${Math.abs(diff)} day${Math.abs(diff) > 1 ? 's' : ''} overdue`, urgency: 'overdue' };
  if (diff === 0) return { text: 'Today', urgency: 'urgent' };
  if (diff === 1) return { text: 'Tomorrow', urgency: 'urgent' };
  if (diff <= 2) return { text: `${diff} days left`, urgency: 'urgent' };
  if (diff <= 6) return { text: `${diff} days left`, urgency: 'important' };
  if (diff <= 14) return { text: `${diff} days left`, urgency: 'attention' };
  return { text: `${diff} days left`, urgency: 'calm' };
}

export function getUrgencyClass(urgency) {
  return `urgency-${urgency}`;
}

export function getUrgencyBgClass(urgency) {
  return `urgency-${urgency}-bg`;
}

export function getCategoryBadgeClass(category) {
  const map = { study: 'badge-study', fitness: 'badge-fitness', work: 'badge-work', personal: 'badge-personal', college: 'badge-college', other: 'badge-work' };
  return map[category?.toLowerCase()] || 'badge-work';
}

export function getPriorityLabel(priority) {
  return { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' }[priority] || priority;
}

export function getPriorityClass(priority) {
  return `priority-${priority}`;
}

export function getScoreMessage(score) {
  if (score >= 90) return 'Outstanding day.';
  if (score >= 75) return 'Strong day.';
  if (score >= 60) return 'Good progress.';
  if (score >= 40) return 'Keep going.';
  if (score >= 20) return 'One thing at a time.';
  return "Let's get today done.";
}

export function createProgressRing(percent, size = 100, strokeWidth = 6, color = 'var(--c-accent)') {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return `
    <svg width="${size}" height="${size}" class="progress-ring-svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
        fill="none" stroke="var(--border)" stroke-width="${strokeWidth}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
        fill="none" stroke="${color}" stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 ${size / 2} ${size / 2})"
        style="transition: stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)"/>
    </svg>`;
}

export function createBarChart(data, maxHeight = 120, color = 'var(--c-accent)') {
  const max = Math.max(...data.map(d => d.value), 1);
  return `
    <div class="bar-chart" style="height:${maxHeight}px">
      ${data.map(d => {
        const h = Math.max(2, (d.value / max) * (maxHeight - 30));
        return `
          <div class="bar-col">
            <div class="bar-value">${d.valueLabel || ''}</div>
            <div class="bar-fill" style="height:${h}px;background:linear-gradient(180deg, ${color}, ${color}44)"></div>
            <div class="bar-label">${d.label}</div>
          </div>`;
      }).join('')}
    </div>`;
}

export function createHeatmap(data, weeks = 16) {
  const today = new Date();
  const cells = [];
  const totalDays = weeks * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dk = d.toISOString().split('T')[0];
    const level = data[dk] || 0;
    cells.push(`<div class="heatmap-cell" data-level="${Math.min(level, 4)}" title="${dk}: level ${level}"></div>`);
  }

  return `<div class="heatmap-grid">${cells.join('')}</div>`;
}

export function showToast(message, duration = 2500) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut .3s var(--ease) forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function miniConfetti(x, y) {
  const colors = ['#6C5CE7', '#4EA8F6', '#00D68F', '#F59E0B', '#F472B6'];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.left = `${x + (Math.random() - 0.5) * 40}px`;
    p.style.top = `${y - 10}px`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
}

export function getWeekDates(refDate) {
  const d = refDate ? new Date(refDate) : new Date();
  const dayOfWeek = d.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(d);
  monday.setDate(d.getDate() - mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    dates.push(day);
  }
  return dates;
}

export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
