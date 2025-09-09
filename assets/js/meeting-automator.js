
/* Meeting Automator — MBCC (client-side) */
(function(){
  const KEY='mbcc_meeting_automator_v1';
  const el = sel => document.querySelector(sel);
  const byId = id => document.getElementById(id);
  const agendaEl = byId('agenda');
  const actionsEl = byId('actions');
  const preview = byId('export_preview');

  const templates = {
    oneonone: [
      {t:'Wins & highlights', m:5},
      {t:'Priorities & blockers', m:10},
      {t:'Career & feedback', m:10},
      {t:'Next steps', m:5}
    ],
    standup: [
      {t:'Yesterday', m:8},
      {t:'Today', m:8},
      {t:'Blockers', m:8},
      {t:'Parking lot', m:6}
    ],
    sales: [
      {t:'Rapport & agenda', m:5},
      {t:'Discovery', m:12},
      {t:'Solution & next step', m:10},
      {t:'Close & confirm', m:3}
    ],
    retro: [
      {t:'What went well', m:8},
      {t:'What could improve', m:10},
      {t:'Actions', m:10},
      {t:'Owners & dates', m:2}
    ],
    custom: []
  };

  const mt = {
    state: {
      title: 'Weekly Sync',
      when: '',
      duration: 30,
      location: '',
      attendees: '',
      agenda: [],
      actions: [],
      notes: ''
    },
    uiSync(){
      byId('m_title').value = this.state.title;
      byId('m_when').value = this.state.when;
      byId('m_location').value = this.state.location;
      byId('m_attendees').value = this.state.attendees;
      byId('m_duration').value = this.state.duration;
      byId('m_notes').value = this.state.notes;
      renderAgenda();
      renderActions();
      renderPreview();
    },
    capture(){
      this.state.title = byId('m_title').value.trim() || 'Untitled Meeting';
      this.state.when = byId('m_when').value.trim();
      this.state.location = byId('m_location').value.trim();
      this.state.attendees = byId('m_attendees').value.trim();
      this.state.duration = Number(byId('m_duration').value||30);
      this.state.notes = byId('m_notes').value;
    },
    autoPlan(){
      this.capture();
      const tpl = (byId('m_template').value)||'oneonone';
      const items = JSON.parse(JSON.stringify(templates[tpl] || []));
      // Scale to fit duration
      const total = items.reduce((s,x)=>s+x.m,0) || 1;
      const factor = (this.state.duration / total);
      const scaled = items.map(x=>({t:x.t, m: Math.max(3, Math.round(x.m * factor))}));
      this.state.agenda = scaled;
      this.uiSync();
    },
    addItem(){
      this.state.agenda.push({t:'Topic', m:5, notes:''});
      this.uiSync();
    },
    removeItem(i){
      this.state.agenda.splice(i,1);
      this.uiSync();
    },
    startTimer(i){
      const row = agendaEl.querySelector(`[data-i="${i}"]`);
      if(!row) return;
      const btn = row.querySelector('.btn.timer');
      let secs = (this.state.agenda[i].m||5)*60;
      btn.disabled = true;
      const lab = row.querySelector('.time');
      const iv = setInterval(()=>{
        secs--; const mm = Math.floor(secs/60), ss = ('0'+(secs%60)).slice(-2);
        lab.textContent = `${mm}:${ss}`;
        if(secs<=0){ clearInterval(iv); lab.textContent='0:00'; btn.disabled=false; btn.textContent='Start'; }
      }, 1000);
      btn.textContent='Running…';
    },
    addAction(){
      const it = {
        owner: byId('a_owner').value.trim()||'—',
        task: byId('a_task').value.trim()||'—',
        due: byId('a_due').value.trim()||'—',
        notes: byId('a_notes').value.trim()||''
      };
      if(it.task==='—' && it.owner==='—'){ return; }
      this.state.actions.push(it);
      byId('a_task').value=''; byId('a_owner').value=''; byId('a_due').value=''; byId('a_notes').value='';
      renderActions(); renderPreview();
    },
    clearActions(){ this.state.actions = []; renderActions(); renderPreview(); },
    save(){
      this.capture();
      try{ localStorage.setItem(KEY, JSON.stringify(this.state)); alert('Saved.'); }catch(_){ alert('Save failed.'); }
    },
    load(){
      try{ const raw = localStorage.getItem(KEY); if(!raw) return alert('No save found.');
        this.state = Object.assign(this.state, JSON.parse(raw)); this.uiSync(); alert('Loaded.'); }catch(_){ alert('Load failed.'); }
    },
    reset(){ this.state = {title:'Weekly Sync', when:'', duration:30, location:'', attendees:'', agenda:[], actions:[], notes:''}; this.uiSync(); },
    toMarkdown(){
      this.capture();
      const s = this.state;
      const lines = [];
      lines.push(`# ${s.title}`);
      if(s.when) lines.push(`**When:** ${s.when}`);
      if(s.location) lines.push(`**Where:** ${s.location}`);
      if(s.attendees) lines.push(`**Attendees:** ${s.attendees}`);
      lines.push(`**Duration:** ${s.duration} min`);
      lines.push('\n## Agenda');
      s.agenda.forEach((it,idx)=>{ lines.push(`${idx+1}. ${it.t} — ${it.m}m${it.notes?`: ${it.notes.replace(/\n/g,' ')}`:''}`); });
      lines.push('\n## Notes'); lines.push(s.notes||'_—_');
      lines.push('\n## Action Items');
      if(s.actions.length===0){ lines.push('_None_'); }
      else { s.actions.forEach(a=>lines.push(`- [ ] ${a.task} _(owner: ${a.owner}, due: ${a.due})_ ${a.notes?'- '+a.notes:''}`)); }
      return lines.join('\n');
    },
    renderExport(){ preview.textContent = this.toMarkdown(); },
    copyMarkdown(){
      const txt = this.toMarkdown();
      navigator.clipboard.writeText(txt).then(()=>alert('Copied to clipboard.')).catch(()=>{});
      preview.textContent = txt;
    },
    downloadMarkdown(){
      const blob = new Blob([this.toMarkdown()], {type:'text/markdown'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download='meeting-notes.md'; a.click(); URL.revokeObjectURL(a.href);
    },
    mailto(){
      const body = encodeURIComponent(this.toMarkdown());
      const subj = encodeURIComponent(`Notes: ${this.state.title}`);
      location.href = `mailto:?subject=${subj}&body=${body}`;
    },
    downloadICS(){
      this.capture();
      // Basic ICS (single VEVENT)
      const uid = 'mbcc-' + Date.now() + '@moecommunitycloud.com';
      let dt = (this.state.when||'').replace(/[-: ]/g,'');
      // Expect YYYYMMDDHHMM; fallback to today
      if(dt.length < 12){
        const now = new Date();
        dt = now.getFullYear().toString() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + '0900';
      }
      const end = addMinutesToICS(dt, this.state.duration||30);
      const desc = this.toMarkdown().replace(/\n/g,'\\n');
      const ics = [
        'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MBCC//Meeting Automator//EN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dt}00Z`,
        `DTSTART:${dt}Z`,
        `DTEND:${end}Z`,
        `SUMMARY:${escapeICS(this.state.title)}`,
        `DESCRIPTION:${escapeICS(desc)}`,
        `LOCATION:${escapeICS(this.state.location||'')}`,
        'END:VEVENT','END:VCALENDAR'
      ].join('\r\n');
      const blob = new Blob([ics], {type:'text/calendar'});
      const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='meeting.ics'; a.click(); URL.revokeObjectURL(a.href);
    },
    shareURL(){
      // Share via URL hash (base64 of state)
      this.capture();
      try{
        const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(this.state))));
        const url = `${location.origin}${location.pathname}#s=${b64}`;
        navigator.clipboard.writeText(url).then(()=>alert('Share URL copied.')).catch(()=>alert(url));
      }catch(_){}
    }
  };

  function escapeICS(s){ return (s||'').replace(/[,;\\n]/g, m => ({',':'\\,',';':'\\;','\\n':'\\n'}[m]||m)); }
  function addMinutesToICS(dt, minutes){
    // dt: YYYYMMDDHHMM, return YYYYMMDDHHMM
    const Y=+dt.slice(0,4), M=+dt.slice(4,6)-1, D=+dt.slice(6,8), h=+dt.slice(8,10), m=+dt.slice(10,12);
    const d = new Date(Date.UTC(Y,M,D,h,m)); d.setUTCMinutes(d.getUTCMinutes() + (minutes||30));
    return d.getUTCFullYear().toString() + String(d.getUTCMonth()+1).padStart(2,'0') + String(d.getUTCDate()).padStart(2,'0') + String(d.getUTCHours()).padStart(2,'0') + String(d.getUTCMinutes()).padStart(2,'0');
  }

  function renderAgenda(){
    agendaEl.innerHTML='';
    mt.state.agenda.forEach((it,i)=>{
      const row = document.createElement('div');
      row.className='agenda-item card';
      row.dataset.i = i;
      row.innerHTML = `
        <div style="display:flex;gap:6px">
          <button class="btn timer" type="button">Start</button>
          <button class="btn alt" type="button">Del</button>
        </div>
        <div>
          <input class="input" value="${it.t}" placeholder="Topic" data-k="t">
          <textarea class="input" rows="2" placeholder="Notes (optional)" data-k="notes">${it.notes||''}</textarea>
        </div>
        <div class="time">
          <input class="input sm" type="number" value="${it.m||5}" min="1" step="1" data-k="m">
        </div>`;
      agendaEl.appendChild(row);
      const [startBtn, delBtn] = row.querySelectorAll('button');
      startBtn.addEventListener('click', ()=>mt.startTimer(i));
      delBtn.addEventListener('click', ()=>mt.removeItem(i));
      row.querySelectorAll('[data-k]').forEach(inp=>{
        inp.addEventListener('input', ()=>{
          const k = inp.getAttribute('data-k');
          let val = inp.value;
          if(k==='m') val = Number(val||0);
          mt.state.agenda[i][k] = val;
          renderPreview();
        });
      });
    });
    renderPreview();
  }

  function renderActions(){
    actionsEl.innerHTML='';
    mt.state.actions.forEach((a)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${a.owner}</td><td>${a.task}</td><td>${a.due}</td><td>${a.notes||''}</td>`;
      actionsEl.appendChild(tr);
    });
  }

  function renderPreview(){ mt.renderExport(); }

  // Load from URL if present
  window.addEventListener('load', ()=>{
    try{
      const hash = location.hash || '';
      const m = hash.match(/#s=([^&]+)/);
      if(m && m[1]){
        const raw = decodeURIComponent(escape(atob(m[1])));
        const obj = JSON.parse(raw);
        Object.assign(mt.state, obj||{});
      }
    }catch(_){} finally { mt.uiSync(); }
  });

  window.mt = mt;
})();
