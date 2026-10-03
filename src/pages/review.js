/* ================================================================
   CLIENTIVITY — Weekly & Monthly Review Page
   ================================================================ */

import * as store from '../store.js';
import { icon } from '../icons.js';
import { showToast, miniConfetti } from '../utils.js';
import { openModal, closeModal, refresh } from '../app.js';

export function renderReview() {
  const reviews = store.getWeeklyReviews();
  const weekStudyHours = (store.getStudyTimeForWeek() / 60).toFixed(1);
  const weekSkillHours = (store.getSkillTimeForWeek() / 60).toFixed(1);
  const avgScore = store.getDailyScore();

  // Current week Monday ISO string
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);
  const weekStartKey = store.dateKey(monday);

  const existingReview = reviews.find(r => r.weekStart === weekStartKey);

  return `
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Weekly Accountability Review</h1>
        <p class="text-sm text-secondary">Reflect, audit performance, and optimize your trajectory</p>
      </div>

      <!-- Weekly Stats Banner -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5);background:linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,212,211,0.1));border:1px solid rgba(108,92,231,0.3)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-3)">
          <span class="label" style="margin:0">Week of ${weekStartKey}</span>
          <span class="badge badge-personal">${existingReview ? 'Completed' : 'Pending'}</span>
        </div>
        <div class="grid grid-3" style="gap:var(--sp-2);text-align:center">
          <div style="background:var(--bg-card);padding:var(--sp-3);border-radius:var(--r-md)">
            <div class="text-xs text-tertiary">Avg Score</div>
            <div class="text-xl font-bold" style="color:var(--c-accent)">${avgScore}</div>
          </div>
          <div style="background:var(--bg-card);padding:var(--sp-3);border-radius:var(--r-md)">
            <div class="text-xs text-tertiary">Study Hours</div>
            <div class="text-xl font-bold" style="color:var(--c-study)">${weekStudyHours}h</div>
          </div>
          <div style="background:var(--bg-card);padding:var(--sp-3);border-radius:var(--r-md)">
            <div class="text-xs text-tertiary">Skill Hours</div>
            <div class="text-xl font-bold" style="color:var(--c-skills)">${weekSkillHours}h</div>
          </div>
        </div>
      </div>

      <!-- Review Form -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-6)">
        <h3 class="font-bold text-base" style="margin-bottom:var(--sp-3)">Weekly Reflection Prompts</h3>
        <form id="form-weekly-review">
          <div class="form-group">
            <label class="form-label">1. What were your biggest wins & progress this week?</label>
            <textarea class="form-textarea" id="review-wins" placeholder="List major accomplishments, study milestones, completed projects..." rows="3">${existingReview?.wins || ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">2. What friction, distractions or obstacles did you encounter?</label>
            <textarea class="form-textarea" id="review-friction" placeholder="Identify energy drains, procrastination triggers..." rows="3">${existingReview?.friction || ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">3. Top 3 Non-Negotiable focus areas for next week</label>
            <textarea class="form-textarea" id="review-goals" placeholder="1. Finish Math unit 3&#10;2. Edit 2 videos&#10;3. Maintain 7-day habit streak..." rows="3">${existingReview?.goals || ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Self-Assessment Score (1 - 10)</label>
            <input type="number" class="form-input" id="review-rating" min="1" max="10" value="${existingReview?.rating || 8}" style="width:100px" />
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%">${icon('check', 16)} Save Weekly Review</button>
        </form>
      </div>

      <!-- Past Reviews Archive -->
      <div>
        <p class="label" style="margin-bottom:var(--sp-3)">Past Weekly Reviews</p>
        ${reviews.length === 0 ? `
          <div class="card" style="padding:var(--sp-4);text-align:center;color:var(--t-tertiary)">
            No past reviews submitted yet. Fill out the reflection form above!
          </div>
        ` : `
          <div class="flex flex-col gap-3">
            ${reviews.map(r => `
              <div class="card" style="padding:var(--sp-3) var(--sp-4)">
                <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
                  <span class="font-bold text-sm">Week of ${r.weekStart}</span>
                  <span class="badge badge-fitness">Rating: ${r.rating || 'N/A'}/10</span>
                </div>
                <p class="text-xs text-secondary truncate-2" style="margin-bottom:var(--sp-2)">${r.wins || 'No notes'}</p>
                <button class="btn btn-secondary btn-sm btn-view-review" data-rev-id="${r.id}" style="font-size:11px">View Full Entry</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

export function initReview() {
  document.getElementById('form-weekly-review')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const wins = document.getElementById('review-wins').value.trim();
    const friction = document.getElementById('review-friction').value.trim();
    const goals = document.getElementById('review-goals').value.trim();
    const rating = parseInt(document.getElementById('review-rating').value, 10);

    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayOffset);
    const weekStartKey = store.dateKey(monday);

    store.saveWeeklyReview({
      weekStart: weekStartKey,
      wins,
      friction,
      goals,
      rating,
    });

    showToast('Weekly review saved! 🏆');
    miniConfetti(window.innerWidth / 2, window.innerHeight / 2);
    refresh();
  });

  document.querySelectorAll('.btn-view-review').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.revId;
      const rev = store.getWeeklyReviews().find(r => r.id === id);
      if (rev) openReviewDetailModal(rev);
    });
  });
}

function openReviewDetailModal(rev) {
  const html = `
    <div>
      <div style="margin-bottom:var(--sp-3)">
        <span class="badge badge-fitness">Rating: ${rev.rating || 10}/10</span>
      </div>

      <div style="margin-bottom:var(--sp-4)">
        <p class="label">Wins & Accomplishments</p>
        <p class="text-sm" style="white-space:pre-wrap">${rev.wins || 'None recorded'}</p>
      </div>

      <div style="margin-bottom:var(--sp-4)">
        <p class="label">Friction & Obstacles</p>
        <p class="text-sm" style="white-space:pre-wrap">${rev.friction || 'None recorded'}</p>
      </div>

      <div style="margin-bottom:var(--sp-4)">
        <p class="label">Next Week Goals</p>
        <p class="text-sm" style="white-space:pre-wrap">${rev.goals || 'None recorded'}</p>
      </div>

      <div class="flex justify-end" style="margin-top:var(--sp-4)">
        <button class="btn btn-secondary" id="modal-close-rev">Close</button>
      </div>
    </div>
  `;

  openModal(`Review: Week of ${rev.weekStart}`, html, (modal) => {
    modal.querySelector('#modal-close-rev').addEventListener('click', closeModal);
  });
}
