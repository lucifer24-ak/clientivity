/* ================================================================
   CLIENTIVITY — Focus / Pomodoro Timer Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { showToast, miniConfetti } from '../utils.js';
import { refresh } from '../app.js';

let timerInterval = null;
let secondsRemaining = 25 * 60;
let totalDurationSeconds = 25 * 60;
let isRunning = false;
let selectedType = 'study'; // 'study' or 'skill'
let selectedTargetId = ''; // subjectId or skillId
let timerMode = 'pomodoro'; // 'pomodoro', 'shortBreak', 'longBreak', 'deepFocus'

// Web Audio API ambient noise generator
let audioCtx = null;
let currentNoiseNode = null;
let ambientSoundType = 'none'; // 'none', 'white', 'rain', 'binaural'

export function renderTimer() {
  const subjects = store.getSubjects();
  const skills = store.getSkills();

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const progressPercent = totalDurationSeconds > 0 ? ((totalDurationSeconds - secondsRemaining) / totalDurationSeconds) * 100 : 0;
  const strokeDashoffset = 565 - (565 * progressPercent) / 100;

  return `
    <div class="page" id="timer-page-container">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-4)">
        <div>
          <h1 class="text-xl font-bold">Focus Mode</h1>
          <p class="text-sm text-secondary">Eliminate distractions and enter deep work flow</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-toggle-fullscreen">${icon('maximize', 16)} Fullscreen</button>
        </div>
      </div>

      <!-- Mode Selector Pills -->
      <div class="flex justify-center gap-2" style="margin-bottom:var(--sp-5);flex-wrap:wrap">
        <button class="btn btn-sm ${timerMode === 'pomodoro' ? 'btn-primary' : 'btn-secondary'}" data-mode="pomodoro" data-mins="25">25m Pomodoro</button>
        <button class="btn btn-sm ${timerMode === 'deepFocus' ? 'btn-primary' : 'btn-secondary'}" data-mode="deepFocus" data-mins="50">50m Deep Work</button>
        <button class="btn btn-sm ${timerMode === 'shortBreak' ? 'btn-primary' : 'btn-secondary'}" data-mode="shortBreak" data-mins="5">5m Break</button>
        <button class="btn btn-sm ${timerMode === 'longBreak' ? 'btn-primary' : 'btn-secondary'}" data-mode="longBreak" data-mins="15">15m Break</button>
      </div>

      <!-- Main Circular Timer Container -->
      <div class="flex flex-col items-center justify-center" style="margin:var(--sp-4) 0">
        <div style="position:relative;width:240px;height:240px;display:flex;align-items:center;justify-content:center">
          <svg width="240" height="240" viewBox="0 0 200 200" style="transform:rotate(-90deg)">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--b-medium)" stroke-width="8" />
            <circle id="timer-ring" cx="100" cy="100" r="90" fill="none" stroke="var(--c-accent)" stroke-width="8"
                    stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="${strokeDashoffset}"
                    style="transition:stroke-dashoffset 1s linear" />
          </svg>
          <div style="position:absolute;text-align:center">
            <div id="timer-display" style="font-size:42px;font-weight:900;letter-spacing:-1px;font-family:monospace">${timeFormatted}</div>
            <div id="timer-status-text" class="text-xs text-tertiary" style="margin-top:2px;text-transform:uppercase;letter-spacing:1px">
              ${isRunning ? 'FOCUSING' : 'READY'}
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4" style="margin-top:var(--sp-6)">
          <button class="btn btn-secondary btn-icon" id="btn-timer-reset" style="width:48px;height:48px;border-radius:50%" title="Reset">${icon('trash', 20)}</button>
          <button class="btn btn-primary btn-icon" id="btn-timer-toggle" style="width:64px;height:64px;border-radius:50%;font-size:20px" title="${isRunning ? 'Pause' : 'Start'}">
            ${icon(isRunning ? 'pause' : 'play', 28)}
          </button>
          <button class="btn btn-secondary btn-icon" id="btn-timer-skip" style="width:48px;height:48px;border-radius:50%" title="Log & Finish">${icon('check', 20)}</button>
        </div>
      </div>

      <!-- Activity Link Card -->
      <div class="card" style="padding:var(--sp-4);margin-top:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-2)">Log completed focus time to:</p>
        <div class="grid grid-2" style="gap:var(--sp-2);margin-bottom:var(--sp-3)">
          <button class="btn btn-sm ${selectedType === 'study' ? 'btn-primary' : 'btn-secondary'}" id="btn-type-study">📚 Study Subject</button>
          <button class="btn btn-sm ${selectedType === 'skill' ? 'btn-primary' : 'btn-secondary'}" id="btn-type-skill">💻 Skill Practice</button>
        </div>

        ${selectedType === 'study' ? `
          <div class="form-group" style="margin:0">
            <select class="form-select" id="timer-target-id">
              ${subjects.map(s => `<option value="${s.id}" ${s.id === selectedTargetId ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>
        ` : `
          <div class="form-group" style="margin:0">
            <select class="form-select" id="timer-target-id">
              ${skills.map(s => `<option value="${s.id}" ${s.id === selectedTargetId ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>
        `}
      </div>

      <!-- Ambient Sound Generator -->
      <div class="card" style="padding:var(--sp-4);margin-top:var(--sp-4)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <span class="label" style="margin:0">Ambient Background Audio</span>
          <span class="badge ${ambientSoundType !== 'none' ? 'badge-fitness' : 'badge-work'}">${ambientSoundType.toUpperCase()}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm ${ambientSoundType === 'none' ? 'btn-primary' : 'btn-secondary'}" data-sound="none">Off</button>
          <button class="btn btn-sm ${ambientSoundType === 'rain' ? 'btn-primary' : 'btn-secondary'}" data-sound="rain">🌧️ Rain</button>
          <button class="btn btn-sm ${ambientSoundType === 'white' ? 'btn-primary' : 'btn-secondary'}" data-sound="white">📻 White Noise</button>
          <button class="btn btn-sm ${ambientSoundType === 'binaural' ? 'btn-primary' : 'btn-secondary'}" data-sound="binaural">🎧 Binaural</button>
        </div>
      </div>
    </div>
  `;
}

export function initTimer() {
  const subjects = store.getSubjects();
  const skills = store.getSkills();

  if (!selectedTargetId) {
    if (selectedType === 'study' && subjects.length > 0) selectedTargetId = subjects[0].id;
    if (selectedType === 'skill' && skills.length > 0) selectedTargetId = skills[0].id;
  }

  // Bind mode buttons
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      timerMode = btn.dataset.mode;
      const mins = parseInt(btn.dataset.mins, 10);
      setTimerDuration(mins);
      refresh();
    });
  });

  // Bind start/pause
  document.getElementById('btn-timer-toggle')?.addEventListener('click', toggleTimer);
  document.getElementById('btn-timer-reset')?.addEventListener('click', resetTimer);
  document.getElementById('btn-timer-skip')?.addEventListener('click', finishAndLogTimer);

  // Bind Activity type switches
  document.getElementById('btn-type-study')?.addEventListener('click', () => {
    selectedType = 'study';
    if (subjects.length > 0) selectedTargetId = subjects[0].id;
    refresh();
  });
  document.getElementById('btn-type-skill')?.addEventListener('click', () => {
    selectedType = 'skill';
    if (skills.length > 0) selectedTargetId = skills[0].id;
    refresh();
  });

  // Bind target select
  document.getElementById('timer-target-id')?.addEventListener('change', (e) => {
    selectedTargetId = e.target.value;
  });

  // Bind Ambient Sounds
  document.querySelectorAll('[data-sound]').forEach(btn => {
    btn.addEventListener('click', () => {
      ambientSoundType = btn.dataset.sound;
      playAmbientSound(ambientSoundType);
      refresh();
    });
  });

  // Fullscreen
  document.getElementById('btn-toggle-fullscreen')?.addEventListener('click', () => {
    const el = document.getElementById('timer-page-container');
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el?.requestFullscreen?.();
    }
  });
}

function setTimerDuration(mins) {
  stopTimer();
  totalDurationSeconds = mins * 60;
  secondsRemaining = totalDurationSeconds;
}

function toggleTimer() {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    secondsRemaining--;
    updateTimerUI();
    if (secondsRemaining <= 0) {
      stopTimer();
      playCompletionSound();
      finishAndLogTimer();
    }
  }, 1000);
  refresh();
}

function stopTimer() {
  isRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  secondsRemaining = totalDurationSeconds;
  refresh();
}

function finishAndLogTimer() {
  stopTimer();
  const elapsedMinutes = Math.round((totalDurationSeconds - secondsRemaining) / 60);

  if (elapsedMinutes >= 1 && selectedTargetId) {
    if (selectedType === 'study') {
      store.addStudySession({
        subjectId: selectedTargetId,
        duration: elapsedMinutes,
        notes: 'Focus Timer Session',
        date: store.todayKey()
      });
      showToast(`Logged ${elapsedMinutes}m study session! 📚`);
    } else {
      store.addSkillSession({
        skillId: selectedTargetId,
        duration: elapsedMinutes,
        notes: 'Focus Timer Session',
        date: store.todayKey()
      });
      showToast(`Logged ${elapsedMinutes}m skill practice! 💻`);
    }
    miniConfetti(window.innerWidth / 2, window.innerHeight / 2);
  } else if (elapsedMinutes < 1) {
    showToast('Session too short to log');
  }

  secondsRemaining = totalDurationSeconds;
  refresh();
}

function updateTimerUI() {
  const display = document.getElementById('timer-display');
  const ring = document.getElementById('timer-ring');
  if (display) {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  if (ring) {
    const progressPercent = totalDurationSeconds > 0 ? ((totalDurationSeconds - secondsRemaining) / totalDurationSeconds) * 100 : 0;
    const strokeDashoffset = 565 - (565 * progressPercent) / 100;
    ring.setAttribute('stroke-dashoffset', strokeDashoffset.toString());
  }
}

function playCompletionSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.warn('Audio Context failed', e);
  }
}

function playAmbientSound(type) {
  if (currentNoiseNode) {
    try { currentNoiseNode.stop(); } catch (e) {}
    currentNoiseNode = null;
  }

  if (type === 'none') return;

  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      if (type === 'white') {
        data[i] = Math.random() * 2 - 1;
      } else if (type === 'rain') {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      } else if (type === 'binaural') {
        data[i] = Math.sin(i * 0.01) * 0.2;
      }
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

    noise.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    noise.start();
    currentNoiseNode = noise;
  } catch (e) {
    console.warn('Ambient sound playback error:', e);
  }
}
