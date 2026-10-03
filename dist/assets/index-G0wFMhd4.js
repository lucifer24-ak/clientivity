(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const g=(t,e=24)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${t}</svg>`,ee={home:g('<path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/>'),today:g('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/>'),tasks:g('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>'),progress:g('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),more:g('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'),deadline:g('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),habits:g('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),study:g('<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>'),work:g('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/>'),skills:g('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),settings:g('<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'),calendar:g('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),plus:g('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),close:g('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),check:g('<polyline points="20 6 9 17 4 12"/>'),chevronRight:g('<polyline points="9 18 15 12 9 6"/>'),chevronLeft:g('<polyline points="15 18 9 12 15 6"/>'),chevronDown:g('<polyline points="6 9 12 15 18 9"/>'),play:g('<polygon points="5 3 19 12 5 21 5 3"/>'),pause:g('<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'),stop:g('<rect x="6" y="6" width="12" height="12" rx="1"/>'),timer:g('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3l2 2"/><path d="M19 3l-2 2"/><line x1="12" y1="1" x2="12" y2="3"/>'),trash:g('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>'),edit:g('<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>'),fire:g('<path d="M12 22c4.97 0 8-3.58 8-8 0-5.5-4-9-6-11-1 2.5-2 4-4 5.5C8.5 10 7 12 7 14c0 4.42 2.24 8 5 8z"/><path d="M12 22c-1.5 0-3-1.12-3-3.5 0-2 1.5-3 2-4.5.5 1.5 2 2.5 2 4.5 0 2.38-1 3.5-1 3.5"/>'),star:g('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),target:g('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),note:g('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),sun:g('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),moon:g('<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'),user:g('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>'),refresh:g('<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>'),zap:g('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),trendUp:g('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),clock:g('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),award:g('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>'),filter:g('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),grid:g('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),list:g('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'),arrowUp:g('<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>'),save:g('<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>')};function p(t,e=24){return ee[t]||""}const J='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',se="clientivity_";function Bt(t){return se+t}function M(t,e){try{const a=localStorage.getItem(Bt(t));return a?JSON.parse(a):e}catch{return e}}function D(t,e){try{localStorage.setItem(Bt(t),JSON.stringify(e))}catch(a){console.warn("Storage save failed:",a)}}function G(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}function j(){return new Date().toISOString().split("T")[0]}function w(t){return t instanceof Date?t.toISOString().split("T")[0]:t}const ae={name:"Prerana",theme:"dark",accentColor:"#6C5CE7",weekStart:"monday",defaultStudyDuration:60,defaultFocusTimer:25,scoreWeights:{nonNegotiables:40,tasks:30,study:15,skills:15}};function it(){return{...ae,...M("settings",{})}}function ne(t){D("settings",{...it(),...t})}const Dt=[{id:"nn1",title:"Move your body",icon:"🏃‍♀️",color:"#00D68F",target:30,unit:"minutes",frequency:"daily",order:0,countsToScore:!0},{id:"nn2",title:"Study — 1 hour minimum",icon:"📖",color:"#4EA8F6",target:60,unit:"minutes",frequency:"daily",order:1,countsToScore:!0},{id:"nn3",title:"Skill/Work — 2 hours",icon:"💻",color:"#A78BFA",target:120,unit:"minutes",frequency:"daily",order:2,countsToScore:!0},{id:"nn4",title:"Sleep target",icon:"😴",color:"#818CF8",target:1,unit:"checkbox",frequency:"daily",order:3,countsToScore:!0},{id:"nn5",title:"Read / Learn",icon:"📚",color:"#F59E0B",target:20,unit:"pages",frequency:"daily",order:4,countsToScore:!0},{id:"nn6",title:"Personal reset",icon:"🧘",color:"#F472B6",target:1,unit:"checkbox",frequency:"daily",order:5,countsToScore:!0}];function A(){const t=M("nonNegotiables",null);return t===null?(D("nonNegotiables",Dt),Dt):t}function xt(t){D("nonNegotiables",t)}function ie(t){const e=A();e.push({...t,id:G(),order:e.length,countsToScore:!0}),xt(e)}function oe(t,e){const a=A().map(s=>s.id===t?{...s,...e}:s);xt(a)}function le(t){xt(A().filter(e=>e.id!==t))}function Q(t){return M("dailyProgress",{})[w(t||new Date)]||{}}function gt(t,e,a){const s=M("dailyProgress",{}),n=w(new Date);s[n]||(s[n]={}),s[n][t]=e,D("dailyProgress",s)}function Pt(){return M("dailyProgress",{})}function S(){return M("tasks",[])}function kt(t){D("tasks",t)}function re(t){const e=S();return e.push({...t,id:G(),createdAt:new Date().toISOString(),status:"pending",completedAt:null}),kt(e),e}function ct(t,e){const a=S().map(s=>{if(s.id===t){const n={...s,...e};return e.status==="completed"&&!s.completedAt&&(n.completedAt=new Date().toISOString()),e.status==="pending"&&(n.completedAt=null),n}return s});kt(a)}function Ft(t){kt(S().filter(e=>e.id!==t))}function U(){return M("deadlines",[])}function $t(t){D("deadlines",t)}function de(t){const e=U();e.push({...t,id:G(),createdAt:new Date().toISOString(),progress:t.progress||0}),$t(e)}function ce(t,e){$t(U().map(a=>a.id===t?{...a,...e}:a))}function Ot(t){$t(U().filter(e=>e.id!==t))}const Et=[{id:"sub1",name:"Mathematics",color:"#4EA8F6",topics:[],weeklyGoal:420},{id:"sub2",name:"Chemistry",color:"#00D68F",topics:[],weeklyGoal:420},{id:"sub3",name:"Physics",color:"#F59E0B",topics:[],weeklyGoal:300},{id:"sub4",name:"Programming",color:"#A78BFA",topics:[],weeklyGoal:300}];function _(){const t=M("subjects",null);return t===null?(D("subjects",Et),Et):t}function Wt(t){D("subjects",t)}function ue(t){const e=_();e.push({...t,id:G(),topics:t.topics||[],weeklyGoal:t.weeklyGoal||300}),Wt(e)}function pe(t){Wt(_().filter(e=>e.id!==t))}function z(){return M("studySessions",[])}function Rt(t){D("studySessions",t)}function Ht(t){const e=z();e.push({...t,id:G(),createdAt:new Date().toISOString(),date:t.date||j()}),Rt(e)}function me(t){Rt(z().filter(e=>e.id!==t))}const Tt=[{id:"sk1",name:"Video Editing",color:"#F472B6",weeklyGoal:420},{id:"sk2",name:"Content Strategy",color:"#A78BFA",weeklyGoal:420},{id:"sk3",name:"Writing",color:"#4EA8F6",weeklyGoal:300}];function V(){const t=M("skills",null);return t===null?(D("skills",Tt),Tt):t}function Gt(t){D("skills",t)}function ve(t){const e=V();e.push({...t,id:G(),weeklyGoal:t.weeklyGoal||300}),Gt(e)}function ge(t){Gt(V().filter(e=>e.id!==t))}function X(){return M("skillSessions",[])}function Ut(t){D("skillSessions",t)}function _t(t){const e=X();e.push({...t,id:G(),createdAt:new Date().toISOString(),date:t.date||j()}),Ut(e)}function be(t){Ut(X().filter(e=>e.id!==t))}function wt(){return M("weeklyReviews",[])}function ye(t){const e=wt(),a=e.findIndex(s=>s.weekStart===t.weekStart);a>=0?e[a]={...e[a],...t}:e.push({...t,id:G(),createdAt:new Date().toISOString()}),D("weeklyReviews",e)}function zt(t){const e=w(t);return z().filter(a=>a.date===e).reduce((a,s)=>a+(s.duration||0),0)}function ut(t){const e=new Date,a=e.getDay(),s=a===0?6:a-1,n=new Date(e);n.setDate(e.getDate()-s),n.setHours(0,0,0,0);const i=new Date(n);i.setDate(n.getDate()+6),i.setHours(23,59,59,999);const l=w(n),o=w(i);return z().filter(r=>r.date>=l&&r.date<=o).reduce((r,d)=>r+(d.duration||0),0)}function nt(t,e){const a=new Date,s=a.getDay(),n=s===0?6:s-1,i=new Date(a);i.setDate(a.getDate()-n),i.setHours(0,0,0,0);const l=new Date(i);l.setDate(i.getDate()+6);const o=w(i),r=w(l),d=X().filter(c=>c.date>=o&&c.date<=r);return t?d.filter(c=>c.skillId===t).reduce((c,u)=>c+(u.duration||0),0):d.reduce((c,u)=>c+(u.duration||0),0)}function fe(t){const e=new Date,a=e.getDay(),s=a===0?6:a-1,n=new Date(e);n.setDate(e.getDate()-s);const i=w(n),l=new Date(n);l.setDate(n.getDate()+6);const o=w(l);return z().filter(r=>r.subjectId===t&&r.date>=i&&r.date<=o).reduce((r,d)=>r+(d.duration||0),0)}function Vt(){const t=j();return S().filter(e=>e.completedAt&&e.completedAt.startsWith(t)).length}function St(t){const e=Pt(),a=new Date;let s=0;for(let n=0;n<365;n++){const i=new Date(a);i.setDate(a.getDate()-n);const l=w(i),o=e[l];if(o&&o[t]&&o[t].completed)s++;else if(n>0)break}return s}function dt(t){const e=w(t||new Date),a=it(),s=a.scoreWeights,n=A().filter(f=>f.countsToScore),i=Q(e);let l=0;n.length>0&&(l=n.filter(E=>i[E.id]&&i[E.id].completed).length/n.length*s.nonNegotiables);const r=S().filter(f=>f.dueDate===e||f.completedAt&&f.completedAt.startsWith(e));let d=0;r.length>0?d=r.filter(E=>E.status==="completed").length/r.length*s.tasks:d=s.tasks*.5;const c=zt(e),u=a.defaultStudyDuration||60,m=Math.min(1,c/u)*s.study,v=X().filter(f=>f.date===e).reduce((f,E)=>f+(E.duration||0),0),K=Math.min(1,v/120)*s.skills;return Math.round(l+d+m+K)}function he(t){const e=w(new Date),a=A(),s=Q(e);return a.filter(n=>s[n.id]&&s[n.id].completed).length}function bt(t){if(t<60)return`${Math.round(t)}m`;const e=Math.floor(t/60),a=Math.round(t%60);return a>0?`${e}h ${a}m`:`${e}h`}function tt(t){return bt(t)}function xe(){const t=new Date().getHours();return t<12?"Good morning":t<17?"Good afternoon":"Good evening"}function Kt(t){return t.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}function Yt(t){const e=new Date;e.setHours(0,0,0,0);const a=new Date(t);a.setHours(0,0,0,0);const s=Math.ceil((a-e)/(1e3*60*60*24));return s<0?{text:`${Math.abs(s)} day${Math.abs(s)>1?"s":""} overdue`,urgency:"overdue"}:s===0?{text:"Today",urgency:"urgent"}:s===1?{text:"Tomorrow",urgency:"urgent"}:s<=2?{text:`${s} days left`,urgency:"urgent"}:s<=6?{text:`${s} days left`,urgency:"important"}:s<=14?{text:`${s} days left`,urgency:"attention"}:{text:`${s} days left`,urgency:"calm"}}function Jt(t){return`urgency-${t}`}function ke(t){return`urgency-${t}-bg`}function Qt(t){return{low:"Low",medium:"Medium",high:"High",urgent:"Urgent"}[t]||t}function $e(t){return t>=90?"Outstanding day.":t>=75?"Strong day.":t>=60?"Good progress.":t>=40?"Keep going.":t>=20?"One thing at a time.":"Let's get today done."}function we(t,e=100,a=6,s="var(--c-accent)"){const n=(e-a)/2,i=2*Math.PI*n,l=i-Math.min(t,100)/100*i;return`
    <svg width="${e}" height="${e}" class="progress-ring-svg">
      <circle cx="${e/2}" cy="${e/2}" r="${n}"
        fill="none" stroke="var(--border)" stroke-width="${a}"/>
      <circle cx="${e/2}" cy="${e/2}" r="${n}"
        fill="none" stroke="${s}" stroke-width="${a}"
        stroke-dasharray="${i}" stroke-dashoffset="${l}"
        stroke-linecap="round"
        transform="rotate(-90 ${e/2} ${e/2})"
        style="transition: stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)"/>
    </svg>`}function y(t,e=2500){const a=document.querySelector(".toast");a&&a.remove();const s=document.createElement("div");s.className="toast",s.textContent=t,document.body.appendChild(s),setTimeout(()=>{s.style.animation="fadeOut .3s var(--ease) forwards",setTimeout(()=>s.remove(),300)},e)}function N(t,e){const a=["#6C5CE7","#4EA8F6","#00D68F","#F59E0B","#F472B6"];for(let s=0;s<8;s++){const n=document.createElement("div");n.className="confetti-particle",n.style.left=`${t+(Math.random()-.5)*40}px`,n.style.top=`${e-10}px`,n.style.background=a[Math.floor(Math.random()*a.length)],n.style.transform=`rotate(${Math.random()*360}deg)`,document.body.appendChild(n),setTimeout(()=>n.remove(),1100)}}function Se(t){const e=(t||"").toLowerCase();return{study:"badge-study",fitness:"badge-fitness",work:"badge-work",personal:"badge-personal",college:"badge-college"}[e]||"badge-work"}function De(){const t=it(),e=A(),a=Q(),s=S(),n=U(),i=new Date,l=j(),o=he(),r=e.length,d=r>0?Math.round(o/r*100):0,c=dt(),u=$e(c),m=s.filter(b=>b.status!=="completed"&&(!b.dueDate||b.dueDate<=l)),v=Vt(),x=n.filter(b=>new Date(b.date)>=new Date(i.toDateString())).sort((b,B)=>new Date(b.date)-new Date(B.date)).slice(0,3),K=ut(),f=nt(),E=new Date;E.setDate(E.getDate()-7);const pt=s.filter(b=>b.completedAt&&new Date(b.completedAt)>=E).length;return`
    <div class="page" id="home-page">
      <div style="margin-bottom:var(--sp-6)">
        <h1 class="text-xl font-bold" style="margin-bottom:2px">${xe()}, ${t.name}.</h1>
        <p class="text-sm text-secondary">${Kt(i)}</p>
      </div>

      <div class="card" style="text-align:center;padding:var(--sp-6);margin-bottom:var(--sp-5);position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(108,92,231,.06),rgba(78,168,246,.06));pointer-events:none"></div>
        <div class="progress-ring-wrap" style="margin:0 auto var(--sp-3)">
          ${we(d,140,8)}
          <div class="ring-label">
            <span style="font-size:2.5rem;font-weight:800;line-height:1">${d}<span style="font-size:1.25rem">%</span></span>
          </div>
        </div>
        <p class="text-sm font-semibold" style="margin-bottom:2px">Today's Progress</p>
        <p class="text-xs text-secondary">${o} of ${r} essentials completed</p>
        <div style="margin-top:var(--sp-3);display:inline-flex;align-items:center;gap:var(--sp-2);padding:var(--sp-1) var(--sp-3);background:var(--bg-input);border-radius:var(--r-full)">
          <span class="text-xs font-bold" style="color:var(--c-accent)">${c}</span>
          <span class="text-xs text-secondary">${u}</span>
        </div>
      </div>

      <div class="section-heading"><h2>Non-Negotiables</h2>
        <button class="btn-ghost text-xs" data-nav="habits">See all ${p("chevronRight",14)}</button>
      </div>
      <div id="home-nn-list" style="margin-bottom:var(--sp-6)">
        ${e.length===0?`
          <div class="card" style="text-align:center;padding:var(--sp-5)">
            <p class="text-sm text-secondary">No essentials yet.</p>
            <p class="text-xs text-tertiary">Create your non-negotiables to get started.</p>
          </div>
        `:e.map(b=>{const B=a[b.id]||{},$=!!B.completed,et=B.value||0,mt=St(b.id);return`
            <div class="nn-card ${$?"completed":""}">
              <div class="nn-icon" style="background:${b.color}18;color:${b.color}">${b.icon}</div>
              <div class="nn-info">
                <div class="nn-title">${b.title}</div>
                <div class="nn-meta">
                  ${b.unit!=="checkbox"?`<span>${et} / ${b.target} ${b.unit}</span>`:""}
                  ${mt>0?`<span class="streak-badge">🔥 ${mt} day${mt>1?"s":""}</span>`:""}
                </div>
              </div>
              <div class="checkbox ${$?"checked":""}" data-nn-toggle="${b.id}">${J}</div>
            </div>`}).join("")}
      </div>

      <div class="section-heading"><h2>Today</h2>
        <button class="btn-ghost text-xs" data-nav="tasks">See all ${p("chevronRight",14)}</button>
      </div>
      <div style="margin-bottom:var(--sp-6)">
        ${m.length===0&&v===0?`
          <div class="card" style="text-align:center;padding:var(--sp-5)">
            <p class="text-sm text-secondary" style="margin-bottom:2px">Clear board.</p>
            <p class="text-xs text-tertiary">You have room to create something.</p>
          </div>
        `:`
          ${v>0?`<p class="text-xs text-secondary" style="margin-bottom:var(--sp-2)">${v} task${v>1?"s":""} completed today ✓</p>`:""}
          ${m.slice(0,5).map(b=>`
            <div class="task-item">
              <div class="checkbox ${b.status==="completed"?"checked":""}" data-task-toggle="${b.id}">${J}</div>
              <div class="task-info">
                <div class="task-title">${b.title}</div>
                <div class="task-meta">
                  ${b.category?`<span class="badge ${Se(b.category)}">${b.category}</span>`:""}
                  ${b.estimatedDuration?`<span>${b.estimatedDuration}m</span>`:""}
                </div>
              </div>
              ${b.priority?`<div class="priority-dot priority-${b.priority}"></div>`:""}
            </div>
          `).join("")}
          ${m.length>5?`<p class="text-xs text-tertiary" style="margin-top:var(--sp-2);text-align:center">+${m.length-5} more</p>`:""}
        `}
      </div>

      ${x.length>0?`
        <div class="section-heading"><h2>Up Next</h2>
          <button class="btn-ghost text-xs" data-nav="deadlines">See all ${p("chevronRight",14)}</button>
        </div>
        <div style="margin-bottom:var(--sp-6)">
          ${x.map(b=>{const B=Yt(b.date);return`
              <div class="card card-interactive" style="padding:var(--sp-3) var(--sp-4);margin-bottom:var(--sp-2)" data-nav="deadlines">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-semibold">${b.title}</div>
                    <div class="text-xs ${Jt(B.urgency)}" style="margin-top:2px">${B.text}</div>
                  </div>
                  ${b.progress>0?`<span class="text-sm font-bold">${b.progress}%</span>`:""}
                </div>
              </div>`}).join("")}
        </div>
      `:""}

      <div class="section-heading"><h2>This Week</h2></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--sp-2);margin-bottom:var(--sp-8)">
        <div class="card" style="text-align:center;padding:var(--sp-3)">
          <div class="text-lg font-bold" style="color:var(--c-study)">${bt(K)}</div>
          <div class="text-xs text-tertiary">Study</div>
        </div>
        <div class="card" style="text-align:center;padding:var(--sp-3)">
          <div class="text-lg font-bold" style="color:var(--c-work)">${bt(f)}</div>
          <div class="text-xs text-tertiary">Skills</div>
        </div>
        <div class="card" style="text-align:center;padding:var(--sp-3)">
          <div class="text-lg font-bold" style="color:var(--c-completed)">${pt}</div>
          <div class="text-xs text-tertiary">Tasks</div>
        </div>
      </div>
    </div>
  `}function Ee(){document.querySelectorAll("[data-nn-toggle]").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const a=t.dataset.nnToggle,n=Q()[a]||{},i=A().find(o=>o.id===a),l=!n.completed;if(gt(a,{completed:l,value:l?(i==null?void 0:i.target)||1:0,timestamp:new Date().toISOString()}),l){const o=t.getBoundingClientRect();N(o.left+o.width/2,o.top),y("Keep going. 💪")}})}),document.querySelectorAll("[data-task-toggle]").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const a=t.dataset.taskToggle,s=S().find(n=>n.id===a);if(s){const n=s.status==="completed"?"pending":"completed";if(ct(a,{status:n}),n==="completed"){const i=t.getBoundingClientRect();N(i.left+i.width/2,i.top)}}})}),document.querySelectorAll("[data-nav]").forEach(t=>{t.addEventListener("click",()=>{})})}function Te(t){const e=(t||"").toLowerCase();return{study:"badge-study",fitness:"badge-fitness",work:"badge-work",personal:"badge-personal",college:"badge-college"}[e]||"badge-work"}function Ae(){const t=new Date,e=j(),a=S(),s=a.filter(v=>!v.dueDate||v.dueDate===e||v.dueDate<e&&v.status!=="completed"),n=Vt(),i=s.length+n,l=i>0?Math.round(n/i*100):0,o=s.filter(v=>v.timeOfDay==="morning"&&v.status!=="completed"),r=s.filter(v=>v.timeOfDay==="afternoon"&&v.status!=="completed"),d=s.filter(v=>v.timeOfDay==="evening"&&v.status!=="completed"),c=s.filter(v=>!v.timeOfDay&&v.status!=="completed"),u=a.filter(v=>v.status==="completed"&&v.completedAt&&v.completedAt.startsWith(e));function m(v,x,K){return x.length===0?"":`
      <div style="margin-bottom:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-2)">${K} ${v}</p>
        ${x.map(f=>`
          <div class="task-item ${f.status==="completed"?"completed":""}">
            <div class="checkbox ${f.status==="completed"?"checked":""}" data-task-toggle="${f.id}">${J}</div>
            <div class="task-info">
              <div class="task-title">${f.title}</div>
              <div class="task-meta">
                ${f.category?`<span class="badge ${Te(f.category)}">${f.category}</span>`:""}
                ${f.estimatedDuration?`<span>${f.estimatedDuration}m</span>`:""}
                ${f.priority&&f.priority!=="low"?`<div class="priority-dot priority-${f.priority}"></div>`:""}
              </div>
            </div>
          </div>
        `).join("")}
      </div>`}return`
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Today</h1>
        <p class="text-sm text-secondary">${Kt(t)}</p>
      </div>

      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <span class="text-sm font-semibold">Daily Progress</span>
          <span class="text-sm font-bold" style="color:var(--c-accent)">${l}%</span>
        </div>
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${l}%"></div></div>
        <p class="text-xs text-tertiary" style="margin-top:var(--sp-2)">${n} completed · ${s.filter(v=>v.status!=="completed").length} remaining</p>
      </div>

      ${m("Morning",o,"🌅")}
      ${m("Afternoon",r,"☀️")}
      ${m("Evening",d,"🌙")}
      ${m("Tasks",c,"📋")}

      ${u.length>0?`
        <div style="margin-bottom:var(--sp-5)">
          <p class="label" style="margin-bottom:var(--sp-2)">✅ Completed</p>
          ${u.map(v=>`
            <div class="task-item completed">
              <div class="checkbox checked" data-task-toggle="${v.id}">${J}</div>
              <div class="task-info"><div class="task-title">${v.title}</div></div>
            </div>
          `).join("")}
        </div>
      `:""}

      ${s.length===0&&u.length===0?`
        <div class="empty-state">
          <div class="empty-state-icon">${p("today")}</div>
          <h3>Nothing planned for today.</h3>
          <p>Add tasks and assign them to morning, afternoon, or evening.</p>
        </div>
      `:""}
    </div>
  `}function Le(){document.querySelectorAll("[data-task-toggle]").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const a=t.dataset.taskToggle,s=S().find(n=>n.id===a);if(s){const n=s.status==="completed"?"pending":"completed";if(ct(a,{status:n}),n==="completed"){const i=t.getBoundingClientRect();N(i.left+i.width/2,i.top)}}})})}const je=["Study","Work","Fitness","Personal","College","Other"],Me=["low","medium","high","urgent"],Ie=["morning","afternoon","evening"];function At(t){const e=(t||"").toLowerCase();return{study:"badge-study",fitness:"badge-fitness",work:"badge-work",personal:"badge-personal",college:"badge-college"}[e]||"badge-work"}function qe(){const t=S(),e=t.filter(s=>s.status!=="completed").sort((s,n)=>{const i={urgent:0,high:1,medium:2,low:3};return(i[s.priority]??3)-(i[n.priority]??3)}),a=t.filter(s=>s.status==="completed").sort((s,n)=>new Date(n.completedAt)-new Date(s.completedAt));return`
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Tasks</h1>
        <button class="btn btn-primary btn-sm" id="open-task-modal">${p("plus",18)} Add Task</button>
      </div>

      ${e.length===0&&a.length===0?`
        <div class="empty-state">
          <div class="empty-state-icon">${p("tasks")}</div>
          <h3>Clear board.</h3>
          <p>You have room to create something.</p>
        </div>
      `:""}

      ${e.map(s=>`
        <div class="task-item" data-task-id="${s.id}">
          <div class="checkbox" data-task-toggle="${s.id}">${J}</div>
          <div class="task-info" data-task-edit="${s.id}" style="cursor:pointer">
            <div class="task-title">${s.title}</div>
            <div class="task-meta">
              ${s.category?`<span class="badge ${At(s.category)}">${s.category}</span>`:""}
              ${s.dueDate?`<span>${s.dueDate===j()?"Today":s.dueDate}</span>`:""}
              ${s.estimatedDuration?`<span>${s.estimatedDuration}m</span>`:""}
              ${s.timeOfDay?`<span style="text-transform:capitalize">${s.timeOfDay}</span>`:""}
            </div>
          </div>
          ${s.priority?`<div class="priority-dot priority-${s.priority}" title="${Qt(s.priority)}"></div>`:""}
        </div>
      `).join("")}

      ${a.length>0?`
        <div style="margin-top:var(--sp-5)">
          <p class="label" style="margin-bottom:var(--sp-3)">Completed (${a.length})</p>
          ${a.slice(0,10).map(s=>`
            <div class="task-item completed">
              <div class="checkbox checked" data-task-toggle="${s.id}">${J}</div>
              <div class="task-info">
                <div class="task-title">${s.title}</div>
                <div class="task-meta">
                  ${s.category?`<span class="badge ${At(s.category)}">${s.category}</span>`:""}
                </div>
              </div>
              <button class="btn-icon" data-task-delete="${s.id}" style="opacity:.5" title="Delete">${p("trash",16)}</button>
            </div>
          `).join("")}
          ${a.length>10?`<p class="text-xs text-tertiary text-center" style="margin-top:var(--sp-2)">+${a.length-10} more</p>`:""}
        </div>
      `:""}
    </div>
  `}function Ce(t={}){return`
    <div class="flex flex-col gap-4">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="input-field" id="task-title" value="${t.title||""}" placeholder="What needs to be done?" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="input-field" id="task-desc" placeholder="Optional details..." rows="2">${t.description||""}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Due Date</label>
          <input class="input-field" type="date" id="task-due" value="${t.dueDate||j()}" />
        </div>
        <div class="form-group">
          <label class="form-label">Time of Day</label>
          <select class="select-field" id="task-tod">
            <option value="">Any</option>
            ${Ie.map(e=>`<option value="${e}" ${t.timeOfDay===e?"selected":""}>${e.charAt(0).toUpperCase()+e.slice(1)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Priority</label>
          <select class="select-field" id="task-priority">
            ${Me.map(e=>`<option value="${e}" ${(t.priority||"medium")===e?"selected":""}>${Qt(e)}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="select-field" id="task-cat">
            ${je.map(e=>`<option value="${e}" ${t.category===e?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Estimated Duration (minutes)</label>
        <input class="input-field" type="number" id="task-duration" value="${t.estimatedDuration||""}" placeholder="e.g. 45" min="1" />
      </div>
      <button class="btn btn-primary w-full" id="task-submit">${t.id?"Update Task":"Add Task"}</button>
      ${t.id?'<button class="btn btn-danger w-full" id="task-delete-btn">Delete Task</button>':""}
    </div>
  `}function Lt(t=null){F(t?"Edit Task":"New Task",Ce(t||{}),e=>{var a;setTimeout(()=>{var s;return(s=e.querySelector("#task-title"))==null?void 0:s.focus()},100),e.querySelector("#task-submit").addEventListener("click",()=>{const s=e.querySelector("#task-title").value.trim();if(!s){y("Title is required");return}const n={title:s,description:e.querySelector("#task-desc").value.trim(),dueDate:e.querySelector("#task-due").value,timeOfDay:e.querySelector("#task-tod").value,priority:e.querySelector("#task-priority").value,category:e.querySelector("#task-cat").value,estimatedDuration:parseInt(e.querySelector("#task-duration").value)||null};t?(ct(t.id,n),y("Task updated")):(re(n),y("Task added")),h()}),t&&((a=e.querySelector("#task-delete-btn"))==null||a.addEventListener("click",()=>{Ft(t.id),y("Task deleted"),h()}))})}function Ne(){var t;(t=document.getElementById("open-task-modal"))==null||t.addEventListener("click",()=>Lt()),document.querySelectorAll("[data-task-toggle]").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const s=e.dataset.taskToggle,n=S().find(i=>i.id===s);if(n){const i=n.status==="completed"?"pending":"completed";if(ct(s,{status:i}),i==="completed"){const l=e.getBoundingClientRect();N(l.left+l.width/2,l.top)}}})}),document.querySelectorAll("[data-task-edit]").forEach(e=>{e.addEventListener("click",()=>{const a=S().find(s=>s.id===e.dataset.taskEdit);a&&Lt(a)})}),document.querySelectorAll("[data-task-delete]").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation(),Ft(e.dataset.taskDelete),y("Task removed")})})}const Be=["Exam","Assignment","Project","Application","Work","Personal","Other"];function Pe(){const t=U().sort((s,n)=>new Date(s.date)-new Date(n.date)),e=t.filter(s=>(new Date(s.date)-new Date(new Date().toDateString()))/864e5>=0),a=t.filter(s=>(new Date(s.date)-new Date(new Date().toDateString()))/864e5<0);return`
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Deadlines</h1>
        <button class="btn btn-primary btn-sm" id="open-deadline-modal">${p("plus",18)} Add</button>
      </div>

      ${e.length===0&&a.length===0?`
        <div class="empty-state">
          <div class="empty-state-icon">${p("deadline")}</div>
          <h3>No deadlines yet.</h3>
          <p>Nothing chasing you. Enjoy it.</p>
        </div>
      `:""}

      ${e.map(s=>{const n=Yt(s.date);return`
          <div class="deadline-card ${ke(n.urgency)}">
            <div class="flex items-center justify-between">
              <div>
                ${s.type?`<span class="text-xs font-semibold text-tertiary" style="text-transform:uppercase;letter-spacing:1px">${s.type}</span>`:""}
                <div class="deadline-title">${s.title}</div>
                <div class="text-xs text-secondary">${new Date(s.date).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
              </div>
              <div style="text-align:right">
                <div class="deadline-countdown ${Jt(n.urgency)}">${n.text}</div>
              </div>
            </div>
            ${s.progress>0?`
              <div class="deadline-progress">
                <div class="flex items-center justify-between" style="margin-bottom:4px">
                  <span class="text-xs text-secondary">Progress</span>
                  <span class="text-xs font-bold">${s.progress}%</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${s.progress}%;background:${n.urgency==="urgent"||n.urgency==="overdue"?"var(--c-deadline)":"var(--c-accent)"}"></div></div>
              </div>
            `:""}
            ${s.description?`<p class="text-xs text-secondary" style="margin-top:var(--sp-2)">${s.description}</p>`:""}
            <div class="flex gap-2" style="margin-top:var(--sp-3)">
              <button class="btn btn-secondary btn-sm" data-deadline-edit="${s.id}">${p("edit",14)} Edit</button>
              <button class="btn btn-ghost btn-sm" data-deadline-delete="${s.id}">${p("trash",14)}</button>
            </div>
          </div>`}).join("")}

      ${a.length>0?`
        <p class="label" style="margin:var(--sp-5) 0 var(--sp-3)">Past</p>
        ${a.map(s=>`
          <div class="deadline-card" style="opacity:.5">
            <div class="flex items-center justify-between">
              <div class="deadline-title text-sm">${s.title}</div>
              <span class="text-xs urgency-overdue">Overdue</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-deadline-delete="${s.id}" style="margin-top:var(--sp-2)">${p("trash",14)} Remove</button>
          </div>
        `).join("")}
      `:""}
    </div>
  `}function Fe(t={}){return`
    <div class="flex flex-col gap-4">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="input-field" id="dl-title" value="${t.title||""}" placeholder="e.g. Chemistry Exam" autofocus />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input class="input-field" type="date" id="dl-date" value="${t.date||""}" />
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="select-field" id="dl-type">
            ${Be.map(e=>`<option value="${e}" ${t.type===e?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="input-field" id="dl-desc" rows="2" placeholder="Optional details...">${t.description||""}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Progress (%)</label>
        <input class="input-field" type="number" id="dl-progress" min="0" max="100" value="${t.progress||0}" />
      </div>
      <button class="btn btn-primary w-full" id="dl-submit">${t.id?"Update Deadline":"Add Deadline"}</button>
      ${t.id?'<button class="btn btn-danger w-full" id="dl-delete-btn">Delete Deadline</button>':""}
    </div>
  `}function jt(t=null){F(t?"Edit Deadline":"New Deadline",Fe(t||{}),e=>{var a;setTimeout(()=>{var s;return(s=e.querySelector("#dl-title"))==null?void 0:s.focus()},100),e.querySelector("#dl-submit").addEventListener("click",()=>{const s=e.querySelector("#dl-title").value.trim(),n=e.querySelector("#dl-date").value;if(!s||!n){y("Title and date are required");return}const i={title:s,date:n,type:e.querySelector("#dl-type").value,description:e.querySelector("#dl-desc").value.trim(),progress:parseInt(e.querySelector("#dl-progress").value)||0};t?(ce(t.id,i),y("Deadline updated")):(de(i),y("Deadline added")),h()}),t&&((a=e.querySelector("#dl-delete-btn"))==null||a.addEventListener("click",()=>{Ot(t.id),y("Deadline removed"),h()}))})}function Oe(){var t;(t=document.getElementById("open-deadline-modal"))==null||t.addEventListener("click",()=>jt()),document.querySelectorAll("[data-deadline-edit]").forEach(e=>{e.addEventListener("click",()=>{const a=U().find(s=>s.id===e.dataset.deadlineEdit);a&&jt(a)})}),document.querySelectorAll("[data-deadline-delete]").forEach(e=>{e.addEventListener("click",()=>{Ot(e.dataset.deadlineDelete),y("Deadline removed")})})}const We=[{value:"checkbox",label:"Simple Checkbox"},{value:"minutes",label:"Minutes"},{value:"hours",label:"Hours"},{value:"pages",label:"Pages"},{value:"reps",label:"Repetitions"}],Re=["🏃‍♀️","📖","💻","😴","📚","🧘","💪","🧠","✍️","🎯","💧","🥗","🎵","🎨","📝","🔥","⚡","🌟","💡","🏋️"];function He(){const t=A(),e=Q();return`
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Non-Negotiables</h1>
          <p class="text-sm text-secondary">Your daily essentials</p>
        </div>
        <button class="btn btn-primary btn-sm" id="add-nn-btn">${p("plus",18)} Add</button>
      </div>

      ${t.length===0?`
        <div class="empty-state">
          <div class="empty-state-icon">${p("habits")}</div>
          <h3>No essentials yet.</h3>
          <p>Define what matters most every single day.</p>
        </div>
      `:t.map(a=>{const s=e[a.id]||{},n=!!s.completed,i=s.value||0,l=St(a.id);return`
          <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-3)">
            <div class="flex items-center gap-3" style="margin-bottom:${a.unit!=="checkbox"&&!n?"var(--sp-3)":"0"}">
              <div class="nn-icon" style="background:${a.color}18;color:${a.color};font-size:1.25rem">${a.icon}</div>
              <div class="nn-info" style="flex:1">
                <div class="text-sm font-semibold ${n?"text-tertiary":""}" style="${n?"text-decoration:line-through":""}">${a.title}</div>
                <div class="nn-meta">
                  ${a.unit!=="checkbox"?`<span>${a.target} ${a.unit}</span>`:""}
                  ${l>0?`<span class="streak-badge">🔥 ${l} day${l>1?"s":""}</span>`:""}
                </div>
              </div>
              <div class="checkbox ${n?"checked":""}" data-nn-toggle="${a.id}">${J}</div>
            </div>

            ${a.unit!=="checkbox"&&!n?`
              <div style="margin-top:var(--sp-2)">
                <div class="flex items-center justify-between" style="margin-bottom:4px">
                  <span class="text-xs text-secondary">${i} / ${a.target} ${a.unit}</span>
                  <span class="text-xs font-bold">${Math.round(i/a.target*100)}%</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${Math.min(100,i/a.target*100)}%;background:${a.color}"></div></div>
                <div class="flex gap-2" style="margin-top:var(--sp-2)">
                  <button class="btn btn-secondary btn-sm" data-nn-add="${a.id}" data-amount="${Math.round(a.target/4)}">+${Math.round(a.target/4)}</button>
                  <button class="btn btn-secondary btn-sm" data-nn-add="${a.id}" data-amount="${Math.round(a.target/2)}">+${Math.round(a.target/2)}</button>
                  <button class="btn btn-secondary btn-sm" data-nn-add="${a.id}" data-amount="${a.target}">+${a.target}</button>
                </div>
              </div>
            `:""}

            <div class="flex gap-2" style="margin-top:var(--sp-3)">
              <button class="btn btn-ghost btn-sm" data-nn-edit="${a.id}">${p("edit",14)} Edit</button>
              <button class="btn btn-ghost btn-sm" data-nn-delete="${a.id}">${p("trash",14)}</button>
            </div>
          </div>`}).join("")}
    </div>
  `}function Ge(t={}){return`
    <div class="flex flex-col gap-4">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="input-field" id="nn-title" value="${t.title||""}" placeholder="e.g. Move your body" autofocus />
      </div>
      <div class="form-group">
        <label class="form-label">Icon</label>
        <div class="flex gap-2" style="flex-wrap:wrap" id="nn-icon-picker">
          ${Re.map(e=>`
            <button class="btn-icon ${t.icon===e?"active":""}" data-icon="${e}"
              style="font-size:1.25rem;width:40px;height:40px;border-radius:var(--r-md);background:var(--bg-input);border:2px solid ${t.icon===e?"var(--c-accent)":"transparent"}">${e}</button>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Color</label>
        <div class="flex gap-2" id="nn-color-picker">
          ${["#00D68F","#4EA8F6","#A78BFA","#F59E0B","#F472B6","#818CF8","#F87171","#34D399","#6C5CE7"].map(e=>`
            <div class="color-dot ${t.color===e?"active":""}" data-color="${e}" style="background:${e}"></div>
          `).join("")}
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Unit</label>
          <select class="select-field" id="nn-unit">
            ${We.map(e=>`<option value="${e.value}" ${(t.unit||"checkbox")===e.value?"selected":""}>${e.label}</option>`).join("")}
          </select>
        </div>
        <div class="form-group" id="nn-target-group">
          <label class="form-label">Target</label>
          <input class="input-field" type="number" id="nn-target" value="${t.target||1}" min="1" />
        </div>
      </div>
      <button class="btn btn-primary w-full" id="nn-submit">${t.id?"Update":"Create Non-Negotiable"}</button>
    </div>
  `}function Mt(t=null){let e=(t==null?void 0:t.icon)||"🎯",a=(t==null?void 0:t.color)||"#6C5CE7";F(t?"Edit Non-Negotiable":"New Non-Negotiable",Ge(t||{icon:e,color:a}),s=>{setTimeout(()=>{var n;return(n=s.querySelector("#nn-title"))==null?void 0:n.focus()},100),s.querySelectorAll("[data-icon]").forEach(n=>{n.addEventListener("click",()=>{s.querySelectorAll("[data-icon]").forEach(i=>i.style.borderColor="transparent"),n.style.borderColor="var(--c-accent)",e=n.dataset.icon})}),s.querySelectorAll("[data-color]").forEach(n=>{n.addEventListener("click",()=>{s.querySelectorAll("[data-color]").forEach(i=>i.classList.remove("active")),n.classList.add("active"),a=n.dataset.color})}),s.querySelector("#nn-unit").addEventListener("change",n=>{const i=s.querySelector("#nn-target-group");i.style.display=n.target.value==="checkbox"?"none":""}),((t==null?void 0:t.unit)||"checkbox")==="checkbox"&&(s.querySelector("#nn-target-group").style.display="none"),s.querySelector("#nn-submit").addEventListener("click",()=>{const n=s.querySelector("#nn-title").value.trim();if(!n){y("Title is required");return}const i={title:n,icon:e,color:a,unit:s.querySelector("#nn-unit").value,target:parseInt(s.querySelector("#nn-target").value)||1,frequency:"daily"};t?(oe(t.id,i),y("Updated")):(ie(i),y("Non-negotiable created")),h()})})}function Ue(){var t;(t=document.getElementById("add-nn-btn"))==null||t.addEventListener("click",()=>Mt()),document.querySelectorAll("[data-nn-toggle]").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const s=e.dataset.nnToggle,i=Q()[s]||{},l=A().find(r=>r.id===s),o=!i.completed;if(gt(s,{completed:o,value:o?(l==null?void 0:l.target)||1:0,timestamp:new Date().toISOString()}),o){const r=e.getBoundingClientRect();N(r.left+r.width/2,r.top)}})}),document.querySelectorAll("[data-nn-add]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.nnAdd,s=parseInt(e.dataset.amount),n=A().find(d=>d.id===a),l=Q()[a]||{},o=Math.min((l.value||0)+s,n.target*2),r=o>=n.target;if(gt(a,{completed:r,value:o,timestamp:new Date().toISOString()}),r&&!l.completed){const d=e.getBoundingClientRect();N(d.left+d.width/2,d.top),y("Essential complete! 🎯")}})}),document.querySelectorAll("[data-nn-edit]").forEach(e=>{e.addEventListener("click",()=>{const a=A().find(s=>s.id===e.dataset.nnEdit);a&&Mt(a)})}),document.querySelectorAll("[data-nn-delete]").forEach(e=>{e.addEventListener("click",()=>{le(e.dataset.nnDelete),y("Removed")})})}function _e(){const t=_(),e=z(),a=zt(),s=ut(),n=t.reduce((o,r)=>o+(r.weeklyGoal||300),0),i=n>0?Math.min(100,Math.round(s/n*100)):0,l=[...e].sort((o,r)=>new Date(r.createdAt||r.date)-new Date(o.createdAt||o.date)).slice(0,10);return`
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Study Operating Center</h1>
          <p class="text-sm text-secondary">Track focus hours, subjects & active recall progress</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-manage-subjects">${p("settings",16)} Subjects</button>
          <button class="btn btn-primary btn-sm" id="btn-log-study">${p("plus",16)} Log Session</button>
        </div>
      </div>

      <!-- Stats Overview Header -->
      <div class="grid grid-2" style="margin-bottom:var(--sp-5);gap:var(--sp-3)">
        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(78,168,246,0.12), rgba(108,92,231,0.08));border:1px solid rgba(78,168,246,0.25)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
            <span class="text-xs font-semibold uppercase text-tertiary" style="letter-spacing:0.5px">Today's Focus</span>
            <span class="badge badge-study">${p("study",12)} Active</span>
          </div>
          <div class="text-2xl font-bold" style="color:var(--c-study)">${tt(a)}</div>
          <p class="text-xs text-secondary" style="margin-top:var(--sp-1)">Logged across all subjects today</p>
        </div>

        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(0,214,143,0.12), rgba(78,168,246,0.08));border:1px solid rgba(0,214,143,0.25)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
            <span class="text-xs font-semibold uppercase text-tertiary" style="letter-spacing:0.5px">This Week Goal</span>
            <span class="text-xs font-bold" style="color:var(--c-success)">${i}%</span>
          </div>
          <div class="text-2xl font-bold" style="color:var(--c-success)">${(s/60).toFixed(1)} / ${(n/60).toFixed(0)} hrs</div>
          <div class="progress-bar" style="margin-top:var(--sp-2)">
            <div class="progress-bar-fill" style="width:${i}%;background:var(--c-success)"></div>
          </div>
        </div>
      </div>

      <!-- Subjects Grid -->
      <div style="margin-bottom:var(--sp-6)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-3)">
          <p class="label">Subjects & Targets</p>
          <button class="text-xs text-accent font-medium" id="btn-quick-timer">Start Timer ${p("timer",12)}</button>
        </div>

        ${t.length===0?`
          <div class="empty-state">
            <div class="empty-state-icon">${p("study")}</div>
            <h3>No subjects created yet</h3>
            <p>Add subjects like Math, Science, or Computer Science to track study hours.</p>
            <button class="btn btn-primary btn-sm" id="btn-add-first-subject" style="margin-top:var(--sp-3)">Add Subject</button>
          </div>
        `:`
          <div class="grid grid-2" style="gap:var(--sp-3)">
            ${t.map(o=>{const r=fe(o.id),d=o.weeklyGoal||300,c=Math.min(100,Math.round(r/d*100));return`
                <div class="card" style="padding:var(--sp-4);border-left:4px solid ${o.color||"#4EA8F6"}">
                  <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
                    <div class="flex items-center gap-2">
                      <div style="width:10px;height:10px;border-radius:50%;background:${o.color||"#4EA8F6"}"></div>
                      <span class="font-bold text-sm">${o.name}</span>
                    </div>
                    <button class="btn-icon btn-sm btn-quick-log-sub" data-sub-id="${o.id}" title="Quick log">${p("plus",14)}</button>
                  </div>
                  <div class="flex items-baseline justify-between" style="margin-bottom:var(--sp-1)">
                    <span class="text-xs text-secondary">${tt(r)} / ${tt(d)}</span>
                    <span class="text-xs font-semibold" style="color:${o.color||"#4EA8F6"}">${c}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill" style="width:${c}%;background:${o.color||"#4EA8F6"}"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>

      <!-- Recent Study Sessions Log -->
      <div>
        <p class="label" style="margin-bottom:var(--sp-3)">Recent Focus Logs</p>
        ${l.length===0?`
          <div class="card" style="padding:var(--sp-4);text-align:center;color:var(--t-tertiary)">
            No study sessions logged yet. Tap <strong>Log Session</strong> above to add one.
          </div>
        `:`
          <div class="card" style="padding:0">
            ${l.map((o,r)=>{const d=t.find(m=>m.id===o.subjectId),c=d?d.color:"#4EA8F6",u=d?d.name:o.subjectName||"Study";return`
                <div class="flex items-center justify-between" style="padding:var(--sp-3) var(--sp-4);${r!==l.length-1?"border-bottom:1px solid var(--b-subtle)":""}">
                  <div class="flex items-center gap-3">
                    <div style="width:36px;height:36px;border-radius:var(--r-md);background:${c}22;color:${c};display:flex;align-items:center;justify-content:center;font-weight:700">
                      ${p("study",18)}
                    </div>
                    <div>
                      <div class="font-semibold text-sm">${u}</div>
                      <div class="text-xs text-tertiary">${o.notes||"Focus session"} · ${o.date||"Today"}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="badge" style="background:${c}22;color:${c};font-weight:700">+${tt(o.duration)}</span>
                    <button class="btn-icon btn-sm text-tertiary btn-delete-sess" data-sess-id="${o.id}">${p("trash",14)}</button>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    </div>
  `}function ze(){var t,e,a,s;(t=document.getElementById("btn-log-study"))==null||t.addEventListener("click",()=>It()),(e=document.getElementById("btn-quick-timer"))==null||e.addEventListener("click",()=>T("timer")),(a=document.getElementById("btn-manage-subjects"))==null||a.addEventListener("click",()=>yt()),(s=document.getElementById("btn-add-first-subject"))==null||s.addEventListener("click",()=>yt()),document.querySelectorAll(".btn-quick-log-sub").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation(),It(n.dataset.subId)})}),document.querySelectorAll(".btn-delete-sess").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const l=n.dataset.sessId;confirm("Delete this study log?")&&(me(l),y("Study session deleted"),k())})})}function It(t=""){var n;const e=_();if(e.length===0){y("Please add a subject first!"),yt();return}const a=t||((n=e[0])==null?void 0:n.id),s=`
    <form id="form-study-log">
      <div class="form-group">
        <label class="form-label">Subject</label>
        <select class="form-select" id="log-subject-id" required>
          ${e.map(i=>`<option value="${i.id}" ${i.id===a?"selected":""}>${i.name}</option>`).join("")}
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
        <input type="date" class="form-input" id="log-date" value="${j()}" required />
      </div>

      <div class="flex justify-end gap-2" style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">${p("check",16)} Save Session</button>
      </div>
    </form>
  `;F("Log Study Session",s,i=>{i.querySelector("#modal-cancel").addEventListener("click",h),i.querySelectorAll(".dur-preset").forEach(l=>{l.addEventListener("click",()=>{i.querySelector("#log-duration").value=l.dataset.dur})}),i.querySelector("#form-study-log").addEventListener("submit",l=>{l.preventDefault();const o=i.querySelector("#log-subject-id").value,r=parseInt(i.querySelector("#log-duration").value,10),d=i.querySelector("#log-notes").value.trim(),c=i.querySelector("#log-date").value;Ht({subjectId:o,duration:r,notes:d,date:c}),h(),y("Study session logged! 📚"),N(window.innerWidth/2,window.innerHeight/2),k()})})}function yt(){const t=_(),e=`
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
            <button type="submit" class="btn btn-primary btn-sm" style="margin-left:auto">${p("plus",14)} Add</button>
          </div>
        </form>
      </div>

      <div class="divider" style="margin:var(--sp-4) 0"></div>

      <p class="label" style="margin-bottom:var(--sp-2)">Existing Subjects</p>
      <div class="flex flex-col gap-2" style="max-height:220px;overflow-y:auto">
        ${t.map(a=>`
          <div class="flex items-center justify-between" style="padding:var(--sp-2) var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--b-subtle)">
            <div class="flex items-center gap-2">
              <div style="width:12px;height:12px;border-radius:50%;background:${a.color}"></div>
              <span class="font-semibold text-sm">${a.name}</span>
              <span class="text-xs text-tertiary">(${(a.weeklyGoal/60).toFixed(1)} hrs/wk)</span>
            </div>
            <button class="btn-icon btn-sm text-tertiary btn-del-sub" data-sub-id="${a.id}">${p("trash",14)}</button>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-done">Done</button>
      </div>
    </div>
  `;F("Manage Subjects",e,a=>{a.querySelector("#modal-done").addEventListener("click",h),a.querySelector("#form-new-subject").addEventListener("submit",s=>{s.preventDefault();const n=a.querySelector("#new-sub-name").value.trim(),i=a.querySelector("#new-sub-color").value,l=parseFloat(a.querySelector("#new-sub-goal").value)||5;n&&(ue({name:n,color:i,weeklyGoal:Math.round(l*60)}),y(`Added subject "${n}"`),h(),k())}),a.querySelectorAll(".btn-del-sub").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.subId;confirm("Delete subject and all related study sessions?")&&(pe(n),y("Subject deleted"),h(),k())})})})}function Ve(){const t=V(),e=X(),a=nt(),s=t.reduce((o,r)=>o+(r.weeklyGoal||300),0),n=s>0?Math.min(100,Math.round(a/s*100)):0,i=[...e].sort((o,r)=>new Date(r.createdAt||r.date)-new Date(o.createdAt||o.date)).slice(0,10);function l(o){const r=o/60;return r<10?{level:"Beginner",badge:"badge-personal"}:r<50?{level:"Practitioner",badge:"badge-work"}:r<200?{level:"Advanced",badge:"badge-study"}:{level:"Master",badge:"badge-fitness"}}return`
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Skill & Work Studio</h1>
          <p class="text-sm text-secondary">Level up your core crafts through continuous practice</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-manage-skills">${p("settings",16)} Skills</button>
          <button class="btn btn-primary btn-sm" id="btn-log-skill">${p("plus",16)} Log Work</button>
        </div>
      </div>

      <!-- Weekly Summary -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5);background:linear-gradient(135deg, rgba(167,139,250,0.12), rgba(244,114,182,0.08));border:1px solid rgba(167,139,250,0.25)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <div>
            <span class="text-xs font-semibold uppercase text-tertiary" style="letter-spacing:0.5px">Weekly Practice Output</span>
            <div class="text-2xl font-bold" style="color:var(--c-skills)">${(a/60).toFixed(1)} / ${(s/60).toFixed(0)} hrs</div>
          </div>
          <span class="badge" style="background:var(--c-skills);color:#fff;font-weight:700;padding:4px 10px">${n}% of Target</span>
        </div>
        <div class="progress-bar" style="margin-top:var(--sp-2)">
          <div class="progress-bar-fill" style="width:${n}%;background:var(--c-skills)"></div>
        </div>
      </div>

      <!-- Skills List Grid -->
      <div style="margin-bottom:var(--sp-6)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-3)">
          <p class="label">Skills & Proficiency</p>
          <button class="text-xs text-accent font-medium" id="btn-quick-timer-skill">Focus Timer ${p("timer",12)}</button>
        </div>

        ${t.length===0?`
          <div class="empty-state">
            <div class="empty-state-icon">${p("skills")}</div>
            <h3>No skills registered yet</h3>
            <p>Add skills like Video Editing, Programming, or Writing to track progress.</p>
            <button class="btn btn-primary btn-sm" id="btn-add-first-skill" style="margin-top:var(--sp-3)">Add Skill</button>
          </div>
        `:`
          <div class="grid grid-2" style="gap:var(--sp-3)">
            ${t.map(o=>{const r=nt(o.id),d=e.filter(v=>v.skillId===o.id).reduce((v,x)=>v+(x.duration||0),0),c=o.weeklyGoal||300,u=Math.min(100,Math.round(r/c*100)),m=l(d);return`
                <div class="card" style="padding:var(--sp-4);border-top:4px solid ${o.color||"#A78BFA"}">
                  <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
                    <div class="font-bold text-sm flex items-center gap-2">
                      <div style="width:10px;height:10px;border-radius:50%;background:${o.color||"#A78BFA"}"></div>
                      ${o.name}
                    </div>
                    <span class="badge ${m.badge}">${m.level}</span>
                  </div>
                  <div class="text-xs text-secondary" style="margin-bottom:var(--sp-2)">
                    Total: <strong>${(d/60).toFixed(1)} hrs</strong> logged
                  </div>
                  <div class="flex items-baseline justify-between text-xs" style="margin-bottom:4px">
                    <span class="text-tertiary">This Week: ${tt(r)}</span>
                    <span class="font-semibold" style="color:${o.color||"#A78BFA"}">${u}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill" style="width:${u}%;background:${o.color||"#A78BFA"}"></div>
                  </div>
                  <div class="flex justify-end" style="margin-top:var(--sp-3)">
                    <button class="btn btn-secondary btn-sm btn-quick-log-skill" data-skill-id="${o.id}" style="padding:3px 8px;font-size:11px">+ Log Work</button>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>

      <!-- Recent Practice Logs -->
      <div>
        <p class="label" style="margin-bottom:var(--sp-3)">Recent Work Logs</p>
        ${i.length===0?`
          <div class="card" style="padding:var(--sp-4);text-align:center;color:var(--t-tertiary)">
            No work logged yet. Click <strong>Log Work</strong> above to record a session.
          </div>
        `:`
          <div class="card" style="padding:0">
            ${i.map((o,r)=>{const d=t.find(m=>m.id===o.skillId),c=d?d.color:"#A78BFA",u=d?d.name:o.skillName||"Skill";return`
                <div class="flex items-center justify-between" style="padding:var(--sp-3) var(--sp-4);${r!==i.length-1?"border-bottom:1px solid var(--b-subtle)":""}">
                  <div class="flex items-center gap-3">
                    <div style="width:36px;height:36px;border-radius:var(--r-md);background:${c}22;color:${c};display:flex;align-items:center;justify-content:center;font-weight:700">
                      ${p("skills",18)}
                    </div>
                    <div>
                      <div class="font-semibold text-sm">${u}</div>
                      <div class="text-xs text-tertiary">${o.notes||"Practice session"} · ${o.date||"Today"}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="badge" style="background:${c}22;color:${c};font-weight:700">+${tt(o.duration)}</span>
                    <button class="btn-icon btn-sm text-tertiary btn-delete-skill-sess" data-sess-id="${o.id}">${p("trash",14)}</button>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>
    </div>
  `}function Ke(){var t,e,a,s;(t=document.getElementById("btn-log-skill"))==null||t.addEventListener("click",()=>qt()),(e=document.getElementById("btn-quick-timer-skill"))==null||e.addEventListener("click",()=>T("timer")),(a=document.getElementById("btn-manage-skills"))==null||a.addEventListener("click",()=>ft()),(s=document.getElementById("btn-add-first-skill"))==null||s.addEventListener("click",()=>ft()),document.querySelectorAll(".btn-quick-log-skill").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation(),qt(n.dataset.skillId)})}),document.querySelectorAll(".btn-delete-skill-sess").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const l=n.dataset.sessId;confirm("Delete this practice log?")&&(be(l),y("Practice log deleted"),k())})})}function qt(t=""){var n;const e=V();if(e.length===0){y("Please add a skill first!"),ft();return}const a=t||((n=e[0])==null?void 0:n.id),s=`
    <form id="form-skill-log">
      <div class="form-group">
        <label class="form-label">Skill / Work Stream</label>
        <select class="form-select" id="log-skill-id" required>
          ${e.map(i=>`<option value="${i.id}" ${i.id===a?"selected":""}>${i.name}</option>`).join("")}
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
        <input type="date" class="form-input" id="log-skill-date" value="${j()}" required />
      </div>

      <div class="flex justify-end gap-2" style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">${p("check",16)} Save Log</button>
      </div>
    </form>
  `;F("Log Work / Skill Practice",s,i=>{i.querySelector("#modal-cancel").addEventListener("click",h),i.querySelectorAll(".dur-preset-skill").forEach(l=>{l.addEventListener("click",()=>{i.querySelector("#log-skill-duration").value=l.dataset.dur})}),i.querySelector("#form-skill-log").addEventListener("submit",l=>{l.preventDefault();const o=i.querySelector("#log-skill-id").value,r=parseInt(i.querySelector("#log-skill-duration").value,10),d=i.querySelector("#log-skill-notes").value.trim(),c=i.querySelector("#log-skill-date").value;_t({skillId:o,duration:r,notes:d,date:c}),h(),y("Practice logged! 💻"),N(window.innerWidth/2,window.innerHeight/2),k()})})}function ft(){const t=V(),e=`
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
            <button type="submit" class="btn btn-primary btn-sm" style="margin-left:auto">${p("plus",14)} Add</button>
          </div>
        </form>
      </div>

      <div class="divider" style="margin:var(--sp-4) 0"></div>

      <p class="label" style="margin-bottom:var(--sp-2)">Active Skills</p>
      <div class="flex flex-col gap-2" style="max-height:220px;overflow-y:auto">
        ${t.map(a=>`
          <div class="flex items-center justify-between" style="padding:var(--sp-2) var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--b-subtle)">
            <div class="flex items-center gap-2">
              <div style="width:12px;height:12px;border-radius:50%;background:${a.color}"></div>
              <span class="font-semibold text-sm">${a.name}</span>
              <span class="text-xs text-tertiary">(${(a.weeklyGoal/60).toFixed(1)} hrs/wk)</span>
            </div>
            <button class="btn-icon btn-sm text-tertiary btn-del-skill" data-skill-id="${a.id}">${p("trash",14)}</button>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end style="margin-top:var(--sp-4)">
        <button type="button" class="btn btn-secondary" id="modal-done">Done</button>
      </div>
    </div>
  `;F("Manage Skills",e,a=>{a.querySelector("#modal-done").addEventListener("click",h),a.querySelector("#form-new-skill").addEventListener("submit",s=>{s.preventDefault();const n=a.querySelector("#new-skill-name").value.trim(),i=a.querySelector("#new-skill-color").value,l=parseFloat(a.querySelector("#new-skill-goal").value)||7;n&&(ve({name:n,color:i,weeklyGoal:Math.round(l*60)}),y(`Added skill "${n}"`),h(),k())}),a.querySelectorAll(".btn-del-skill").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.skillId;confirm("Delete skill and recorded practice logs?")&&(ge(n),y("Skill deleted"),h(),k())})})})}function Ye(){const t=new Date,e=dt(),a=A(),s=S(),n=s.filter(c=>c.status==="completed").length,i=s.length,l=(ut()/60).toFixed(1),o=(nt()/60).toFixed(1),r=[];for(let c=6;c>=0;c--){const u=new Date(t);u.setDate(t.getDate()-c);const m=c===0?"Today":u.toLocaleDateString("en-US",{weekday:"short"}),v=dt(u);r.push({label:m,score:v,date:u})}const d=Math.round(r.reduce((c,u)=>c+u.score,0)/7);return`
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
            <span class="badge badge-personal">${p("award",12)} Daily</span>
          </div>
          <div class="text-3xl font-extrabold" style="color:var(--c-accent)">${e}<span class="text-sm font-normal text-secondary"> / 100</span></div>
          <div class="progress-bar" style="margin-top:var(--sp-2)">
            <div class="progress-bar-fill" style="width:${e}%"></div>
          </div>
        </div>

        <div class="card" style="padding:var(--sp-4);background:linear-gradient(135deg, rgba(0,212,211,0.15), rgba(0,214,143,0.1));border:1px solid rgba(0,212,211,0.3)">
          <div class="flex items-center justify-between" style="margin-bottom:var(--sp-1)">
            <span class="text-xs font-semibold uppercase text-tertiary">7-Day Average</span>
            <span class="badge badge-fitness">${d>=75?"Optimal":"Building"}</span>
          </div>
          <div class="text-3xl font-extrabold" style="color:var(--c-teal)">${d}<span class="text-sm font-normal text-secondary"> / 100</span></div>
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
          ${r.map(c=>{const u=Math.max(12,Math.round(c.score/100*110)),m=c.label==="Today";return`
              <div class="flex flex-col items-center" style="flex:1;height:100%;justify-content:flex-end">
                <span class="text-xs font-semibold" style="margin-bottom:4px;font-size:10px;color:${m?"var(--c-accent)":"var(--t-tertiary)"}">${c.score}</span>
                <div style="width:100%;max-width:28px;height:${u}px;background:${m?"var(--grad-primary)":"rgba(255,255,255,0.12)"};border-radius:var(--r-sm) var(--r-sm) 0 0;transition:all 0.3s var(--ease)"></div>
                <span class="text-xs" style="margin-top:6px;font-size:11px;color:${m?"var(--t-primary)":"var(--t-tertiary)"};font-weight:${m?"700":"500"}">${c.label}</span>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- Weekly Hours Summary -->
      <div class="grid grid-2" style="margin-bottom:var(--sp-5);gap:var(--sp-3)">
        <div class="card" style="padding:var(--sp-4)">
          <div class="flex items-center gap-2" style="margin-bottom:var(--sp-2);color:var(--c-study)">
            ${p("study",18)}
            <span class="font-bold text-sm">Study Output</span>
          </div>
          <div class="text-2xl font-bold">${l} <span class="text-xs font-normal text-secondary">hrs this week</span></div>
        </div>

        <div class="card" style="padding:var(--sp-4)">
          <div class="flex items-center gap-2" style="margin-bottom:var(--sp-2);color:var(--c-skills)">
            ${p("skills",18)}
            <span class="font-bold text-sm">Skill Output</span>
          </div>
          <div class="text-2xl font-bold">${o} <span class="text-xs font-normal text-secondary">hrs this week</span></div>
        </div>
      </div>

      <!-- Habit Streaks -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-3)">Non-Negotiable Streaks</p>
        ${a.length===0?`
          <p class="text-xs text-tertiary">No non-negotiables configured yet.</p>
        `:`
          <div class="flex flex-col gap-2">
            ${a.map(c=>{const u=St(c.id);return`
                <div class="flex items-center justify-between" style="padding:var(--sp-2) var(--sp-3);background:var(--bg-card);border-radius:var(--r-md);border:1px solid var(--b-subtle)">
                  <div class="flex items-center gap-2">
                    <span style="font-size:16px">${c.icon||"✨"}</span>
                    <span class="text-sm font-semibold">${c.title}</span>
                  </div>
                  <div class="flex items-center gap-1" style="color:var(--c-warning);font-weight:700;font-size:13px">
                    🔥 <span>${u} ${u===1?"day":"days"}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>

      <!-- Task Execution Stats -->
      <div class="card" style="padding:var(--sp-4)">
        <p class="label" style="margin-bottom:var(--sp-2)">Task Completion Rate</p>
        <div class="flex items-baseline justify-between" style="margin-bottom:var(--sp-2)">
          <span class="text-2xl font-bold">${n} / ${i}</span>
          <span class="text-sm font-semibold" style="color:var(--c-accent)">
            ${i>0?Math.round(n/i*100):0}% Total Completed
          </span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width:${i>0?n/i*100:0}%"></div>
        </div>
      </div>
    </div>
  `}function Je(){}let st=null;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),st=t});function Qe(){const t=it(),e=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone;return`
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">App Settings & PWA</h1>
        <p class="text-sm text-secondary">Customize your theme, manage offline data & install PWA</p>
      </div>

      <!-- Android / Samsung PWA Installation Card -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5);background:linear-gradient(135deg, rgba(78,168,246,0.15), rgba(108,92,231,0.1));border:1px solid rgba(78,168,246,0.3)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <div class="flex items-center gap-2">
            ${p("download",20)}
            <span class="font-bold text-sm">Android / Samsung PWA Status</span>
          </div>
          <span class="badge ${e?"badge-fitness":"badge-work"}">
            ${e?"Installed (Standalone)":"Browser Mode"}
          </span>
        </div>

        <p class="text-xs text-secondary" style="margin-bottom:var(--sp-3)">
          Clientivity is fully optimized for Samsung & Android phones as a native-feel Web App without requiring Play Store downloads.
        </p>

        ${e?`
          <div class="flex items-center gap-2 text-xs font-semibold text-success">
            ${p("check",14)} Running in Standalone App Mode!
          </div>
        `:`
          <div class="flex flex-col gap-2">
            <button class="btn btn-primary btn-sm" id="btn-pwa-install" style="width:100%">
              ${p("download",16)} Install Clientivity PWA to Home Screen
            </button>
            <div class="card" style="padding:var(--sp-3);background:var(--bg-card);border:1px dashed var(--b-medium)">
              <p class="text-xs font-semibold" style="margin-bottom:4px">Manual Install Instructions for Samsung & Chrome:</p>
              <ol class="text-xs text-secondary" style="padding-left:16px;margin:0;line-height:1.5">
                <li>Tap Chrome / Samsung Browser menu (⋮ three dots).</li>
                <li>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</li>
                <li>Launch Clientivity directly from your app drawer!</li>
              </ol>
            </div>
          </div>
        `}
      </div>

      <!-- User Profile -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-3)">Personalization</p>
        <form id="form-profile-settings">
          <div class="form-group">
            <label class="form-label">Your Name / Identifier</label>
            <input type="text" class="form-input" id="setting-name" value="${t.name||"Prerana"}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Theme Mode</label>
            <select class="form-select" id="setting-theme">
              <option value="dark" ${t.theme==="dark"?"selected":""}>Sleek Dark (Default)</option>
              <option value="oled" ${t.theme==="oled"?"selected":""}>OLED True Black</option>
              <option value="midnight" ${t.theme==="midnight"?"selected":""}>Midnight Indigo</option>
              <option value="light" ${t.theme==="light"?"selected":""}>Clean Light</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-sm">${p("check",14)} Save Profile</button>
        </form>
      </div>

      <!-- Data Backup & Reset -->
      <div class="card" style="padding:var(--sp-4)">
        <p class="label" style="margin-bottom:var(--sp-3)">Data & Storage Management</p>
        <div class="flex flex-col gap-3">
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" id="btn-export-data" style="flex:1">
              ${p("download",14)} Export Backup (JSON)
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-import-trigger" style="flex:1">
              ${p("plus",14)} Import Backup
            </button>
            <input type="file" id="input-import-file" accept=".json" style="display:none" />
          </div>

          <div class="divider" style="margin:var(--sp-1) 0"></div>

          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold text-xs text-danger">Reset All Local Data</div>
              <div class="text-xs text-tertiary">Clear tasks, habits, and focus logs</div>
            </div>
            <button class="btn btn-secondary btn-sm text-danger" id="btn-reset-data">${p("trash",14)} Reset</button>
          </div>
        </div>
      </div>
    </div>
  `}function Xe(){var e,a,s,n,i;(e=document.getElementById("btn-pwa-install"))==null||e.addEventListener("click",async()=>{if(st){st.prompt();const{outcome:l}=await st.userChoice;l==="accepted"&&y("Thank you for installing Clientivity!"),st=null}else y('Tap browser menu (⋮) -> "Add to Home screen" / "Install app"')}),(a=document.getElementById("form-profile-settings"))==null||a.addEventListener("submit",l=>{l.preventDefault();const o=document.getElementById("setting-name").value.trim(),r=document.getElementById("setting-theme").value;ne({name:o,theme:r}),document.documentElement.setAttribute("data-theme",r),y("Settings updated"),k()}),(s=document.getElementById("btn-export-data"))==null||s.addEventListener("click",()=>{const l={};for(let c=0;c<localStorage.length;c++){const u=localStorage.key(c);u.startsWith("clientivity_")&&(l[u]=localStorage.getItem(u))}const o=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),d=document.createElement("a");d.href=r,d.download=`clientivity_backup_${new Date().toISOString().split("T")[0]}.json`,d.click(),y("Backup downloaded")});const t=document.getElementById("input-import-file");(n=document.getElementById("btn-import-trigger"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",l=>{const o=l.target.files[0];if(!o)return;const r=new FileReader;r.onload=d=>{try{const c=JSON.parse(d.target.result);Object.keys(c).forEach(u=>localStorage.setItem(u,c[u])),y("Data restored successfully!"),setTimeout(()=>window.location.reload(),1e3)}catch{y("Failed to parse backup file")}},r.readAsText(o)}),(i=document.getElementById("btn-reset-data"))==null||i.addEventListener("click",()=>{confirm("Are you sure you want to wipe all local data? This action cannot be undone.")&&(Object.keys(localStorage).forEach(l=>{l.startsWith("clientivity_")&&localStorage.removeItem(l)}),y("All app data reset."),setTimeout(()=>window.location.reload(),1e3))})}let rt=null,L=25*60,C=25*60,Y=!1,R="study",I="",at="pomodoro",P=null,lt=null,O="none";function Ze(){const t=_(),e=V(),a=Math.floor(L/60),s=L%60,n=`${a.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`,l=565-565*(C>0?(C-L)/C*100:0)/100;return`
    <div class="page" id="timer-page-container">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-4)">
        <div>
          <h1 class="text-xl font-bold">Focus Mode</h1>
          <p class="text-sm text-secondary">Eliminate distractions and enter deep work flow</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-toggle-fullscreen">${p("maximize",16)} Fullscreen</button>
        </div>
      </div>

      <!-- Mode Selector Pills -->
      <div class="flex justify-center gap-2" style="margin-bottom:var(--sp-5);flex-wrap:wrap">
        <button class="btn btn-sm ${at==="pomodoro"?"btn-primary":"btn-secondary"}" data-mode="pomodoro" data-mins="25">25m Pomodoro</button>
        <button class="btn btn-sm ${at==="deepFocus"?"btn-primary":"btn-secondary"}" data-mode="deepFocus" data-mins="50">50m Deep Work</button>
        <button class="btn btn-sm ${at==="shortBreak"?"btn-primary":"btn-secondary"}" data-mode="shortBreak" data-mins="5">5m Break</button>
        <button class="btn btn-sm ${at==="longBreak"?"btn-primary":"btn-secondary"}" data-mode="longBreak" data-mins="15">15m Break</button>
      </div>

      <!-- Main Circular Timer Container -->
      <div class="flex flex-col items-center justify-center" style="margin:var(--sp-4) 0">
        <div style="position:relative;width:240px;height:240px;display:flex;align-items:center;justify-content:center">
          <svg width="240" height="240" viewBox="0 0 200 200" style="transform:rotate(-90deg)">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--b-medium)" stroke-width="8" />
            <circle id="timer-ring" cx="100" cy="100" r="90" fill="none" stroke="var(--c-accent)" stroke-width="8"
                    stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="${l}"
                    style="transition:stroke-dashoffset 1s linear" />
          </svg>
          <div style="position:absolute;text-align:center">
            <div id="timer-display" style="font-size:42px;font-weight:900;letter-spacing:-1px;font-family:monospace">${n}</div>
            <div id="timer-status-text" class="text-xs text-tertiary" style="margin-top:2px;text-transform:uppercase;letter-spacing:1px">
              ${Y?"FOCUSING":"READY"}
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4" style="margin-top:var(--sp-6)">
          <button class="btn btn-secondary btn-icon" id="btn-timer-reset" style="width:48px;height:48px;border-radius:50%" title="Reset">${p("trash",20)}</button>
          <button class="btn btn-primary btn-icon" id="btn-timer-toggle" style="width:64px;height:64px;border-radius:50%;font-size:20px" title="${Y?"Pause":"Start"}">
            ${p(Y?"pause":"play",28)}
          </button>
          <button class="btn btn-secondary btn-icon" id="btn-timer-skip" style="width:48px;height:48px;border-radius:50%" title="Log & Finish">${p("check",20)}</button>
        </div>
      </div>

      <!-- Activity Link Card -->
      <div class="card" style="padding:var(--sp-4);margin-top:var(--sp-5)">
        <p class="label" style="margin-bottom:var(--sp-2)">Log completed focus time to:</p>
        <div class="grid grid-2" style="gap:var(--sp-2);margin-bottom:var(--sp-3)">
          <button class="btn btn-sm ${R==="study"?"btn-primary":"btn-secondary"}" id="btn-type-study">📚 Study Subject</button>
          <button class="btn btn-sm ${R==="skill"?"btn-primary":"btn-secondary"}" id="btn-type-skill">💻 Skill Practice</button>
        </div>

        ${R==="study"?`
          <div class="form-group" style="margin:0">
            <select class="form-select" id="timer-target-id">
              ${t.map(o=>`<option value="${o.id}" ${o.id===I?"selected":""}>${o.name}</option>`).join("")}
            </select>
          </div>
        `:`
          <div class="form-group" style="margin:0">
            <select class="form-select" id="timer-target-id">
              ${e.map(o=>`<option value="${o.id}" ${o.id===I?"selected":""}>${o.name}</option>`).join("")}
            </select>
          </div>
        `}
      </div>

      <!-- Ambient Sound Generator -->
      <div class="card" style="padding:var(--sp-4);margin-top:var(--sp-4)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
          <span class="label" style="margin:0">Ambient Background Audio</span>
          <span class="badge ${O!=="none"?"badge-fitness":"badge-work"}">${O.toUpperCase()}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm ${O==="none"?"btn-primary":"btn-secondary"}" data-sound="none">Off</button>
          <button class="btn btn-sm ${O==="rain"?"btn-primary":"btn-secondary"}" data-sound="rain">🌧️ Rain</button>
          <button class="btn btn-sm ${O==="white"?"btn-primary":"btn-secondary"}" data-sound="white">📻 White Noise</button>
          <button class="btn btn-sm ${O==="binaural"?"btn-primary":"btn-secondary"}" data-sound="binaural">🎧 Binaural</button>
        </div>
      </div>
    </div>
  `}function ts(){var a,s,n,i,l,o,r;const t=_(),e=V();I||(R==="study"&&t.length>0&&(I=t[0].id),R==="skill"&&e.length>0&&(I=e[0].id)),document.querySelectorAll("[data-mode]").forEach(d=>{d.addEventListener("click",()=>{at=d.dataset.mode;const c=parseInt(d.dataset.mins,10);es(c),k()})}),(a=document.getElementById("btn-timer-toggle"))==null||a.addEventListener("click",ss),(s=document.getElementById("btn-timer-reset"))==null||s.addEventListener("click",ns),(n=document.getElementById("btn-timer-skip"))==null||n.addEventListener("click",Xt),(i=document.getElementById("btn-type-study"))==null||i.addEventListener("click",()=>{R="study",t.length>0&&(I=t[0].id),k()}),(l=document.getElementById("btn-type-skill"))==null||l.addEventListener("click",()=>{R="skill",e.length>0&&(I=e[0].id),k()}),(o=document.getElementById("timer-target-id"))==null||o.addEventListener("change",d=>{I=d.target.value}),document.querySelectorAll("[data-sound]").forEach(d=>{d.addEventListener("click",()=>{O=d.dataset.sound,ls(O),k()})}),(r=document.getElementById("btn-toggle-fullscreen"))==null||r.addEventListener("click",()=>{var c,u;const d=document.getElementById("timer-page-container");document.fullscreenElement?(c=document.exitFullscreen)==null||c.call(document):(u=d==null?void 0:d.requestFullscreen)==null||u.call(d)})}function es(t){ot(),C=t*60,L=C}function ss(){Y?ot():as()}function as(){Y||(Y=!0,rt=setInterval(()=>{L--,is(),L<=0&&(ot(),os(),Xt())},1e3),k())}function ot(){Y=!1,rt&&clearInterval(rt),rt=null}function ns(){ot(),L=C,k()}function Xt(){ot();const t=Math.round((C-L)/60);t>=1&&I?(R==="study"?(Ht({subjectId:I,duration:t,notes:"Focus Timer Session",date:j()}),y(`Logged ${t}m study session! 📚`)):(_t({skillId:I,duration:t,notes:"Focus Timer Session",date:j()}),y(`Logged ${t}m skill practice! 💻`)),N(window.innerWidth/2,window.innerHeight/2)):t<1&&y("Session too short to log"),L=C,k()}function is(){const t=document.getElementById("timer-display"),e=document.getElementById("timer-ring");if(t){const a=Math.floor(L/60),s=L%60;t.innerText=`${a.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}if(e){const s=565-565*(C>0?(C-L)/C*100:0)/100;e.setAttribute("stroke-dashoffset",s.toString())}}function os(){try{const t=new(window.AudioContext||window.webkitAudioContext),e=t.createOscillator(),a=t.createGain();e.type="sine",e.frequency.setValueAtTime(587.33,t.currentTime),e.frequency.setValueAtTime(880,t.currentTime+.15),a.gain.setValueAtTime(.3,t.currentTime),a.gain.exponentialRampToValueAtTime(.01,t.currentTime+.8),e.connect(a),a.connect(t.destination),e.start(),e.stop(t.currentTime+.8)}catch(t){console.warn("Audio Context failed",t)}}function ls(t){if(lt){try{lt.stop()}catch{}lt=null}if(t!=="none")try{P||(P=new(window.AudioContext||window.webkitAudioContext));const e=P.sampleRate*2,a=P.createBuffer(1,e,P.sampleRate),s=a.getChannelData(0);for(let l=0;l<e;l++)t==="white"?s[l]=Math.random()*2-1:t==="rain"?s[l]=(Math.random()*2-1)*.3:t==="binaural"&&(s[l]=Math.sin(l*.01)*.2);const n=P.createBufferSource();n.buffer=a,n.loop=!0;const i=P.createGain();i.gain.setValueAtTime(.08,P.currentTime),n.connect(i),i.connect(P.destination),n.start(),lt=n}catch(e){console.warn("Ambient sound playback error:",e)}}let W=new Date;function Zt(){const t=W.getFullYear(),e=W.getMonth(),a=W.toLocaleString("default",{month:"long"}),s=new Date(t,e,1).getDay(),n=s===0?6:s-1,i=new Date(t,e+1,0).getDate(),l=U(),o=S(),r=z(),d=X(),c=Pt(),u=[];for(let m=0;m<n;m++)u.push({empty:!0});for(let m=1;m<=i;m++){const v=new Date(t,e,m),x=w(v),K=l.filter($=>$.dueDate===x),f=o.filter($=>$.dueDate===x),E=r.filter($=>$.date===x).reduce(($,et)=>$+(et.duration||0),0),pt=d.filter($=>$.date===x).reduce(($,et)=>$+(et.duration||0),0),b=c[x]?Object.values(c[x]).filter($=>$.completed).length:0,B=x===j();u.push({day:m,dateKey:x,dateObj:v,isToday:B,hasDeadline:K.length>0,hasTask:f.length>0,studyMins:E,skillMins:pt,nnCompleted:b})}return`
    <div class="page">
      <div class="flex items-center justify-between" style="margin-bottom:var(--sp-5)">
        <div>
          <h1 class="text-xl font-bold">Calendar Overview</h1>
          <p class="text-sm text-secondary">Visual schedule of deadlines, tasks & focus logs</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn btn-secondary btn-sm" id="cal-prev">${p("chevronLeft",16)}</button>
          <span class="font-bold text-sm" style="min-width:110px;text-align:center">${a} ${t}</span>
          <button class="btn btn-secondary btn-sm" id="cal-next">${p("chevronRight",16)}</button>
          <button class="btn btn-primary btn-sm" id="cal-today">Today</button>
        </div>
      </div>

      <!-- Month Grid Header -->
      <div class="card" style="padding:var(--sp-3)">
        <div class="grid" style="grid-template-columns:repeat(7, 1fr);text-align:center;font-weight:700;font-size:11px;color:var(--t-tertiary);margin-bottom:var(--sp-2)">
          <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
        </div>

        <div class="grid" style="grid-template-columns:repeat(7, 1fr);gap:4px">
          ${u.map(m=>m.empty?'<div style="height:68px"></div>':`
              <div class="cal-day-cell ${m.isToday?"is-today":""}" data-date-key="${m.dateKey}"
                   style="height:68px;padding:6px;border-radius:var(--r-sm);border:1px solid ${m.isToday?"var(--c-accent)":"var(--b-subtle)"};background:${m.isToday?"rgba(108,92,231,0.1)":"var(--bg-card)"};cursor:pointer;display:flex;flex-col;justify-content:space-between">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold" style="${m.isToday?"color:var(--c-accent)":""}">${m.day}</span>
                  ${m.hasDeadline?'<span style="width:6px;height:6px;border-radius:50%;background:var(--c-danger)"></span>':""}
                </div>
                <div class="flex flex-col gap-1">
                  ${m.studyMins>0?`<div style="font-size:9px;color:var(--c-study);font-weight:700">📖 ${Math.round(m.studyMins/60)}h</div>`:""}
                  ${m.skillMins>0?`<div style="font-size:9px;color:var(--c-skills);font-weight:700">💻 ${Math.round(m.skillMins/60)}h</div>`:""}
                  ${m.hasTask?'<div style="font-size:9px;color:var(--c-warning)">📋 Tasks</div>':""}
                </div>
              </div>
            `).join("")}
        </div>
      </div>
    </div>
  `}function te(){var t,e,a;(t=document.getElementById("cal-prev"))==null||t.addEventListener("click",()=>{W.setMonth(W.getMonth()-1),vt()}),(e=document.getElementById("cal-next"))==null||e.addEventListener("click",()=>{W.setMonth(W.getMonth()+1),vt()}),(a=document.getElementById("cal-today"))==null||a.addEventListener("click",()=>{W=new Date,vt()}),document.querySelectorAll("[data-date-key]").forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.dateKey;rs(n)})})}function vt(){const t=document.getElementById("page-content");t&&(t.innerHTML=Zt(),te())}function rs(t){const e=U().filter(r=>r.dueDate===t),a=S().filter(r=>r.dueDate===t||r.completedAt&&r.completedAt.startsWith(t)),s=z().filter(r=>r.date===t),n=X().filter(r=>r.date===t),i=_(),l=V(),o=`
    <div>
      <div style="margin-bottom:var(--sp-4)">
        <p class="text-sm font-semibold text-secondary">${t}</p>
      </div>

      <!-- Deadlines -->
      ${e.length>0?`
        <div style="margin-bottom:var(--sp-4)">
          <p class="label" style="color:var(--c-danger)">Deadlines Due</p>
          ${e.map(r=>`
            <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px">
              <span class="font-bold text-sm">${r.title}</span>
            </div>
          `).join("")}
        </div>
      `:""}

      <!-- Tasks -->
      ${a.length>0?`
        <div style="margin-bottom:var(--sp-4)">
          <p class="label">Scheduled Tasks</p>
          ${a.map(r=>`
            <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px;display:flex;align-items:center;justify-content:between">
              <span class="text-sm ${r.status==="completed"?"completed-text":""}">${r.title}</span>
              <span class="badge ${r.status==="completed"?"badge-fitness":"badge-work"}">${r.status}</span>
            </div>
          `).join("")}
        </div>
      `:""}

      <!-- Study Logs -->
      ${s.length>0?`
        <div style="margin-bottom:var(--sp-4)">
          <p class="label" style="color:var(--c-study)">Study Sessions</p>
          ${s.map(r=>{const d=i.find(c=>c.id===r.subjectId);return`
              <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px">
                <div class="font-bold text-sm">${d?d.name:"Study"} (${r.duration}m)</div>
                <div class="text-xs text-tertiary">${r.notes||"Focus session"}</div>
              </div>
            `}).join("")}
        </div>
      `:""}

      <!-- Skill Logs -->
      ${n.length>0?`
        <div style="margin-bottom:var(--sp-4)">
          <p class="label" style="color:var(--c-skills)">Skill Work Logs</p>
          ${n.map(r=>{const d=l.find(c=>c.id===r.skillId);return`
              <div class="card" style="padding:var(--sp-2) var(--sp-3);margin-top:4px">
                <div class="font-bold text-sm">${d?d.name:"Skill"} (${r.duration}m)</div>
                <div class="text-xs text-tertiary">${r.notes||"Work session"}</div>
              </div>
            `}).join("")}
        </div>
      `:""}

      ${e.length===0&&a.length===0&&s.length===0&&n.length===0?`
        <div class="empty-state" style="padding:var(--sp-4) 0">
          <p>No logged activities or deadlines for this date.</p>
        </div>
      `:""}

      <div class="flex justify-end" style="margin-top:var(--sp-4)">
        <button class="btn btn-secondary" id="modal-close-day">Close</button>
      </div>
    </div>
  `;F(`Date: ${t}`,o,r=>{r.querySelector("#modal-close-day").addEventListener("click",h)})}function ds(){const t=wt(),e=(ut()/60).toFixed(1),a=(nt()/60).toFixed(1),s=dt(),n=new Date,i=n.getDay(),l=i===0?6:i-1,o=new Date(n);o.setDate(n.getDate()-l);const r=w(o),d=t.find(c=>c.weekStart===r);return`
    <div class="page">
      <div style="margin-bottom:var(--sp-5)">
        <h1 class="text-xl font-bold">Weekly Accountability Review</h1>
        <p class="text-sm text-secondary">Reflect, audit performance, and optimize your trajectory</p>
      </div>

      <!-- Weekly Stats Banner -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-5);background:linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,212,211,0.1));border:1px solid rgba(108,92,231,0.3)">
        <div class="flex items-center justify-between" style="margin-bottom:var(--sp-3)">
          <span class="label" style="margin:0">Week of ${r}</span>
          <span class="badge badge-personal">${d?"Completed":"Pending"}</span>
        </div>
        <div class="grid grid-3" style="gap:var(--sp-2);text-align:center">
          <div style="background:var(--bg-card);padding:var(--sp-3);border-radius:var(--r-md)">
            <div class="text-xs text-tertiary">Avg Score</div>
            <div class="text-xl font-bold" style="color:var(--c-accent)">${s}</div>
          </div>
          <div style="background:var(--bg-card);padding:var(--sp-3);border-radius:var(--r-md)">
            <div class="text-xs text-tertiary">Study Hours</div>
            <div class="text-xl font-bold" style="color:var(--c-study)">${e}h</div>
          </div>
          <div style="background:var(--bg-card);padding:var(--sp-3);border-radius:var(--r-md)">
            <div class="text-xs text-tertiary">Skill Hours</div>
            <div class="text-xl font-bold" style="color:var(--c-skills)">${a}h</div>
          </div>
        </div>
      </div>

      <!-- Review Form -->
      <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-6)">
        <h3 class="font-bold text-base" style="margin-bottom:var(--sp-3)">Weekly Reflection Prompts</h3>
        <form id="form-weekly-review">
          <div class="form-group">
            <label class="form-label">1. What were your biggest wins & progress this week?</label>
            <textarea class="form-textarea" id="review-wins" placeholder="List major accomplishments, study milestones, completed projects..." rows="3">${(d==null?void 0:d.wins)||""}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">2. What friction, distractions or obstacles did you encounter?</label>
            <textarea class="form-textarea" id="review-friction" placeholder="Identify energy drains, procrastination triggers..." rows="3">${(d==null?void 0:d.friction)||""}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">3. Top 3 Non-Negotiable focus areas for next week</label>
            <textarea class="form-textarea" id="review-goals" placeholder="1. Finish Math unit 3&#10;2. Edit 2 videos&#10;3. Maintain 7-day habit streak..." rows="3">${(d==null?void 0:d.goals)||""}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Self-Assessment Score (1 - 10)</label>
            <input type="number" class="form-input" id="review-rating" min="1" max="10" value="${(d==null?void 0:d.rating)||8}" style="width:100px" />
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%">${p("check",16)} Save Weekly Review</button>
        </form>
      </div>

      <!-- Past Reviews Archive -->
      <div>
        <p class="label" style="margin-bottom:var(--sp-3)">Past Weekly Reviews</p>
        ${t.length===0?`
          <div class="card" style="padding:var(--sp-4);text-align:center;color:var(--t-tertiary)">
            No past reviews submitted yet. Fill out the reflection form above!
          </div>
        `:`
          <div class="flex flex-col gap-3">
            ${t.map(c=>`
              <div class="card" style="padding:var(--sp-3) var(--sp-4)">
                <div class="flex items-center justify-between" style="margin-bottom:var(--sp-2)">
                  <span class="font-bold text-sm">Week of ${c.weekStart}</span>
                  <span class="badge badge-fitness">Rating: ${c.rating||"N/A"}/10</span>
                </div>
                <p class="text-xs text-secondary truncate-2" style="margin-bottom:var(--sp-2)">${c.wins||"No notes"}</p>
                <button class="btn btn-secondary btn-sm btn-view-review" data-rev-id="${c.id}" style="font-size:11px">View Full Entry</button>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    </div>
  `}function cs(){var t;(t=document.getElementById("form-weekly-review"))==null||t.addEventListener("submit",e=>{e.preventDefault();const a=document.getElementById("review-wins").value.trim(),s=document.getElementById("review-friction").value.trim(),n=document.getElementById("review-goals").value.trim(),i=parseInt(document.getElementById("review-rating").value,10),l=new Date,o=l.getDay(),r=o===0?6:o-1,d=new Date(l);d.setDate(l.getDate()-r);const c=w(d);ye({weekStart:c,wins:a,friction:s,goals:n,rating:i}),y("Weekly review saved! 🏆"),N(window.innerWidth/2,window.innerHeight/2),k()}),document.querySelectorAll(".btn-view-review").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.revId,s=wt().find(n=>n.id===a);s&&us(s)})})}function us(t){const e=`
    <div>
      <div style="margin-bottom:var(--sp-3)">
        <span class="badge badge-fitness">Rating: ${t.rating||10}/10</span>
      </div>

      <div style="margin-bottom:var(--sp-4)">
        <p class="label">Wins & Accomplishments</p>
        <p class="text-sm" style="white-space:pre-wrap">${t.wins||"None recorded"}</p>
      </div>

      <div style="margin-bottom:var(--sp-4)">
        <p class="label">Friction & Obstacles</p>
        <p class="text-sm" style="white-space:pre-wrap">${t.friction||"None recorded"}</p>
      </div>

      <div style="margin-bottom:var(--sp-4)">
        <p class="label">Next Week Goals</p>
        <p class="text-sm" style="white-space:pre-wrap">${t.goals||"None recorded"}</p>
      </div>

      <div class="flex justify-end" style="margin-top:var(--sp-4)">
        <button class="btn btn-secondary" id="modal-close-rev">Close</button>
      </div>
    </div>
  `;F(`Review: Week of ${t.weekStart}`,e,a=>{a.querySelector("#modal-close-rev").addEventListener("click",h)})}const q={home:{render:De,init:Ee,label:"Home",icon:"home",mobile:!0},today:{render:Ae,init:Le,label:"Today",icon:"today",mobile:!0},tasks:{render:qe,init:Ne,label:"Tasks",icon:"tasks",mobile:!0},progress:{render:Ye,init:Je,label:"Progress",icon:"progress",mobile:!0},more:{render:null,init:null,label:"More",icon:"more",mobile:!0},deadlines:{render:Pe,init:Oe,label:"Deadlines",icon:"deadline"},habits:{render:He,init:Ue,label:"Habits",icon:"habits"},study:{render:_e,init:ze,label:"Study",icon:"study"},skills:{render:Ve,init:Ke,label:"Skills",icon:"skills"},timer:{render:Ze,init:ts,label:"Timer",icon:"timer"},calendar:{render:Zt,init:te,label:"Calendar",icon:"calendar"},review:{render:ds,init:cs,label:"Review",icon:"award"},settings:{render:Qe,init:Xe,label:"Settings",icon:"settings"}};let H="home",Z=!1;function ps(){const t=it();document.documentElement.setAttribute("data-theme",t.theme||"dark");const e=document.getElementById("app");e.innerHTML=`
    ${fs()}
    <div class="app-main">
      <div class="app-content" id="page-content"></div>
    </div>
    ${hs()}
    ${gs()}
  `,T(Ct()),vs(),bs(),window.addEventListener("hashchange",()=>{const a=Ct();q[a]&&T(a)})}function Ct(){return window.location.hash.slice(1)||"home"}function T(t){if(t==="more"&&(t="settings"),!q[t]||!q[t].render)return;H=t,window.location.hash=t;const e=document.getElementById("page-content");e&&(e.innerHTML=q[t].render(),e.scrollTop=0,q[t].init&&requestAnimationFrame(()=>q[t].init()),ms(),ht())}function ms(){document.querySelectorAll(".nav-item").forEach(t=>{const e=t.dataset.route,a=["settings","calendar","review","habits","study","skills","deadlines","timer"];e==="more"?t.classList.toggle("active",a.includes(H)):t.classList.toggle("active",e===H)}),document.querySelectorAll(".sidebar-nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.route===H)})}function vs(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const a=t.dataset.route;T(a==="more"?"settings":a)})}),document.querySelectorAll(".sidebar-nav-item").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),T(t.dataset.route)})})}function gs(){return`
    <button class="fab" id="fab-btn" aria-label="Quick capture">
      ${p("plus")}
    </button>
    <div class="fab-menu hidden" id="fab-menu">
      <button class="fab-menu-item" data-action="task">${p("tasks",18)} New Task</button>
      <button class="fab-menu-item" data-action="deadline">${p("deadline",18)} New Deadline</button>
      <button class="fab-menu-item" data-action="study">${p("study",18)} Study Session</button>
      <button class="fab-menu-item" data-action="skill">${p("skills",18)} Skill Session</button>
      <button class="fab-menu-item" data-action="timer">${p("timer",18)} Focus Timer</button>
    </div>
  `}function bs(){const t=document.getElementById("fab-btn"),e=document.getElementById("fab-menu");t==null||t.addEventListener("click",()=>{Z=!Z,t.classList.toggle("open",Z),e.classList.toggle("hidden",!Z)}),e==null||e.querySelectorAll(".fab-menu-item").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.action;ht(),ys(s)})}),document.addEventListener("click",a=>{Z&&!a.target.closest("#fab-btn")&&!a.target.closest("#fab-menu")&&ht()})}function ht(){var t,e;Z=!1,(t=document.getElementById("fab-btn"))==null||t.classList.remove("open"),(e=document.getElementById("fab-menu"))==null||e.classList.add("hidden")}function ys(t){switch(t){case"task":T("tasks"),setTimeout(()=>{var e;return(e=document.getElementById("open-task-modal"))==null?void 0:e.click()},100);break;case"deadline":T("deadlines"),setTimeout(()=>{var e;return(e=document.getElementById("open-deadline-modal"))==null?void 0:e.click()},100);break;case"study":T("study");break;case"skill":T("skills");break;case"timer":T("timer");break}}function fs(){return`
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
        ${[{route:"home",icon:"home",label:"Home"},{route:"today",icon:"today",label:"Today"},{route:"tasks",icon:"tasks",label:"Tasks"},{route:"deadlines",icon:"deadline",label:"Deadlines"},"_divider_",{route:"habits",icon:"habits",label:"Habits"},{route:"study",icon:"study",label:"Study"},{route:"skills",icon:"skills",label:"Skills"},{route:"timer",icon:"timer",label:"Timer"},"_divider_",{route:"progress",icon:"progress",label:"Progress"},{route:"calendar",icon:"calendar",label:"Calendar"},{route:"review",icon:"award",label:"Weekly Review"},"_divider_",{route:"settings",icon:"settings",label:"Settings"}].map(e=>e==="_divider_"?'<div class="divider" style="margin:4px 12px"></div>':`<a href="#${e.route}" class="sidebar-nav-item" data-route="${e.route}">
            ${p(e.icon,20)}
            ${e.label}
          </a>`).join("")}
      </nav>
    </aside>
  `}function hs(){return`
    <nav class="bottom-nav" id="bottom-nav">
      ${Object.entries(q).filter(([,e])=>e.mobile).map(([e,a])=>`
        <button class="nav-item" data-route="${e}">
          ${p(a.icon)}
          <span>${a.label}</span>
        </button>
      `).join("")}
    </nav>
  `}function F(t,e,a){const s=document.createElement("div");return s.className="modal-overlay",s.id="active-modal",s.innerHTML=`
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">${t}</h2>
        <button class="btn-icon" id="modal-close">${p("close")}</button>
      </div>
      <div class="modal-body">${e}</div>
    </div>
  `,document.body.appendChild(s),s.querySelector("#modal-close").addEventListener("click",h),s.addEventListener("click",n=>{n.target===s&&h()}),a&&a(s),s}function h(){const t=document.getElementById("active-modal");t&&(t.style.animation="fadeOut .2s var(--ease) forwards",t.querySelector(".modal").style.animation="slideDown .2s var(--ease) forwards",setTimeout(()=>t.remove(),200))}function k(){if(q[H]){const t=document.getElementById("page-content");if(t){const e=t.scrollTop;t.innerHTML=q[H].render(),q[H].init&&requestAnimationFrame(()=>{q[H].init(),t.scrollTop=e})}}}const xs="modulepreload",ks=function(t){return"/"+t},Nt={},$s=function(e,a,s){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),o=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));n=Promise.allSettled(a.map(r=>{if(r=ks(r),r in Nt)return;Nt[r]=!0;const d=r.endsWith(".css"),c=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${c}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":xs,d||(u.as="script"),u.crossOrigin="",u.href=r,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((m,v)=>{u.addEventListener("load",m),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return n.then(l=>{for(const o of l||[])o.status==="rejected"&&i(o.reason);return e().catch(i)})};function ws(t={}){const{immediate:e=!1,onNeedRefresh:a,onOfflineReady:s,onRegistered:n,onRegisteredSW:i,onRegisterError:l}=t;let o,r;const d=async(u=!0)=>{await r};async function c(){if("serviceWorker"in navigator){if(o=await $s(async()=>{const{Workbox:u}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:u}},[]).then(({Workbox:u})=>new u("/sw.js",{scope:"/",type:"classic"})).catch(u=>{l==null||l(u)}),!o)return;o.addEventListener("activated",u=>{(u.isUpdate||u.isExternal)&&window.location.reload()}),o.addEventListener("installed",u=>{u.isUpdate||s==null||s()}),o.register({immediate:e}).then(u=>{i?i("/sw.js",u):n==null||n(u)}).catch(u=>{l==null||l(u)})}}return r=c(),d}document.addEventListener("DOMContentLoaded",()=>{ps()});ws({onNeedRefresh(){console.log("New content available, refreshing...")},onOfflineReady(){console.log("App ready to work offline")}});
