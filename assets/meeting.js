
// MBCC Meeting Automator — with Google Calendar link + URL prefill
(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));
  const pad = (n)=>String(n).padStart(2,'0');
  const fmt = (d)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const uuid = ()=> 'mbcc-'+Math.random().toString(36).slice(2)+Date.now();

  const state = { attendees: [], agenda: [], tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York" };

  // Elements
  const title = $('#title');
  const organizer = $('#organizer');
  const locationEl = $('#location');
  const date = $('#date');
  const duration = $('#duration');
  const tz = $('#tz');
  const addEmail = $('#add-email');
  const emailInput = $('#email-input');
  const agendaList = $('.agenda-list');
  const agendaTitle = $('#agenda-title');
  const agendaMins = $('#agenda-mins');
  const agendaBtn = $('#agenda-add');
  const agendaTotal = $('#agenda-total');
  const notes = $('#notes');
  const generateBtn = $('#generate');
  const downloadICSBtn = $('#download-ics');
  const copyAgendaBtn = $('#copy-agenda');
  const exportJSONBtn = $('#export-json');
  const importJSONBtn = $('#import-json');
  const startBtn = $('#start-meeting');
  const timerEl = $('#timer');
  const statusEl = $('#status');
  const gcalLinkEl = $('#gcal-link');
  const mailDraftEl = $('#mail-draft');

  // Initialize defaults
  tz.value = state.tz;
  const now = new Date();
  now.setMinutes(now.getMinutes()+30 - (now.getMinutes()%30)); // snap to next half-hour
  date.value = fmt(now);

  // Attendees
  function renderAttendees(){
    const box = $('.tagbox');
    box.innerHTML = '';
    state.attendees.forEach((e,i)=>{
      const tag = document.createElement('span');
      tag.className='tag';
      tag.innerHTML = `<span>${e}</span><button aria-label="Remove" data-i="${i}">×</button>`;
      box.appendChild(tag);
    });
    box.onclick = (ev)=>{
      if(ev.target.matches('button[data-i]')){
        state.attendees.splice(+ev.target.dataset.i,1);
        renderAttendees();
        kpis();
        refreshLinks();
      }
    };
    kpis();
    refreshLinks();
  }
  addEmail.addEventListener('click', ()=>{
    const v=emailInput.value.trim();
    if(!v) return;
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ alert('Please enter a valid email'); return; }
    state.attendees.push(v);
    emailInput.value='';
    renderAttendees();
  });

  // Agenda
  function renderAgenda(){
    agendaList.innerHTML='';
    state.agenda.forEach((it,idx)=>{
      const row = document.createElement('div');
      row.className='agenda-item';
      row.innerHTML = `
        <input class="input" value="${it.title}" data-field="title" data-i="${idx}" />
        <input class="input" type="number" min="1" value="${it.mins}" data-field="mins" data-i="${idx}" />
        <button class="btn warn" data-del="${idx}" title="Remove">✕</button>`;
      agendaList.appendChild(row);
    });
    agendaList.oninput = (e)=>{
      const i = +e.target.dataset.i, f = e.target.dataset.field;
      if(f==='title') state.agenda[i].title = e.target.value;
      if(f==='mins') state.agenda[i].mins = Math.max(1, parseInt(e.target.value||'1',10));
      sumAgenda();
      refreshLinks();
    };
    agendaList.onclick = (e)=>{
      if(e.target.dataset.del){
        const i=+e.target.dataset.del;
        state.agenda.splice(i,1);
        renderAgenda();
        sumAgenda();
        refreshLinks();
      }
    };
    sumAgenda();
    refreshLinks();
  }
  function sumAgenda(){
    const total = state.agenda.reduce((a,b)=>a + (parseInt(b.mins)||0), 0);
    agendaTotal.textContent = total+' min';
    agendaTotal.style.color = (parseInt(duration.value||'0',10) && total>parseInt(duration.value,10)) ? 'var(--warn)' : 'var(--ink)';
    kpis();
  }
  agendaBtn.addEventListener('click', ()=>{
    const t = agendaTitle.value.trim();
    const m = Math.max(1, parseInt(agendaMins.value||'0',10));
    if(!t) return;
    state.agenda.push({title:t, mins:m});
    agendaTitle.value='';
    agendaMins.value='5';
    renderAgenda();
  });

  function kpis(){
    $('#kpi-attendees').textContent = state.attendees.length;
    $('#kpi-agenda').textContent = state.agenda.length;
    const total = state.agenda.reduce((a,b)=>a + (parseInt(b.mins)||0), 0);
    $('#kpi-mins').textContent = total;
  }

  // Notes template
  function buildNotes(){
    const lines = [];
    lines.push(`# ${title.value || 'Untitled Meeting'}`);
    lines.push(`**Organizer:** ${organizer.value||'-'}  `);
    lines.push(`**When:** ${date.value || '-'} ${tz.value}  `);
    lines.push(`**Where:** ${locationEl.value||'Online'}  `);
    lines.push(`**Attendees:** ${state.attendees.join(', ')||'-'}  `);
    lines.push('\n## Agenda');
    state.agenda.forEach((it,i)=> lines.push(`${i+1}. ${it.title} — ${it.mins} min`));
    lines.push('\n## Notes');
    lines.push('- ');
    lines.push('\n## Action Items');
    lines.push('- [ ] ');
    return lines.join('\n');
  }
  function copy(text){
    navigator.clipboard.writeText(text).then(()=>{
      status('Copied to clipboard');
    }).catch(()=>alert('Copy failed.'));
  }
  copyAgendaBtn.addEventListener('click', ()=> copy(buildNotes()));

  // ICS generator
  function toICS(){
    const startLocal = new Date(date.value);
    if(isNaN(+startLocal)){ alert('Please set a valid date/time'); return null; }
    const durMin = Math.max(1, parseInt(duration.value||'30',10));
    const endLocal = new Date(startLocal.getTime() + durMin*60000);
    const startUTC = new Date(startLocal.getTime() - startLocal.getTimezoneOffset()*60000);
    const endUTC = new Date(endLocal.getTime() - endLocal.getTimezoneOffset()*60000);
    const dt = (d)=> d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');

    const uid = uuid();
    const esc = (s)=> String(s||'').replace(/[,\n]/g, c=> ({',':'\\,','\n':'\\n'}[c]) );
    const lines = [
      'BEGIN:VCALENDAR',
      'PRODID:-//MBCC//Meeting Automator//EN',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dt(new Date())}`,
      `DTSTART:${dt(startUTC)}`,
      `DTEND:${dt(endUTC)}`,
      `SUMMARY:${esc(title.value||'Untitled Meeting')}`,
      `DESCRIPTION:${esc(buildNotes())}`,
      `LOCATION:${esc(locationEl.value||'Online')}`,
      ...state.attendees.map(a=>`ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${a}`),
      organizer.value ? `ORGANIZER:mailto:${organizer.value}` : '',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(Boolean);
    return lines.join('\r\n');
  }
  function download(filename, content, mime='text/plain'){
    const blob = new Blob([content], {type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 100);
  }
  downloadICSBtn.addEventListener('click', ()=>{
    const ics = toICS(); if(!ics) return;
    const name = (title.value||'meeting').toLowerCase().replace(/\s+/g,'-')+'.ics';
    download(name, ics, 'text/calendar');
  });

  // Email draft & Google Calendar draft
  function refreshLinks(){
    // Email (mailto)
    const subject = encodeURIComponent(`[${title.value||'Meeting'}] ${date.value}`);
    const body = encodeURIComponent(buildNotes() + `\n\n— Sent via MBCC Meeting Automator`);
    mailDraftEl.href = `mailto:${state.attendees.join(',')}` + `?subject=${subject}&body=${body}`;

    // Google Calendar draft
    const startLocal = new Date(date.value);
    if(!isNaN(+startLocal)){
      const dur = Math.max(1, parseInt(duration.value || '30', 10));
      const endLocal = new Date(startLocal.getTime() + dur * 60000);
      const toG = (d)=> d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
      const dates = `${toG(startLocal)}/${toG(endLocal)}`;
      const gUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text=' + encodeURIComponent(title.value || 'Meeting')
        + '&dates=' + dates
        + '&details=' + encodeURIComponent(buildNotes())
        + '&location=' + encodeURIComponent(locationEl.value || 'Online')
        + (state.attendees.length ? '&add=' + encodeURIComponent(state.attendees.join(',')) : '');
      gcalLinkEl.href = gUrl;
    } else {
      gcalLinkEl.removeAttribute('href');
    }
  }
  generateBtn.addEventListener('click', refreshLinks);
  ['input','change'].forEach(evt => {
    [title, organizer, locationEl, date, duration, tz].forEach(el => el.addEventListener(evt, refreshLinks));
  });

  exportJSONBtn.addEventListener('click', ()=>{
    const payload = {
      v:1, title:title.value, organizer:organizer.value, location:locationEl.value,
      date:date.value, duration:duration.value, tz:tz.value,
      attendees: state.attendees, agenda: state.agenda, notes: notes.value
    };
    localStorage.setItem('mbcc_meeting', JSON.stringify(payload));
    download('meeting.json', JSON.stringify(payload,null,2), 'application/json');
    status('Saved to browser + downloaded JSON');
  });
  importJSONBtn.addEventListener('click', ()=>{
    const inp = document.createElement('input'); inp.type='file'; inp.accept='application/json';
    inp.onchange = ()=>{
      const file = inp.files[0]; if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        try{
          const data = JSON.parse(reader.result);
          title.value = data.title||''; organizer.value=data.organizer||''; locationEl.value=data.location||'';
          date.value=data.date||date.value; duration.value=data.duration||'60'; tz.value=data.tz||tz.value;
          state.attendees = data.attendees||[]; state.agenda = data.agenda||[]; notes.value=data.notes||'';
          renderAttendees(); renderAgenda(); sumAgenda(); kpis(); refreshLinks();
          status('Imported meeting JSON');
        }catch(e){ alert('Invalid JSON'); }
      };
      reader.readAsText(file);
    };
    inp.click();
  });

  // Notes autosave
  notes.value = localStorage.getItem('mbcc_notes') || '';
  notes.addEventListener('input', ()=> localStorage.setItem('mbcc_notes', notes.value));

  // Timer
  let timer=null, left=0, current=0;
  function tick(){
    if(left<=0){
      if(current < state.agenda.length-1){
        current++;
        left = (parseInt(state.agenda[current].mins)||1) * 60;
        status('Next: '+state.agenda[current].title);
      } else {
        stopTimer(); status('Meeting done ✅'); return;
      }
    }
    left--;
    const m = Math.floor(left/60), s = left%60;
    timerEl.querySelector('b').textContent = `${pad(m)}:${pad(s)}`;
    $('#current-topic').textContent = state.agenda[current]?.title || '—';
  }
  function startTimer(){
    if(state.agenda.length===0){ alert('Add at least one agenda item.'); return; }
    current=0; left = (parseInt(state.agenda[0].mins)||1) * 60;
    timerEl.style.opacity='1';
    timer = setInterval(tick, 1000);
    status('Timer started');
  }
  function stopTimer(){
    clearInterval(timer); timer=null; timerEl.style.opacity='.8';
  }
  startBtn.addEventListener('click', ()=> (timer? stopTimer() : startTimer()));
  function status(msg){ statusEl.textContent = msg; setTimeout(()=>{statusEl.textContent='';}, 3000); }

  // URL prefill support
  (function prefillFromQuery(){
    const q = new URLSearchParams(location.search);
    if (q.get('title')) title.value = q.get('title');
    if (q.get('organizer')) organizer.value = q.get('organizer');
    if (q.get('date')) date.value = q.get('date');
    if (q.get('duration')) duration.value = q.get('duration');
    if (q.get('location')) locationEl.value = q.get('location');
    if (q.get('attendees')) {
      state.attendees = q.get('attendees').split(',').map(s=>s.trim()).filter(Boolean);
    }
    if (q.get('agenda')) { // agenda=Topic:mins|Topic:mins
      state.agenda = q.get('agenda').split('|').map(x=>{
        const [t,m] = x.split(':');
        return { title: t || '', mins: Math.max(1, parseInt(m||'5',10)) };
      });
    }
  })();

  // Restore saved meeting (after prefill so query can override if needed)
  try{
    const saved = JSON.parse(localStorage.getItem('mbcc_meeting')||'null');
    if(saved && !location.search){ // only auto-restore if no querystring provided
      title.value = saved.title||''; organizer.value=saved.organizer||''; locationEl.value=saved.location||'';
      date.value=saved.date||date.value; duration.value=saved.duration||'60'; tz.value=saved.tz||tz.value;
      state.attendees = saved.attendees||[]; state.agenda = saved.agenda||[]; notes.value=saved.notes||notes.value;
    }
  }catch{}

  renderAttendees(); renderAgenda(); sumAgenda(); kpis(); refreshLinks();
})();
